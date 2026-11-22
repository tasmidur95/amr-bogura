import { NextRequest, NextResponse } from 'next/server';
import { CommunityAuthService } from '@/lib/services/community-auth.service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'register') {
      const { name, username, phone, upazila, password, bloodGroup, role } = body;
      const result = await CommunityAuthService.register({
        name,
        username,
        phone,
        upazila,
        password,
        bloodGroup,
        role,
      });

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }

      return NextResponse.json(
        {
          success: true,
          message: 'কমিউনিটি সদস্য হিসেবে আপনার নিবন্ধন সফল হয়েছে!',
          user: result.user,
          token: result.token,
        },
        { status: 201 }
      );
    }

    if (action === 'login') {
      const { username, password } = body;
      const result = await CommunityAuthService.login(username, password);

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        message: `স্বাগতম ${result.user?.name}! সফলভাবে লগইন সম্পন্ন হয়েছে।`,
        user: result.user,
        token: result.token,
      });
    }

    return NextResponse.json(
      { success: false, error: 'অবৈধ একশন (Action must be "register" or "login")' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

