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
                        <i className="fas fa-map-marker-alt" style={{ fontSize: '1.2rem' }}></i>
                        <span>{dict['cta-dove']}</span>
                    </Link>
                    <Link href="#chi-siamo" className="cta-button floating-element" style={{ animationDelay: '0.5s' }}>
                        <i className="fas fa-users" style={{ fontSize: '1.2rem' }}></i>
                        <span>{dict['cta-chi']}</span>
                    </Link>
                    <Link href="#servizi" className="cta-button floating-element" style={{ animationDelay: '1s' }}>
                        <i className="fas fa-bed" style={{ fontSize: '1.2rem' }}></i>
                        <span>{dict['cta-vitto']}</span>
                    </Link>
                    <Link href="#video" className="cta-button floating-element" style={{ animationDelay: '1.5s' }}>
                        <i className="fas fa-play" style={{ fontSize: '1.2rem' }}></i>
                        <span>{dict['cta-video']}</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
