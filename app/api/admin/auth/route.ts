import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'bogura2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passkey } = body;

    if (!passkey) {
      return NextResponse.json(
        { success: false, error: 'পাসকি (Passkey) প্রদান করুন।' },
        { status: 400 }
      );
    }

    if (passkey.trim() === DEFAULT_ADMIN_PASSKEY) {
      return NextResponse.json({
        success: true,
        message: 'সফলভাবে অ্যাডমিন প্যানেলে লগইন সম্পন্ন হয়েছে।',
        token: 'amar_bogura_admin_session_token_2026',
        user: {
          role: 'superadmin',
          district: 'বগুড়া',
          division: 'রাজশাহী',
          authorizedAt: new Date().toISOString()
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'ভুল পাসকি! সঠিক অ্যাডমিন কোড প্রদান করুন।' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'অথেনটিকেশন ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}
