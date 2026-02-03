'use client';

import { useState } from 'react';
import { TranslationDictionary } from '@/lib/content';
import AnimateOnScroll from './AnimateOnScroll';

export default function ComeRaggiungerciSection({ dict }: { dict: TranslationDictionary }) {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const toggleItem = (item: string) => {
        setActiveItem(prev => prev === item ? null : item);
    };

    const items = [
        { id: 'auto', label: dict['acc-auto'], content: dict['acc-auto-content'] },
        { id: 'aereo', label: dict['acc-aereo'], content: dict['acc-aereo-content'] },
        { id: 'treno', label: dict['acc-treno'], content: dict['acc-treno-content'] },
    ];

    return (
        <section className="section" id="come-raggiungerci">
            <span className="section-number">06.</span>
            <div className="container relative">
                <div className="two-column">
                    <AnimateOnScroll animation="fade-left">
                        <h2>{dict['come-title']}</h2>
                        <p>{dict['come-desc']}</p>
                    </AnimateOnScroll>

                    <AnimateOnScroll animation="fade-right">
                        {items.map(item => (
                            <div key={item.id} className={`accordion ${activeItem === item.id ? 'active' : ''}`}>
                                <div className="accordion-header" onClick={() => toggleItem(item.id)}>
                                    <span className="accordion-icon">+</span>
                                    <span>{item.label}</span>
                                </div>
                                <div className="accordion-content">
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
