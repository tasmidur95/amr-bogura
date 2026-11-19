import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'blood';
    const upazila = searchParams.get('upazila') || 'ALL';
    const bloodGroup = searchParams.get('bloodGroup') || 'ALL';

    const posts = await DistrictService.getCommunityPosts(category, upazila, bloodGroup);
    return NextResponse.json({ success: true, data: posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, name, group, role, badge, upazila, detail, phone } = body;

    if (!category || !name || !upazila || !detail || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPost = await DistrictService.createCommunityPost({
      category,
      name,
      group,
      role,
      badge,
      upazila,
      detail,
      phone
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
