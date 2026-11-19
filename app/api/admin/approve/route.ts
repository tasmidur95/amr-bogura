import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, id, action, reason, updates } = body;

    if (!type || !id || !action) {
      return NextResponse.json(
        { success: false, error: 'type, id এবং action ফিল্ড আবশ্যক' },
        { status: 400 }
      );
    }

    if (!['spot', 'community', 'review'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'অবৈধ সাবমিশন টাইপ' },
        { status: 400 }
      );
    }

    let result = false;
    let message = '';

    if (action === 'approve') {
      result = await DistrictService.approveSubmission(type, id);
      message = 'সফলভাবে অনুমোদন করা হয়েছে এবং ওয়েবসাইটে প্রকাশিত হয়েছে।';
    } else if (action === 'reject') {
      result = await DistrictService.rejectSubmission(type, id, reason);
      message = 'সাবমিশনটি বাতিল করা হয়েছে এবং ফিডব্যাক সংরক্ষণ করা হয়েছে।';
    } else if (action === 'delete') {
      result = await DistrictService.deleteSubmission(type, id);
      message = 'সাবমিশনটি সফলভাবে মুছে ফেলা হয়েছে।';
    } else if (action === 'update' && updates) {
      result = await DistrictService.updateSubmission(type as 'spot' | 'community', id, updates);
      message = 'সাবমিশনের তথ্য সফলভাবে আপডেট করা হয়েছে।';
    } else {
      return NextResponse.json(
        { success: false, error: 'অবৈধ একশন অনুরোধ' },
        { status: 400 }
      );
    }

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'অনুরোধ কার্যকর করা যায়নি বা আইটেমটি পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message,
      id,
      action
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'একশন প্রক্রিয়া ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

