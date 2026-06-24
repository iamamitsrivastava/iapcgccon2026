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
                            <li><Link href="/#about-conference">About the Conference</Link></li>
                            <li><Link href="/#themes">Themes</Link></li>
                            <li><Link href="/committee">Organizing Committee</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className={styles.footerCol}>
                        <h4 className={styles.footerHeading}>Quick Links</h4>
                        <ul className={styles.footerList}>
                            <li><Link href="#speakers">Speakers</Link></li>
                            <li><Link href="#schedule">Schedule</Link></li>
                            <li><Link href="/sponsorship">Sponsorships</Link></li>
                            <li><Link href="#submit">Abstract Submission</Link></li>
                            <li><Link href="#about-parul">Venue</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className={styles.footerCol}>
                        <h4 className={styles.footerHeading}>Support</h4>
                        <ul className={styles.footerList}>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li style={{ marginTop: '0.5rem', lineHeight: '1.4' }}>
                                <strong>Dr Keyur Mistry</strong><br />
                                <span style={{ fontSize: '0.9em', opacity: 0.8 }}></span><br />
                                <a href="tel:9727913272">9727913272</a>
                            </li>
                            <li style={{ marginTop: '1rem', lineHeight: '1.4' }}>
                                <strong>Dr Swapnil Raulji</strong><br />
                                <span style={{ fontSize: '0.9em', opacity: 0.8 }}></span><br />
                                <a href="tel:7046653327">7046653327</a>
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
                        <p className={styles.footerConferenceSubtitle}>Digital Health for All: Bridging Equity, Access, and Innovation</p>

                        <div className={styles.footerMeta}>
                            <p>PIMSR, Parul University, Vadodara, Gujarat</p>
                            <p>26–28 November 2026</p>
                        </div>

                        <div className={styles.socialIcons}>
                            <a href="https://www.linkedin.com/school/paruluniversity/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIconLink}><Linkedin size={20} /></a>
                            <a href="https://www.instagram.com/com_med_pu?igsh=Y3MzNzZ1c3U4a3dn&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIconLink}><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/ParulUniversity/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIconLink}><Facebook size={20} /></a>
                            <a href="https://x.com/ParulUniversity" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialIconLink}><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.copyArea}>
                <div className="container">
                    <p className={styles.copyText}>
                        Copyright &copy; 2026 {conference.host}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
