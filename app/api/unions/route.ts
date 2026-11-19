import { NextResponse } from 'next/server';
import { boguraUpazilasData, getAllUnions } from '@/lib/data/unions-villages-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const upazila = searchParams.get('upazila');

    if (upazila) {
      const upz = boguraUpazilasData.find(
        u => u.id.toLowerCase() === upazila.toLowerCase() || u.name.includes(upazila)
      );
      if (!upz) {
        return NextResponse.json({ success: false, error: 'Upazila not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        upazila: upz.name,
        unionCount: upz.unions.length,
        data: upz.unions,
      });
    }

    const allUnions = getAllUnions();
    return NextResponse.json({
      success: true,
      totalUnions: allUnions.length,
      data: allUnions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch unions' },
      { status: 500 }
    );
  }
}

