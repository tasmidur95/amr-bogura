import { NextRequest, NextResponse } from 'next/server';
import { BankingService } from '@/lib/services/banking.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || searchParams.get('tab') || 'all';
    const upazila = searchParams.get('upazila') || 'ALL';
    const q = searchParams.get('q') || '';

    const data = BankingService.filterData({
      type,
      upazila,
      q,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'ব্যাংকিং তথ্য লোড করতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

