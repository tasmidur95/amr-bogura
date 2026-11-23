import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createLocalClient, isLocalDbConfigured } from '@/lib/local-db';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  '';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

// Development: LOCAL_DATABASE_URL points the app at a local PostgreSQL (see scripts/db-setup.mjs).
// The adapter mimics the supabase-js subset the services use and runs queries as the `anon` role.
const localAnon = createLocalClient('anon') as unknown as SupabaseClient | null;

export const isSupabaseConfigured = isLocalDbConfigured || Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co'
);

let supabaseInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        fetch: (url, options: RequestInit = {}) => {
          // Add a 2.5s timeout so unreachable/slow endpoints never freeze the server
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2500);
          return fetch(url, {
            ...options,
            signal: options.signal || controller.signal
          }).finally(() => clearTimeout(timeoutId));
        }
      }
    });
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
  }
}

export const supabase: SupabaseClient | null = localAnon ?? supabaseInstance;
