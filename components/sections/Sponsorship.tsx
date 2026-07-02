'use client';
import { Check, MapPin, Mail, Award, Zap, Briefcase, Star, Users, Target } from 'lucide-react';
import styles from './Sponsorship.module.css';

export default function Sponsorship() {
    const packages = [
        {
            category: "Principal Sponsor",
            amount: "₹5,00,000",
        },
        {
            category: "Plenary Sponsorship",
            amount: "₹4,00,000",
        },
        {
            category: "Plenary Co-Sponsorship",
            amount: "₹2,50,000",
        },
        {
            category: "Institutional Partnership",
            amount: "₹1,50,000",
        },
        {
            category: "Souvenir Advertisement (Full Page)",
            amount: "₹1,00,000",
        },
        {
            category: "Souvenir Advertisement (Half Page)",
            amount: "₹50,000",
        }
    ];

    return (
        <section className={styles.sponsorship}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Sponsorship Opportunities</h1>
                    <p className={styles.subtitle}>
                        Partner with IAPSMGC CON 2026
                    </p>
                    <p className={styles.description} style={{ marginTop: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
                        Support one of Gujarat's largest academic public health conferences and connect with leading public health professionals, academicians, researchers, clinicians, policymakers, and postgraduate students from across the state.<br /><br />
                        The 33rd Annual State Conference of the Indian Association of Preventive and Social Medicine (IAPSM), Gujarat Chapter will be hosted by the Department of Community Medicine, Parul Institute of Medical Sciences & Research, Parul University, Vadodara, from 26 to 28 November 2026.<br /><br />
                        With the theme <strong>"Digital Health for All: Bridging Equity, Access, and Innovation,"</strong> the conference will provide a platform for meaningful scientific discussions, collaboration, and innovation in public health.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Target className={styles.goldIcon} /> Why Sponsor IAPSMGC CON 2026?
                        </h2>
                        <p style={{ marginBottom: '1.5rem', color: '#e2e8f0' }}>Your sponsorship provides an opportunity to engage with an audience of over 500 delegates representing:</p>
                        <div className={styles.benefitList}>
                            {[
                                "Medical colleges and teaching institutions",
                                "Government health departments",
                                "Public health agencies",
                                "Research organizations",
                                "Healthcare professionals",
                                "Policymakers",
                                "Postgraduate students and young researchers"
                            ].map((item, index) => (
                                <div key={index} className={styles.benefitItem}>
                                    <Check className={styles.checkIcon} size={20} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Award className={styles.goldIcon} /> Benefits of Sponsorship
                        </h2>
                        <div className={styles.benefitList}>
                            {[
                                "Showcase your organization to a focused public health audience.",
                                "Enhance brand visibility through conference branding and promotional materials.",
                                "Network with leading public health experts and decision-makers.",
                                "Support academic excellence and innovation in healthcare.",
                                "Build partnerships with institutions across Gujarat."
                            ].map((item, index) => (
                                <div key={index} className={styles.benefitItem}>
                                    <Check className={styles.checkIcon} size={20} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
                        <h2 className={styles.sectionTitle}>
                            <Zap className={styles.goldIcon} /> Sponsorship Categories
                        </h2>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'left' }}>Category</th>
                                        <th style={{ textAlign: 'right' }}>Sponsorship Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className={styles.featureName} style={{ textAlign: 'left', fontWeight: '500' }}>{item.category}</td>
                                            <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#FFD700' }}>{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Star className={styles.goldIcon} /> Sponsor Recognition
                        </h2>
                        <p style={{ marginBottom: '1.5rem', color: '#e2e8f0' }}>Sponsors will receive appropriate recognition based on the selected sponsorship category through:</p>
                        <div className={styles.benefitList}>
                            {[
                                "Conference branding and display opportunities",
                                "Delegate registrations",
                                "Conference souvenir",
                                "Event publicity and promotional materials",
                                "On-site acknowledgement during the conference",
                                "Visibility among delegates from across Gujarat"
                            ].map((item, index) => (
                                <div key={index} className={styles.benefitItem}>
                                    <Check className={styles.checkIcon} size={20} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontStyle: 'italic' }}>Detailed sponsorship benefits will be shared with interested organizations upon request.</p>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Users className={styles.goldIcon} /> Conference Highlights
                        </h2>
                        <div className={styles.benefitList}>
                            {[
                                "500+ Delegates",
                                "3-Day Scientific Conference",
                                "Keynote Lectures",
                                "Expert Panel Discussions",
                                "Workshops",
                                "Oral & Poster Presentations",
                                "Networking Opportunities"
                            ].map((item, index) => (
                                <div key={index} className={styles.benefitItem}>
                                    <Check className={styles.checkIcon} size={20} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
                        <h2 className={styles.sectionTitle}>
                            <Briefcase className={styles.goldIcon} /> Become a Sponsor
                        </h2>
                        <p style={{ marginBottom: '1rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                            We invite organizations, institutions, healthcare companies, and industry partners to join us in making IAPSMGC CON 2026 a successful academic event.
                        </p>
                        <p style={{ marginBottom: '2rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                            Your support will contribute towards promoting evidence-based public health practices and advancing digital health initiatives for equitable healthcare delivery.
                        </p>

                        <div className={styles.contactGrid} style={{ marginTop: '2rem' }}>
                            <div className={styles.contactBox}>
                                <div className={styles.contactAvatar}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFD700' }}>
                                        <MapPin size={40} color="#FFD700" />
                                    </div>
                                </div>
                                <div className={styles.contactInfo}>
                                    <h3 style={{ fontSize: '1.25rem', whiteSpace: 'nowrap' }}>Address</h3>
                                    <p>Department of Community Medicine</p>
                                    <p>Parul Institute of Medical Sciences & Research</p>
                                    <p>Parul University, Vadodara</p>
                                </div>
                            </div>

                            <div className={styles.contactBox}>
                                <div className={styles.contactAvatar}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFD700' }}>
                                        <Mail size={40} color="#FFD700" />
                                    </div>
                                </div>
                                <div className={styles.contactInfo}>
                                    <h3 style={{ fontSize: '1.25rem', whiteSpace: 'nowrap' }}>Email</h3>
                                    <p>
                                        <a href="mailto:iapsmgccon2026@paruluniversity.ac.in" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                                            iapsmgccon2026@paruluniversity.ac.in
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
