import { NextRequest, NextResponse } from 'next/server';
import { HealthcareService } from '@/lib/services/healthcare.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upazila = searchParams.get('upazila') || 'all';
    const category = searchParams.get('category') || 'all';
    const ownership = searchParams.get('ownership') || 'all';
    const query = searchParams.get('q') || '';
    const emergencyOnly = searchParams.get('emergency') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '24', 10);
    const slug = searchParams.get('slug');

    if (slug) {
      const facility = HealthcareService.getFacilityBySlug(slug);
      if (!facility) {
        return NextResponse.json({ success: false, error: 'Facility not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: facility });
    }

    const result = HealthcareService.getFacilities({
      upazila,
      category,
      ownership,
      query,
      emergencyOnly,
      page,
      limit
    });

    return NextResponse.json({
      success: true,
      data: result.facilities,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      upazilas: result.upazilas,
      categories: result.categories
    });
  } catch (err: any) {
    console.error('Healthcare API Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
