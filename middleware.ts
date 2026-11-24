import { NextRequest, NextResponse } from 'next/server';

// The language is NOT part of the URL (it lives in localStorage). Old /bn/… and /en/… links
// are redirected to the same page without the prefix.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const m = pathname.match(/^\/(bn|en)(\/.*)?$/);
  if (!m) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = m[2] || '/';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
};
