import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { addViewToUser, getUserProfile } from './functions/user';
import type { UserType } from './types/user';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Auth routes (no i18n) ──────────────────────────────────────────────────
  if (pathname.startsWith('/auth')) {
    const token = request.cookies.get('auth-token');
    const user = request.cookies.get('auth-user');
    if (!!token && !!user) {
      return NextResponse.redirect(new URL('/panel', request.url));
    }
    return NextResponse.next();
  }

  // ── Panel routes (no i18n) ─────────────────────────────────────────────────
  if (pathname.startsWith('/panel')) {
    const token = request.cookies.get('auth-token');
    const user = request.cookies.get('auth-user');

    const userUpdated = await getUserProfile();

    if (!userUpdated) {
      return NextResponse.redirect(new URL('/logout', request.url));
    }

    if (!token || !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    let response = NextResponse.next();
    response.cookies.set('auth-user', JSON.stringify(userUpdated));

    if (pathname.startsWith('/panel/admin')) {
      const userString = request.cookies.get('auth-user');
      const parsedUser: UserType = JSON.parse(userString?.value || '');
      if (parsedUser.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/panel', request.url));
      }
    }

    return response;
  }

  // ── Coupon redirect (PT root and EN root) ──────────────────────────────────
  const coupon = request.nextUrl.searchParams.get('coupon');
  if (coupon && (pathname === '/' || pathname === '/en')) {
    await addViewToUser(coupon);
    const redirectTo = pathname === '/en' ? '/en' : '/';
    const nextUrl = new URL(redirectTo, request.url);
    const response = NextResponse.redirect(nextUrl);
    response.cookies.set('coupon', coupon);
    return response;
  }

  // ── i18n middleware for everything else ────────────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|images|videos|.*\\..*).*)',
  ],
};
