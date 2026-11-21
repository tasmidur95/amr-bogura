import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const action = (searchParams.get('action') || 'approve').toLowerCase();
    const type = searchParams.get('type') || undefined;

    if (!id) {
      return NextResponse.json({
        success: true,
        message: 'Moderation Approve API Ready. Use POST with { id, type, action: "approve" | "reject" | "delete" }'
      });
    }

    let detectedType = type;
    if (!detectedType) {
      detectedType = (await DistrictService.detectSubmissionType(id)) || 'spot';
    }

    let result = false;
    if (action === 'approve') {
      result = await DistrictService.approveSubmission(detectedType, id);
    } else if (action === 'reject') {
      result = await DistrictService.rejectSubmission(detectedType, id, 'প্রশাসনিক পর্যালোচনায় বাতিল');
    } else if (action === 'delete') {
      result = await DistrictService.deleteSubmission(detectedType, id);
    }

    if (!result) {
      return NextResponse.json({ success: false, error: 'আইটেমটি পাওয়া যায়নি বা প্রক্রিয়া ব্যর্থ' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `আইটেম ${id} সফলভাবে ${action === 'approve' ? 'অনুমোদিত' : action === 'reject' ? 'বাতিল' : 'মুছে ফেলা'} হয়েছে`,
      id,
      action
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { type, id, action, reason, updates, status } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'id ফিল্ড আবশ্যক' },
        { status: 400 }
      );
    }

    // 1. Normalize action (support status / action interchangeably)
    const rawAction = (action || status || 'approve').toString().toLowerCase().trim();
    let normalizedAction: 'approve' | 'reject' | 'delete' | 'update' = 'approve';

    if (['approve', 'approved', 'accept', 'publish'].includes(rawAction)) {
      normalizedAction = 'approve';
    } else if (['reject', 'rejected', 'decline'].includes(rawAction)) {
      normalizedAction = 'reject';
    } else if (['delete', 'deleted', 'remove'].includes(rawAction)) {
      normalizedAction = 'delete';
    } else if (['update', 'edit', 'modify'].includes(rawAction)) {
      normalizedAction = 'update';
    }

    // 2. Normalize type
    let normalizedType = (type || '').toString().toLowerCase().trim();
    if (normalizedType === 'spots') normalizedType = 'spot';
    if (['blood', 'tuition', 'rent', 'jobs', 'business', 'community_posts', 'community_post'].includes(normalizedType)) {
      normalizedType = 'community';
    }
    if (normalizedType === 'reviews') normalizedType = 'review';

    // 3. Auto-detect type if not provided or invalid
    if (!normalizedType || !['spot', 'community', 'review'].includes(normalizedType)) {
      normalizedType = (await DistrictService.detectSubmissionType(id)) || 'spot';
    }

    let result = false;
    let message = '';

    if (normalizedAction === 'approve') {
      result = await DistrictService.approveSubmission(normalizedType, id);
      message = 'সফলভাবে অনুমোদন করা হয়েছে এবং ওয়েবসাইটে প্রকাশিত হয়েছে।';
    } else if (normalizedAction === 'reject') {
      result = await DistrictService.rejectSubmission(normalizedType, id, reason);
      message = 'সাবমিশনটি বাতিল করা হয়েছে এবং ফিডব্যাক সংরক্ষণ করা হয়েছে।';
    } else if (normalizedAction === 'delete') {
      result = await DistrictService.deleteSubmission(normalizedType, id);
      message = 'সাবমিশনটি সফলভাবে মুছে ফেলা হয়েছে।';
    } else if (normalizedAction === 'update' && updates) {
      result = await DistrictService.updateSubmission(normalizedType as 'spot' | 'community', id, updates);
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
      type: normalizedType,
      action: normalizedAction
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'একশন প্রক্রিয়া ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}
