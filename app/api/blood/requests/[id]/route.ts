import { NextRequest, NextResponse } from 'next/server';
import { BloodService } from '@/lib/services/blood.service';
import { getSessionUser } from '@/lib/services/community-session';

export const dynamic = 'force-dynamic';

/** PATCH /api/blood/requests/:id  { fulfilment: 'fulfilled' | 'cancelled' }
 *  Only the member who created the request can close it. */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ success: false, error: 'অনুগ্রহ করে লগইন করুন।' }, { status: 401 });

  let body: any = {};
  try { body = await req.json(); } catch { /* validated below */ }
  if (body.fulfilment !== 'fulfilled' && body.fulfilment !== 'cancelled') {
    return NextResponse.json({ success: false, error: 'fulfilment হবে "fulfilled" অথবা "cancelled"।' }, { status: 400 });
  }

  const result = await BloodService.setFulfilment(user, params.id, body.fulfilment);
  if (!result.success) {
    const status = result.code === 'forbidden' ? 403 : result.code === 'not_found' ? 404 : 500;
    return NextResponse.json({ success: false, error: result.error }, { status });
  }
  return NextResponse.json({ success: true, data: result.data });
}
