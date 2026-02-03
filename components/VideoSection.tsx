'use client';

import { useState } from 'react';
import { TranslationDictionary, getGlobalContent } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';

export default function VideoSection({ dict }: { dict: TranslationDictionary }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const globalContent = getGlobalContent();
    const videos = globalContent.videos;

    const extractYouTubeId = (url: string) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
            if (urlObj.searchParams.get('v')) return urlObj.searchParams.get('v');
            return null;
        } catch { return null; }
    };

    const getThumbnail = (url: string) => {
        const id = extractYouTubeId(url);
        return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : 'https://via.placeholder.com/400x225';
    };

    const getEmbedUrl = (url: string) => {
        const id = extractYouTubeId(url);
        return id ? `https://www.youtube.com/embed/${id}` : '';
    };

    const openLightbox = (index: number) => {
        setCurrentVideoIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    };

    const navigateVideo = (direction: number) => {
        const newIndex = (currentVideoIndex + direction + videos.length) % videos.length;
        setCurrentVideoIndex(newIndex);
    };

    return (
        <>
            <section className="section" id="video" style={{ background: 'var(--color-bg-light)' }}>
                <span className="section-number">04.</span>
                <div className="container relative text-center">
                    <AnimateOnScroll animation="fade-up">
                        <h2>{dict['video-title']}</h2>
                    </AnimateOnScroll>

                    <div className="grid mt-lg" id="video-grid">
                        {videos.map((url, index) => (
                            <AnimateOnScroll key={index} animation="zoom-in" delay={index * 0.1} className="card">
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => openLightbox(index)}
                                >
                                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#E5E7EB', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                                        <img src={getThumbnail(url)} alt={`Video ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                                                <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.7)" />
                                                <path d="M10 8v8l6-4z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {lightboxOpen && (
                <div id="video-lightbox" className="lightbox active">
                    <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                    <button className="lightbox-nav lightbox-prev" onClick={() => navigateVideo(-1)}>‹</button>
                    <button className="lightbox-nav lightbox-next" onClick={() => navigateVideo(1)}>›</button>
                    <div className="video-wrapper">
                        <iframe
                            id="video-frame"
                            src={`${getEmbedUrl(videos[currentVideoIndex])}?autoplay=1`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}
