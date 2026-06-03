'use client';
import { Check, User, Phone, Landmark, Award, Zap, Briefcase } from 'lucide-react';
import styles from './Sponsorship.module.css';

export default function Sponsorship() {
    const packages = [
        {
            feature: "Amount",
            platinum: "₹25,000",
            gold: "₹20,000",
            silver: "₹15,000",
            inkind: "₹10,000 (or equivalent)"
        },
        {
            feature: "Logo on the conference website",
            platinum: true,
            gold: true,
            silver: true,
            inkind: true
        },
        {
            feature: "Logo on event signage",
            platinum: true,
            gold: true,
            silver: true,
            inkind: true
        },
        {
            feature: "Logo on conference publications (souvenir/proceedings)",
            platinum: true,
            gold: true,
            silver: true,
            inkind: false
        },
        {
            feature: "Display Table / Booth",
            platinum: true,
            gold: true,
            silver: false,
            inkind: false
        },
        {
            feature: "Display of company pull-up banners at selected areas",
            platinum: true,
            gold: false,
            silver: false,
            inkind: false
        },
        {
            feature: "No. of Delegate Registration Passes",
            platinum: "3 Persons",
            gold: "2 Persons",
            silver: "1 Person",
            inkind: false
        },
        {
            feature: "Session / Interaction with conference audience",
            platinum: true,
            gold: false,
            silver: false,
            inkind: false
        },
        {
            feature: "Networking lunch with conference executive team & Invited stakeholders",
            platinum: true,
            gold: true,
            silver: true,
            inkind: true
        },
        {
            feature: "Accommodation at/near conference venue",
            platinum: "3 Persons",
            gold: "1 Person",
            silver: false,
            inkind: false
        }
    ];

    return (
        <section className={styles.sponsorship}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Sponsorship Opportunities</h1>
                    <p className={styles.subtitle}>
                        Partner with IAPSMGC CON 2026 and connect with a highly engaged community of researchers, academicians, industry associates, and policymakers from around the globe.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Award className={styles.goldIcon} /> Why Sponsor IAPSMGC CON 2026?
                        </h2>
                        <div className={styles.benefitList}>
                            <div className={styles.benefitItem}>
                                <Check className={styles.checkIcon} size={20} />
                                <p>High-visibility brand exposure among national and international experts in business and data-driven disciplines.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <Check className={styles.checkIcon} size={20} />
                                <p>Direct engagement with academicians, researchers, industry leaders, policymakers, and students.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <Check className={styles.checkIcon} size={20} />
                                <p>Opportunities to showcase products, technologies, or services to a focused and relevant audience.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <Check className={styles.checkIcon} size={20} />
                                <p>Networking with key stakeholders to foster collaborations, partnerships, and future projects.</p>
                            </div>
                            <div className={styles.benefitItem}>
                                <Check className={styles.checkIcon} size={20} />
                                <p>Association with a prestigious international conference hosted by Parul University, enhancing brand credibility.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Zap className={styles.goldIcon} /> Sponsorship Packages
                        </h2>
                        <p className={styles.subtitle} style={{ textAlign: 'left', margin: '0 0 2rem 0', fontSize: '1rem' }}>
                            IAPSMGC CON 2026 offers flexible sponsorship options to align with the objectives including day, session and event sponsorship packages.
                        </p>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Platinum Sponsorship</th>
                                        <th>Gold Sponsorship</th>
                                        <th>Silver Sponsorship</th>
                                        <th>In-Kind Sponsorship</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className={styles.featureName}>{item.feature}</td>
                                            <td>{typeof item.platinum === 'boolean' ? (item.platinum ? <Check className={styles.check} size={18} /> : <span className={styles.dash}>-</span>) : <span className={styles.amount}>{item.platinum}</span>}</td>
                                            <td>{typeof item.gold === 'boolean' ? (item.gold ? <Check className={styles.check} size={18} /> : <span className={styles.dash}>-</span>) : <span className={styles.amount}>{item.gold}</span>}</td>
                                            <td>{typeof item.silver === 'boolean' ? (item.silver ? <Check className={styles.check} size={18} /> : <span className={styles.dash}>-</span>) : <span className={styles.amount}>{item.silver}</span>}</td>
                                            <td>{typeof item.inkind === 'boolean' ? (item.inkind ? <Check className={styles.check} size={18} /> : <span className={styles.dash}>-</span>) : <span className={styles.amount}>{item.inkind}</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Landmark className={styles.goldIcon} /> Bank Details for Sponsorship
                        </h2>
                        <div className={styles.bankGrid}>
                            <div className={styles.bankItem}>
                                <span className={styles.bankLabel}>Bank Name</span>
                                <span className={styles.bankValue}>HDFC Bank</span>
                            </div>
                            <div className={styles.bankItem}>
                                <span className={styles.bankLabel}>Account Name</span>
                                <span className={styles.bankValue}>R & D Centre Unit of PU</span>
                            </div>
                            <div className={styles.bankItem}>
                                <span className={styles.bankLabel}>Account No.</span>
                                <span className={styles.bankValue}>............</span>
                            </div>
                            <div className={styles.bankItem}>
                                <span className={styles.bankLabel}>Branch</span>
                                <span className={styles.bankValue}>Sangam Char Rasta</span>
                            </div>
                            <div className={styles.bankItem}>
                                <span className={styles.bankLabel}>IFSC Code</span>
                                <span className={styles.bankValue}>HDFC......</span>
                            </div>
                            <div className={styles.bankItem}>
                                <span className={styles.bankLabel}>MICR Code</span>
                                <span className={styles.bankValue}>.......</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Briefcase className={styles.goldIcon} /> Contact Details
                        </h2>
                        <div className={styles.contactGrid}>
                            {[
                                {
                                    name: "Dr. Vijendra Nath Pathak",
                                    role: "Associate Professor",
                                    phone: "+91 79057 65113"
                                },
                                {
                                    name: "Dr. Ashok Biswas",
                                    role: "Co-Convener",
                                    phone: "+91 83068 49669"
                                },
                                {
                                    name: "Mr. Ashish Kotadiya",
                                    role: "Co-Convener",
                                    phone: "+91 81558 83094"
                                }
                            ].map((contact, index) => (
                                <div key={index} className={styles.contactBox}>
                                    <div className={styles.contactAvatar}>
                                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #FFD700' }}>
                                            <User size={40} color="#FFD700" />
                                        </div>
                                    </div>
                                    <div className={styles.contactInfo}>
                                        <h3 style={{ fontSize: '1.25rem', whiteSpace: 'nowrap' }}>{contact.name}</h3>
                                        <p>{contact.role}</p>
                                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className={styles.phone}>
                                            <Phone size={18} /> {contact.phone}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
