'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TranslationDictionary } from '@/lib/content';

export default function Header({ dict, lang }: { dict: TranslationDictionary, lang: 'it' | 'en' }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Scroll spy similar to script.js
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 140;
            const sections = document.querySelectorAll('section[id]');

            let currentId = '';
            sections.forEach(section => {
                const top = (section as HTMLElement).offsetTop;
                const height = (section as HTMLElement).offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentId = section.id;
                }
            });
            setActiveSection(currentId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLinkHref = (hash: string) => {
        return lang === 'en' ? `/en${hash}` : `/${hash}`;
    };

    const navItems = [
        { id: 'prenota', label: dict['prenota-nav'], icon: 'fa-calendar-check' },
        { id: 'dove-pescare', label: dict['dove-nav'], icon: 'fa-map-marked-alt' },
        { id: 'chi-siamo', label: dict['chi-nav'], icon: 'fa-users' },
        { id: 'video', label: dict['video-nav'], icon: 'fa-video' },
        { id: 'servizi', label: dict['servizi-nav'], icon: 'fa-concierge-bell' },
        { id: 'come-raggiungerci', label: dict['come-nav'], icon: 'fa-road' },
    ];


    return (
        <>
            <header className="header" role="navigation" aria-label="Navigazione principale">
                <nav className="navbar container">
                    {navItems.map(item => (
                        <Link
                            key={item.id}
                            href={getLinkHref(`#${item.id}`)}
                            className={`nav-pill ${activeSection === item.id ? 'active' : ''}`}
                            aria-label={`Vai a ${item.label}`}
                            onClick={(e) => {
                                // Smooth scroll handling if on same page
                                if (window.location.pathname === (lang === 'en' ? '/en' : '/')) {
                                    e.preventDefault();
                                    const el = document.getElementById(item.id);
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                    // Update URL without jump? handled by browser mostly.
                                    window.history.pushState(null, '', `#${item.id}`);
                                }
                            }}
                        >
                            <i className={`fas ${item.icon}`} style={{ marginRight: '8px' }}></i>
                            {item.label}
                        </Link>
                    ))}

                </nav>

                <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>

            <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                {navItems.map(item => (
                    <Link
                        key={item.id}
                        href={getLinkHref(`#${item.id}`)}
                        className="nav-pill"
                        onClick={() => {
                            closeMenu();
                            // Smooth scroll logic
                            const el = document.getElementById(item.id);
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <i className={`fas ${item.icon}`} style={{ marginRight: '8px' }}></i>
                        {item.label}
                    </Link>
                ))}

            </nav>
        </>
    );
}
