import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const role = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Halaman yang bisa diakses publik tanpa perlu login
  const isPublicPage = pathname === '/' || pathname === '/login';

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
  // Melindungi seluruh halaman kecuali API, assets gambar, dan favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};