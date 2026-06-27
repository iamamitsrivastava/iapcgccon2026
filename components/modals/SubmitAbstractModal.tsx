'use client';
import { useState } from 'react';
import styles from './SubmitAbstractModal.module.css';

interface SubmitAbstractModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubmitAbstractModal({ isOpen, onClose }: SubmitAbstractModalProps) {
    const [isLocked, setIsLocked] = useState(true);
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder access code check (replace with real validation later if needed)
        if (accessCode.trim().toUpperCase() === 'IAPSM2026') {
            setIsLocked(false);
            setError('');
        } else {
            setError('Invalid access code. Please try again.');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.content}>
                    {isLocked ? (
                        <form onSubmit={handleUnlock}>
                            <h2 className={styles.title}>Submit Abstract</h2>
                            <p className={styles.subtitle}>Please enter the access code to proceed.</p>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Access Code</label>
                                <input
                                    type="password"
                                    className={styles.input}
                                    placeholder="Enter access code (Hint: IAPSM2026)"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    autoFocus
                                />
                                {error && <span className={styles.errorText}>{error}</span>}
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Unlock Form
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()}>
                            <h2 className={styles.title}>Submit Abstract</h2>
                            <p className={styles.subtitle}>
                                Please fill the details below. Your submission will be recorded securely.
                            </p>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Full Name *</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address *</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className={styles.infoBox}>
                                <h4 className={styles.infoTitle}>How to convert a PDF to a Google Doc Link:</h4>
                                <ol className={styles.infoList}>
                                    <li>Upload your PDF file to your <strong>Google Drive</strong>.</li>
                                    <li>Right-click the uploaded PDF, select <strong>"Open with"</strong> &rarr; <strong>"Google Docs"</strong>.</li>
                                    <li>Once open, click the blue <strong>"Share"</strong> button (top right).</li>
                                    <li>Under General access, change "Restricted" to <strong>"Anyone with the link"</strong>.</li>
                                    <li>Click <strong>"Copy link"</strong> and paste it in the field below.</li>
                                </ol>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Document Link *</label>
                                <input
                                    type="url"
                                    className={styles.input}
                                    placeholder="https://docs.google.com/..."
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn} onClick={() => {
                                alert("Submission logic will be added here.");
                                onClose();
                            }}>
                                Submit to Committee
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
