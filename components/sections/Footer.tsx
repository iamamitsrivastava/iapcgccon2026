'use client';
import Link from 'next/link';
import Image from 'next/image';

const Linkedin = ({ size = 20, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const Instagram = ({ size = 20, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const Facebook = ({ size = 20, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const Twitter = ({ size = 20, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
);

import { conference } from '@/data/conference';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} ${styles.footerWrapper}`}>
                <div className={styles.footerGrid}>
                    {/* Column 1: Information */}
                    <div className={styles.footerCol}>
                        <h4 className={styles.footerHeading}>Information</h4>
                        <ul className={styles.footerList}>
                            <li><Link href="/about">About the Conference</Link></li>
                            <li><Link href="/themes">Themes</Link></li>
                            <li><Link href="/committee">Organizing Committee</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className={styles.footerCol}>
                        <h4 className={styles.footerHeading}>Quick Links</h4>
                        <ul className={styles.footerList}>
                            <li><Link href="/speakers">Speakers</Link></li>
                            <li><Link href="/schedule">Schedule</Link></li>
                            <li><Link href="/sponsorship">Sponsorships</Link></li>
                            <li><Link href="/abstract-submission">Abstract Submission</Link></li>
                            <li><Link href="/venue">Venue</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className={styles.footerCol}>
                        <h4 className={styles.footerHeading}>Support</h4>
                        <ul className={styles.footerList}>
                            <li><Link href="/contact" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Contact Us</Link></li>
                            <li style={{ marginTop: '0.5rem', lineHeight: '1.2' }}>
                                <strong>Dr Keyur Mistry</strong><br />
                                <a href="tel:9727913272" style={{ color: '#94a3b8' }}>9727913272</a>
                            </li>
                            <li style={{ marginTop: '0.75rem', lineHeight: '1.2' }}>
                                <strong>Dr Swapnil Raulji</strong><br />
                                <a href="tel:7046653327" style={{ color: '#94a3b8' }}>7046653327</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Branding & Date */}
                    <div className={`${styles.footerCol} ${styles.brandingCol}`}>
                        <div className={styles.footerBrand}>
                            <div className={styles.logoPlaceholder}>
                                <div className={styles.logoWrapper}>
                                    <Image
                                        src="/parul-university-logo.svg"
                                        alt="Parul University"
                                        width={200}
                                        height={60}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 className={styles.footerConferenceTitle}>{conference.title}</h3>
                        <p className={styles.footerConferenceSubtitle}>Digital Health for All: Bridging Equity, Access and Innovation</p>

                        <div className={styles.footerMeta}>
                            <p style={{ marginBottom: '0.25rem' }}>PIMSR, Parul University</p>
                            <p style={{ marginBottom: '0.75rem' }}>Vadodara, Gujarat</p>
                            <p>26–28 November 2026</p>
                        </div>

                        <div className={styles.socialIcons}>
                            <a href="https://www.instagram.com/com_med_pu?igsh=Y3MzNzZ1c3U4a3dn&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIconLink}><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/ParulUniversity/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIconLink}><Facebook size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.copyArea}>
                <div className="container">
                    <p className={styles.copyText}>
                        Copyright &copy; 2026 {conference.host}. All rights reserved.
                    </p>
                    <p className={styles.copyText}>
                        Designed &amp; Developed by:{' '}
                        <Link
                            href="https://www.linkedin.com/in/amit-srivastava108/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'inherit' }}
                        >
                            <strong style={{ color: '#e2e8f0' }}>Amit Srivastava</strong>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '22px',
                                height: '22px',
                                borderRadius: '4px',
                                backgroundColor: '#0077B5',
                                flexShrink: 0
                            }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
