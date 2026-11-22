import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'all';
    const q = (searchParams.get('q') || '').toLowerCase().trim();

    const data = DistrictService.getHospitalityData();
    let hotels = data.hotels_and_resorts || [];
    let restaurants = data.restaurants_and_doi || [];

    if (q) {
      hotels = hotels.filter((h: any) =>
        h.name?.toLowerCase().includes(q) ||
        h.location?.toLowerCase().includes(q) ||
        h.facilities?.some((f: string) => f.toLowerCase().includes(q))
      );
      restaurants = restaurants.filter((r: any) =>
        r.name?.toLowerCase().includes(q) ||
        r.location?.toLowerCase().includes(q) ||
        r.facilities?.some((f: string) => f.toLowerCase().includes(q)) ||
        r.specialties?.some((s: string) => s.toLowerCase().includes(q))
      );
    }

    const filteredHotels = category === 'restaurant' ? [] : hotels;
    const filteredRestaurants = category === 'hotel' ? [] : restaurants;

    return NextResponse.json({
      success: true,
      data: {
        hotels_and_resorts: filteredHotels,
        restaurants_and_doi: filteredRestaurants,
        totalHotels: hotels.length,
        totalRestaurants: restaurants.length,
        total: filteredHotels.length + filteredRestaurants.length
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

