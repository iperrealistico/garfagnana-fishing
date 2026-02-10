import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import { content } from '@/lib/content';

export const metadata: Metadata = {
    title: {
        template: content.seo.title_template,
        default: content.seo.title_template.replace('%s | ', ''),
    },
    description: content.seo.default_description,
    keywords: content.seo.keywords,
    openGraph: {
        images: [content.seo.og_image],
    },
    twitter: {
        card: 'summary_large_image',
        images: [content.seo.og_image],
    },
    manifest: '/site.webmanifest',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it" className="scroll-smooth">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
