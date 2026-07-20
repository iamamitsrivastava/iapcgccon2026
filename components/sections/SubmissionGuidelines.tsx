'use client';

import { useState, useRef } from 'react';
import styles from './SubmissionGuidelines.module.css';
import heroStyles from './Hero.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { X, CheckCircle2, Eye, Lock, Copy, Upload, Loader2 } from 'lucide-react';
import { ABSTRACT_ACCESS_CODES, FULL_PAPER_ACCESS_CODES } from './Hero';
import { ACCESS_CODE_MAPPING } from '@/lib/registrationData';

export function SubmissionGuidelines() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionType, setSubmissionType] = useState<'ABSTRACT' | 'FULL_PAPER'>('ABSTRACT');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [accessEmail, setAccessEmail] = useState('');
    const [foundAccessCodes, setFoundAccessCodes] = useState<string[]>([]);
    const [sendCodeError, setSendCodeError] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [accessCode, setAccessCode] = useState('');
    const [codeError, setCodeError] = useState('');

    // File upload state
    const docFileRef = useRef<HTMLInputElement>(null);
    const [docFile, setDocFile] = useState<File | null>(null);
    const [docFileUrl, setDocFileUrl] = useState<string | null>(null);
    const [uploadingDoc, setUploadingDoc] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleDocumentUpload = async (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('File too large. Max 10 MB.');
            return;
        }
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowed.includes(file.type)) {
            setUploadError('Only PDF or DOCX files are supported.');
            return;
        }
        setUploadError('');
        setDocFile(file);
        setDocFileUrl(null);
        setUploadingDoc(true);
        const fd = new FormData();
        fd.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (data.success && data.url) {
                setDocFileUrl(data.url);
                setFormData(prev => ({ ...prev, documentLink: data.url }));
            } else {
                setUploadError(data.error || 'Upload failed. Please paste a link instead.');
                setDocFile(null);
            }
        } catch {
            setUploadError('Upload failed. Please paste a link instead.');
            setDocFile(null);
        } finally {
            setUploadingDoc(false);
        }
    };

    const handleGetAccessCode = async () => {
        if (!accessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accessEmail.trim())) {
            setSendCodeError('❌ Please enter a valid email address.');
            setFoundAccessCodes([]);
            return;
        }

        const emailKey = accessEmail.trim().toLowerCase();
        const codes = ACCESS_CODE_MAPPING[emailKey];

        if (codes) {
            setFoundAccessCodes(codes);
            setSendCodeError('');
        } else {
            setFoundAccessCodes([]);
            setSendCodeError('❌ Access code not found for this email.');
        }
    };

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
                        window.open('/Eligibility_and_Process_Guidelines.pdf', '_blank');
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

        if (!formData.documentLink) {
            setUploadError('Please upload a file or paste a document link.');
            return;
        }

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
                    setDocFile(null);
                    setDocFileUrl(null);
                    setUploadError('');
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
                                            value={accessEmail}
                                            onChange={(e) => {
                                                setAccessEmail(e.target.value);
                                                setSendCodeError('');
                                                setFoundAccessCodes([]);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleGetAccessCode();
                                                }
                                            }}
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
                                        <button
                                            type="button"
                                            className={heroStyles.submitModalBtn}
                                            style={{ marginTop: '1rem' }}
                                            onClick={handleGetAccessCode}
                                        >
                                            Get Code
                                        </button>
                                        {sendCodeError && (
                                            <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: 500, whiteSpace: 'pre-line' }}>
                                                {sendCodeError}
                                            </p>
                                        )}
                                        {foundAccessCodes.length > 0 && (
                                            <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
                                                <h3 style={{ color: '#10b981', margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: 600 }}>
                                                    Your Access Code{foundAccessCodes.length > 1 ? 's' : ''}:
                                                </h3>
                                                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {foundAccessCodes.map((code) => (
                                                        <li key={code} style={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            background: 'rgba(15, 23, 42, 0.4)',
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '6px'
                                                        }}>
                                                            <span style={{ fontWeight: 'bold', letterSpacing: '1px', color: '#f8fafc' }}>
                                                                {code}
                                                            </span>
                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(code);
                                                                    setCopiedCode(code);
                                                                    setTimeout(() => setCopiedCode(null), 2000);
                                                                }}
                                                                style={{
                                                                    background: 'transparent',
                                                                    border: 'none',
                                                                    color: copiedCode === code ? '#10b981' : '#94a3b8',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    padding: '0.25rem',
                                                                    transition: 'color 0.2s',
                                                                    outline: 'none'
                                                                }}
                                                                title="Copy code"
                                                            >
                                                                {copiedCode === code ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
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
                                        <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                                            Upload Document or Provide Link <span style={{ color: '#FACC15' }}>*</span>
                                            <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: '0.5rem' }}>(PDF/DOCX only, Max 10 MB)</span>
                                        </label>

                                        {/* Drag-and-drop upload zone */}
                                        <input
                                            ref={docFileRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            style={{ display: 'none' }}
                                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleDocumentUpload(f); }}
                                        />
                                        <div
                                            onClick={() => docFileRef.current?.click()}
                                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                            onDragLeave={() => setIsDragging(false)}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                setIsDragging(false);
                                                const f = e.dataTransfer.files?.[0];
                                                if (f) handleDocumentUpload(f);
                                            }}
                                            style={{
                                                border: `2px dashed ${isDragging ? '#FACC15' : docFileUrl ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                                                borderRadius: '12px',
                                                padding: '2rem',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                background: isDragging ? 'rgba(250,204,21,0.05)' : docFileUrl ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.03)',
                                                transition: 'all 0.2s',
                                                marginBottom: '0.75rem',
                                            }}
                                        >
                                            {uploadingDoc ? (
                                                <>
                                                    <Loader2 size={28} style={{ color: '#FACC15', margin: '0 auto 0.5rem', animation: 'spin 1s linear infinite', display: 'block' }} />
                                                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Uploading...</p>
                                                </>
                                            ) : docFileUrl ? (
                                                <>
                                                    <CheckCircle2 size={28} style={{ color: '#10b981', margin: '0 auto 0.5rem', display: 'block' }} />
                                                    <p style={{ color: '#10b981', margin: '0 0 0.25rem', fontWeight: 600, fontSize: '0.9rem' }}>{docFile?.name}</p>
                                                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.78rem' }}>Click to replace</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={28} style={{ color: '#FACC15', margin: '0 auto 0.75rem', display: 'block' }} />
                                                    <p style={{ color: '#e2e8f0', margin: '0 0 0.25rem', fontWeight: 600, fontSize: '0.95rem' }}>Click to upload or drag & drop</p>
                                                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.8rem' }}>PDF or DOCX · Max 10 MB</p>
                                                </>
                                            )}
                                        </div>
                                        {uploadError && (
                                            <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{uploadError}</p>
                                        )}

                                        {/* OR divider */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.75rem 0' }}>
                                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                            <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>OR paste a link</span>
                                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                        </div>

                                        <input
                                            type="url"
                                            id="guidelines_link"
                                            value={docFileUrl ? '' : formData.documentLink}
                                            disabled={!!docFileUrl}
                                            onChange={(e) => {
                                                setFormData({ ...formData, documentLink: e.target.value });
                                                setDocFile(null);
                                                setDocFileUrl(null);
                                            }}
                                            placeholder={docFileUrl ? '(File uploaded above)' : 'https://docs.google.com/... or other link'}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                backgroundColor: docFileUrl ? 'rgba(255,255,255,0.03)' : 'rgba(15, 23, 42, 0.6)',
                                                color: docFileUrl ? '#64748b' : 'white',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                cursor: docFileUrl ? 'not-allowed' : 'text',
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
