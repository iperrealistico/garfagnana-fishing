import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const token = process.env.GITHUB_TOKEN;
        const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
        const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

        if (!token || !owner || !repo) {
            // Return dummy data if not configured
            return NextResponse.json({ size: 0, usage: 'Config missing' });
        }

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch repo info');

        const data = await res.json();
        // data.size is in KB
        return NextResponse.json({
            size_kb: data.size,
            size_mb: (data.size / 1024).toFixed(2)
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
