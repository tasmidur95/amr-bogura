import { NextRequest, NextResponse } from 'next/server';
import { BloodService } from '@/lib/services/blood.service';
import { getSessionUser } from '@/lib/services/community-session';

export const dynamic = 'force-dynamic';

/** GET /api/blood/donors?upazila=&bloodGroup=   (public: published donors only) */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const donors = await BloodService.listDonors({
    upazila: searchParams.get('upazila') || undefined,
    bloodGroup: searchParams.get('bloodGroup') || undefined,
  });
  return NextResponse.json({ success: true, data: donors });
}

/** POST /api/blood/donors   (login required) - list the logged-in member as a blood donor.
 *  Name, phone and upazila always come from the account, never from the request body. */
export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ success: false, error: 'রক্তদাতা হিসেবে নিবন্ধন করতে অনুগ্রহ করে লগইন করুন।' }, { status: 401 });

  let body: any = {};
  try { body = await req.json(); } catch { /* empty body is validated below */ }

  const result = await BloodService.createDonor(user, {
    bloodGroup: body.bloodGroup,
    location: body.location,
    availability: body.availability,
    lastDonated: body.lastDonated,
  });
  if (!result.success) {
    const status = result.code === 'duplicate' ? 409 : result.code === 'invalid' ? 400 : 500;
    return NextResponse.json({ success: false, error: result.error }, { status });
  }
  return NextResponse.json(
    { success: true, message: 'আপনার রক্তদাতা তথ্য জমা হয়েছে। মডারেটরের অনুমোদনের পর তালিকায় প্রকাশিত হবে।', data: result.data },
    { status: 201 }
  );
}
