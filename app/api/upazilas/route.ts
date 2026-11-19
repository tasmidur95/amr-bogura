import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || undefined;
    const filter = searchParams.get('filter') || undefined;

    const upazilas = await DistrictService.getUpazilas(query, filter);
    return NextResponse.json({ success: true, data: upazilas });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
