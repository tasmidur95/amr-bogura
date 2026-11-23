import { NextRequest, NextResponse } from 'next/server';
import { CommunityAuthService } from '@/lib/services/community-auth.service';
import { DistrictService } from '@/lib/services/district.service';
import { clearSessionCookie, getSessionUser, setSessionCookie } from '@/lib/services/community-session';

export const dynamic = 'force-dynamic';

// ---- Basic brute-force protection: 8 failed logins / 10 min per (ip + username) ----------------
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 8;

function limiterKey(req: NextRequest, username: string) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  return `${ip}|${username.toLowerCase().trim()}`;
}
function isLimited(key: string) {
  const a = attempts.get(key);
  if (!a) return false;
  if (Date.now() - a.first > WINDOW_MS) { attempts.delete(key); return false; }
  return a.count >= MAX_FAILS;
}
function recordFail(key: string) {
  const a = attempts.get(key);
  if (!a || Date.now() - a.first > WINDOW_MS) attempts.set(key, { count: 1, first: Date.now() });
  else a.count++;
}

/** Contribution counters for the profile card */
async function statsFor(phone: string) {
  const { spots, community } = await DistrictService.getContributorSubmissions(phone);
  const all = [...spots, ...community] as any[];
  const st = (x: any) => x.status || (x.isApproved ? 'approved' : 'pending');
  return {
    total: all.length,
    approved: all.filter(x => st(x) === 'approved').length,
    pending: all.filter(x => st(x) === 'pending').length,
    rejected: all.filter(x => st(x) === 'rejected').length,
  };
}

function json(body: any, status = 200) {
  return NextResponse.json(body, { status });
}

/** GET: who am I? (restores the session after a page load) */
export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return json({ success: true, user: null });
  return json({ success: true, user, stats: await statsFor(user.phone) });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'register') {
      const { name, username, phone, upazila, password, bloodGroup, role } = body;
      const result = await CommunityAuthService.register({
        name: String(name ?? ''),
        username: String(username ?? ''),
        phone: String(phone ?? ''),
        upazila: String(upazila ?? ''),
        password: String(password ?? ''),
        bloodGroup,
        role,
      });
      if (!result.success || !result.user) return json({ success: false, error: result.error }, 400);

      const res = json(
        { success: true, message: 'কমিউনিটি সদস্য হিসেবে আপনার নিবন্ধন সফল হয়েছে!', user: result.user },
        201
      );
      setSessionCookie(res, result.user.id);
      return res;
    }

    if (action === 'login') {
      const username = String(body.username ?? '');
      const password = String(body.password ?? '');
      const key = limiterKey(req, username);
      if (isLimited(key)) {
        return json({ success: false, error: 'অনেকবার ভুল চেষ্টা হয়েছে। ১০ মিনিট পর আবার চেষ্টা করুন।' }, 429);
      }

      const result = await CommunityAuthService.login(username, password);
      if (!result.success || !result.user) {
        recordFail(key);
        return json({ success: false, error: result.error }, 401);
      }
      attempts.delete(key);

      const res = json({
        success: true,
        message: `স্বাগতম ${result.user.name}! সফলভাবে লগইন সম্পন্ন হয়েছে।`,
        user: result.user,
      });
      setSessionCookie(res, result.user.id);
      return res;
    }

    if (action === 'logout') {
      const res = json({ success: true });
      clearSessionCookie(res);
      return res;
    }

    return json({ success: false, error: 'অবৈধ একশন' }, 400);
  } catch (err: any) {
    return json({ success: false, error: err.message }, 500);
  }
}

/** PATCH: update the logged-in member's contributor profile */
export async function PATCH(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) return json({ success: false, error: 'অনুগ্রহ করে আগে লগইন করুন।' }, 401);

    const body = await req.json();
    const result = await CommunityAuthService.updateProfile(user.id, {
      name: typeof body.name === 'string' ? body.name : undefined,
      bio: typeof body.bio === 'string' ? body.bio : undefined,
      upazila: typeof body.upazila === 'string' ? body.upazila : undefined,
      bloodGroup: typeof body.bloodGroup === 'string' ? body.bloodGroup : undefined,
    });
    if (!result.success || !result.user) return json({ success: false, error: result.error }, 400);
    return json({ success: true, message: 'প্রোফাইল হালনাগাদ হয়েছে।', user: result.user });
  } catch (err: any) {
    return json({ success: false, error: err.message }, 500);
  }
}
