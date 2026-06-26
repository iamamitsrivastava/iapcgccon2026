'use client';
import { useState, useEffect } from 'react';
import { conference } from '@/data/conference';
import styles from './People.module.css';
import { UserCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CommitteeMember } from '@/types';

export function Registration() {
    // Split categories: First 5 (Domestic) vs Last 1 (International)
    const domesticCategories = conference.registration.categories.slice(0, 5);
    const internationalCategory = conference.registration.categories[5];

    return (
        <section className={`section ${styles.registration}`} id="register">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <span className="text-uppercase" style={{ color: 'var(--color-secondary)' }}>Join Us</span>
                    <h2 style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>Registration Fees</h2>
                </div>

                {/* Grid for Domestic Categories */}
                <div className={styles.pricingGrid}>
                    {domesticCategories.map((item, index) => (
                        <div key={index} className={styles.priceCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.role}>{item.category}</div>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.amount}>
                                    <span className={styles.currencyIcon}>₹</span>
                                    {item.fee.replace('₹ ', '')}
                                </div>
                                <Link href="/registration" className={styles.registerBtn}>
                                    <span>REGISTER NOW</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* International Wide Bar Layout */}
                {internationalCategory && (
                    <div className={styles.internationalBar}>
                        <div className={styles.intLabel}>{internationalCategory.category}</div>

                        <div className={styles.intPriceWrapper}>
                            <span className={styles.intCurrency}>$</span>
                            <span className={styles.intPrice}>{internationalCategory.fee.replace('$ ', '')}</span>
                        </div>

                        <Link href="/registration" className={styles.intButton}>
                            <span>REGISTER NOW</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export function BankDetails() {
    return (
        <div className="container">
            <div className={styles.bankDetails}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Payment Details</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Use the following details for NEFT/RTGS transfer.</p>

                <div className={styles.bankGrid}>
                    <div className={styles.bankItem}>
                        <strong>Account Name</strong>
                        <span>{conference.registration.accountDetails.accountName}</span>
                    </div>
                    <div className={styles.bankItem}>
                        <strong>Bank Name</strong>
                        <span>{conference.registration.accountDetails.bank}</span>
                    </div>
                    <div className={styles.bankItem}>
                        <strong>Account Number</strong>
                        <span>{conference.registration.accountDetails.accountNumber}</span>
                    </div>
                    <div className={styles.bankItem}>
                        <strong>IFSC Code</strong>
                        <span>{conference.registration.accountDetails.ifsc}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const tabs = [
    { id: 'conveners', label: 'Conveners' },
    { id: 'coConveners', label: 'Co-Conveners' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'registrationCommittee', label: 'Registration' },

    { id: 'mediaCommittee', label: 'Media' },
];

export function Committees() {
    const [activeTab, setActiveTab] = useState('conveners');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#committees-')) {
                const tabId = hash.replace('#committees-', '');
                if (tabs.some(t => t.id === tabId)) {
                    setActiveTab(tabId);
                    const section = document.getElementById('committees');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const currentMembers = conference.committees[activeTab as keyof typeof conference.committees] || [];

    const visualTabs = ['conveners', 'coConveners'];
    const isVisualTab = visualTabs.includes(activeTab);

    return (
        <section className={`section ${styles.committees}`} id="committees">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '3rem' }}>
                    <span className="text-uppercase" style={{ color: 'var(--color-secondary)' }}>Leadership</span>
                    <h2>Committees & Patrons</h2>
                </div>

                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {isVisualTab ? (
                    <div className={styles.profileList}>
                        {(currentMembers as CommitteeMember[]).map((member: CommitteeMember, index: number) => {
                            if (typeof member === 'string') return null;
                            return (
                                <div key={index} className={styles.profileCard}>
                                    <div className={styles.profileImageWrapper}>
                                        <div className={styles.profileImage} style={{ position: 'relative' }}>
                                            {member.image ? (
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    sizes="220px"
                                                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                                                />
                                            ) : (
                                                <UserCheck size={96} className={styles.profilePlaceholder} />
                                            )}
                                        </div>
                                    </div>
                                    <h4 className={styles.profileName}>{member.name}</h4>
                                    <div className={styles.profileRole}>{member.role}</div>
                                    <div className={styles.profileAffiliation}>IAPSMGC CON 2026</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.list}>
                        {(currentMembers as string[]).map((name, index) => (
                            <div key={index} className={styles.member}>
                                <div className={styles.avatar}>
                                    <UserCheck size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{name}</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Committee Member</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
