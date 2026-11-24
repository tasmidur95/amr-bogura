import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all'; // all, hub, bus, train, rental
    const q = (searchParams.get('q') || '').toLowerCase().trim();

    const data = DistrictService.getTransportData();
    let hubs = data.transport_hubs || [];
    let services = data.transport_services || [];

    if (q) {
      hubs = hubs.filter((h: any) =>
        h.name_en?.toLowerCase().includes(q) ||
        h.name?.includes(q) ||
        h.location?.toLowerCase().includes(q) ||
        h.upazila?.includes(q) ||
        h.connected_routes?.some((r: string) => r.toLowerCase().includes(q))
      );
      services = services.filter((s: any) =>
        s.operator_name_en?.toLowerCase().includes(q) ||
        s.operator_name?.includes(q) ||
        s.major_routes?.some((r: string) => r.toLowerCase().includes(q)) ||
        s.counters_in_bogura?.some((c: any) =>
          c.counter_name?.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q)
        )
      );
    }

    let filteredHubs = hubs;
    let filteredServices = services;

    if (type === 'hub') {
      filteredServices = [];
    } else if (type === 'bus') {
      filteredHubs = [];
      filteredServices = services.filter((s: any) => s.service_type === 'intercity_bus');
    } else if (type === 'train') {
      filteredHubs = [];
      filteredServices = services.filter((s: any) => s.service_type === 'intercity_express_train');
    } else if (type === 'rental') {
      filteredHubs = [];
      filteredServices = services.filter((s: any) => s.service_type === 'rent_a_car');
    }

    return NextResponse.json({
      success: true,
      data: {
        meta: data.meta || {},
        transport_hubs: filteredHubs,
        transport_services: filteredServices,
        totalHubs: hubs.length,
        totalServices: services.length,
        total: filteredHubs.length + filteredServices.length
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

