import { NextResponse } from 'next/server';
import { DistrictService } from '@/lib/services/district.service';

export async function GET() {
  try {
    const backup = await DistrictService.getFullBackupData();
    const jsonStr = JSON.stringify(backup, null, 2);

    return new NextResponse(jsonStr, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="amar-bogura-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'ব্যাকআপ প্রস্তুত ব্যর্থ' },
      { status: 500 }
    );
  }
}

