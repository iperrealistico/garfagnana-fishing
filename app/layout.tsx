import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Garfagnana Fishing - Pesca sportiva in Garfagnana, Toscana',
    description: 'Scopri i migliori spot di pesca in Garfagnana. Zone regolamentate ZRS Alto Serchio e Isola Santa, guide esperte, app di prenotazione Hooking.',
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
