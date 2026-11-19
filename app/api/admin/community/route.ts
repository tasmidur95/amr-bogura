import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const upazila = searchParams.get('upazila') || undefined;

    const list = await DistrictService.getCommunityPosts(category, upazila, undefined, true);
    return NextResponse.json({ success: true, data: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await DistrictService.createCommunityPost({
      ...body,
      autoApprove: true
    });
    return NextResponse.json({ success: true, message: 'কমিউনিটি এন্ট্রি সফলভাবে তৈরি হয়েছে', data: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'আইডি আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.updateCommunityPost(id, updates);
    if (!success) {
      return NextResponse.json({ success: false, error: 'পোস্টটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'পোস্ট সফলভাবে আপডেট হয়েছে' });
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

    const success = await DistrictService.deleteCommunityPost(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'পোস্টটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'পোস্টটি সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

