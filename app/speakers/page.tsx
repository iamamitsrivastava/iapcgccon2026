import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import SpeakersGrid from './SpeakersGrid';
import styles from './page.module.css';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Distinguished Speakers | IAPSMGCCON 2026',
  description:
    'Eminent keynote and guest speakers for IAPSMGCCON 2026 — Digital Health for All: Bridging Equity, Access, and Innovation, 27–28 November 2026 at Parul University, Vadodara.',
};

export default function SpeakersPage() {
  return (
    <main className={styles.main}>
      <Header variant="solid" />

      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <span className={styles.badge}>
          IAPSMGCCON 2026 · Distinguished Speakers
        </span>

        <h1 className={styles.title}>
          Keynote &amp; Eminent{' '}
          <span className={styles.titleAccent}>Speakers</span>
        </h1>

        <p className={styles.subtitle}>
          Inspiring public health leaders, academicians, and global digital health
          pioneers addressing critical frontiers in preventive medicine and healthcare innovation.
        </p>

        {/* Conference Info Pills */}
        <div className={styles.metaRow}>
          <div className={styles.metaPill}>
            <Sparkles size={16} className={styles.metaIcon} />
            <span>Theme: Digital Health for All: Bridging Equity, Access, and Innovation</span>
          </div>
          <div className={styles.metaPill}>
            <Calendar size={16} className={styles.metaIcon} />
            <span>27–28 November 2026</span>
          </div>
          <div className={styles.metaPill}>
            <MapPin size={16} className={styles.metaIcon} />
            <span>Parul University, Vadodara</span>
          </div>
        </div>
      </section>

      {/* ── Speakers Directory Grid with 3D Flip Cards ── */}
      <section className={styles.container}>
        <SpeakersGrid />
      </section>

      <Footer />
    </main>
  );
}
