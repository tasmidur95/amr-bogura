import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await DistrictService.updateSiteContent(body);
    return NextResponse.json({
      success: true,
      message: 'ওয়েবসাইট কন্টেন্ট সফলভাবে আপডেট হয়েছে',
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'কন্টেন্ট আপডেট ব্যর্থ' },
      { status: 500 }
    );
  }
}

