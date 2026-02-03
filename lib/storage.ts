
import { put, del, head } from '@vercel/blob';

// Helper to determine storage type from URL
export function getStorageType(url: string): 'blob' | 'github' {
    if (url.startsWith('https://') && url.includes('.public.blob.vercel-storage.com')) {
        return 'blob';
    }
    // Assume anything else is GitHub (or local relative path which maps to GitHub)
    return 'github';
}

export async function deleteFile(url: string, githubContext: { token: string, owner: string, repo: string }) {
    const type = getStorageType(url);

    if (type === 'blob') {
        try {
            await del(url);
            console.log(`Deleted blob: ${url}`);
        } catch (e) {
            console.error(`Failed to delete blob ${url}:`, e);
        }
    } else {
        // GitHub deletion
        // URL might be full relative like "/images/..." or absolute "https://raw.github..."
        // We need to convert it to path in repo
        let path = url;
        if (path.startsWith('http')) {
            // Try to extract path from raw url if it matches
            // But usually we store as "/images/..." in JSON
            // If it's a full URL, we might need to parse. 
            // For now, assume it's a relative path if it's not a blob url.
        }

        // Remove leading slash for GH API
        if (path.startsWith('/')) path = path.substring(1);

        // We need the SHA to delete via API, but basic API endpoint needs it.
        // Actually, we can just use the update/create logic which is easier, but for delete we strictly need SHA.
        // Let's use the github.ts utility or expand it.
        // Since we are in a 'storage' lib, let's keep it abstract.
        // We'll call the deletion logic in the route.
        return 'github_delete_needed';
    }
}
