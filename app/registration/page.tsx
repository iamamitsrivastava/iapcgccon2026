'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/sections/Header';
import Footer from "../../components/sections/Footer";
import { Landmark, AlertCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import { validateDiscountCode } from '@/lib/discountCodes';

export default function RegistrationPage() {
    const router = useRouter();
    const earlyBirdEnd = new Date('2026-08-31T23:59:59').getTime();
    const lateBirdEnd = new Date('2026-11-26T23:59:59').getTime();
    const [currentTime, setCurrentTime] = useState(1704067200000); // fixed initial time for hydration (2024-01-01)
    const [groupCode, setGroupCode] = useState('');
    const [codeMessage, setCodeMessage] = useState({ text: '', type: '' });
    const [is100DiscountApplied, setIs100DiscountApplied] = useState(false);
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [appliedDiscountCode, setAppliedDiscountCode] = useState('');
    const [isApplying, setIsApplying] = useState(false);

    const isEarlyBirdLocked = currentTime > earlyBirdEnd;
    const isLateBirdLocked = currentTime <= earlyBirdEnd || currentTime > lateBirdEnd;
    const isSpotLocked = currentTime <= lateBirdEnd;

    // Navigate to registration form with amount + label + discount params
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

        // 100% Discount applies to Conference fees
        if (is100DiscountApplied && isConf) {
            amount = 0;
        } else if (isDiscountApplied && !isConf) {
            // 10% Discount applies ONLY to Pre-Conference
            amount = Math.round(amount * 0.9);
        }

        const typeParam = isConf ? '' : '&type=preconf';
        const codeParam = (!isConf && appliedDiscountCode) ? `&discountCode=${encodeURIComponent(appliedDiscountCode)}&discount=10` : '';
        router.push(`/registration/form?amount=${amount}&label=${encodeURIComponent(label)}&category=${encodeURIComponent(category)}${typeParam}${codeParam}`);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleApplyCode = async () => {
        const code = groupCode.trim().toUpperCase();
        if (!code) {
            setCodeMessage({ text: 'Please enter a discount code.', type: 'error' });
            return;
        }

        setIsApplying(true);
        const localUsed: string[] = JSON.parse(localStorage.getItem('used_group_codes') || '[]');

        try {
            // Check with server API for global single-use validation
            const res = await fetch('/api/discount-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, action: 'verify', clientUsedCodes: localUsed })
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setCodeMessage({ text: data.message || 'Invalid or already used discount code.', type: 'error' });
                setIsApplying(false);
                return;
            }

            // Burn the code so it is strictly single-use
            await fetch('/api/discount-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, action: 'burn', clientUsedCodes: localUsed })
            });

            if (!localUsed.includes(code)) {
                localUsed.push(code);
                localStorage.setItem('used_group_codes', JSON.stringify(localUsed));
            }

            setAppliedDiscountCode(code);

            if (data.discountPercent === 100) {
                setIs100DiscountApplied(true);
                setCodeMessage({ text: `🎉 Code ${code} applied! 100% Free Discount applied to Conference fees.`, type: 'success' });
            } else {
                setIsDiscountApplied(true);
                setCodeMessage({ text: `🎉 Code ${code} applied! 10% Discount applied to Pre-Conference categories below!`, type: 'success' });
            }
        } catch {
            // Local fallback validation
            const result = validateDiscountCode(code, localUsed);
            if (!result.valid) {
                setCodeMessage({ text: result.message, type: 'error' });
                setIsApplying(false);
                return;
            }

            localUsed.push(code);
            localStorage.setItem('used_group_codes', JSON.stringify(localUsed));
            setAppliedDiscountCode(code);

            if (result.discountPercent === 100) {
                setIs100DiscountApplied(true);
                setCodeMessage({ text: `🎉 Code ${code} applied! 100% Free Discount applied to Conference fees.`, type: 'success' });
            } else {
                setIsDiscountApplied(true);
                setCodeMessage({ text: `🎉 Code ${code} applied! 10% Discount applied to Pre-Conference categories below!`, type: 'success' });
            }
        } finally {
            setIsApplying(false);
            setGroupCode('');
        }
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

        if (is100DiscountApplied && isConf) {
            return (
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                    <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.75rem' }}>{priceStr}</span>
                    <span style={{ color: '#FACC15', fontWeight: 800 }}>₹0</span>
                    <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.15)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>100% OFF (FREE)</span>
                </span>
            );
        }

        return priceStr;
    };

    const renderPreConfFee = (priceStr: string | undefined) => {
        if (!priceStr) return priceStr;
        const num = parseAmount(priceStr);
        if (!num) return priceStr;

        let hasDiscount = false;
        let discounted = num;

        if (isDiscountApplied) {
            hasDiscount = true;
            discounted = Math.round(discounted * 0.9);
        }

        if (!hasDiscount) return priceStr;

        return (
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
                <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.75rem' }}>{priceStr}</span>
                <span style={{ color: '#FACC15', fontWeight: 800 }}>₹{discounted}</span>
                {isDiscountApplied && (
                    <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>10% OFF</span>
                )}
            </span>
        );
    };

    const renderSpotFee = (priceStr: string | undefined) => {
        return priceStr;
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
        { label: 'Abstract Submission Deadline', value: '7th October' },
        { label: 'Notification for Acceptance (Abstract)', value: '15th October' },
        { label: 'Pre-Conference Date', value: '26th November' },
        { label: 'Conference Date', value: '27-28th November' },
    ];

    const fees = [
        {
            category: 'IAPSM Member(Faculty)',
            earlyBird: { conf: '₹4000', preConf: '₹1500' },
            lateBird: { conf: '₹4500', preConf: '₹2000' },
            spot: '₹5000',
        },
        {
            category: 'IAPSM Non Member(Faculty)',
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
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <Link href="/registration/status" style={{ display: 'inline-block', backgroundColor: 'var(--color-secondary)', color: 'black', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', transition: 'opacity 0.2s' }}>
                            Check Registration Status &rarr;
                        </Link>
                    </div>
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

                <div id="fee-structure" className={styles.tableContainer}>
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
                                                    {renderSpotFee(item.spot)}
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
                                Promo / Group Discount
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                Enter a valid promo code to apply 10% discount to Pre-Conference categories.
                                <br />
                                <strong style={{ color: '#ef4444' }}>Note: Each code is valid for one-time use only.</strong>
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Promo / Group Code"
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
                                    disabled={isApplying}
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
                                    {isApplying ? 'Applying...' : 'Apply'}
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
