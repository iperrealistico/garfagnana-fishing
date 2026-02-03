import { NextResponse } from 'next/server';
import { getGitHubFile, updateGitHubFile } from '@/lib/github';
// Fallback to local import if GitHub fails (dev mode without tokens)
import localContent from '@/content/site.json';

export async function GET() {
    try {
        const data = await getGitHubFile('content/site.json');
        return NextResponse.json(JSON.parse(data.content));
    } catch (error) {
        console.error('GitHub fetch failed, falling back to local', error);
        return NextResponse.json(localContent);
    }
}

export async function POST(request: Request) {
    try {
        const { content } = await request.json();
        // Validate JSON structure here if needed

        // Save to GitHub
        await updateGitHubFile(
            'content/site.json',
            JSON.stringify(content, null, 2),
            'Update site content via Admin Panel'
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
