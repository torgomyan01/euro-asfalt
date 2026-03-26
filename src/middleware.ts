import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('ea_admin_session');
    if (session?.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
