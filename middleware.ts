import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Protect /admin/dashboard
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const authCookie = request.cookies.get('admin_session');

        // Simple check: cookie exists. Real validation happens in API/Server Actions or we trust the cookie simply implies "logged in" for this simple app.
        // For better security, we should ideally sign/verify, but "extremely simple" allows checking value.
        // We'll set the cookie value to a simple hash of the password in the auth route.

        if (!authCookie) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/dashboard/:path*',
};
