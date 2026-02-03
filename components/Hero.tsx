import { TranslationDictionary } from '@/lib/content';
import Link from 'next/link';

export default function Hero({ dict, lang }: { dict: TranslationDictionary, lang: 'it' | 'en' }) {
    // Using direct paths because styles rely on global CSS
    // Images are in public/images/

    return (
        <section className="hero" id="hero">
            <div
                className="hero-bg"
                style={{ backgroundImage: "url('/images/hero/hero-fishing.jpg')" }}
                role="img"
                aria-label="Pescatore in un torrente della Garfagnana"
            ></div>
            <div className="hero-content">
                <h1>{dict['hero-title']}</h1>
                <p className="hero-subtitle">{dict['hero-subtitle']}</p>

                <div className="main-logo" style={{ width: '120px', height: '120px', margin: '2rem auto' }}>
                    {/* Using img tag to match style behavior */}
                    <img src="/images/logos/logo-garfagnana-fishing.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
                </div>

                <div className="hero-cta-group">
                    <Link href="#dove-pescare" className="cta-button floating-element" style={{ animationDelay: '0s' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                        <span>{dict['cta-dove']}</span>
                    </Link>
                    <Link href="#chi-siamo" className="cta-button floating-element" style={{ animationDelay: '0.5s' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span>{dict['cta-chi']}</span>
                    </Link>
                    <Link href="#servizi" className="cta-button floating-element" style={{ animationDelay: '1s' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <span>{dict['cta-vitto']}</span>
                    </Link>
                    <Link href="#video" className="cta-button floating-element" style={{ animationDelay: '1.5s' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        </svg>
                        <span>{dict['cta-video']}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
