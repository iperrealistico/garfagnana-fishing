'use client';

import React, { useState } from 'react';
import { TranslationDictionary, getGlobalContent } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';
import { cn } from '@/lib/utils';

export default function DovePescareSection({ dict }: { dict: TranslationDictionary }) {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const globalContent = getGlobalContent();

    const togglePanel = (panelId: string) => {
        setActivePanel((prev: string | null) => {
            const newVal = prev === panelId ? null : panelId;
            if (newVal) {
                setTimeout(() => {
                    const el = document.getElementById(`panel-${newVal}`);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        const offset = window.pageYOffset + rect.top - 120;
                        window.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                }, 100);
            }
            return newVal;
        });
    };

    const closePanel = () => setActivePanel(null);

    const zrsData = globalContent.zrs_maps;

    return (
        <section className="section" id="dove-pescare" style={{ background: 'var(--color-bg-light)' }}>
            <span className="section-number">02.</span>
            <div className="container relative">
                <AnimateOnScroll animation="fade-up">
                    <h2>{dict['dove-title']}</h2>
                </AnimateOnScroll>

                <div className="two-column" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <AnimateOnScroll animation="fade-left">
                        <div className="text-with-logo">
                            <div className="drop-cap-logo">
                                <img src="/images/logos/logo-garfagnana-fishing.png" alt="Logo" />
                            </div>
                            <p>{dict['dove-desc']}</p>
                        </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll animation="fade-right" className="download-buttons">
                        <a href={zrsData.alto_serchio.pdf_map} target="_blank" className="download-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                            </svg>
                            <span>{dict['download-maps']}</span>
                        </a>
                        <a href={zrsData.alto_serchio.pdf_rules} target="_blank" className="download-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" />
                            </svg>
                            <span>{dict['download-rules']}</span>
                        </a>
                    </AnimateOnScroll>
                </div>

                {/* Grid ZRS Cards */}
                <div className="grid">
                    <AnimateOnScroll animation="zoom-in" className="card zrs-card" >
                        <div role="button" tabIndex={0} onClick={() => togglePanel('alto-serchio')} onKeyDown={(e) => e.key === 'Enter' && togglePanel('alto-serchio')}>
                            <div className="img-container" style={{ height: '200px' }}>
                                <img src="/images/zones/zrs-alto-serchio-aerial.jpg" alt="Alto Serchio" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                            </div>
                            <div className="zrs-label">
                                <svg className="pin-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                </svg>
                                ZRS Alto Serchio
                            </div>
                        </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll animation="zoom-in" delay={0.2} className="card zrs-card">
                        <div role="button" tabIndex={0} onClick={() => togglePanel('isola-santa')} onKeyDown={(e) => e.key === 'Enter' && togglePanel('isola-santa')}>
                            <div className="img-container" style={{ height: '200px' }}>
                                <img src="/images/zones/zrs-isola-santa-aerial.jpg" alt="Isola Santa" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                            </div>
                            <div className="zrs-label">
                                <svg className="pin-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                </svg>
                                ZRS Isola Santa
                            </div>
                        </div>
                    </AnimateOnScroll>

                    <AnimateOnScroll animation="zoom-in" delay={0.4} className="card zrs-card">
                        <div role="button" tabIndex={0} onClick={() => togglePanel('incubatoio')} onKeyDown={(e) => e.key === 'Enter' && togglePanel('incubatoio')}>
                            <div className="img-container" style={{ height: '200px' }}>
                                <img src="/images/zones/incubatoio-aerial.jpg" alt="Incubatoio" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                            </div>
                            <div className="zrs-label">
                                <svg className="pin-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                </svg>
                                {dict['incubatoio-label']}
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>

                {/* Panels */}
                <div id="panel-alto-serchio" className={`zrs-panel ${activePanel === 'alto-serchio' ? 'active' : ''}`}>
                    <div className="panel-controls">
                        <button className="panel-control" onClick={closePanel}>✕</button>
                    </div>
                    <h3 className="text-primary">ZRS Alto Serchio</h3>
                    <p>{dict['zrs-alto-desc']}</p>
                    <h3 className="text-primary" style={{ marginTop: 'var(--spacing-md)' }}>
                        <span>{dict['open-maps']}</span>
                    </h3>
                    <div className="map-container">
                        <iframe src={zrsData.alto_serchio.iframe_src} width="100%" height="480"></iframe>
                    </div>
                </div>

                <div id="panel-isola-santa" className={`zrs-panel ${activePanel === 'isola-santa' ? 'active' : ''}`}>
                    <div className="panel-controls">
                        <button className="panel-control" onClick={closePanel}>✕</button>
                    </div>
                    <h3 className="text-primary">ZRS Isola Santa</h3>
                    <p>{dict['zrs-isola-desc']}</p>
                    <h3 className="text-primary" style={{ marginTop: 'var(--spacing-md)' }}>
                        <span>{dict['open-maps']}</span>
                    </h3>
                    <div className="map-container">
                        <iframe style={{ border: 0 }} src={zrsData.isola_santa.iframe_src} width="100%" height="450" allowFullScreen></iframe>
                    </div>
                </div>

                <div id="panel-incubatoio" className={`zrs-panel ${activePanel === 'incubatoio' ? 'active' : ''}`}>
                    <div className="panel-controls">
                        <button className="panel-control" onClick={closePanel}>✕</button>
                    </div>
                    <h3 className="text-primary">{dict['incubatoio-title']}</h3>
                    <p>{dict['incubatoio-desc']}</p>
                    <h3 className="text-primary" style={{ marginTop: 'var(--spacing-md)' }}>
                        <span>{dict['open-maps']}</span>
                    </h3>
                    <div className="map-container">
                        <iframe style={{ border: 0 }} src={zrsData.incubatoio.iframe_src} width="100%" height="450" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
