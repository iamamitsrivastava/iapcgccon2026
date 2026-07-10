'use client';

import { useState } from 'react';
import styles from './SubmissionGuidelines.module.css';
import heroStyles from './Hero.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { X, CheckCircle2, Eye, Lock } from 'lucide-react';
import { ABSTRACT_ACCESS_CODES, FULL_PAPER_ACCESS_CODES } from './Hero';

export function SubmissionGuidelines() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionType, setSubmissionType] = useState<'ABSTRACT' | 'FULL_PAPER'>('ABSTRACT');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [codeError, setCodeError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        registrationNo: '',
        email: '',
        documentLink: '',
    });

    const guidelinesData = [
        {
            number: "01",
            title: "Registration",
            text: "Complete the registration process first to ensure your participation."
        },
        {
            number: "02",
            title: "Prepare Abstract",
            text: "Submit abstract as per abstract submission guidlines",
            buttons: [
                {
                    text: "Abstract Submission Guidlines",
                    variant: "primary",
                    action: () => {
                        window.open('/Eligibility_and_Process_Guidelines.pdf?v=' + Date.now(), '_blank');
                    }
                }
            ]
        },
        {
            number: "03",
            title: "Submit for Review",
            text: "Send your abstract by clicking the below button. All submissions will undergo double-blind peer review.",
            buttons: [
                {
                    text: "Template for Abstract Submission",
                    variant: "secondary",
                    action: () => {
                        window.open('https://docs.google.com/document/d/1nfChHn7w-64ry0-d9W9xr6Mg8LbUs5n1/edit?usp=sharing&ouid=103132168783366602458&rtpof=true&sd=true', '_blank');
                    }
                },
                {
                    text: "Submit Abstract",
                    variant: "primary",
                    action: () => {
                        setSubmissionType('ABSTRACT');
                        setIsCodeVerified(false);
                        setAccessCode('');
                        setCodeError('');
                        setIsModalOpen(true);
                    }
                }
            ]
        },
        {
            number: "04",
            title: "Wait for Acceptance",
            text: "Notifications of acceptance will be sent via email by the specified date."
        },
        {
            number: "05",
            title: "Full Paper Submission",
            text: "Upon acceptance, submit the full paper (min 7000 words) adhering to formatting guidelines.",
            buttons: [
                {
                    text: "Submit Full Paper",
                    variant: "primary",
                    action: () => {
                        setSubmissionType('FULL_PAPER');
                        setIsCodeVerified(false);
                        setAccessCode('');
                        setCodeError('');
                        setIsModalOpen(true);
                    }
                }
            ]
        }
    ];

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { name: fullName, registrationNo, email, documentLink } = formData;

            const res = await fetch("https://script.google.com/macros/s/AKfycbzoIwZzQ10_hAxt1efM8iYh5qyfbXGDjmmUPf_VVodjyRvDz12OlfK_ZcfxdePfwTCBUw/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    type: submissionType,
                    fullName,
                    registrationNumber: registrationNo,
                    email,
                    documentLink
                }),
            });
            const text = await res.text();

            if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
                if (res.ok) setSubmissionSuccess(true);
                else throw new Error("Server returned an HTML error page.");
            } else {
                let result;
                try {
                    result = JSON.parse(text);
                } catch {
                    if (res.ok) setSubmissionSuccess(true);
                    else throw new Error("Invalid JSON response from server.");
                }

                if (result && (result.status === "success" || result.success === true)) {
                    setSubmissionSuccess(true);
                } else if (result) {
                    throw new Error(result.message || result.error || "Submission failed");
                }
            }

            if (submissionSuccess || res.ok) {
                setSubmissionSuccess(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSubmissionSuccess(false);
                    setFormData({ name: "", registrationNo: "", email: "", documentLink: "" });
                }, 2000);
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            alert("Submission failed: " + (error.message || "Unexpected response from server."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={`section ${styles.guidelines}`} id="submit">
            <div className="container">

                <div className={styles.list}>
                    {guidelinesData.map((item, index) => (
                        <ScrollReveal
                            key={index}
                            animation="fade-up"
                            delay={(index * 100) as 0 | 100 | 200 | 300 | 400 | 500}
                        >
                            <div className={styles.card}>
                                <div className={styles.number}>
                                    {item.number}
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.stepTitle}>{item.title}</h3>
                                    <p className={styles.stepText}>{item.text}</p>
                                    {item.buttons && item.buttons.length > 0 && (
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                            {item.buttons.map((btn, btnIdx) => (
                                                btn.text === 'Abstract Submission Guidlines' ? (
                                                    <button
                                                        key={btnIdx}
                                                        onClick={btn.action}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.6rem',
                                                            background: 'transparent',
                                                            color: '#FACC15',
                                                            padding: '0.75rem 1.5rem',
                                                            borderRadius: '8px',
                                                            fontWeight: 700,
                                                            fontSize: '0.9rem',
                                                            border: '2px solid #FACC15',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        <Eye size={16} />
                                                        View Abstract Submission Guidlines
                                                    </button>
                                                ) : (
                                                    <button
                                                        key={btnIdx}
                                                        className={btn.variant === 'secondary' ? heroStyles.btnSecondary : heroStyles.btnPrimary}
                                                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
                                                        onClick={btn.action}
                                                    >
                                                        {btn.text}
                                                        {(btn.text === 'Submit Abstract' || btn.text === 'Submit Full Paper') && <Lock size={16} />}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Submission Modal matching the one in Hero */}
            {isModalOpen && (
                <div
                    className={heroStyles.modalOverlay}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className={heroStyles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={heroStyles.closeButton}
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        {submissionSuccess ? (
                            <div className={heroStyles.successState}>
                                <div className={heroStyles.successIconWrapper}>
                                    <CheckCircle2 size={64} className={heroStyles.successCheck} />
                                </div>
                                <h2 className={heroStyles.successTitle}>Success!</h2>
                                <p className={heroStyles.successSubtitle}>
                                    Your document has been successfully submitted.
                                </p>
                            </div>
                        ) : !isCodeVerified ? (
                            <>
                                <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                    <h2 className={heroStyles.modalTitle}>Get Your Access Code</h2>
                                    <div className={heroStyles.formGroup}>
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                            }}
                                        />
                                    </div>
                                </div>

                                <h2 className={heroStyles.modalTitle}>Enter Access Code</h2>
                                <p className={heroStyles.modalSubtitle}>
                                    Please enter your unique access code to proceed. <br />
                                    <span style={{ color: '#ffbf00', fontWeight: 'bold' }}>Note: One code is valid only once.</span>
                                </p>
                                <div className={heroStyles.formGroup} style={{ marginBottom: '1.5rem' }}>
                                    <input
                                        type="text"
                                        value={accessCode}
                                        onChange={(e) => {
                                            setAccessCode(e.target.value);
                                            setCodeError('');
                                        }}
                                        placeholder="Enter Access Code"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                            color: 'white',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const code = accessCode.trim().toUpperCase();
                                                const validCodes = submissionType === 'FULL_PAPER' ? FULL_PAPER_ACCESS_CODES : ABSTRACT_ACCESS_CODES;
                                                if (validCodes.includes(code)) {
                                                    const usedCodes = JSON.parse(localStorage.getItem('used_access_codes') || '[]');
                                                    if (usedCodes.includes(code)) {
                                                        setCodeError('This code has already been used. One code is valid only once.');
                                                    } else {
                                                        usedCodes.push(code);
                                                        localStorage.setItem('used_access_codes', JSON.stringify(usedCodes));
                                                        setIsCodeVerified(true);
                                                    }
                                                } else {
                                                    setCodeError('Invalid access code. Please try again.');
                                                }
                                            }
                                        }}
                                    />
                                    {codeError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500 }}>{codeError}</p>}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const code = accessCode.trim().toUpperCase();
                                        const validCodes = submissionType === 'FULL_PAPER' ? FULL_PAPER_ACCESS_CODES : ABSTRACT_ACCESS_CODES;
                                        if (validCodes.includes(code)) {
                                            const usedCodes = JSON.parse(localStorage.getItem('used_access_codes') || '[]');
                                            if (usedCodes.includes(code)) {
                                                setCodeError('This code has already been used. One code is valid only once.');
                                            } else {
                                                usedCodes.push(code);
                                                localStorage.setItem('used_access_codes', JSON.stringify(usedCodes));
                                                setIsCodeVerified(true);
                                            }
                                        } else {
                                            setCodeError('Invalid access code. Please try again.');
                                        }
                                    }}
                                    className={heroStyles.submitModalBtn}
                                >
                                    Verify Code
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className={heroStyles.modalTitle}>
                                    {submissionType === 'ABSTRACT' ? 'Submit Abstract' : 'Submit Full Paper'}
                                </h2>
                                <p className={heroStyles.modalSubtitle}>
                                    Please fill the details below. Your submission will be recorded securely.
                                </p>

                                <form onSubmit={handleFormSubmit} className={heroStyles.modalForm}>
                                    <div className={heroStyles.formGroup}>
                                        <label htmlFor="guidelines_name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="guidelines_name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className={heroStyles.formGroup}>
                                        <label htmlFor="guidelines_regNo">Registration No. *</label>
                                        <input
                                            type="text"
                                            id="guidelines_regNo"
                                            required
                                            value={formData.registrationNo}
                                            onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                                            placeholder="Enter your registration no."
                                        />
                                    </div>

                                    <div className={heroStyles.formGroup}>
                                        <label htmlFor="guidelines_email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="guidelines_email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className={heroStyles.formGroup}>
                                        <div style={{
                                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                                            borderLeft: "4px solid #3b82f6",
                                            padding: "1rem",
                                            borderRadius: "0 8px 8px 0",
                                            marginBottom: "1.25rem"
                                        }}>
                                            <h4 style={{ color: "#60a5fa", margin: "0 0 0.5rem 0", fontSize: "0.95rem", fontWeight: 600 }}>How to convert a PDF to a Google Doc Link:</h4>
                                            <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                                <li>Upload your PDF file to your <strong>Google Drive</strong>.</li>
                                                <li>Right-click the uploaded PDF, select <strong>"Open with"</strong> &rarr; <strong>"Google Docs"</strong>.</li>
                                                <li>Once open, click the blue <strong>"Share"</strong> button (top right).</li>
                                                <li>Under General access, change "Restricted" to <strong>"Anyone with the link"</strong>.</li>
                                                <li>Click <strong>"Copy link"</strong> and paste it in the field below.</li>
                                            </ol>
                                        </div>
                                        <label htmlFor="guidelines_link">Document Link *</label>
                                        <input
                                            type="url"
                                            id="guidelines_link"
                                            required
                                            value={formData.documentLink}
                                            onChange={(e) => setFormData({ ...formData, documentLink: e.target.value })}
                                            placeholder="https://docs.google.com/..."
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={heroStyles.submitModalBtn}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit to Committee"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

        </section>
    );
}
