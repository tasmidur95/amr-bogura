import { NextRequest, NextResponse } from 'next/server';
import {
  upazilasData,
  hospitalsData,
  exploreData,
  emergencyData
} from '@/lib/data/district-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim().toLowerCase();

    if (!q) {
      return NextResponse.json({ success: true, data: [] });
    }

    const results: Array<{
      type: string;
      title: string;
      sub: string;
      target: string;
      actionType: 'upazila' | 'hospital' | 'explore' | 'emergency';
      payload?: any;
    }> = [];

    // Upazilas
    upazilasData.forEach((u, idx) => {
      if (
        u.name.toLowerCase().includes(q) ||
        u.enName.toLowerCase().includes(q) ||
        u.landmark.toLowerCase().includes(q) ||
        u.unionList.some(un => un.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'উপজেলা',
          title: `${u.serialBn}. ${u.name} (${u.enName})`,
          sub: `${u.area} · ${u.unions}`,
          target: `/upazilas/${idx}`,
          actionType: 'upazila',
          payload: idx
        });
      }
    });

    // Hospitals
    hospitalsData.forEach(h => {
      if (
        h.name.toLowerCase().includes(q) ||
        h.enName.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'হাসপাতাল',
          title: h.name,
          sub: `${h.address} · ${h.phone}`,
          target: '#healthcare',
          actionType: 'hospital'
        });
      }
    });

    // Explore
    exploreData.forEach(e => {
      if (
        e.title.toLowerCase().includes(q) ||
        e.enTitle.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'দর্শনীয় স্থান',
          title: e.title,
          sub: e.location,
          target: '#explore',
          actionType: 'explore'
        });
      }
    });

    // Emergency
    emergencyData.forEach(em => {
      if (em.title.toLowerCase().includes(q) || em.number.includes(q)) {
        results.push({
          type: 'জরুরি নম্বর',
          title: em.title,
          sub: em.number,
          target: `tel:${em.number}`,
          actionType: 'emergency',
          payload: em.number
        });
      }
    });

    return NextResponse.json({ success: true, data: results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
