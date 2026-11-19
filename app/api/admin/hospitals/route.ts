import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || undefined;
    const q = searchParams.get('q') || undefined;

    const list = await DistrictService.getHospitals(type, q);
    return NextResponse.json({ success: true, data: list });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'হাসপাতাল তথ্য লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, enName, type, typeLabel, address, phone, emergency, id } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { success: false, error: 'হাসপাতালের নাম, ঠিকানা ও ফোন নম্বর আবশ্যক' },
        { status: 400 }
      );
    }

    const created = await DistrictService.addHospital({
      id,
      name,
      enName: enName || name,
      type: type || 'private',
      typeLabel: typeLabel || (type === 'govt' ? 'সরকারি হাসপাতাল' : 'বেসরকারি হাসপাতাল'),
      address,
      phone,
      emergency: emergency || phone
    });

    return NextResponse.json({
      success: true,
      message: 'হাসপাতালটি সফলভাবে যুক্ত হয়েছে',
      data: created
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'হাসপাতাল সংযোজন ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || searchParams.get('name') || '';

    if (!id) {
      return NextResponse.json({ success: false, error: 'আইডি আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.deleteHospital(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'হাসপাতাল খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'হাসপাতাল সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'মুছে ফেলা ব্যর্থ' },
      { status: 500 }
    );
  }
}
