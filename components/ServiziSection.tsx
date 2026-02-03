'use client';

import { useState } from 'react';
import { TranslationDictionary, getGlobalContent } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';
import { cn } from '@/lib/utils';

export default function ServiziSection({ dict }: { dict: TranslationDictionary }) {
    const [activeTab, setActiveTab] = useState('guide');
    const content = getGlobalContent();

    const tabs = [
        { id: 'guide', label: dict['tab-guide'] },
        { id: 'mangiare', label: dict['tab-mangiare'] },
        { id: 'dormire', label: dict['tab-dormire'] },
        { id: 'altre', label: dict['tab-altre'] },
    ];

    return (
        <section className="section" id="servizi">
            <span className="section-number">05.</span>
            <div className="container relative">
                <AnimateOnScroll animation="fade-up">
                    <h2 className="text-center">{dict['servizi-title']}</h2>
                    <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
                        {dict['servizi-desc']}
                    </p>
                </AnimateOnScroll>

                <AnimateOnScroll animation="fade-up" delay={0.4} className="tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </AnimateOnScroll>

                {/* Tab Contents */}
                <div id="guide" className={`tab-content ${activeTab === 'guide' ? 'active' : ''}`}>
                    {content.guides.map((guide, idx) => (
                        <AnimateOnScroll key={idx} animation="fade-up" delay={idx * 0.1} className="info-card">
                            <div className="info-details">
                                <h3>{guide.name} – <span>{guide.type}</span></h3>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                                        <a href={`tel:${guide.phone.replace(/\s/g, '')}`}>{guide.phone}</a>
                                    </div>
                                    <div className="contact-item">
                                        <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                        {guide.email}
                                    </div>
                                    <div className="contact-item">
                                        <a href={guide.instagram} target="_blank" className="text-primary">Instagram</a>
                                    </div>
                                </div>
                            </div>
                            <div className="img-container info-image">
                                <img src={guide.image} alt={guide.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                <div id="mangiare" className={`tab-content ${activeTab === 'mangiare' ? 'active' : ''}`}>
                    {content.restaurants.map((place, idx) => (
                        <AnimateOnScroll key={idx} animation="fade-up" delay={idx * 0.1} className="info-card">
                            <div className="info-details">
                                <h3>{place.name}</h3>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                                        <a href={`tel:${place.phone.replace(/\s/g, '')}`}>{place.phone}</a>
                                    </div>
                                    <div className="contact-item">
                                        <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                                        {place.address}
                                    </div>
                                    {place.website && (
                                        <div className="contact-item">
                                            <a href={place.website} target="_blank">{dict['website']}</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="img-container info-image">
                                <img src={place.image} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                <div id="dormire" className={`tab-content ${activeTab === 'dormire' ? 'active' : ''}`}>
                    {content.accommodations.map((place, idx) => (
                        <AnimateOnScroll key={idx} animation="fade-up" delay={idx * 0.1} className="info-card">
                            <div className="info-details">
                                <h3>{place.name}</h3>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                                        <a href={`tel:${place.phone.replace(/\s/g, '')}`}>{place.phone}</a>
                                    </div>
                                    <div className="contact-item">
                                        <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                                        {place.address}
                                    </div>
                                    {place.website && (
                                        <div className="contact-item">
                                            <a href={place.website} target="_blank">{dict['website']}</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="img-container info-image">
                                <img src={place.image} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                <div id="altre" className={`tab-content ${activeTab === 'altre' ? 'active' : ''}`}>
                    <AnimateOnScroll animation="fade-up" className="text-center">
                        <h3><a href="https://www.garfagnanadream.it" target="_blank" className="text-primary">{dict['altre-title']}</a></h3>
                        <p style={{ maxWidth: '600px', margin: '2rem auto' }}>
                            {dict['altre-desc']}
                        </p>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
