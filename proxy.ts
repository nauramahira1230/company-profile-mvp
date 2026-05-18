import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const role = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // FIX 1: Tambahkan '/register' (atau '/daftar') ke halaman publik agar tidak ditendang ke login
  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register';

  // 1. Jika BELUM login (tidak ada session)
  if (!session) {
    if (!isPublicPage) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2. Jika SUDAH login, tapi user biasa coba-coba masuk ke /admin
  if (pathname.startsWith('/admin') && role !== 'admin') {
    url.pathname = '/kostin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // FIX 2: Tambahkan '|images' agar folder foto publik kamu tidak dicegat oleh middleware
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};