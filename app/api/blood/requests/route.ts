import { NextRequest, NextResponse } from 'next/server';
import { BloodService } from '@/lib/services/blood.service';
import { getSessionUser } from '@/lib/services/community-session';

export const dynamic = 'force-dynamic';

/** GET /api/blood/requests?upazila=&bloodGroup=   (public: published, still-open requests) */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requests = await BloodService.listRequests({
    upazila: searchParams.get('upazila') || undefined,
    bloodGroup: searchParams.get('bloodGroup') || undefined,
  });
  return NextResponse.json({ success: true, data: requests });
}

/** POST /api/blood/requests   (login required) - "someone needs blood". Goes to moderation first. */
export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ success: false, error: 'রক্তের অনুরোধ জমা দিতে অনুগ্রহ করে লগইন করুন।' }, { status: 401 });

  let body: any = {};
  try { body = await req.json(); } catch { /* validated below */ }

  const result = await BloodService.createRequest(user, {
    bloodGroup: body.bloodGroup,
    units: body.units,
    hospital: body.hospital,
    upazila: body.upazila,
    neededBy: body.neededBy,
    urgency: body.urgency,
    detail: body.detail,
    contactPhone: body.contactPhone,
  });
  if (!result.success) {
    const status = result.code === 'limit' ? 429 : result.code === 'invalid' ? 400 : 500;
    return NextResponse.json({ success: false, error: result.error }, { status });
  }
  return NextResponse.json(
    { success: true, message: 'আপনার রক্তের অনুরোধ জমা হয়েছে। দ্রুত যাচাই শেষে প্রকাশিত হবে।', data: result.data },
    { status: 201 }
  );
}
