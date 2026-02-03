'use client';

import React, { useRef, useEffect, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in';
    delay?: number;
    className?: string;
}

export default function AnimateOnScroll({ children, animation = 'fade-up', delay = 0, className = '' }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const element = ref.current;
        if (element) {
            if (delay) {
                element.style.transitionDelay = `${delay}s`;
                element.style.animationDelay = `${delay}s`;
            }
            observer.observe(element);
        }

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [delay]);

    return (
        <div ref={ref} className={`animate-on-scroll ${animation} ${className}`}>
            {children}
        </div>
    );
}
