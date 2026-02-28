import { NextRequest, NextResponse } from 'next/server';
import { addViewToUser, getUserProfile } from './functions/user';
import type { UserType } from './types/user';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.url.includes('/auth')) {
    const token = request.cookies.get('auth-token');
    const user = request.cookies.get('auth-user');

    if (!!token && !!user) {
      return NextResponse.redirect(new URL('/panel', request.url));
    }
  }

  if (
    !!request.nextUrl.searchParams.get('coupon') &&
    request.nextUrl.pathname === '/'
  ) {
    const coupon = request.nextUrl.searchParams.get('coupon');

    if (!!coupon) {
      await addViewToUser(coupon);

      let nextUrl = request.nextUrl;
      nextUrl.searchParams.delete('coupon');

      const response = NextResponse.redirect(new URL('/', nextUrl));

      response.cookies.set('coupon', coupon);

      return response;
    }
  }

  if (request.url.includes('/panel')) {
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

    if (request.url.includes('/panel/admin')) {
      const userString = request.cookies.get('auth-user');

      const user: UserType = JSON.parse(userString?.value || '');

      if (user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/panel', request.url));
      }
    }

    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/panel/:path*', '/panel/admin/:path*', '/auth/:path*', '/'],
};
