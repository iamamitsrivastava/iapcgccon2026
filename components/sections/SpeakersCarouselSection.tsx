'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import SpeakersCoverflow from '@/components/speakers/SpeakersCoverflow';
import styles from './SpeakersCarouselSection.module.css';

export default function SpeakersCarouselSection() {
    return (
        <section className={styles.section} id="speakers-showcase">
            <div className={styles.ambientGlow} />

            {/* Section Header */}
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>
                    <Sparkles size={14} />
                    Distinguished Speakers
                </span>
                <h2 className={styles.sectionTitle}>
                    Keynote &amp; Eminent <span className={styles.titleAccent}>Speakers</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                    Visionary public health leaders, academicians, and global digital health pioneers addressing critical frontiers at IAPSMGCCON 2026.
                </p>
                <div className={styles.titleDivider}>
                    <span className={styles.dividerLine}></span>
                    <span className={styles.dividerDot}></span>
                    <span className={styles.dividerLineRight}></span>
                </div>
            </div>

            {/* 3D Coverflow Slideshow */}
            <SpeakersCoverflow />

            {/* View Full Speaker Directory CTA */}
            <div className={styles.actionWrapper}>
                <Link href="/speakers" className={styles.viewAllButton}>
                    <span>Explore All Speakers &amp; Biographies</span>
                    <ArrowRight size={18} />
                </Link>
            </div>
        </section>
    );
}
