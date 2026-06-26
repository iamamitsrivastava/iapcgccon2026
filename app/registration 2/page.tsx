'use client';
import Header from '@/components/sections/Header';
import Footer from "../../components/sections/Footer";
import { CreditCard, Landmark, FileText, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

export default function RegistrationPage() {
    const keyDates = [
        { label: 'Registration Deadline', value: '25th May, 2026' },
        { label: 'Last Date for Submission', value: '30th May, 2026' },
        { label: 'Conference Date', value: '5th - 6th June, 2026' },
    ];

    const fees = [
        { category: 'Students (within Parul University)', fee: '750', link: '#' },
        { category: 'Faculty (within Parul University)', fee: '900', link: '#' },
        { category: 'Students (Outside)', fee: '900', link: '#' },
        { category: 'Academician/Faculty (Outside)', fee: '1200', link: '#' },
        { category: 'Industry/NGO (Outside)', fee: '1500', link: '#' },
        { category: 'International Delegates', fee: '25$', link: '#' },
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <Header variant="solid" />

            <div className={styles.container}>
                {/* Title Section */}
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Registration</h1>
                </div>

                {/* Key Dates Section */}
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

                {/* Fees Table Section */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2 className={styles.tableTitle}>Registration Fees</h2>
                        <p style={{ marginTop: '0.5rem', opacity: 0.9, fontSize: '0.9rem' }}>Bank Details for Payment</p>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.feeTable}>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Fee (Rs.)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fees.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.categoryCell} data-label="Category">{item.category}</td>
                                        <td className={styles.feeCell} data-label="Fee (Rs.)">{item.fee}</td>
                                        <td data-label="Action" className={styles.actionCell}>
                                            <a href={item.link} className={styles.payLink} target="_blank" rel="noopener noreferrer">
                                                <CreditCard size={16} /> Pay Now
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Information Sections */}
                <div className={styles.infoSection}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoSectionTitle}>
                                <Landmark className={styles.infoIcon} size={24} />
                                Bank Details
                            </h3>
                            <ul className={styles.bankDetailsList}>
                                <li><strong>Account Name:</strong> <span>R&amp;D Unit of Parul University</span></li>
                                <li><strong>Bank Name:</strong> <span>Central Bank of India</span></li>
                                <li><strong>Branch:</strong> <span>PIET, Limbda</span></li>
                                <li><strong>Account Number:</strong> <span>3793150745</span></li>
                                <li><strong>IFSC Code:</strong> <span>CBIN0284063</span></li>
                            </ul>
                        </div>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoSectionTitle}>
                                <AlertCircle className={styles.infoIcon} size={24} />
                                Refund Policy
                            </h3>
                            <p className={styles.infoText}>
                                Refunds will be issued only for cancellations requests submitted at least one week prior to the early-bird registration deadline. No refund will be process after that.
                            </p>
                            <div className={styles.noteBox}>
                                <strong>Note:</strong> The amount mentioned above covers only the registration fee. If your paper is selected for publication, additional fees apply for accepted papers.
                            </div>
                        </div>
                    </div>
                </div>


                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Ready to Join Us?</h2>
                    <p className={styles.ctaText}>
                        Click the button below to proceed to the external registration portal.
                    </p>
                    <a href="/registration#register" className={styles.registerButton}>
                        Register Now &rarr;
                    </a>
                </div>
            </div>

            <Footer />
        </main>
    );
}
