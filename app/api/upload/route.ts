import { NextResponse } from 'next/server';
import { updateGitHubFile, deleteGitHubFile } from '@/lib/github';
import { put, del } from '@vercel/blob';

// Helper to guess storage type
function isBlob(url: string) {
    return url.startsWith('http') && url.includes('.public.blob.vercel-storage.com');
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('path') as string || 'uploads';
        const oldUrl = formData.get('oldPath') as string;
        const storageMode = formData.get('storageMode') as string || 'github'; // 'github' or 'blob'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        let newUrl = '';

        // 1. UPLOAD NEW FILE
        if (storageMode === 'blob') {
            if (!process.env.BLOB_READ_WRITE_TOKEN) {
                return NextResponse.json({ error: 'Blob storage not configured (BLOB_READ_WRITE_TOKEN missing)' }, { status: 500 });
            }
            const blob = await put(`${folder}/${filename}`, file, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN
            });
            newUrl = blob.url;
        } else {
            // GitHub storage
            const buffer = Buffer.from(await file.arrayBuffer());
            const contentBase64 = buffer.toString('base64');

            const targetPath = `public/images/${folder}/${filename}`;
            const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
            const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;
            const token = process.env.GITHUB_TOKEN;

            if (!token || !owner || !repo) {
                return NextResponse.json({ error: 'GitHub storage not configured' }, { status: 500 });
            }

            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Upload ${filename}`,
                    content: contentBase64,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`GitHub Upload failed: ${res.statusText} ${err}`);
            }

            // Return relative path for GitHub so it works locally and prod
            newUrl = `/images/${folder}/${filename}`;
        }

        // 2. CLEANUP OLD FILE
        if (oldUrl && oldUrl !== 'undefined' && oldUrl !== 'null') {
            try {
                if (isBlob(oldUrl)) {
                    // It was a blob, delete from blob
                    if (process.env.BLOB_READ_WRITE_TOKEN) {
                        await del(oldUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
                        console.log('Deleted old blob:', oldUrl);
                    }
                } else {
                    // It was likely a github/local file
                    // If it starts with /images/, it's ours.
                    if (oldUrl.startsWith('/images/')) {
                        const oldPathRel = `public${oldUrl}`;
                        await deleteGitHubFile(oldPathRel, 'Delete replaced asset');
                        console.log('Deleted old GitHub file:', oldPathRel);
                    }
                }
            } catch (cleanupErr) {
                console.error('Warning: Failed to cleanup old file:', oldUrl, cleanupErr);
                // Don't fail the request, just log it. "Best effort" cleanup.
            }
        }

        return NextResponse.json({ url: newUrl });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { url } = await request.json();
        if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

        if (isBlob(url)) {
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
                return NextResponse.json({ success: true, method: 'blob' });
            } else {
                return NextResponse.json({ error: 'Blob token missing' }, { status: 500 });
            }
        } else {
            // Assume GitHub
            if (url.startsWith('/images/')) {
                const targetPath = `public${url}`;
                await deleteGitHubFile(targetPath, 'Delete asset via Admin');
                return NextResponse.json({ success: true, method: 'github' });
            }
            // If it's an external URL, do nothing
            return NextResponse.json({ success: true, method: 'external_ignored' });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

