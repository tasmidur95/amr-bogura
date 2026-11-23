// Deterministic ("pre-generated") UUIDs for seeded rows.
//
// uuidOf(table, legacyId) mirrors the SQL function public.uuid_of() from
// supabase/migrations/20261123000200_uuid_primary_keys.sql:
//   - a value that already looks like a UUID is returned unchanged
//   - otherwise UUIDv5(NAMESPACE, "<table>:<legacyId>")
//
// So the seed files, the migration of existing data and the JSON datasets all agree on the
// same id for the same row, on every machine, every run.
//
// NEVER change NAMESPACE: it would change every seeded id.
import { createHash } from 'node:crypto';

export const NAMESPACE = 'a3f7c1d2-5b8e-4c9a-9d41-7e2b6f0c8a15';
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function uuidv5(name, namespace = NAMESPACE) {
  const ns = Buffer.from(namespace.replace(/-/g, ''), 'hex');
  const h = createHash('sha1').update(ns).update(Buffer.from(name, 'utf8')).digest();
  h[6] = (h[6] & 0x0f) | 0x50; // version 5
  h[8] = (h[8] & 0x3f) | 0x80; // RFC 4122 variant
  const x = h.subarray(0, 16).toString('hex');
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20, 32)}`;
}

export const isUuid = v => typeof v === 'string' && UUID_RE.test(v);

export function uuidOf(table, legacyId) {
  const s = String(legacyId);
  return isUuid(s) ? s.toLowerCase() : uuidv5(`${table}:${s}`);
}
