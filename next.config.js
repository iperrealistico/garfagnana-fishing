/** @type {import('next').NextConfig} */
const nextConfig = {
    // Output: 'export' would disable dynamic routes / API routes.
    // We use standard build but ensure public pages are static.
    // Images from external sources (YouTube thumbnails) needs config.
    images: {
        unoptimized: true, // Required for static export compatibility if we ever switch, but also simpler for Vercel/GitHub storage
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            }
        ],
    },
    // Ensure we can use top-level await if needed in scraping scripts etc, though not needed for this.
};

module.exports = nextConfig;
