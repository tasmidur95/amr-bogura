import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET() {
  try {
    const spots = await DistrictService.getDetailedExploreSpots(undefined, undefined, true);
    return NextResponse.json({ success: true, data: spots });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await DistrictService.createExploreSpot({
      ...body,
      autoApprove: true,
      status: 'approved'
    });
    return NextResponse.json({ success: true, message: 'স্থানটি তৈরি ও লাইভ হয়েছে', data: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'স্থান আইডি আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.updateExploreSpot(id, updates);
    if (!success) {
      return NextResponse.json({ success: false, error: 'স্থানটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'স্থানের তথ্য সফলভাবে আপডেট হয়েছে' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'আইডি আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.deleteExploreSpot(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'স্থানটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'স্থানটি সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

