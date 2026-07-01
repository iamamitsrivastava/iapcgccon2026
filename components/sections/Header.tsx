'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import SubmitAbstractModal from '../modals/SubmitAbstractModal';

/* ─────────── SVG icons (no external dependency) ─────────── */
const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/* ─────────── Types ─────────── */
interface NavChild { label: string; href: string; }
interface NavItem { label: string; href: string; children?: NavChild[]; }

interface HeaderProps {
    variant?: 'transparent' | 'solid';
}

const navItems: NavItem[] = [
    { label: 'About', href: '/about' },
    {
        label: 'Committee',
        href: '/committee',
        children: [
            { label: 'Patron', href: '/committee/patron' },
            { label: 'Committee', href: '/committee' },
            { label: 'Office Bearers', href: '/committee/office-bearers' },
        ]
    },
    { label: 'THEMES', href: '/themes' },
    {
        label: 'Scientific',
        href: '/resources/publishing-ethics',
        children: [
            { label: 'Scientific Program', href: '/program' },
            { label: 'Submission Guidlines', href: '/resources/publishing-ethics' },
            { label: 'Submit Abstract', href: '#submit-abstract' },
        ]
    },
    { label: 'Explore Vadodara', href: '/travel' },
    { label: 'Contact Us', href: '/contact' },
];

/* ─────────── Component ─────────── */
export default function Header({ variant = 'transparent' }: HeaderProps) {
    const pathname = usePathname() || '/';
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const isSolid = variant === 'solid';

    const isActive = (href: string) => {
        if (href === '#') return false;
        if (href.includes('#') && href.length > 1) return false;
        const path = href.split('#')[0];
        if (!path) return pathname === '/';
        if (path === '/' && pathname !== '/') return false;
        return pathname === path;
    };

    const isGroupActive = (item: NavItem) => {
        return item.children?.some(child => isActive(child.href)) || isActive(item.href);
    };

    /* scroll handler */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* lock body scroll when mobile menu open */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const headerClass = [
        styles.header,
        scrolled ? styles.scrolled : '',
        isSolid ? styles.solid : '',
    ].filter(Boolean).join(' ');

    return (
        <>
            <header className={headerClass}>
                <div className={styles.inner}>

                    {/* ── Logo cluster ── */}
                    <Link href="/" className={styles.logoCluster} onClick={() => setMobileOpen(false)}>
                        <div className={styles.logoGroup}>
                            <Image
                                src="/images/iapsmgc-logo.png"
                                alt="IAPSM Gujarat Chapter"
                                width={38}
                                height={38}
                                className={styles.logoImg}
                                priority
                            />
                        </div>
                        <div className={styles.logoText}>
                            <span className={styles.logoTitle}>IAPSMGC CON</span>
                            <span className={styles.logoYear}>2026</span>
                        </div>
                        <div className={styles.logoSeparator} />
                        <div className={styles.logoGroup}>
                            <Image
                                src="/parul-university-logo.svg"
                                alt="Parul University"
                                width={110}
                                height={38}
                                className={styles.logoImg}
                                priority
                            />
                        </div>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <nav className={styles.desktopNav} aria-label="Main navigation">
                        {navItems.map(item => (
                            <div
                                key={item.label}
                                className={styles.navItem}
                                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link href={item.href} className={`${styles.navLink} ${item.label !== 'Coming Soon' && (isActive(item.href) || isGroupActive(item)) ? styles.active : ''}`}>
                                    {item.label}
                                    {item.children && (
                                        <span className={`${styles.chevron} ${openDropdown === item.label ? styles.chevronOpen : ''}`}>
                                            <ChevronDown />
                                        </span>
                                    )}
                                </Link>

                                {item.children && (
                                    <div className={`${styles.dropdown} ${openDropdown === item.label ? styles.dropdownVisible : ''}`}>
                                        <div className={styles.dropdownInner}>
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href !== '#submit-abstract' ? child.href : '#'}
                                                    className={`${styles.dropdownLink} ${isActive(child.href) ? styles.active : ''}`}
                                                    onClick={(e) => {
                                                        setOpenDropdown(null);
                                                        if (child.href === '#submit-abstract') {
                                                            e.preventDefault();
                                                            setIsSubmitModalOpen(true);
                                                        }
                                                    }}
                                                >
                                                    <span className={styles.dropdownDot} />
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* ── CTA ── */}
                    <div className={styles.ctaWrap}>
                        <Link href="/registration" className={styles.cta}>
                            Register Now
                        </Link>

                        {/* Hamburger */}
                        <button
                            className={styles.hamburger}
                            onClick={() => setMobileOpen(v => !v)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile overlay ── */}
            <div
                className={`${styles.overlay} ${mobileOpen ? styles.overlayOpen : ''}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            {/* ── Mobile drawer ── */}
            <aside className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`} aria-label="Mobile navigation">
                <div className={styles.drawerHeader}>
                    <div className={styles.drawerBrand}>
                        <Image src="/parul-university-logo.svg" alt="Parul University" width={90} height={30} />
                        <span className={styles.drawerTitle}>IAPSMGC CON <b>2026</b></span>
                    </div>
                </div>

                <nav className={styles.drawerNav}>
                    {navItems.map((item, i) => (
                        <div key={item.label} className={styles.drawerGroup}>
                            {item.children ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: item.label !== 'Coming Soon' && isGroupActive(item) ? 'rgba(212, 175, 55, 0.06)' : 'transparent' }}>
                                        <Link
                                            href={item.href}
                                            className={styles.drawerLink}
                                            style={{ flex: 1, borderBottom: 'none', background: 'none', margin: 0, paddingLeft: item.label !== 'Coming Soon' && isActive(item.href) ? '2rem' : '1.5rem' }}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                        <button
                                            onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                                            aria-expanded={mobileExpanded === item.label}
                                            style={{
                                                padding: '0.95rem 1.5rem',
                                                background: 'none',
                                                border: 'none',
                                                color: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span className={`${styles.drawerChevron} ${mobileExpanded === item.label ? styles.drawerChevronOpen : ''}`} style={{ color: 'rgba(255,255,255,0.6)' }}>
                                                <ChevronDown />
                                            </span>
                                        </button>
                                    </div>
                                    <div className={`${styles.drawerChildren} ${mobileExpanded === item.label ? styles.drawerChildrenOpen : ''}`}>
                                        {item.children.map(child => (
                                            <Link
                                                key={child.label}
                                                href={child.href !== '#submit-abstract' ? child.href : '#'}
                                                className={`${styles.drawerChildLink} ${isActive(child.href) ? styles.active : ''}`}
                                                onClick={(e) => {
                                                    setMobileOpen(false);
                                                    if (child.href === '#submit-abstract') {
                                                        e.preventDefault();
                                                        setIsSubmitModalOpen(true);
                                                    }
                                                }}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`${styles.drawerLink} ${isActive(item.href) ? styles.active : ''}`}
                                    style={{ animationDelay: `${i * 0.04}s` }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}

                    <div className={styles.drawerCta}>
                        <Link href="/registration" className={styles.drawerCtaBtn} onClick={() => setMobileOpen(false)}>
                            Register Now
                        </Link>
                    </div>
                </nav>
            </aside>
            <SubmitAbstractModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
            />
        </>
    );
}
