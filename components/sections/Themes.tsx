'use client';
import { useState } from 'react';
import {
    Wifi, Heart, Leaf, Baby, GraduationCap, Brain,
    Shield, Globe, FlaskConical, Users, ChevronRight, CheckCircle2, X
} from 'lucide-react';
import styles from './Themes.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ─── Scientific Theme Data ─── */
const themes = [
    {
        id: 1,
        icon: <Wifi size={28} />,
        title: 'Digital Health & Telemedicine',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'mHealth Applications & Wearables',
            'Telemedicine Models in Rural Health',
            'Electronic Health Records (EHR)',
            'Digital Diagnostics & Point-of-Care Tools',
            'Cybersecurity in Health Systems',
            'AI-powered Remote Patient Monitoring',
        ],
    },
    {
        id: 2,
        icon: <Heart size={28} />,
        title: 'NCD Prevention & Management',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Cardiovascular Disease Prevention',
            'Diabetes & Metabolic Syndrome',
            'Cancer Screening & Early Detection',
            'Tobacco & Substance Cessation',
            'Mental Health & NCD Comorbidities',
            'Community-based NCD Interventions',
        ],
    },
    {
        id: 3,
        icon: <Leaf size={28} />,
        title: 'Climate Change & Environmental Health',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Heat Stress & Extreme Weather Events',
            'Air & Water Quality and Disease Burden',
            'Vector-borne Diseases & Climate',
            'Planetary Health Framework',
            'One Health: Environment–Animal–Human',
            'Disaster Risk Reduction & Preparedness',
        ],
    },
    {
        id: 4,
        icon: <Baby size={28} />,
        title: 'Maternal, Child & Adolescent Health',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Maternal Mortality Reduction Strategies',
            'Immunisation & Child Survival',
            'Adolescent Mental & Reproductive Health',
            'Nutrition, Anaemia & WASH',
            'School Health Programmes',
            'Kangaroo Mother Care & Newborn Health',
        ],
    },
    {
        id: 5,
        icon: <GraduationCap size={28} />,
        title: 'Medical Education & CBME',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Competency-Based Medical Education (CBME)',
            'Simulation & Skills Lab Training',
            'Faculty Development & Assessment',
            'Entrustable Professional Activities (EPAs)',
            'Community-based Medical Training',
            'E-learning & Hybrid Pedagogy',
        ],
    },
    {
        id: 6,
        icon: <Brain size={28} />,
        title: 'AI in Healthcare & Public Health Surveillance',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Machine Learning in Disease Prediction',
            'AI-assisted Diagnosis & Radiology',
            'Integrated Disease Surveillance Programme',
            'Big Data Analytics in Epidemiology',
            'Natural Language Processing in Clinical Notes',
            'Ethics & Bias in Healthcare AI',
        ],
    },
    {
        id: 7,
        icon: <Shield size={28} />,
        title: 'Health Policy & Universal Health Coverage',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Ayushman Bharat & PMJAY Implementation',
            'Health Financing & Social Protection',
            'Health System Strengthening',
            'Primary Health Care & AB-HWC',
            'Drug Policy & Rational Therapeutics',
            'Translating Policy into Practice',
        ],
    },
    {
        id: 8,
        icon: <Globe size={28} />,
        title: 'Epidemiology & One Health',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Outbreak Investigation & Field Epidemiology',
            'Zoonotic Diseases & Antimicrobial Resistance',
            'Epidemiological Study Designs',
            'Surveillance Systems & Reporting',
            'Global Health Security & IHR 2005',
            'One Health Approach in Practice',
        ],
    },
    {
        id: 9,
        icon: <FlaskConical size={28} />,
        title: 'Research Methodology & Innovation',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Mixed Methods & Qualitative Research',
            'Implementation Science Frameworks',
            'Systematic Reviews & Meta-analysis',
            'Biostatistics & IBM SPSS / R',
            'Scientific Writing & SUBMISSION Guidlines',
            'GIS Mapping & Spatial Epidemiology',
        ],
    },
    {
        id: 10,
        icon: <Users size={28} />,
        title: 'SDGs, Health Equity & Geriatric Medicine',
        color: '#D4AF37',
        gradient: 'linear-gradient(135deg, #92400e 0%, #D4AF37 100%)',
        subthemes: [
            'Social Determinants of Health',
            'Healthy Ageing & Geriatric Care',
            'Disability-inclusive Health Services',
            'Tribal, Rural & Migrant Health',
            'Gender Equity in Health Outcomes',
            'SDG 3: Good Health & Well-being Progress',
        ],
    },
];

/* ─── Component ─── */
export default function Themes() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <section className={styles.section} id="themes">
            <div className="container">

                {/* Header */}
                <ScrollReveal>
                    <div className="text-center" style={{ marginBottom: '3.5rem' }}>
                        <span className="text-uppercase" style={{ color: 'var(--color-secondary)', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.8rem' }}>
                        </span>
                        <h2 style={{ marginTop: '0.5rem', fontSize: '2.5rem', color: 'var(--color-secondary)' }}>Scientific Theme</h2>
                        <p style={{ color: 'white', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)' }}>
                            <strong>Digital Health for All: Bridging Equity, Access and Innovation</strong>
                        </p>
                        <h2 style={{ marginTop: '1rem', fontSize: '2.5rem', color: 'var(--color-secondary)' }}>Sub-themes</h2>
                    </div>
                </ScrollReveal>

                {/* Theme Cards Grid */}
                <div className={styles.grid}>
                    {themes.map((theme, i) => (
                        <ScrollReveal key={theme.id} animation="fade-up" delay={(Math.min(i, 5) * 100) as 0 | 100 | 200 | 300 | 400 | 500}>
                            <div
                                className={`${styles.card} ${active === theme.id ? styles.cardActive : ''}`}
                                onClick={() => setActive(active === theme.id ? null : theme.id)}
                                role="button"
                                aria-expanded={active === theme.id}
                                tabIndex={0}
                                onKeyDown={e => e.key === 'Enter' && setActive(active === theme.id ? null : theme.id)}
                            >
                                {/* Card top bar */}
                                <div className={styles.cardBar} style={{ background: theme.gradient }} />

                                {/* Icon */}
                                <div className={styles.cardIcon} style={{ background: `${theme.color}18`, color: theme.color }}>
                                    {theme.icon}
                                </div>

                                {/* Number badge */}
                                <span className={styles.cardNum} style={{ color: theme.color }}>{String(theme.id).padStart(2, '0')}</span>

                                {/* Title */}
                                <h3 className={styles.cardTitle}>{theme.title}</h3>

                                {/* Expand hint */}
                                <div className={styles.cardHint} style={{ color: theme.color }}>
                                    {active === theme.id
                                        ? <><X size={14} /> Close</>
                                        : <><ChevronRight size={14} /> View sub-themes</>
                                    }
                                </div>

                                {/* Expandable sub-themes */}
                                {active === theme.id && (
                                    <ul className={styles.subList}>
                                        {theme.subthemes.map((sub, si) => (
                                            <li key={si} className={styles.subItem}>
                                                <CheckCircle2 size={14} style={{ color: theme.color, flexShrink: 0 }} />
                                                <span>{sub}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Call for Abstract */}
                <ScrollReveal animation="fade-up" delay={300}>
                    <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6' }}>
                        <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '1.2rem' }}>Call for Abstract</h3>

                        <p style={{ marginBottom: '1rem' }}>
                            Abstract submission is invited for the presentations under the Oral, Poster and Shri H M Patel Award sessions.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            The Scientific Committee warmly invites researchers, academicians, public health professionals, postgraduate students, and practitioners to submit original research abstracts for Oral and Poster Presentations at the conference.
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            Abstracts addressing a wide range of topics related to community medicine and public health, aligned with the conference themes and sub-themes, are encouraged. Selected abstracts will be showcased during the scientific sessions, and outstanding oral and poster presentations will be recognized with awards.
                        </p>

                        <h4 style={{ fontSize: '1.3rem', color: '#D4AF37', marginBottom: '1rem' }}>Guidelines for Abstract Submission</h4>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Abstracts should be submitted through the official conference website.<br />Website- iapsmgccon2026.paruluniversity.ac.in</li>
                            <li style={{ marginBottom: '0.5rem' }}>Abstract should be submitted after the registration for the conference</li>
                            <li style={{ marginBottom: '0.5rem' }}>Last date of abstract submission: </li>
                        </ul>
                        <p style={{ marginBottom: '0.75rem' }}>
                            Submission of an abstract implies consent for publication in conference materials.
                        </p>
                        <p>
                            Acceptance of an abstract does not include financial support for travel, accommodation, or registration.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
