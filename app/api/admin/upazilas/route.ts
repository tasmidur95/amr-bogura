import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const detailed = await DistrictService.getDetailedUpazilas();
    const upazilas = await DistrictService.getUpazilas();
    return NextResponse.json({
      success: true,
      data: {
        upazilas,
        detailed
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'উপজেলা লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, upazila, detailed, upazilaName, union } = body;

    if (action === 'addUnion' && upazilaName && union) {
      const added = await DistrictService.addUnion(upazilaName, union);
      return NextResponse.json({
        success: true,
        message: 'ইউনিয়ন সফলভাবে যুক্ত হয়েছে',
        data: added
      });
    }

    if (upazila) {
      const created = await DistrictService.addUpazila(upazila, detailed);
      return NextResponse.json({
        success: true,
        message: 'উপজেলা সফলভাবে যুক্ত হয়েছে',
        data: created
      });
    }

    return NextResponse.json(
      { success: false, error: 'অবৈধ উপজেলা ডাটা' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'সংযোজন ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, name, updates, upazilaName, unionId } = body;

    if (action === 'updateUnion' && upazilaName && unionId) {
      const success = await DistrictService.updateUnion(upazilaName, unionId, updates);
      return NextResponse.json({ success, message: 'ইউনিয়ন আপডেট হয়েছে' });
    }

    const targetKey = id || name;
    if (!targetKey) {
      return NextResponse.json({ success: false, error: 'উপজেলা শনাক্তকারী আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.updateUpazila(targetKey, updates);
    if (!success) {
      return NextResponse.json({ success: false, error: 'উপজেলা পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'উপজেলা সফলভাবে আপডেট হয়েছে'
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'আপডেট ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const name = searchParams.get('name') || searchParams.get('id');

    if (action === 'deleteUnion') {
      const upazilaName = searchParams.get('upazila') || '';
      const unionId = searchParams.get('unionId') || '';
      const success = await DistrictService.deleteUnion(upazilaName, unionId);
      return NextResponse.json({ success, message: 'ইউনিয়ন মুছে ফেলা হয়েছে' });
    }

    if (!name) {
      return NextResponse.json({ success: false, error: 'উপজেলা নাম আবশ্যক' }, { status: 400 });
    }

    const success = await DistrictService.deleteUpazila(name);
    if (!success) {
      return NextResponse.json({ success: false, error: 'উপজেলা পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'উপজেলা সফলভাবে মুছে ফেলা হয়েছে'
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'মুছে ফেলা ব্যর্থ' },
      { status: 500 }
    );
  }
}

