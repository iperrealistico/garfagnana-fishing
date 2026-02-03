import { TranslationDictionary, getGlobalContent } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';

export default function PrenotaSection({ dict }: { dict: TranslationDictionary }) {
    const { app_links } = getGlobalContent();

    return (
        <section className="section" id="prenota">
            <span className="section-number">01.</span>
            <div className="container text-center relative">
                <AnimateOnScroll animation="zoom-in">
                    <div style={{ width: '80px', height: '80px', margin: '0 auto 2rem', border: '2px solid var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-mobile-alt" style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}></i>
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up">
                    <h2>{dict['app-title']}</h2>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={0.2}>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        {dict['app-desc']}
                    </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={0.4} className="store-badges">
                    <a href={app_links.android} target="_blank" rel="noopener noreferrer" className="store-badge">
                        <img src="/images/badges/google-play-badge.png" alt="Google Play" style={{ height: '60px' }} />
                    </a>
                    <a href={app_links.ios} target="_blank" rel="noopener noreferrer" className="store-badge">
                        <img src="/images/badges/app-store-badge.png" alt="App Store" style={{ height: '60px' }} />
                    </a>
                </AnimateOnScroll>
            </div>
        </section>
    );
}

