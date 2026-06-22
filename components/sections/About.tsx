import Image from 'next/image';
import { BookOpen, Users, Lightbulb, Link as LinkIcon, Zap, MapPin, Target, Heart, GraduationCap, Shield } from 'lucide-react';
import styles from './About.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ────────────────────────────────────────────────────────────
   ABOUT CONFERENCE  (IAPSM Gujarat Chapter + Conference intro)
──────────────────────────────────────────────────────────── */
export function AboutConference() {
    return (
        <section className={`section ${styles.about}`} id="about">
            <div className="container">

                {/* ── Conference intro ── */}
                <div className={styles.split}>
                    <ScrollReveal animation="fade-right">
                        <div className={styles.textBlock}>
                            <span className="text-uppercase" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>INTRODUCTION</span>
                            <h2>About the Conference</h2>
                            <p>
                                <strong>IAPSMGC CON 2026</strong> is the annual national conference of the{' '}
                                <strong>Indian Association of Preventive &amp; Social Medicine (IAPSM) &mdash; Gujarat Chapter</strong>,
                                hosted at <strong>Parul Institute of Medical Sciences &amp; Research (PIMSR)</strong>,
                                Parul University, Vadodara.
                            </p>
                            <p>
                                The conference is centred on the theme{' '}
                                <strong>&ldquo;Digital Health for All: Bridging Equity, Access, and Innovation&rdquo;</strong>.
                                It brings together public health professionals, community medicine experts, researchers, policymakers,
                                and students to deliberate on bridging the gap between health policy formulation and its on-ground
                                implementation, contributing towards India&apos;s vision of becoming a developed nation by 2047.
                            </p>
                            <p>
                                The conference spans three days: a <strong>Pre-Conference Workshop</strong> on{' '}
                                <strong>26 November 2026</strong> followed by the <strong>Main Conference</strong> on{' '}
                                <strong>27&ndash;28 November 2026</strong>, featuring keynote addresses, panel discussions,
                                oral and poster presentations, and interactive workshops.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className={styles.imageWrapper} style={{ marginTop: '0' }}>
                            <Image
                                src="/images/boardroom-meeting.png"
                                alt="Conference Boardroom"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── Mission Banner ── */}
                <ScrollReveal animation="fade-up" delay={200}>
                    <div className={styles.missionBanner}>
                        <div className={styles.missionIcon}>
                            <Image 
                                src="/images/viksit-bharat-logo.png" 
                                alt="Viksit Bharat 2047 Logo" 
                                width={140} 
                                height={70}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div className={styles.missionContent}>
                            <span className={styles.missionLabel}>Conference Mission</span>
                            <p className={styles.missionText}>
                                Digital Health for All: Bridging Equity, <strong>Access, and Innovation</strong>
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────────────────
   ABOUT  (Parul University + PIMSR)
──────────────────────────────────────────────────────────── */
export function About() {
    return (
        <section className={`section ${styles.about}`} id="about-parul" style={{ background: '#f8fafc' }}>
            <div className="container">

                {/* ── Parul University ── */}
                <div className={styles.split}>
                    <ScrollReveal animation="fade-right">
                        <div className={styles.textBlock}>
                            <span className="text-uppercase" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>HOST INSTITUTION</span>
                            <h2>About Parul University</h2>
                            <p>
                                Nestled in the vibrant city of <strong>Vadodara, Gujarat</strong>, Parul University has emerged
                                as a beacon of academic excellence and innovation. With a sprawling{' '}
                                <strong>200+ acre eco-friendly campus</strong>, the university is home to students from every
                                Indian state and <strong>75+ countries</strong>, making it one of the most culturally diverse
                                educational destinations in the country.
                            </p>
                            <p>
                                Parul University is proud to be the{' '}
                                <strong>youngest private university in India to receive NAAC A++ accreditation</strong>{' '}
                                in its first accreditation cycle &mdash; a testament to its commitment to quality education,
                                research excellence, and student outcomes. The university is also recognised with{' '}
                                <strong>NIRF rankings</strong> and various state and national excellence awards.
                            </p>
                            <p>
                                The university houses state-of-the-art research facilities, dedicated innovation and incubation
                                centers, and disciplines spanning the <strong>Faculty of Medicine</strong>, Faculty of Engineering
                                &amp; Technology, Faculty of Pharmacy, Faculty of Nursing, Faculty of Management Studies, and
                                many more &mdash; creating a true multidisciplinary academic ecosystem.
                            </p>

                            <div className={styles.locationWrapper}>
                                <MapPin size={20} className={styles.locationIcon} />
                                <div className={styles.locationText}>
                                    <span className={styles.locationLabel}>LOCATION</span>
                                    <a
                                        href="https://paruluniversity.ac.in"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.locationLink}
                                    >
                                        Vadodara, Gujarat, India
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className={styles.imageWrapper} style={{ marginTop: '-2rem' }}>
                            <Image
                                src="/images/about-students.jpg"
                                alt="Parul University Campus"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </ScrollReveal>
                </div>

                {/* ── NAAC Stats ── */}
                <ScrollReveal animation="fade-up" delay={300}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>🏆</div>
                            <div className={styles.statNumber}>NAAC A++</div>
                            <div className={styles.statTitle}>Youngest Pvt. University</div>
                            <div className={styles.statDescription}>First Cycle Accreditation</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>👥</div>
                            <div className={styles.statNumber}>65,000+</div>
                            <div className={styles.statTitle}>Total Students</div>
                            <div className={styles.statDescription}>From every state in India</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>🌍</div>
                            <div className={styles.statNumber}>75+</div>
                            <div className={styles.statTitle}>Global Countries</div>
                            <div className={styles.statDescription}>4,500+ International Students</div>
                        </div>
                        <div className={`${styles.statCard} ${styles.statCardHighlight}`}>
                            <div className={styles.statIcon}>🎓</div>
                            <div className={styles.statNumber}>200+</div>
                            <div className={styles.statTitle}>Acres Campus</div>
                            <div className={styles.statDescription}>Eco-friendly Environment</div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ── Faculty of Medicine + PIMSR ── */}
                <div className={styles.split} style={{ marginTop: '5rem' }}>
                    <ScrollReveal delay={200} animation="fade-right">
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/gallery-campus-garden.jpg"
                                alt="Faculty of Medicine — PIMSR"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-left">
                        <div className={styles.textBlock}>
                            <span className="text-uppercase" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>VENUE FACULTY</span>
                            <h2>Faculty of Medicine &amp; PIMSR</h2>
                            <p>
                                The <strong>Parul Institute of Medical Sciences &amp; Research (PIMSR)</strong> is a
                                constituent institute under the <strong>Faculty of Medicine</strong> at Parul University.
                                PIMSR is a premier medical college offering MBBS, MD, MS, and super-speciality programmes,
                                accredited by the <strong>National Medical Commission (NMC)</strong> and recognised for
                                its outstanding clinical training and research output.
                            </p>
                            <p>
                                PIMSR is home to a 1,500-bed teaching hospital, state-of-the-art simulation labs,
                                advanced diagnostics infrastructure, and over <strong>50 departments</strong> spanning
                                clinical, para-clinical, and pre-clinical disciplines. The Department of{' '}
                                <strong>Community Medicine</strong> at PIMSR plays a pivotal role in driving public health
                                education, community outreach, and research in partnership with government and civil
                                society organisations.
                            </p>
                            <p>
                                By hosting IAPSMGC CON 2026, PIMSR reaffirms its commitment to advancing{' '}
                                <strong>preventive medicine</strong>, <strong>public health policy</strong>, and{' '}
                                <strong>community health research</strong> as cornerstones of India&apos;s healthcare future.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

/* ────────────────────────────────────────────────────────────
   OBJECTIVES
──────────────────────────────────────────────────────────── */
export function Objectives() {
    const objectivesList = [
        {
            icon: <Target size={24} />,
            title: "Policy to Practice",
            text: "To identify and deliberate on gaps between public health policy formulation and its on-ground implementation across India"
        },
        {
            icon: <Heart size={24} />,
            title: "Public Health Excellence",
            text: "To promote evidence-based approaches in preventive and social medicine towards achieving health equity and universal health coverage"
        },
        {
            icon: <BookOpen size={24} />,
            title: "Research & Innovation",
            text: "To provide a platform for sharing cutting-edge research, case studies, and innovations in community medicine and public health"
        },
        {
            icon: <Users size={24} />,
            title: "Networking & Collaboration",
            text: "To foster meaningful engagement and sustained collaboration among academics, practitioners, policymakers, and NGOs"
        },
        {
            icon: <GraduationCap size={24} />,
            title: "Capacity Building",
            text: "To strengthen the capacity of public health professionals and medical students through workshops, CME sessions, and expert mentorship"
        },
        {
            icon: <Shield size={24} />,
            title: "Viksit Bharat Vision",
            text: "To align community health efforts with the national vision of a Developed India by 2047, addressing SDGs and national health policy goals"
        }
    ];

    return (
        <section className={`section ${styles.objectives}`} id="objectives">
            <div className="container">
                <ScrollReveal>
                    <div className="text-center">
                        <span className="text-uppercase" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Our Goals</span>
                        <h2>Conference Objectives</h2>
                    </div>
                </ScrollReveal>

                <div className={styles.grid}>
                    {objectivesList.map((obj, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={(i * 100) as 0 | 100 | 200 | 300 | 400 | 500} className={styles.card}>
                            <div className={styles.iconWrapper}>{obj.icon}</div>
                            <h3 className={styles.cardTitle}>{obj.title}</h3>
                            <p className={styles.cardText}>{obj.text}</p>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
