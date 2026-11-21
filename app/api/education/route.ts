import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const upazila = searchParams.get('upazila') || undefined;
    const search = searchParams.get('q') || searchParams.get('search') || undefined;
    const sort = (searchParams.get('sort') || 'rank') as 'rank' | 'gpa5' | 'name' | 'established';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const result = await DistrictService.getEducationalInstitutes({
      category,
      upazila,
      search,
      sort,
      page,
      limit
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'শিক্ষা প্রতিষ্ঠান তথ্য লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

