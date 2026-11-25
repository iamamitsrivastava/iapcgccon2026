'use client';

import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    type CSSProperties,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles, User } from 'lucide-react';
import { SPEAKERS_DATA, type Speaker } from '@/data/speakersData';
import styles from './SpeakersCoverflow.module.css';

export interface SpeakersCoverflowProps {
    speakers?: Speaker[];
    autoplay?: boolean;
    autoplayInterval?: number; // milliseconds
    showControls?: boolean;
    showDots?: boolean;
    onSelectSpeaker?: (speaker: Speaker) => void;
    enableClickNavigation?: boolean;
    className?: string;
}

// 3D Coverflow Configuration constants (adapted from reference)
const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;
const TILT = 12;
const SIDE_TILT = 7;
const TRANSITION_DUR = 0.6; // seconds
const TRANSITION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function SpeakersCoverflow({
    speakers = SPEAKERS_DATA,
    autoplay = true,
    autoplayInterval = 3500,
    showControls = true,
    showDots = true,
    onSelectSpeaker,
    enableClickNavigation = true,
    className = '',
}: SpeakersCoverflowProps) {
    const router = useRouter();
    const list = speakers && speakers.length ? speakers : SPEAKERS_DATA;
    const n = list.length;

    const [active, setActive] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({
        cardWidth: 360,
        cardHeight: 440,
        gap: 7.2,
    });

    // Responsive dimensions listener
    useEffect(() => {
        const updateDims = () => {
            const w = window.innerWidth;
            if (w < 480) {
                setDimensions({
                    cardWidth: Math.min(270, Math.floor(w * 0.76)),
                    cardHeight: Math.min(350, Math.floor(w * 0.98)),
                    gap: 4.2,
                });
            } else if (w < 768) {
                setDimensions({
                    cardWidth: 290,
                    cardHeight: 380,
                    gap: 5.2,
                });
            } else if (w < 1024) {
                setDimensions({
                    cardWidth: 320,
                    cardHeight: 410,
                    gap: 6.2,
                });
            } else {
                setDimensions({
                    cardWidth: 360,
                    cardHeight: 440,
                    gap: 7.2,
                });
            }
        };

        updateDims();
        window.addEventListener('resize', updateDims);
        return () => window.removeEventListener('resize', updateDims);
    }, []);

    // Ensure active index is valid
    useEffect(() => {
        setActive((a) => Math.max(0, Math.min(n - 1, a)));
    }, [n]);

    // Lock input during transition to prevent jitter
    const lockRef = useRef(false);
    const lock = useCallback(() => {
        lockRef.current = true;
        window.setTimeout(() => {
            lockRef.current = false;
        }, TRANSITION_DUR * 1000);
    }, []);

    const step = useCallback(
        (dir: number) => {
            if (lockRef.current || n === 0) return;
            lock();
            setActive((a) => (((a + dir) % n) + n) % n);
        },
        [n, lock]
    );

    const handleCardClick = useCallback(
        (i: number, speaker: Speaker) => {
            if (lockRef.current) return;
            if (i !== active) {
                lock();
                setActive(i);
            } else {
                // If active card is clicked
                if (onSelectSpeaker) {
                    onSelectSpeaker(speaker);
                } else if (enableClickNavigation) {
                    // Navigate or scroll to speaker profile
                    if (window.location.pathname.includes('/speakers')) {
                        const el = document.getElementById(speaker.id);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        router.push(`/speakers#${speaker.id}`);
                    }
                }
            }
        },
        [active, lock, onSelectSpeaker, enableClickNavigation, router]
    );

    // Autoplay
    useEffect(() => {
        if (!autoplay || isHovered || n < 2) return;
        const id = window.setInterval(() => {
            step(1);
        }, autoplayInterval);
        return () => window.clearInterval(id);
    }, [autoplay, isHovered, n, step, autoplayInterval]);

    // Keyboard navigation
    const onKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                step(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                step(-1);
            }
        },
        [step]
    );

    // Touch swipe support
    const touchStartX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diffX = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                step(1); // Swipe left -> next
            } else {
                step(-1); // Swipe right -> prev
            }
        }
        touchStartX.current = null;
    };

    const { cardWidth, cardHeight, gap } = dimensions;
    const transitionCss = `transform ${TRANSITION_DUR}s ${TRANSITION_EASE}, opacity ${TRANSITION_DUR}s ${TRANSITION_EASE}`;

    return (
        <div
            className={`${styles.carouselRoot} ${className}`}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Distinguished Speakers 3D Showcase"
            onKeyDown={onKeyDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className={styles.stage}>
                <div
                    className={styles.cardsContainer}
                    style={{
                        width: cardWidth,
                        height: cardHeight,
                    }}
                >
                    {list.map((speaker, i) => {
                        let rel = i - active;
                        // Seamless loop positioning
                        if (rel > n / 2) rel -= n;
                        if (rel < -n / 2) rel += n;

                        const ax = Math.abs(rel);
                        const visible = ax <= MAX_VISIBLE;
                        const isActive = rel === 0;
                        const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
                        const tx = rel * (gap * 30);
                        const tz = -ax * DEPTH;
                        const ry = -rel * TILT;
                        const rz = rel * SIDE_TILT;
                        const src = speaker.image || '';

                        const cardStyle: CSSProperties = {
                            width: cardWidth,
                            height: cardHeight,
                            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                            transition: transitionCss,
                            opacity: visible ? 1 : 0,
                            pointerEvents: visible ? 'auto' : 'none',
                            cursor: 'pointer',
                            zIndex: isActive ? 10 : 5 - ax,
                        };

                        return (
                            <div
                                key={speaker.id || i}
                                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                                style={cardStyle}
                                onClick={() => handleCardClick(i, speaker)}
                                role="button"
                                tabIndex={visible ? 0 : -1}
                                aria-label={`${speaker.name}, ${speaker.designation}`}
                                aria-hidden={!visible}
                            >
                                <div className={styles.cardInner}>
                                    {src ? (
                                        <Image
                                            src={src}
                                            alt={speaker.name}
                                            fill
                                            sizes="(max-width: 768px) 280px, 360px"
                                            className={styles.speakerImage}
                                            priority={isActive}
                                        />
                                    ) : (
                                        <div className={styles.placeholderArea}>
                                            <User size={64} color="#facc15" strokeWidth={1.5} />
                                            <span>Photo Forthcoming</span>
                                        </div>
                                    )}

                                    {/* Bottom gradient overlay for legible text */}
                                    <div className={styles.gradientOverlay} />

                                    {/* Dim overlay for non-active background cards */}
                                    <div
                                        className={styles.dimOverlay}
                                        style={{ opacity: isActive ? 0 : 0.55 }}
                                    />

                                    {/* Speaker Information on Card */}
                                    <div className={styles.speakerDetails}>
                                        <span className={styles.badgePill}>
                                            <Sparkles size={11} />
                                            Distinguished Speaker
                                        </span>
                                        <h3 className={styles.speakerName}>{speaker.name}</h3>
                                        <p className={styles.speakerDesignation}>{speaker.designation}</p>
                                        {speaker.institution && (
                                            <p className={styles.speakerInstitution}>{speaker.institution}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Carousel Controls: Arrows & Navigation Dots */}
            {showControls && (
                <div className={styles.controlsRow}>
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        className={styles.navButton}
                        aria-label="Previous speaker"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {showDots && (
                        <div className={styles.dotsWrapper}>
                            {list.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    type="button"
                                    onClick={() => {
                                        if (lockRef.current) return;
                                        lock();
                                        setActive(dotIdx);
                                    }}
                                    className={`${styles.dot} ${dotIdx === active ? styles.dotActive : ''}`}
                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                    aria-current={dotIdx === active ? 'true' : 'false'}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => step(1)}
                        className={styles.navButton}
                        aria-label="Next speaker"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>
            )}
        </div>
    );
}
