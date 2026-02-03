'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function LanguageSwitcher({ currentLang }: { currentLang: 'it' | 'en' }) {
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const newLang = currentLang === 'it' ? 'en' : 'it';
        // Logic: if current is /en/..., switch to /...
        // if current is /, switch to /en
        // But we need to handle subpaths if any (currently single page).

        // Simple logic for single page anchor navigation project:
        if (newLang === 'en') {
            router.push('/en');
        } else {
            router.push('/');
        }
    };

    return (
        <div
            className="language-selector"
            role="button"
            aria-label="Seleziona lingua"
            onClick={toggleLanguage}
        >
            <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true" id="flag-icon">
                {currentLang === 'it' ? (
                    <>
                        <rect width="8" height="16" fill="#009246" />
                        <rect x="8" width="8" height="16" fill="#FFFFFF" />
                        <rect x="16" width="8" height="16" fill="#CE2B37" />
                    </>
                ) : (
                    <>
                        <rect width="24" height="16" fill="#012169" />
                        <path d="M0,0 L24,16 M24,0 L0,16" stroke="white" strokeWidth="3" />
                        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="2" />
                        <path d="M12,0 V16 M0,8 H24" stroke="white" strokeWidth="5" />
                        <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="3" />
                    </>
                )}
            </svg>
            <span id="lang-label">{currentLang === 'it' ? 'Italiano' : 'English'}</span>
            <span>▼</span>
        </div>
    );
}
