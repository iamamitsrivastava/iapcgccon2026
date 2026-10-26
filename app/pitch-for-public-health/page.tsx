import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pitch for Public Health | IAPSMGC CON 2026',
    description:
        'Have a public health idea? Pitch it at IAPSMGC CON 2026. Win up to ₹2.5 Lakh SSIP grant. 26–28 November 2026, PIERC, Parul University, Vadodara.',
};

export default function PitchForPublicHealthPage() {
    return (
        <main className={styles.main}>
            <Header variant="solid" />

            <section className={styles.hero}>
                <div className={styles.inner}>
                    <p className={styles.badge}>IAPSMGCCON 2026</p>

                    <h1 className={styles.title}>
                        Pitch for{' '}
                        <span className={styles.titleAccent}>Public Health</span>
                    </h1>

                    <p className={styles.tagline}>
                        Have an idea to make healthcare better for everyone?<br />
                        <strong>Pitch it. Build it. We will help it grow!</strong>
                    </p>

                    <p className={styles.subtext}>
                        Download or view the official brochure for full details on themes,
                        eligibility, pitch deck guide, and registration.
                    </p>

                    <div className={styles.btnRow}>
                        {/* Opens PDF in a new tab */}
                        <a
                            href="/pitch-for-public-health.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnPrimary}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Brochure
                        </a>

                        {/* Triggers browser download */}
                        <a
                            href="/pitch-for-public-health.pdf"
                            download="IAPSMGCCON 2026 Pitch for Public Health.pdf"
                            className={styles.btnSecondary}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download PDF
                        </a>
                    </div>

                    <p className={styles.meta}>26–28 November 2026 &nbsp;·&nbsp; PIERC, Parul University, Vadodara</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
