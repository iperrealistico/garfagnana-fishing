import { TranslationDictionary } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';

export default function PrenotaSection({ dict }: { dict: TranslationDictionary }) {
    return (
        <section className="section" id="prenota">
            <span className="section-number">01.</span>
            <div className="container text-center relative">
                <AnimateOnScroll animation="zoom-in">
                    <div style={{ width: '80px', height: '80px', margin: '0 auto 2rem', border: '2px solid var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-primary)">
                            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
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
                    <div className="store-badge">
                        <img src="/images/badges/google-play-badge.png" alt="Google Play" style={{ height: '60px' }} />
                    </div>
                    <div className="store-badge">
                        <img src="/images/badges/app-store-badge.png" alt="App Store" style={{ height: '60px' }} />
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
