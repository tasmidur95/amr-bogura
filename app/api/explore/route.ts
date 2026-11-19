import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q') || undefined;
    const includePending = searchParams.get('includePending') === 'true';

    const spots = await DistrictService.getDetailedExploreSpots(category, query, includePending);
    return NextResponse.json({ success: true, data: spots });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
      contributorNote,
      autoApprove
    } = body;

    if (!title || !location || !upazila || !shortDesc || !contributorName) {
      return NextResponse.json(
        { success: false, error: 'শিরোনাম, অবস্থান, উপজেলা, সংক্ষিপ্ত বিবরণ ও অবদানকারীর নাম আবশ্যক।' },
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
      tag: tag || 'নাগরিক অবদান',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
      gallery: gallery || [],
      shortDesc,
      history: history || shortDesc,
      architecture: architecture || '',
      howToReach: howToReach || 'বগুড়া শহর থেকে বাস বা সিএনজি যোগে যাওয়া যায়।',
      highlights: highlights || [title],
      timings: timings || 'উন্মুক্ত',
      entryFee: entryFee || 'বিনামূল্যে',
      bestTime: bestTime || 'সারা বছর',
      mapCoordinates: mapCoordinates || '',
      mapUrl: mapUrl || `https://maps.google.com/?q=${encodeURIComponent(title + ', ' + upazila + ', বগুড়া')}`,
      contributor: {
        name: contributorName,
        phone: contributorPhone,
        email: contributorEmail,
        date: '২০২৬',
        note: contributorNote
      },
      autoApprove: autoApprove ?? true
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

