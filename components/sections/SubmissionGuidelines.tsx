'use client';

import { useState } from 'react';
import styles from './SubmissionGuidelines.module.css';
import heroStyles from './Hero.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { X, CheckCircle2 } from 'lucide-react';

export function SubmissionGuidelines() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [submissionType, setSubmissionType] = useState<'ABSTRACT' | 'FULL_PAPER'>('ABSTRACT');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
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
                        const link = document.createElement("a");
                        link.href = "/Author_Guidelines_IAPSMGC_CON_2026.pdf";
                        link.download = "Author_Guidelines_IAPSMGC_CON_2026.pdf";
                        link.click();
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
                    action: () => setIsTemplateModalOpen(true)
                },
                {
                    text: "Submit Abstract",
                    variant: "primary",
                    action: () => {
                        setSubmissionType('ABSTRACT');
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
            const { name: fullName, email, documentLink } = formData;

            const res = await fetch("https://script.google.com/macros/s/AKfycbymq8pRHk--R9ItUFGBkmwFrCnfuqzUr4BojT4wOG8l5edYgFrp1D_1fDHTAVe8eyh1kg/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    type: submissionType,
                    fullName,
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
                    setFormData({ name: "", email: "", documentLink: "" });
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
                                                <button 
                                                    key={btnIdx}
                                                    className={btn.variant === 'secondary' ? heroStyles.btnSecondary : heroStyles.btnPrimary} 
                                                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                                                    onClick={btn.action}
                                                >
                                                    {btn.text}
                                                </button>
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

            {/* Template Modal */}
            {isTemplateModalOpen && (
                <div
                    className={heroStyles.modalOverlay}
                    onClick={() => setIsTemplateModalOpen(false)}
                >
                    <div
                        className={heroStyles.modalContent}
                        style={{ maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#fff', color: '#000' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={heroStyles.closeButton}
                            onClick={() => setIsTemplateModalOpen(false)}
                            style={{ color: '#000' }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <img src="/images/iapsmgc-logo.png" alt="IAPSMGC Logo" style={{ height: '70px', objectFit: 'contain' }} />
                                <img src="/parul-university-logo.svg" alt="Parul University Logo" style={{ height: '70px', objectFit: 'contain' }} />
                                <img src="/images/iapsm-2.png" alt="IAPSM Logo" style={{ height: '70px', objectFit: 'contain' }} />
                            </div>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    33rd Annual State Conference of the Indian Association of Preventive and Social Medicine, Gujarat Chapter
                                </h2>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    "Digital Health for All: Bridging Equity, Access, and Innovation,"
                                </h3>
                                <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    26-28 November,2026
                                </p>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                    Template for Abstract Submission
                                </h4>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', marginBottom: '2rem' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            <span style={{ float: 'left' }}>Delegate Name:</span>
                                            <span style={{ float: 'right' }}>Registration No.</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            Title:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            Authors (each author's name is separated with a space and comma, and the presenting author's name must be in <i>italics</i> and <u>underlined</u>)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            Institute (including address & city)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            Contact details of the presenting author<br />
                                            Mobile No: <span style={{ marginLeft: '4rem' }}>e-mail:</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            Keywords (not more than 5, each separated with a space and comma)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            The paper is submitted for<br />
                                            1. Poster &nbsp;&nbsp;&nbsp; 2. Oral &nbsp;&nbsp;&nbsp; 3. HM Patel Award Session<br />
                                            (The scientific committee will take the final decision in this regard)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem' }} colSpan={2}>
                                            AV aids required (Specify if anything other than LCD Projector is needed)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #000', padding: '0.5rem', verticalAlign: 'top' }} colSpan={2}>
                                            Abstract (Main body not exceeding 300 words) It must be structured as<br />
                                            1. Introduction/ background, including objectives<br />
                                            2. Methodology<br />
                                            3. Observations<br />
                                            4. Conclusions & Recommendations (if any)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ paddingLeft: '1rem', marginBottom: '2rem' }}>
                                <p style={{ marginBottom: '0.5rem' }}>1. Abstracts can be submitted only after the presenting author has registered and the conference secretariat has issued a registration number.</p>
                                <p style={{ marginBottom: '0.5rem' }}>2. All abstracts must be prepared as per the guidelines & submitted on the website.</p>
                                <p style={{ marginBottom: '0.5rem' }}>3. Not more than two presentations will be permitted with one registered delegate (as presenting author).</p>
                                <p style={{ marginBottom: '0.5rem' }}>4. A committee will scrutinize all abstracts regarding the acceptance of research work for presentation as a poster, oral presentation, or H M Patel Award session. All delegates will be informed via email about the status of their presentations.</p>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: '0.2rem' }}>Organized By:</p>
                                <p style={{ marginBottom: '0.2rem' }}>Parul Institute of Medical Sciences & Research</p>
                                <p>Parul University, Limda, Ta.Waghodia – 391760 Dist. Vadodara, Gujarat</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
