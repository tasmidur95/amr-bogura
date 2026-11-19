import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const spot = await DistrictService.getDetailedExploreSpotById(params.id);
    if (!spot) {
      return NextResponse.json({ success: false, error: 'স্থানটি পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: spot });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH - Accept / Approve a contributor's tourist spot
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await DistrictService.acceptExploreSpot(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'স্থানটি অনুমোদন করা যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'স্থানটি সফলভাবে অনুমোদিত হয়েছে।' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
