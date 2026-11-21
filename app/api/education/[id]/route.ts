import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, error: 'আইডি আবশ্যক' }, { status: 400 });
    }

    const institute = await DistrictService.getEducationalInstituteById(id);
    if (!institute) {
      return NextResponse.json({ success: false, error: 'প্রতিষ্ঠানটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: institute
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'প্রতিষ্ঠান প্রোফাইল লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

