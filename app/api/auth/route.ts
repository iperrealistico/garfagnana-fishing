import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return NextResponse.json({ error: 'Server misconfiguration: ADMIN_PASSWORD not set' }, { status: 500 });
        }

        // Simple brute-force protection: 1s delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (password === adminPassword) {
            // Set session cookie
            // In a real app config, use secure, httpOnly, sameSite
            cookies().set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
