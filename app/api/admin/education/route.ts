import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const upazila = searchParams.get('upazila') || undefined;
    const search = searchParams.get('q') || undefined;
    const sort = (searchParams.get('sort') || 'rank') as 'rank' | 'gpa5' | 'name' | 'established';

    // Admin register can fetch all (e.g. limit 1000)
    const result = await DistrictService.getEducationalInstitutes({
      category,
      upazila,
      search,
      sort,
      page: 1,
      limit: 1000
    });

    return NextResponse.json({
      success: true,
      data: result.institutes
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'শিক্ষা প্রতিষ্ঠান তালিকা লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, upazila } = body;

    if (!name || !upazila) {
      return NextResponse.json(
        { success: false, error: 'প্রতিষ্ঠানের নাম ও উপজেলা আবশ্যক' },
        { status: 400 }
      );
    }

    const created = await DistrictService.createEducationalInstitute(body);
    return NextResponse.json({
      success: true,
      message: 'শিক্ষা প্রতিষ্ঠান সফলভাবে যোগ করা হয়েছে',
      data: created
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'সংরক্ষণ ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { success: false, error: 'id এবং updates ফিল্ড আবশ্যক' },
        { status: 400 }
      );
    }

    const updated = await DistrictService.updateEducationalInstitute(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'প্রতিষ্ঠানটি খুঁজে পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'প্রতিষ্ঠানটির তথ্য সফলভাবে আপডেট করা হয়েছে'
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'আপডেট ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'id আবশ্যক' },
        { status: 400 }
      );
    }

    const deleted = await DistrictService.deleteEducationalInstitute(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'প্রতিষ্ঠানটি খুঁজে পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'প্রতিষ্ঠানটি সফলভাবে মুছে ফেলা হয়েছে'
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'মুছে ফেলতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

