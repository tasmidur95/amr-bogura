import { NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET() {
  try {
    const content = await DistrictService.getSiteContent();
    return NextResponse.json({ success: true, data: content });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'কন্টেন্ট লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

