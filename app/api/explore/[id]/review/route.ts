import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { author, rating, comment, location } = body;

    if (!author || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'নাম, রেটিং এবং মন্তব্য আবশ্যক।' },
        { status: 400 }
      );
    }

    const review = await DistrictService.addSpotReview(params.id, {
      author,
      rating: Number(rating),
      comment,
      location
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

