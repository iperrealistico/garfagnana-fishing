'use client';

import Image from 'next/image';
import AnimateOnScroll from './AnimateOnScroll';

const sponsors = [
    { name: 'Enel', src: '/images/logos/sponsors/enel.png' },
    { name: 'FBML', src: '/images/logos/sponsors/fbml.png' },
    { name: 'PMI', src: '/images/logos/sponsors/pmi.png' },
    { name: 'UCG', src: '/images/logos/sponsors/ucg.png' },
];

export default function Sponsors() {
    return (
        <section className="sponsors-section">
            <div className="container">
                <AnimateOnScroll animation="fade-up">
                    <div className="sponsors-grid">
                        {sponsors.map((sponsor) => (
                            <div key={sponsor.name} className="sponsor-item">
                                <Image
                                    src={sponsor.src}
                                    alt={sponsor.name}
                                    width={120}
                                    height={60}
                                    className="sponsor-logo"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        ))}
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}
