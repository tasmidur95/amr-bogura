import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';
import { getSessionUser } from '@/lib/services/community-session';

const UNAUTH = { success: false, error: 'অবদান রাখতে অনুগ্রহ করে লগইন করুন।' };

export async function GET(req: NextRequest) {
  try {
    // Only a logged-in member can list contributions, and only their own.
    const user = await getSessionUser(req);
    if (!user) return NextResponse.json(UNAUTH, { status: 401 });

    const result = await DistrictService.getContributorSubmissions(user.phone);
    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'অবদান তথ্য লোড ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser(req);
    if (!user) return NextResponse.json(UNAUTH, { status: 401 });

    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'type এবং data আবশ্যক' },
        { status: 400 }
      );
    }

    // Contributor identity always comes from the logged-in account, never from the request body.
    if (data && typeof data === 'object') {
      data.contributorName = user.name;
      data.contributorPhone = user.phone;
    }

    if (type === 'spot') {
      const {
        title,
        enTitle,
        category,
        categoryBn,
        location,
        upazila,
        tag,
        coverImage,
        gallery,
        shortDesc,
        history,
        architecture,
        howToReach,
        highlights,
        timings,
        entryFee,
        bestTime,
        mapCoordinates,
        mapUrl,
        contributorName,
        contributorPhone,
        contributorEmail,
        contributorNote
      } = data;

      if (!title || !location || !upazila || !shortDesc || !contributorName) {
        return NextResponse.json(
          { success: false, error: 'স্থানটির নাম, অবস্থান, উপজেলা, বিবরণ ও আপনার নাম আবশ্যক' },
          { status: 400 }
        );
      }

      const created = await DistrictService.createExploreSpot({
        title,
        enTitle: enTitle || title,
        category: category || 'heritage',
        categoryBn: categoryBn || 'ঐতিহ্য ও প্রত্নতত্ত্ব',
        location,
        upazila,
        tag: tag || 'নাগরিক প্রস্তাবিত স্থান',
        coverImage: coverImage || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
        gallery: gallery && gallery.length > 0 ? gallery : [coverImage || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'],
        shortDesc,
        history: history || shortDesc,
        architecture: architecture || 'ঐতিহাসিক স্থাপত্য',
        howToReach: howToReach || 'বগুড়া শহর থেকে বাস বা সিএনজি যোগে পৌঁছানো যায়।',
        highlights: highlights && highlights.length > 0 ? highlights : [title, location],
        timings: timings || 'উন্মুক্ত',
        entryFee: entryFee || 'বিনামূল্যে',
        bestTime: bestTime || 'সারা বছর',
        mapCoordinates: mapCoordinates || '',
        mapUrl: mapUrl || `https://maps.google.com/?q=${encodeURIComponent(title + ', বগুড়া')}`,
        contributor: {
          name: contributorName,
          phone: contributorPhone,
          email: contributorEmail,
          date: new Date().toISOString().split('T')[0],
          note: contributorNote
        },
        autoApprove: false, // Goes straight into pending moderation queue
        status: 'pending'
      });

      return NextResponse.json({
        success: true,
        message: 'আপনার প্রস্তাবিত দর্শনীয় স্থানটি সফলভাবে জমা হয়েছে। মডারেটরের অনুমোদনের পর তা ওয়েবসাইটে প্রকাশিত হবে।',
        data: created
      });
    }

    if (type === 'community' || type === 'blood') {
      const {
        category,
        name,
        group,
        role,
        badge,
        upazila,
        detail,
        phone,
        contributorName,
        contributorPhone
      } = data;

      if (!category || !name || !upazila || !detail || !phone) {
        return NextResponse.json(
          { success: false, error: 'ক্যাটাগরি, শিরোনাম/নাম, উপজেলা, বিবরণ ও ফোন নম্বর আবশ্যক' },
          { status: 400 }
        );
      }

      const created = await DistrictService.createCommunityPost({
        category,
        name,
        group,
        role,
        badge,
        upazila,
        detail,
        phone,
        contributorName: contributorName || name,
        contributorPhone: contributorPhone || phone,
        autoApprove: false
      });

      return NextResponse.json({
        success: true,
        message: 'আপনার কমিউনিটি এন্ট্রিটি সফলভাবে জমা হয়েছে। মডারেটরের অনুমোদনের পর তা প্রদর্শিত হবে।',
        data: created
      });
    }

    return NextResponse.json(
      { success: false, error: 'অবৈধ অবদান টাইপ' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'অবদান জমা দেওয়া যায়নি' },
      { status: 500 }
    );
  }
}

