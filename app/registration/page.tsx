'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/sections/Header';
import Footer from "../../components/sections/Footer";
import { Landmark, AlertCircle, Lock } from 'lucide-react';
import styles from './page.module.css';

const VALID_GROUP_CODES = [
    "GROUP10-A7K9M2", "GROUP10-P4R8T5", "GROUP10-W3N6Q1", "GROUP10-H8V2L7", "GROUP10-Z4M9K3",
    "GROUP10-B7T5X8", "GROUP10-R2Q6N4", "GROUP10-K9W3P7", "GROUP10-C5L8T2", "GROUP10-Y1M7R6",
    "GROUP10-F4X9K8", "GROUP10-N2P6W3", "GROUP10-T8R1M5", "GROUP10-Q7V4L9", "GROUP10-D3K8X2",
    "GROUP10-M6Y5B1", "GROUP10-X9A2C7", "GROUP10-J4N8V3", "GROUP10-L7P5R9", "GROUP10-U2T6M4",
    "GROUP10-E8W1K5", "GROUP10-G3Q7X9", "GROUP10-S5L2N8", "GROUP10-V6B4P1", "GROUP10-A9R3Y7",
    "GROUP10-C2M5K4", "GROUP10-F8T1W6", "GROUP10-H4X7Q2", "GROUP10-J9L3B8", "GROUP10-N5V2R1",
    "GROUP10-P7K4M9", "GROUP10-R8Y6T3", "GROUP10-T3Q9L5", "GROUP10-W1N4X8", "GROUP10-Y6P7A2",
    "GROUP10-B5M1V9", "GROUP10-D8K2R4", "GROUP10-G7T5Q1", "GROUP10-L9X3N6", "GROUP10-M2W8B5",
    "GROUP10-Q4A7P3", "GROUP10-S1R9K8", "GROUP10-U5L6Y2", "GROUP10-V3N1T7", "GROUP10-X8M4Q9",
    "GROUP10-Z2P5W6", "GROUP10-E7B3R1", "GROUP10-H6K9A4", "GROUP10-J1T8X5", "GROUP10-N4Q2L7",
    "GROUP10-A3K7M6", "GROUP10-B2Q8Y5", "GROUP10-C9V4N1", "GROUP10-D6T3P8", "GROUP10-E1X5L9",
    "GROUP10-F7R2A6", "GROUP10-G4M8W3", "GROUP10-H2P9Y6", "GROUP10-J5Q1N7", "GROUP10-K6T4X2",
    "GROUP10-L3V8A5", "GROUP10-M9R1P4", "GROUP10-N7K3Y8", "GROUP10-P2X6L1", "GROUP10-Q9M5T8",
    "GROUP10-R4W7A1", "GROUP10-S8P3V6", "GROUP10-T5K9Y2", "GROUP10-U7Q1X4", "GROUP10-V9L5R2",
    "GROUP10-W6M3A8", "GROUP10-X2T7P4", "GROUP10-Y8K5Q3", "GROUP10-Z6R1V7", "GROUP10-A4X8N2",
    "GROUP10-B9L6T1", "GROUP10-C7Q3W5", "GROUP10-D1V8Y6", "GROUP10-E5M2P7", "GROUP10-F3K6A9",
    "GROUP10-G9R4N2", "GROUP10-H5T7W1", "GROUP10-J2V6Y9", "GROUP10-K8P4L3", "GROUP10-L1Q7A6",
    "GROUP10-M5X3R8", "GROUP10-N9T2W4", "GROUP10-P6K1Y7", "GROUP10-Q3V8L2", "GROUP10-R7M5A9",
    "GROUP10-S4X1P6", "GROUP10-T9K7N3", "GROUP10-U3R6W8", "GROUP10-V5Q2Y1", "GROUP10-W8T4L7",
    "GROUP10-X1P9A5", "GROUP10-Y7M2V4", "GROUP10-Z5K8R6", "GROUP10-A2Q9W4", "GROUP10-B6X3N7",
    "GROUP10-C8T5Y1", "GROUP10-D4K7L9", "GROUP10-E9R6A2", "GROUP10-F2V8P5", "GROUP10-G5Q1Y6",
    "GROUP10-H9M4W7", "GROUP10-J3X8L1", "GROUP10-K5T2A7", "GROUP10-L8R4N9", "GROUP10-M3P6Y2",
    "GROUP10-N1Q9V5", "GROUP10-P8K3W6", "GROUP10-Q6X2A9", "GROUP10-R1T5L8", "GROUP10-S9M7Y4",
    "GROUP10-T2P8V6", "GROUP10-U6K3N1", "GROUP10-V4R9W5", "GROUP10-W7Q2A3", "GROUP10-X5M8Y1",
    "GROUP10-Y3T6L9", "GROUP10-Z8P1V4", "GROUP10-A7R5W2", "GROUP10-B4K9N6", "GROUP10-C1X7Y3",
    "GROUP10-D9Q5A8", "GROUP10-E3T6L2", "GROUP10-F6M4V7", "GROUP10-G2P9W8", "GROUP10-H7R3A5",
    "GROUP10-J8K6N2", "GROUP10-K1Q5Y9", "GROUP10-L4X2V8", "GROUP10-M8T7A3", "GROUP10-N3R5W9",
    "GROUP10-P9M2L6", "GROUP10-Q1K8Y4", "GROUP10-R6X3V2", "GROUP10-S2T9A7", "GROUP10-T7Q4N8",
    "GROUP10-U9M5W3", "GROUP10-V1K6Y8", "GROUP10-W4P7L2", "GROUP10-X6R9A3", "GROUP10-Y2Q5V7",
    "GROUP10-Z9T3N1", "GROUP10-A5M8W9", "GROUP10-B1X4Y7", "GROUP10-C6P2L8", "GROUP10-D5R9V3"
];

const PRE_CONF_GROUP_CODES = [
    "GROUP10-Z4M7T1", "GROUP10-V6Q1L8", "GROUP10-E5K9P3", "GROUP10-R8N4W2", "GROUP10-X2T7M9",
    "GROUP10-H1P6Q4", "GROUP10-Q8L3R7", "GROUP10-T5X9K2", "GROUP10-A7M4N8", "GROUP10-F1W6P5",
    "GROUP10-Y3Q8T9", "GROUP10-D9L2X1", "GROUP10-M4R7K6", "GROUP10-B8P5W1", "GROUP10-U6N9Q3",
    "GROUP10-C2X4T7", "GROUP10-G5M1L9", "GROUP10-L7K3R8", "GROUP10-P1Q6N4", "GROUP10-R4T8W9",
    "GROUP10-X9M2P7", "GROUP10-V3L5K1", "GROUP10-H6R8Q2", "GROUP10-Z1W4T5", "GROUP10-E8P7M3",
    "GROUP10-T3N1X9", "GROUP10-A4Q6L7", "GROUP10-F9K5R2", "GROUP10-Y6T1W8", "GROUP10-D2M9P4",
    "GROUP10-M8X3Q5", "GROUP10-B7L1N6", "GROUP10-U4R2K9", "GROUP10-C5P8T3", "GROUP10-G9W6M1",
    "GROUP10-L2Q7X4", "GROUP10-P8N5R9", "GROUP10-R6K1L3", "GROUP10-X5T2W7", "GROUP10-V1M8Q6",
    "GROUP10-H7P9N2", "GROUP10-Z3R4K5", "GROUP10-E6X1T8", "GROUP10-T8L9M4", "GROUP10-A1W5Q7",
    "GROUP10-F4N2P8", "GROUP10-Y7K6R3", "GROUP10-D5T8X9", "GROUP10-M1Q4W6", "GROUP10-B3P7L2",
    "GROUP10-U9R5N1", "GROUP10-C8M6K4", "GROUP10-G2X9T5", "GROUP10-L6W1P3", "GROUP10-P4Q8R2",
    "GROUP10-R3N7M5", "GROUP10-X7K4L9", "GROUP10-V8T2Q1", "GROUP10-H5M3W7", "GROUP10-Z9P6X2",
    "GROUP10-E1R8N4", "GROUP10-T6Q5K9", "GROUP10-A9L7M3", "GROUP10-F2W8R1", "GROUP10-Y5P3T6",
    "GROUP10-D7X4Q8", "GROUP10-M6N2L5", "GROUP10-B1K9W7", "GROUP10-U3T5P2", "GROUP10-C4R1X8",
    "GROUP10-G8Q7M6", "GROUP10-L1P9N3", "GROUP10-P2W4K8", "GROUP10-R5M6T1", "GROUP10-X3Q9L7",
    "GROUP10-V7R1P4", "GROUP10-H4N8W5", "GROUP10-Z6T3K2", "GROUP10-E3M5Q1", "GROUP10-T1X7R9",
    "GROUP10-A2P6L4", "GROUP10-F5Q3N8", "GROUP10-Y8W2M1", "GROUP10-D4K7T6", "GROUP10-M9R1X5",
    "GROUP10-B6L8Q3", "GROUP10-U5P4W9", "GROUP10-C3N1K7", "GROUP10-G7T9R4", "GROUP10-L9M5X2",
    "GROUP10-P6Q1W3", "GROUP10-R2K8N7", "GROUP10-X1L4T9", "GROUP10-V5M7P6", "GROUP10-H2Q9R1",
    "GROUP10-Z8W5L4", "GROUP10-E4T2N7", "GROUP10-T9P1K3", "GROUP10-A3X8M6", "GROUP10-F6R4Q9",
    "GROUP10-Y2N7W5"
];


export default function RegistrationPage() {
    const router = useRouter();
    const earlyBirdEnd = new Date('2026-08-31T23:59:59').getTime();
    const lateBirdEnd = new Date('2026-11-26T23:59:59').getTime();
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [groupCode, setGroupCode] = useState('');
    const [codeMessage, setCodeMessage] = useState({ text: '', type: '' });
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [isPreConfGroupDiscountApplied, setIsPreConfGroupDiscountApplied] = useState(false);

    const isEarlyBirdLocked = currentTime > earlyBirdEnd;
    const isLateBirdLocked = currentTime <= earlyBirdEnd || currentTime > lateBirdEnd;
    const isSpotLocked = currentTime <= lateBirdEnd;

    // Navigate to registration form with amount + label
    const openPayment = (
        e: React.MouseEvent,
        priceStr: string | undefined,
        isConf: boolean,
        locked: boolean,
        label: string,
        category: string
    ) => {
        e.preventDefault();
        if (locked || !priceStr) return;
        const numMatch = priceStr.replace(/,/g, '').match(/\d+/);
        if (!numMatch) return;
        let amount = parseInt(numMatch[0]);

        // 10% Group Discounts
        if (isDiscountApplied && isConf) amount = Math.round(amount * 0.9);
        if (!isConf && isPreConfGroupDiscountApplied) {
            amount = Math.round(amount * 0.9);
        }

        router.push(`/registration/form?amount=${amount}&label=${encodeURIComponent(label)}&category=${encodeURIComponent(category)}`);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleApplyCode = () => {
        const code = groupCode.trim().toUpperCase();
        if (!code) return;

        const isConfCode = VALID_GROUP_CODES.includes(code);
        const isPreConfCode = PRE_CONF_GROUP_CODES.includes(code);

        if (!isConfCode && !isPreConfCode) {
            setCodeMessage({ text: 'Invalid group discount code.', type: 'error' });
            return;
        }

        const usedCodes = JSON.parse(localStorage.getItem('used_group_codes') || '[]');
        if (usedCodes.includes(code)) {
            setCodeMessage({ text: 'This code has already been used. One code is valid once.', type: 'error' });
            return;
        }

        usedCodes.push(code);
        localStorage.setItem('used_group_codes', JSON.stringify(usedCodes));
        
        if (isConfCode) {
            setIsDiscountApplied(true);
            setCodeMessage({ text: 'Code applied! 10% discount added to Conference fees.', type: 'success' });
        } else if (isPreConfCode) {
            setIsPreConfGroupDiscountApplied(true);
            setCodeMessage({ text: 'Code applied! 10% discount added to Pre-Conference fees.', type: 'success' });
        }
        
        setGroupCode('');
    };

    // Parse rupee string like "₹4000" → number 4000
    const parseAmount = (priceStr: string): number => {
        const match = priceStr.replace(/,/g, '').match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    const renderFee = (priceStr: string | undefined, isConf: boolean) => {
        if (!priceStr) return priceStr;
        const num = parseAmount(priceStr);
        if (!num) return priceStr;

        let hasDiscount = false;
        let discounted = num;

        if (isDiscountApplied && isConf) {
            hasDiscount = true;
            discounted = Math.round(discounted * 0.9);
        }

        if (!hasDiscount) return priceStr;

        return (
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.75rem' }}>{priceStr}</span>
                <span style={{ color: '#FACC15', fontWeight: 800 }}>₹{discounted}</span>
                {isDiscountApplied && isConf && (
                    <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>Group Discount</span>
                )}
            </span>
        );
    };

    const renderPreConfFee = (priceStr: string | undefined) => {
        if (!priceStr) return priceStr;
        const num = parseAmount(priceStr);
        if (!num) return priceStr;

        let hasDiscount = false;
        let discounted = num;

        if (isPreConfGroupDiscountApplied) {
            hasDiscount = true;
            discounted = Math.round(discounted * 0.9);
        }

        if (!hasDiscount) return priceStr;

        return (
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.75rem' }}>{priceStr}</span>
                <span style={{ color: '#FACC15', fontWeight: 800 }}>₹{discounted}</span>
                {isPreConfGroupDiscountApplied && (
                    <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>Group Discount</span>
                )}
            </span>
        );
    };

    const formatCountdown = () => {
        const diff = lateBirdEnd - currentTime;
        if (diff <= 0) return null;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) return `${days}d ${hours}h`;
        return `${minutes}m ${seconds}s`;
    };

    const keyDates = [
        { label: 'Early Bird registration closing soon', value: '31st Aug' },
        { label: 'Abstract Submission Deadline', value: '15th September' },
        { label: 'Notification for Acceptance (Abstract)', value: '15th October' },
        { label: 'Pre-Conference Date', value: '26th November' },
        { label: 'Conference Date', value: '27-28th November' },
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
                                    <th className={`${styles.groupHeader}`} colSpan={2} style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        Early Bird {isEarlyBirdLocked && <Lock size={14} style={{ display: 'inline', marginLeft: '4px' }} />}<br /><span style={{ fontSize: '0.75rem', fontWeight: 500 }}>(Till 31st August 2026)</span>
                                    </th>
                                    <th className={`${styles.groupHeader}`} colSpan={2} style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        Standard Registration {isLateBirdLocked && <Lock size={14} style={{ display: 'inline', marginLeft: '4px' }} />}<br /><span style={{ fontSize: '0.75rem', fontWeight: 500 }}>(After 31st August 2026)</span>
                                    </th>
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
                                                Spot {isSpotLocked && <Lock size={14} />}
                                            </div>
                                            {isSpotLocked && (
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
                                            <a
                                                href="#"
                                                className={`${styles.feeGridButton} ${isEarlyBirdLocked ? styles.lockedButton : ''}`}
                                                onClick={(e) => openPayment(e, item.earlyBird.conf, true, isEarlyBirdLocked, `${item.category} — Early Bird Conference`, item.category)}
                                                style={isEarlyBirdLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                            >
                                                <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                    {renderFee(item.earlyBird.conf, true)}
                                                    {isEarlyBirdLocked && <Lock size={14} />}
                                                </span>
                                            </a>
                                        </td>

                                        <td data-label="Early Bird Pre-Conf" className={styles.attendingCol} style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                            {item.earlyBird.preConf ? (
                                                <a
                                                    href="#"
                                                    className={`${styles.feeGridButton} ${isEarlyBirdLocked ? styles.lockedButton : ''}`}
                                                    onClick={(e) => openPayment(e, item.earlyBird.preConf, false, isEarlyBirdLocked, `${item.category} — Early Bird Pre-Conference`, item.category)}
                                                    style={isEarlyBirdLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                                >
                                                    <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                        {renderPreConfFee(item.earlyBird.preConf)}
                                                        {isEarlyBirdLocked && <Lock size={14} />}
                                                    </span>
                                                </a>
                                            ) : (
                                                <span style={{ display: 'flex', justifyContent: 'center', opacity: 0.3, fontWeight: 'bold' }}>-</span>
                                            )}
                                        </td>

                                        <td data-label="Late Bird Conf" className={styles.attendingCol}>
                                            <a
                                                href="#"
                                                className={`${styles.feeGridButton} ${isLateBirdLocked ? styles.lockedButton : ''}`}
                                                onClick={(e) => openPayment(e, item.lateBird.conf, true, isLateBirdLocked, `${item.category} — Late Bird Conference`, item.category)}
                                                style={isLateBirdLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                            >
                                                <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                    {renderFee(item.lateBird.conf, true)}
                                                    {isLateBirdLocked && <Lock size={14} />}
                                                </span>
                                            </a>
                                        </td>

                                        <td data-label="Late Bird Pre-Conf" className={styles.attendingCol}>
                                            {item.lateBird.preConf ? (
                                                <a
                                                    href="#"
                                                    className={`${styles.feeGridButton} ${isLateBirdLocked ? styles.lockedButton : ''}`}
                                                    onClick={(e) => openPayment(e, item.lateBird.preConf, false, isLateBirdLocked, `${item.category} — Late Bird Pre-Conference`, item.category)}
                                                    style={isLateBirdLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                                >
                                                    <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                        {renderPreConfFee(item.lateBird.preConf)}
                                                        {isLateBirdLocked && <Lock size={14} />}
                                                    </span>
                                                </a>
                                            ) : (
                                                <span style={{ display: 'flex', justifyContent: 'center', opacity: 0.3, fontWeight: 'bold' }}>-</span>
                                            )}
                                        </td>

                                        <td data-label="Spot" className={styles.contributorCol}>
                                            <a
                                                href="#"
                                                className={`${styles.feeGridButton} ${isSpotLocked ? styles.lockedButton : ''}`}
                                                onClick={(e) => openPayment(e, item.spot, false, isSpotLocked, `${item.category} — Spot`, item.category)}
                                                style={isSpotLocked ? { cursor: 'not-allowed', color: 'grey', opacity: 0.4 } : {}}
                                            >
                                                <span className={styles.feeText} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    {item.spot}
                                                    {isSpotLocked && <Lock size={14} />}
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
                            <h3 className={styles.infoSectionTitle} style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                                <AlertCircle className={styles.infoIcon} size={24} />
                                Group Discount
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                Enter a valid group code to get a flat 10% discount on Early Bird and Late Bird fees.
                                <br/>
                                <strong style={{ color: '#ef4444' }}>Note: One code is valid once.</strong>
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Group Code"
                                    value={groupCode}
                                    onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(0,0,0,0.2)',
                                        color: 'white',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <button
                                    onClick={handleApplyCode}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '4px',
                                        border: 'none',
                                        background: 'var(--color-secondary)',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                            {codeMessage.text && (
                                <p style={{ fontSize: '0.85rem', color: codeMessage.type === 'error' ? '#ef4444' : '#22c55e', fontWeight: 600, marginBottom: '1rem' }}>
                                    {codeMessage.text}
                                </p>
                            )}

                            <div className={styles.noteBox}>
                                <strong>Note:</strong> The above amount covers only the registration fee. Additional charges will apply for papers accepted for the publication as per respective guidelines.
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}
