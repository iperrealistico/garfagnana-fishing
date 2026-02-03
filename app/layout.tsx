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
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
