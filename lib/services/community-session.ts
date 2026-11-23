import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { CommunityAuthService, CommunityUser } from '@/lib/services/community-auth.service';

// Stateless signed session stored in an httpOnly cookie.
// Token format: base64url(JSON{uid,exp}) + "." + base64url(HMAC-SHA256)

export const SESSION_COOKIE = 'amar_bogura_session';
const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const s = process.env.COMMUNITY_AUTH_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('COMMUNITY_AUTH_SECRET must be set (16+ chars) in production');
  }
  return 'dev-only-insecure-secret-change-me';
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url');

function sign(payload: string): string {
  return b64(createHmac('sha256', secret()).update(payload).digest());
}

export function createSessionToken(userId: string): string {
  const payload = b64(JSON.stringify({ uid: userId, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC }));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig), e = Buffer.from(expected);
  if (a.length !== e.length || !timingSafeEqual(a, e)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof uid !== 'string' || typeof exp !== 'number' || exp < Date.now() / 1000) return null;
    return uid;
  } catch {
    return null;
  }
}

export function setSessionCookie(res: NextResponse, userId: string) {
  res.cookies.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SEC,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
}

/** Returns the logged-in community user for this request, or null. */
export async function getSessionUser(req: NextRequest): Promise<CommunityUser | null> {
  const uid = verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!uid) return null;
  return CommunityAuthService.getUserById(uid);
}
