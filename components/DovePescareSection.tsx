'use client';

import React, { useState } from 'react';
import { TranslationDictionary, getGlobalContent } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';

export default function DovePescareSection({ dict }: { dict: TranslationDictionary }) {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const globalContent = getGlobalContent();
    const { zrs_list, custom_buttons } = globalContent;

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
                        {custom_buttons?.download_maps?.url && (
                            <a href={custom_buttons.download_maps.url} target="_blank" className="download-btn">
                                <i className="fas fa-map" style={{ fontSize: '1.2rem' }}></i>
                                <span>{custom_buttons.download_maps.text}</span>
                            </a>
                        )}

                        {custom_buttons?.download_rules?.url && (
                            <a href={custom_buttons.download_rules.url} target="_blank" className="download-btn">
                                <i className="fas fa-book" style={{ fontSize: '1.2rem' }}></i>
                                <span>{custom_buttons.download_rules.text}</span>
                            </a>
                        )}
                    </AnimateOnScroll>
                </div>

                {/* Grid ZRS Cards */}
                <div className="grid">
                    {zrs_list.map((zrs, idx) => (
                        <AnimateOnScroll key={zrs.id} animation="zoom-in" delay={idx * 0.2} className="card zrs-card">
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => togglePanel(zrs.id)}
                                onKeyDown={(e) => e.key === 'Enter' && togglePanel(zrs.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="img-container" style={{ height: '200px' }}>
                                    {/* Ideally we add 'image' to ZRS model, but for now use helper */}
                                    <img
                                        src={zrs.image}
                                        alt={zrs.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)' }}
                                    />
                                </div>
                                <div className="zrs-label">
                                    <i className="fas fa-map-marker-alt pin-icon" style={{ marginRight: '8px' }}></i>
                                    {zrs.name}
                                </div>
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* Panels */}
                {zrs_list.map((zrs) => (
                    <div key={zrs.id} id={`panel-${zrs.id}`} className={`zrs-panel ${activePanel === zrs.id ? 'active' : ''}`}>
                        <div className="panel-controls">
                            <button className="panel-control" onClick={closePanel}>✕</button>
                        </div>
                        <h3 className="text-primary">{zrs.name}</h3>
                        <p>{zrs.description}</p>

                        {zrs.map_link_url && (
                            <div style={{ marginTop: 'var(--spacing-md)', marginBottom: '1rem' }}>
                                <a
                                    href={zrs.map_link_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        background: '#4285F4',
                                        color: 'white',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '30px',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    <i className="fas fa-map-marked-alt"></i>
                                    {dict['open-maps']}
                                </a>
                            </div>
                        )}

                        <div className="map-container">
                            <iframe
                                style={{ border: 0 }}
                                src={zrs.map_embed_url}
                                width="100%"
                                height="450"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

