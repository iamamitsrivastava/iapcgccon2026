'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Native SVG icon for the close button to avoid dependency issues with lucide-react in Turbopack

const ChevronIcon = ({ size = 16, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

import { conference } from '@/data/conference';
import styles from './Header.module.css';

// Improved mobile menu navigation
interface HeaderProps {
    variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isDarkTheme = variant === 'solid';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    interface NavItem {
        label: string;
        href: string;
        children?: { label: string; href: string }[];
    }

    const navItems: NavItem[] = [
        { label: 'ABOUT PARUL', href: '/#about-parul' },
        {
            label: 'COMMITTEE', href: '/committee',
            children: [
                { label: 'Committee', href: '/committee' },
                { label: 'International Advisory', href: '/committee/international-advisory' },
                { label: 'National Advisory', href: '/committee/national-advisory' },
            ]
        },
        { label: 'SPEAKERS', href: '/#speakers' },
        {
            label: 'Themes', href: '/#themes',
            children: [
                { label: 'Call For Abstract', href: '/#themes' },
            ]
        },
        { label: 'PUBLICATION & ETHICS', href: '/resources/publishing-ethics' },
        { label: 'TRAVELS', href: '/travel' },
        { label: 'SPONSORSHIP', href: '/sponsorship' },
        { label: 'CONTACT', href: '/contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isDarkTheme ? styles.solidHeader : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoImageWrapper}>
                        <img
                            src="/parul-university-logo.svg"
                            alt="Parul University"
                            width={160}
                            height={48}
                            className={styles.logoImage}
                        />
                    </div>
                    {conference.title}
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <div key={item.label} className={styles.navItem}>
                            <Link
                                href={item.href}
                                className={`${styles.navLink} ${item.label === 'ABOUT US' ? styles.noUnderline : ''}`}
                            >
                                {item.label}
                                {item.children && <ChevronIcon size={14} />}
                            </Link>

                            {item.children && (
                                <div className={styles.dropdown}>
                                    {item.children?.map((child) => (
                                        <Link key={child.label} href={child.href} className={styles.dropdownLink}>
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <Link href="/registration" className={`${styles.cta} ${styles.desktopCta}`}>
                    REGISTER
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className={styles.hamburgerLines}>
                        <span className={`${styles.line} ${styles.line1}`}></span>
                        <span className={`${styles.line} ${styles.line2}`}></span>
                        <span className={`${styles.line} ${styles.line3}`}></span>
                    </div>
                </button>

                {/* Mobile Overlay */}
                <div
                    className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.overlayOpen : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Nav */}
                <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <div className={styles.mobileNavHeader}>
                        <div className={styles.mobileMenuBrand}>Menu</div>
                    </div>

                    <div className={styles.mobileNavContent}>
                        {navItems.map((item, index) => (
                            <div key={item.label} className={styles.mobileMenuSection}>
                                {item.children ? (
                                    <>
                                        <div className={styles.mobileGroupTitle}>
                                            {item.label}
                                        </div>
                                        <div className={styles.mobileSublinks}>

                                            {item.children?.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className={styles.mobileSubLink}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={styles.mobileNavLink}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/registration"
                            className={`${styles.mobileNavLink} ${styles.cta}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                marginTop: '2rem',
                                textAlign: 'center',
                                justifyContent: 'center',
                                border: '1px solid #FFD700',
                                marginLeft: 0,
                                animationDelay: `${0.1 + navItems.length * 0.05}s`
                            }}
                        >
                            REGISTER
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
