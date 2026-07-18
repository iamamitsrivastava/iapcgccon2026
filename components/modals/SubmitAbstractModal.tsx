'use client';
import React, { useState } from 'react';
import styles from './SubmitAbstractModal.module.css';

interface SubmitAbstractModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubmitAbstractModal({ isOpen, onClose }: SubmitAbstractModalProps) {
    const [isLocked, setIsLocked] = useState(true);
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (isOpen) {
            const unlockedUntil = localStorage.getItem('access_code_unlocked_until');
            if (unlockedUntil && parseInt(unlockedUntil, 10) > Date.now()) {
                setIsLocked(false);
            } else {
                setIsLocked(true);
            }
        }
    }, [isOpen]);

    const [fullName, setFullName] = useState('');
    const [registrationNo, setRegistrationNo] = useState('');
    const [email, setEmail] = useState('');
    const [documentLink, setDocumentLink] = useState('');
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder access code check (replace with real validation later if needed)
        if (accessCode.trim().toUpperCase() === 'IAPSMGC2026') {
            localStorage.setItem('access_code_unlocked_until', (Date.now() + 5 * 60 * 1000).toString());
            setIsLocked(false);
            setError('');
        } else {
            setError('Invalid access code. Please try again.');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setDocumentLink(''); // clear link if file is selected
        setUploadError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedFile && !documentLink) {
            setError('Please either upload a file or provide a link.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('registrationNo', registrationNo);
        formData.append('email', email);
        
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        if (documentLink) {
            formData.append('documentLink', documentLink);
        }

        try {
            const response = await fetch('/api/submit-abstract', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Submission failed');
            }

            setSubmitSuccess(true);
            setTimeout(() => {
                onClose();
                setSubmitSuccess(false);
                setFullName('');
                setRegistrationNo('');
                setEmail('');
                setDocumentLink('');
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                setIsLocked(true);
                setAccessCode('');
            }, 3000);
        } catch (err: any) {
            console.error('Submit Error:', err);
            setError(err.message || 'Failed to submit abstract. Please try again later.');
        } finally {
            setIsSubmitting(false);
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
                                    placeholder="Enter access code (Hint: IAPSMGC2026)"
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
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.title}>Submit Abstract</h2>
                            {submitSuccess ? (
                                <div className={styles.successMessage} style={{ color: '#10b981', marginBottom: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                                    <h3 style={{ margin: '0 0 0.5rem' }}>Success!</h3>
                                    <p style={{ margin: 0 }}>Your abstract has been successfully submitted. You may now close this window.</p>
                                </div>
                            ) : (
                                <>
                                    <p className={styles.subtitle}>
                                        Please fill the details below. Your submission will be recorded securely.
                                    </p>

                                    {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', fontSize: '0.9rem' }}>{error}</div>}

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Full Name *</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Registration No. *</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter your registration no."
                                            value={registrationNo}
                                            onChange={(e) => setRegistrationNo(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email Address *</label>
                                        <input
                                            type="email"
                                            className={styles.input}
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Upload Document or Provide Link *</label>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileSelect}
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                id="file-upload"
                                            />
                                            <label htmlFor="file-upload" className={styles.submitBtn} style={{ cursor: 'pointer', flex: 1, textAlign: 'center', padding: '0.5rem 1rem', background: selectedFile ? '#10b981' : '#3b82f6', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                                                {selectedFile ? selectedFile.name : 'Upload File'}
                                            </label>
                                            <span style={{ fontSize: '0.9rem', color: '#9ca3af', flex: 1 }}>
                                                Supported: PDF, DOCX
                                            </span>
                                        </div>
                                        {uploadError && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{uploadError}</span>}
                                        
                                        <div style={{ margin: '1rem 0', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>OR manually paste a link below</div>

                                        <input
                                            type="url"
                                            className={styles.input}
                                            placeholder="https://docs.google.com/... or other link"
                                            value={documentLink}
                                            onChange={(e) => {
                                                setDocumentLink(e.target.value);
                                                if (e.target.value) {
                                                    setSelectedFile(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }
                                            }}
                                            required={!selectedFile}
                                        />
                                        </div>

                                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit to Committee'}
                                    </button>
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
