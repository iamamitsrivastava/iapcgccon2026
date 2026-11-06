'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SPEAKERS_DATA, Speaker } from '@/data/speakersData';
import styles from './page.module.css';
import {
  Award,
  Users,
  Briefcase,
  BookOpen,
  Camera,
  GraduationCap,
  MapPin,
  RotateCw,
} from 'lucide-react';

export default function SpeakersGrid() {
  // Track which cards are flipped via click/tap (for mobile and click-to-lock on desktop)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(id);
    }
  };

  return (
    <div className={styles.speakersGrid}>
      {SPEAKERS_DATA.map((speaker: Speaker) => {
        const isFlipped = !!flippedCards[speaker.id];

        return (
          <div
            key={speaker.id}
            className={`${styles.cardContainer} ${isFlipped ? styles.isFlipped : ''}`}
            onClick={() => toggleFlip(speaker.id)}
            onKeyDown={(e) => handleKeyDown(e, speaker.id)}
            tabIndex={0}
            role="region"
            aria-label={`${speaker.name} profile card. Press Enter to flip.`}
          >
            <div className={styles.cardInner}>
              {/* ══════════════════════════════════════
                  FRONT SIDE — PREVIEW ONLY
                  (Photo, Full Name, Designation)
              ══════════════════════════════════════ */}
              <div className={styles.cardFront}>
                {/* Speaker Photo / Placeholder */}
                <div className={styles.frontPhotoArea}>
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      priority={false}
                    />
                  ) : (
                    <div className={styles.frontPlaceholder} aria-hidden="true">
                      <div className={styles.placeholderFrame}>
                        <Camera size={48} className={styles.placeholderIcon} />
                        <span className={styles.placeholderText}>Photo Pending</span>
                      </div>
                    </div>
                  )}

                  {/* Gradient shade at the bottom of the photo */}
                  <div className={styles.frontGradient} />

                  {/* Flip Hint Pill */}
                  <div className={styles.frontFlipBadge}>
                    <span>View Profile</span>
                    <RotateCw size={12} className={styles.flipBadgeIcon} />
                  </div>
                </div>

                {/* Front Info Area */}
                <div className={styles.frontInfo}>
                  <h3 className={styles.frontName}>{speaker.name}</h3>
                  <p className={styles.frontDesignation}>{speaker.designation}</p>
                </div>
              </div>

              {/* ══════════════════════════════════════
                  BACK SIDE — COMPLETE PROFILE
              ══════════════════════════════════════ */}
              <div className={styles.cardBack}>
                {/* Back Header: Identity & Flip-Back Button */}
                <div className={styles.backHeader}>
                  <div className={styles.backIdentity}>
                    <h3 className={styles.backName}>{speaker.name}</h3>
                    <p className={styles.backDesignation}>{speaker.designation}</p>

                    {(speaker.institution || speaker.location) && (
                      <div className={styles.backMetaRow}>
                        <MapPin size={13} className={styles.backMetaIcon} />
                        <span>
                          {speaker.institution && <strong>{speaker.institution}</strong>}
                          {speaker.institution && speaker.location && ', '}
                          {speaker.location}
                        </span>
                      </div>
                    )}

                    {speaker.qualifications && (
                      <div className={styles.backMetaRow}>
                        <GraduationCap size={13} className={styles.backMetaIcon} />
                        <span>{speaker.qualifications}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className={styles.flipBackButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip(speaker.id);
                    }}
                    aria-label={`Flip back to photo preview for ${speaker.name}`}
                  >
                    <RotateCw size={13} />
                    <span>Flip Back</span>
                  </button>
                </div>

                {/* Back Scrollable Content */}
                <div
                  className={styles.backScrollArea}
                  onClick={(e) => e.stopPropagation()} // Allow scrolling/text selection without triggering flip
                >
                  {/* Awards & Achievements */}
                  {speaker.awards && speaker.awards.length > 0 && (
                    <div className={styles.backSection}>
                      <div className={styles.backSectionHeader}>
                        <Award size={15} className={styles.backSectionIcon} />
                        <h4>Awards &amp; Achievements</h4>
                      </div>
                      <ul className={styles.backList}>
                        {speaker.awards.map((award, i) => (
                          <li key={i} className={styles.backListItem}>
                            <span className={styles.bulletDot} />
                            <span>{award}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Memberships */}
                  {speaker.memberships && speaker.memberships.length > 0 && (
                    <div className={styles.backSection}>
                      <div className={styles.backSectionHeader}>
                        <Users size={15} className={styles.backSectionIcon} />
                        <h4>Memberships</h4>
                      </div>
                      <ul className={styles.backList}>
                        {speaker.memberships.map((membership, i) => (
                          <li key={i} className={styles.backListItem}>
                            <span className={styles.bulletDot} />
                            <span>{membership}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Experience & Key Achievements */}
                  {speaker.experience && speaker.experience.length > 0 && (
                    <div className={styles.backSection}>
                      <div className={styles.backSectionHeader}>
                        <Briefcase size={15} className={styles.backSectionIcon} />
                        <h4>Experience &amp; Expertise</h4>
                      </div>
                      <ul className={styles.backList}>
                        {speaker.experience.map((exp, i) => (
                          <li key={i} className={styles.backListItem}>
                            <span className={styles.bulletDot} />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Publications */}
                  {speaker.publications && speaker.publications.length > 0 && (
                    <div className={styles.backSection}>
                      <div className={styles.backSectionHeader}>
                        <BookOpen size={15} className={styles.backSectionIcon} />
                        <h4>Selected Publications</h4>
                      </div>
                      <ul className={styles.backList}>
                        {speaker.publications.map((pub, i) => (
                          <li key={i} className={styles.backPubItem}>
                            <span className={styles.bulletDot} />
                            <span>{pub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

