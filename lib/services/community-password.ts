import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

// Password hashing for community members.
// New hashes:   "scrypt$<saltHex>$<hashHex>"  (per-user random salt)
// Legacy hashes: base64("amar_bogura_salt_2026:<password>") — still accepted on login so existing
// members can sign in, then transparently upgraded to scrypt (see needsRehash).

const LEGACY_SALT = 'amar_bogura_salt_2026';
const KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, KEYLEN);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

export function isLegacyHash(stored: string): boolean {
  return !stored.startsWith('scrypt$');
}

export function verifyPassword(password: string, stored: string): boolean {
  if (isLegacyHash(stored)) {
    const legacy = Buffer.from(`${LEGACY_SALT}:${password}`).toString('base64');
    const a = Buffer.from(legacy);
    const b = Buffer.from(stored);
    return a.length === b.length && timingSafeEqual(a, b);
  }
  const [, saltHex, hashHex] = stored.split('$');
  if (!saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = scryptSync(password, Buffer.from(saltHex, 'hex'), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export const needsRehash = isLegacyHash;
