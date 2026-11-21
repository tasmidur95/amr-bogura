import { NextRequest, NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const diagnostics = await DistrictService.getSystemDiagnostics();
    return NextResponse.json({
      success: true,
      data: diagnostics
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'ডায়াগনস্টিক তথ্য লোড ব্যর্থ' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { settings, action, details } = body;

    if (settings) {
      const updated = await DistrictService.updateSystemSettings(settings);
      if (action) {
        DistrictService.addAuditLog('SETTINGS_CHANGE', 'AdminConsole', details || 'সেটিংস পরিবর্তিত হয়েছে', 'info');
      }
      return NextResponse.json({
        success: true,
        message: 'সিস্টেম সেটিংস সফলভাবে আপডেট হয়েছে',
        data: updated
      });
    }

    return NextResponse.json(
      { success: false, error: 'সেটিংস ডাটা পাওয়া যায়নি' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'সেটিংস আপডেট ব্যর্থ' },
      { status: 500 }
    );
  }
}

