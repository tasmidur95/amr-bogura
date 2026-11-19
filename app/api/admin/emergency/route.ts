import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET() {
  try {
    const list = await DistrictService.getEmergencyContacts();
    return NextResponse.json({ success: true, data: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, number, icon } = body;

    if (!title || !number) {
      return NextResponse.json({ success: false, error: 'শিরোনাম ও নম্বর আবশ্যক' }, { status: 400 });
    }

    const created = await DistrictService.addEmergencyContact({
      title,
      number,
      icon: icon || 'fa-phone-volume'
    });

    return NextResponse.json({ success: true, message: 'জরুরি সেবা যুক্ত হয়েছে', data: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, updates } = body;

    if (!title || !updates) {
      return NextResponse.json({ success: false, error: 'শিরোনাম ও আপডেট আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.updateEmergencyContact(title, updates);
    if (!success) {
      return NextResponse.json({ success: false, error: 'সেবাটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'জরুরি সেবা আপডেট হয়েছে' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');

    if (!title) {
      return NextResponse.json({ success: false, error: 'শিরোনাম আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.deleteEmergencyContact(title);
    if (!success) {
      return NextResponse.json({ success: false, error: 'সেবাটি পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'জরুরি সেবা মুছে ফেলা হয়েছে' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

