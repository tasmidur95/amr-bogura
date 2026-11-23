import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';
import { BloodService } from '@/lib/services/blood.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); // null = every category (community page)
    const upazila = searchParams.get('upazila') || 'ALL';
    const bloodGroup = searchParams.get('bloodGroup') || 'ALL';

    // Blood is no longer a community post: donors and requests are separate records,
    // merged here only so the existing blood tab keeps working.
    let posts;
    if (category === 'blood') {
      posts = await BloodService.feed({ upazila, bloodGroup });
    } else if (category) {
      posts = await DistrictService.getCommunityPosts(category, upazila, bloodGroup);
    } else {
      const rest = await Promise.all(
        ['tuition', 'rent', 'jobs', 'business'].map(c => DistrictService.getCommunityPosts(c, upazila, bloodGroup))
      );
      posts = [...(await BloodService.feed({ upazila, bloodGroup })), ...rest.flat()];
    }
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

    if (category === 'blood') {
      return NextResponse.json(
        { success: false, error: 'রক্তদাতা নিবন্ধন ও রক্তের অনুরোধ আলাদা: POST /api/blood/donors অথবা /api/blood/requests ব্যবহার করুন (লগইন আবশ্যক)।' },
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

