export async function getGitHubFile(path: string) {
    const token = process.env.GITHUB_TOKEN;
    // If no token, we can't read from private repo, or rate limits on public.
    // We assume env is set.
    // We need owner/repo. Can be passed or inferred.
    const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
    const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

    if (!token || !owner || !repo) {
        throw new Error('Missing GitHub configuration');
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch file: ${res.statusText}`);
    }

    const data = await res.json();
    // content is base64 encoded
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return { content, sha: data.sha };
}

export async function updateGitHubFile(path: string, content: string, message: string, sha?: string) {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
    const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

    if (!token || !owner || !repo) {
        throw new Error('Missing GitHub configuration');
    }

    // If no SHA provided, we might need to fetch it first (or force update if we don't care about conflicts, but API requires SHA for updates usually).
    let fileSha = sha;
    if (!fileSha) {
        try {
            const current = await getGitHubFile(path);
            fileSha = current.sha;
        } catch (e) {
            // File doesn't exist? Create new.
            fileSha = undefined;
        }
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            content: Buffer.from(content).toString('base64'),
            sha: fileSha,
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(`Failed to update file: ${err.message}`);
    }

    return res.json();
}

export async function deleteGitHubFile(path: string, message: string, sha?: string) {
    // Similar logic to update
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
    const repo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG;

    let fileSha = sha;
    if (!fileSha) {
        try {
            const current = await getGitHubFile(path);
            fileSha = current.sha;
        } catch (e) {
            return; // Already gone
        }
    }

    await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            sha: fileSha,
        }),
    });
}
