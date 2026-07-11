'use client';
import Link from 'next/link';
import Image from 'next/image';

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

const PhoneIcon = ({ size = 14, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const MailIcon = ({ size = 14, color = "currentColor" }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
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
                            <li><Link href="/#about">About the Conference</Link></li>
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
                            <li><Link href="/contact" className={styles.contactUsLink}>Contact Us</Link></li>
                            <li className={styles.contactEmailItem}>
                                <a href="mailto:iapsmgc.conference@paruluniversity.ac.in" className={styles.contactLink}>
                                    <MailIcon size={14} />
                                    <span>  iapsmgc.conference@paruluniversity.ac.in</span>
                                </a>
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.contactName}>Dr Keyur Mistry</span>
                                <a href="tel:9727913272" className={styles.contactLink}>
                                    <PhoneIcon size={14} />
                                    <span> 9727913272</span>
                                </a>
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.contactName}>Dr Swapnil Raulji</span>
                                <a href="tel:7046653327" className={styles.contactLink}>
                                    <PhoneIcon size={14} />
                                    <span> 7046653327</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Branding & Date */}
                    <div className={`${styles.footerCol} ${styles.brandingCol}`}>
                        <div className={styles.footerBrand}>
                            <div className={styles.logoWrapper}>
                                <Image
                                    src="/parul-university-logo.svg"
                                    alt="Parul University"
                                    width={200}
                                    height={60}
                                    style={{ objectFit: 'contain' }}
                                    priority={false}
                                />
                            </div>
                        </div>
                        <h3 className={styles.footerConferenceTitle}>{conference.title}</h3>
                        <p className={styles.footerConferenceSubtitle}>Digital Health for All: Bridging Equity, Access and Innovation</p>

                        <div className={styles.footerMeta}>
                            <p className={styles.metaText}>PIMSR, Parul University</p>
                            <p className={styles.metaText}>Vadodara, Gujarat</p>
                            <p className={styles.metaDate}>26–28 November 2026</p>
                        </div>

                        <div className={styles.socialIcons}>
                            <a href="https://www.instagram.com/com_med_pu?igsh=Y3MzNzZ1c3U4a3dn&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIconLink}><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/ParulUniversity/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIconLink}><Facebook size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.copyArea}>
                <div className={`${styles.container} ${styles.copyContainer}`}>
                    <p className={styles.copyText}>
                        Copyright &copy; 2026 {conference.host}. All rights reserved.
                    </p>
                    <p className={styles.copyText}>
                        Designed &amp; Developed by:{' '}
                        <Link
                            href="https://www.linkedin.com/in/amit-srivastava108/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.devLink}
                        >
                            <strong>Amit Srivastava</strong>
                            <span className={styles.linkedinBadge}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
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
