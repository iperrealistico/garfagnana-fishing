import { TranslationDictionary } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';

export default function ChiSiamoSection({ dict }: { dict: TranslationDictionary }) {
    return (
        <section className="section" id="chi-siamo">
            <span className="section-number">03.</span>
            <div className="container relative">
                <div className="two-column">
                    <AnimateOnScroll animation="fade-left">
                        <h2>{dict['chi-title']}</h2>
                        {/* Text with logo wrap */}
                        <div className="text-with-logo">
                            <div className="drop-cap-logo">
                                <img src="/images/logos/logo-mosca-club-lucca.png" alt="Mosca Club Lucca" />
                            </div>
                            <p>{dict['chi-desc1']}</p>
                        </div>
                        <p>{dict['chi-desc2']}</p>
                        <p>{dict['chi-desc3']}</p>
                    </AnimateOnScroll>

                    <AnimateOnScroll animation="fade-right">
                        <div style={{ height: '400px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <img
                                src="/images/about/pescatore-profilo.jpg"
                                alt="Pescatore"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
