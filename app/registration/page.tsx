'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/sections/Header';
import Footer from "../../components/sections/Footer";
import { Landmark, FileText, AlertCircle, Download, Lock } from 'lucide-react';
import styles from './page.module.css';

export default function RegistrationPage() {
    // UNLOCK DATE: 15th November 2026 (Registration deadline is Nov 15, so On-Spot starts after)
    const unlockTarget = new Date('2026-11-15T00:00:00').getTime();
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    
    // On-Spot is locked BEFORE November 15
    const isOnSpotLocked = currentTime < unlockTarget;
    // Other categories are locked AFTER November 15
    const areOthersLocked = !isOnSpotLocked;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatCountdown = () => {
        const diff = unlockTarget - currentTime;
        if (diff <= 0) return null;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (days > 0) return `${days}d ${hours}h`;
        return `${minutes}m ${seconds}s`;
    };

    const keyDates = [
        { label: 'Abstract Submission Deadline', value: '15th October, 2026' },
        { label: 'Notification of Acceptance', value: '31st October, 2026' },
        { label: 'Registration Deadline', value: '15th November, 2026' },
        { label: 'Conference Date', value: '27th - 28th November 2026' },
    ];
    
    const fees = [
        {
            category: 'IAPSM Member',
            earlyBird: { conf: '₹4000', preConf: '₹1500' },
            lateBird: { conf: '₹4500', preConf: '₹2000' },
            spot: '₹5000',
        },
        {
            category: 'IAPSM Non Member',
            earlyBird: { conf: '₹4500', preConf: '₹1500' },
            lateBird: { conf: '₹5000', preConf: '₹2000' },
            spot: '₹6000',
        },
        {
            category: 'Post Graduate Students / Senior Residents',
            earlyBird: { conf: '₹3500', preConf: '₹1000' },
            lateBird: { conf: '₹4000', preConf: '₹1500' },
            spot: '₹5000',
        },
        {
            category: 'Co Delegates',
            earlyBird: { conf: '₹2500' },
            lateBird: { conf: '₹2500' },
            spot: '₹2500',
        },
        {
            category: 'Interns & UG students',
            earlyBird: { conf: '₹2500', preConf: '₹750' },
            lateBird: { conf: '₹3000', preConf: '₹1500' },
            spot: '₹3500',
        },
    ];

    const renderCategory = (name: string) => {
        const mainText = name.split(/[(\[]/)[0].trim();
        const subParts = name.slice(mainText.length).trim();

        if (!subParts) return <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{name}</span>;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', padding: '0.5rem 0' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.01em', lineHeight: '1.2' }}>
                    {mainText}
                </span>
                <span style={{
                    fontSize: '0.8rem',
                    color: 'white',
                    fontWeight: 700,
                    opacity: 0.8
                }}>
                    {subParts}
                </span>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Header variant="solid" />

            <div className={styles.container}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Registration</h1>
                    <p className={styles.subtitle}>
                        Join us for the International Conference on Bridging Disciplines. Review the fee structure below and proceed to register.
                    </p>
                </div>

                <div className={styles.datesSection}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className={styles.datesTitle}>Key Dates</h2>
                    </div>
                    <div className={styles.datesGrid}>
                        {keyDates.map((item, index) => (
                            <div key={index} className={styles.dateCard}>
                                <span className={styles.dateLabel}>{item.label}</span>
                                <div className={styles.dateValue}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2 className={styles.tableTitle}>Registration Fee Structure</h2>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className={styles.instructionBanner}>
                                <AlertCircle size={20} className={styles.instructionIcon} />
                                <span>Please click on the respective fee amount below to proceed to the payment portal.</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.feeTable}>
                            <thead>
                                <tr>
                                    <th className={styles.categoryHeader} rowSpan={2} style={{ verticalAlign: 'middle' }}>Category</th>
                                    <th className={`${styles.groupHeader}`} colSpan={2} style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Early Bird</th>
                                    <th className={`${styles.groupHeader}`} colSpan={2} style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Late Bird</th>
                                    <th className={`${styles.groupHeader}`} rowSpan={2} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            gap: '0.1rem',
                                            backgroundColor: 'rgba(231, 173, 27, 0.1)',
                                            padding: '0.4rem',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(218, 165, 32, 0.3)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#daa520', fontWeight: 'bold' }}>
                                                Spot {isOnSpotLocked && <Lock size={14} />}
                                            </div>
                                            {isOnSpotLocked && (
                                                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#FFD700', textTransform: 'uppercase' }}>
                                                    {formatCountdown()} left
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th className={styles.subHeader} style={{ fontSize: '0.85rem', color: '#94a3b8', padding: '0.75rem', textAlign: 'center', fontWeight: 700, letterSpacing: '0.05em' }}>CONFERENCE</th>
                                    <th className={styles.subHeader} style={{ fontSize: '0.85rem', color: '#94a3b8', padding: '0.75rem', textAlign: 'center', fontWeight: 700, letterSpacing: '0.05em', borderRight: '1px solid rgba(255,255,255,0.1)' }}>PRE-CONFERENCE</th>
                                    <th className={styles.subHeader} style={{ fontSize: '0.85rem', color: '#94a3b8', padding: '0.75rem', textAlign: 'center', fontWeight: 700, letterSpacing: '0.05em' }}>CONFERENCE</th>
                                    <th className={styles.subHeader} style={{ fontSize: '0.85rem', color: '#94a3b8', padding: '0.75rem', textAlign: 'center', fontWeight: 700, letterSpacing: '0.05em' }}>PRE-CONFERENCE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fees.map((item, index) => (
                                    <tr key={index}>
                                        <td className={`${styles.categoryCell} ${styles.categoryHeader}`} data-label="Category">
                                            <div className={styles.categoryName} style={{ color: 'white' }}>
                                                {renderCategory(item.category)}
                                            </div>
                                        </td>
                                        <td data-label="Early Bird Conf" className={styles.attendingCol}>
                                            <a href="#" className={`${styles.feeGridButton}`}>
                                                <span className={styles.feeText}>{item.earlyBird.conf}</span>
                                            </a>
                                        </td>
                                        <td data-label="Early Bird Pre-Conf" className={styles.attendingCol} style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                            {item.earlyBird.preConf ? (
                                                <a href="#" className={`${styles.feeGridButton}`}>
                                                    <span className={styles.feeText}>{item.earlyBird.preConf}</span>
                                                </a>
                                            ) : (
                                                <span style={{ display: 'flex', justifyContent: 'center', opacity: 0.3, fontWeight: 'bold' }}>-</span>
                                            )}
                                        </td>
                                        <td data-label="Late Bird Conf" className={styles.attendingCol}>
                                            <a 
                                                href="#" 
                                                className={`${styles.feeGridButton} ${areOthersLocked ? styles.lockedButton : ''}`}
                                                onClick={(e) => areOthersLocked && e.preventDefault()}
                                                style={areOthersLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                            >
                                                <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                    {item.lateBird.conf}
                                                    {areOthersLocked && <Lock size={14} />}
                                                </span>
                                            </a>
                                        </td>
                                        <td data-label="Late Bird Pre-Conf" className={styles.attendingCol}>
                                            {item.lateBird.preConf ? (
                                                <a 
                                                    href="#" 
                                                    className={`${styles.feeGridButton} ${areOthersLocked ? styles.lockedButton : ''}`}
                                                    onClick={(e) => areOthersLocked && e.preventDefault()}
                                                    style={areOthersLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                                >
                                                    <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                        {item.lateBird.preConf}
                                                        {areOthersLocked && <Lock size={14} />}
                                                    </span>
                                                </a>
                                            ) : (
                                                <span style={{ display: 'flex', justifyContent: 'center', opacity: 0.3, fontWeight: 'bold' }}>-</span>
                                            )}
                                        </td>
                                        <td data-label="Spot" className={styles.contributorCol}>
                                            <a 
                                                href="#" 
                                                className={`${styles.feeGridButton} ${isOnSpotLocked ? styles.lockedButton : ''}`}
                                                onClick={(e) => isOnSpotLocked && e.preventDefault()}
                                                style={isOnSpotLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                            >
                                                <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    {item.spot}
                                                    {isOnSpotLocked && <Lock size={14} />}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoSectionTitle}>
                                <Landmark className={styles.infoIcon} size={24} />
                                Bank Details
                            </h3>
                            <ul className={styles.bankDetailsList}>
                                <li><strong>Account Name:</strong> <span>Parul University / IAPSMGC CON2026 Parul University</span></li>
                                <li><strong>Bank Name:</strong> <span>CENTRAL BANK OF INDIA</span></li>
                                <li><strong>Branch:</strong> <span>PARUL INSTITUTE OF ENGG TECH, VILL AND PO LIMDA TAL WAGHODIA (Branch Code: 4063)</span></li>
                                <li><strong>Account Number:</strong> <span>5968757282</span></li>
                                <li><strong>IFSC Code:</strong> <span>CBIN0284063</span></li>
                            </ul>
                        </div>
                        <div className={styles.infoCard}>
                            {/* Refund Policy Removed */}
                            <div className={styles.noteBox}>
                                <strong>Note:</strong>  Note: The above amount covers only the registration fee. Additional charges will apply for papers accepted for the publication as per receptive guidelines.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.infoSection}>
                    <h3 className={styles.infoSectionTitle}>
                        <FileText className={styles.infoIcon} size={24} />
                        Submission Guidelines
                    </h3>
                    <ul className={styles.guidelinesList}>
                        <li>Abstracts should be <strong>250-300 words</strong>, and full papers should be a minimum of <strong>7000 words</strong>, formatted in APA or MLA 9th Edition.</li>
                        <li>
                            Up to <strong>Four authors</strong> are permitted per paper.
                            <a
                                href="/Author_Guidelines_ICBD_2026.pdf"
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.downloadFormLink}
                                style={{ marginLeft: '12px' }}
                            >
                                <Download size={14} />
                                Download Author Guideline
                            </a>
                        </li>
                        <li>
                            Submissions must be made in prescribed format.
                        </li>
                        <li>
                            A <strong>signed copyright declaration</strong> is mandatory.
                            <a
                                href="/Author_Copyright_Declaration_Form.pdf"
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.downloadFormLink}
                            >
                                <Download size={14} />
                                Download Form
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <Footer />
        </main>
    );
}
