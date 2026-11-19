import { NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET() {
  try {
    const contacts = await DistrictService.getEmergencyContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
