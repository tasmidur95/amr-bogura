import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { createLocalClient } from '@/lib/local-db';

// SERVER-ONLY client using the service_role key (bypasses Row Level Security).
//
// After migration 20261123000000 the public anon key can only READ published rows.
// Everything that writes (submissions, approvals, edits, deletes) or reads the moderation
// queue (pending / rejected rows) must go through this client.
//
// SUPABASE_SERVICE_ROLE_KEY is deliberately NOT prefixed with NEXT_PUBLIC_ so Next.js never
// ships it to the browser. Never log it and never import this file from a client component.

const url =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Development: LOCAL_DATABASE_URL -> local Postgres, queries run as `service_role` (bypasses RLS)
const localService = createLocalClient('service_role') as unknown as SupabaseClient | null;

export const supabaseAdmin: SupabaseClient | null = localService ?? (
  typeof window === 'undefined' && url && serviceKey && url !== 'https://your-project.supabase.co'
    ? createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: (input, init: RequestInit = {}) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            return fetch(input, { ...init, signal: init.signal || controller.signal }).finally(() => clearTimeout(timeoutId));
          },
        },
      })
    : null);

/**
 * Client to use for writes and privileged reads.
 * Falls back to the anon client when no service key is configured (works only while RLS is
 * still off, i.e. before the migration is applied).
 */
export const supabaseWriter: SupabaseClient | null = supabaseAdmin ?? supabase;
