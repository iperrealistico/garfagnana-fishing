import { NextResponse } from 'next/server';
import { updateGitHubFile, deleteGitHubFile } from '@/lib/github';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const path = formData.get('path') as string || 'uploads';
        const oldPath = formData.get('oldPath') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Check configuration
        const token = process.env.GITHUB_TOKEN;
        const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
        const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

        if (!token || !owner || !repo) {
            return NextResponse.json({ error: 'Server misconfiguration: GitHub env vars missing' }, { status: 500 });
        }

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const targetPath = `public/images/${path}/${filename}`;
        const contentBase64 = buffer.toString('base64');

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Upload image ${filename}`,
                content: contentBase64,
            }),
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Upload failed: ${res.statusText} - ${errText}`);
        }

        // If oldPath exists, delete it.
        if (oldPath && oldPath.startsWith('/images/')) {
            try {
                const oldTarget = `public${oldPath}`;
                await deleteGitHubFile(oldTarget, 'Delete replaced image');
            } catch (e) {
                console.error('Failed to delete old file', e);
            }
        }

        return NextResponse.json({ path: `/images/${path}/${filename}` });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { path } = await request.json();
        if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

        const targetPath = `public${path}`;
        await deleteGitHubFile(targetPath, 'Delete image via Admin');

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
