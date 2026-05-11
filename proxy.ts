import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const role = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const isPublicPage = pathname === '/' || pathname === '/login';

  if (!session) {
    if (!isPublicPage) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

    if (pathname.startsWith('/admin') && role !== 'admin') {
    url.pathname = '/kostin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};