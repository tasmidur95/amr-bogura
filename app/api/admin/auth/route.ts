import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSKEY || 'bogura2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, passkey } = body;

    // Backward-compat for single passkey if username is omitted
    const effectiveUsername = (username || '').trim();
    const effectivePassword = (password !== undefined ? password : (passkey || '')).trim();

    if (!effectiveUsername && !passkey) {
      return NextResponse.json(
        { success: false, error: 'ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।' },
        { status: 400 }
      );
    }

    if (effectiveUsername) {
      // Validate username against allowed admin handles
      const validUsernames = [
        DEFAULT_ADMIN_USERNAME.toLowerCase(),
        'superadmin',
        'admin',
      ];
      if (!validUsernames.includes(effectiveUsername.toLowerCase())) {
        return NextResponse.json(
          { success: false, error: 'ভুল ইউজারনেম! সঠিক অ্যাডমিন ইউজারনেম দিন (যেমন: admin)।' },
          { status: 401 }
        );
      }
    }

    // Validate password / passkey
    if (!effectivePassword) {
      return NextResponse.json(
        { success: false, error: 'পাসওয়ার্ড প্রদান করুন।' },
        { status: 400 }
      );
    }

    if (effectivePassword === DEFAULT_ADMIN_PASSWORD) {
      const activeUser = effectiveUsername || 'admin';
      return NextResponse.json({
        success: true,
        message: 'সফলভাবে অ্যাডমিন প্যানেলে লগইন সম্পন্ন হয়েছে।',
        token: 'amar_bogura_admin_session_token_2026',
        user: {
          username: activeUser,
          role: 'superadmin',
          district: 'বগুড়া',
          division: 'রাজশাহী',
          authorizedAt: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'ভুল পাসওয়ার্ড! সঠিক অ্যাডমিন পাসওয়ার্ড প্রদান করুন।' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'অথেনটিকেশন ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}
