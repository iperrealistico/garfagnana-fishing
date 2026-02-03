import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
    try {
        const token = process.env.GITHUB_TOKEN;
        const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
        const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

        let gh_size_mb = '0';
        let blob_size_mb = '0';

        // 1. GitHub Stats
        if (token && owner && repo) {
            try {
                const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                    cache: 'no-store'
                });
                if (res.ok) {
                    const data = await res.json();
                    gh_size_mb = (data.size / 1024).toFixed(2);
                }
            } catch (e) {
                console.error('GH stats error', e);
            }
        }

        // 2. Blob Stats
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            try {
                let totalBytes = 0;
                let hasMore = true;
                let cursor;
                // Limit to one page for performance, or loop? The prompt says "best effort". 
                // Listing all might be slow if many files. Let's just list first 1000.
                const { blobs } = await list({ limit: 1000, token: process.env.BLOB_READ_WRITE_TOKEN });
                blobs.forEach(b => totalBytes += b.size);
                blob_size_mb = (totalBytes / (1024 * 1024)).toFixed(2);
            } catch (e) {
                console.error('Blob stats error', e);
            }
        }

        return NextResponse.json({
            gh_size_mb,
            blob_size_mb,
            size_mb: gh_size_mb // Backwards compat
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

