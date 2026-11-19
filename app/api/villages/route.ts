import { NextResponse } from 'next/server';
import { searchVillages, districtSummaryStats } from '@/lib/data/unions-villages-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        stats: districtSummaryStats,
        message: 'Pass ?q=village_name to search villages across Bogura',
        data: [],
      });
    }

    const results = searchVillages(query);
    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to search villages' },
      { status: 500 }
    );
  }
}

