import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('q') || undefined;
    const upazila = searchParams.get('upazila') || undefined;

    const data = await DistrictService.getAllAdminSubmissions({
      type,
      status,
      search,
      upazila
    });

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'সাবমিশন লোড করতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

