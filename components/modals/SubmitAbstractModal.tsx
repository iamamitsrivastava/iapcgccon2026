'use client';
import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle2, Lock } from 'lucide-react';
import styles from './SubmitAbstractModal.module.css';
import { IS_ABSTRACT_SUBMISSION_OPEN, ABSTRACT_SUBMISSION_CLOSED_HEADING, ABSTRACT_SUBMISSION_CLOSED_MESSAGE } from '@/lib/submissionConfig';

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
            // Lock background scrolling completely
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            const unlockedUntil = localStorage.getItem('abstract_code_unlocked_until');
            if (unlockedUntil && parseInt(unlockedUntil, 10) > Date.now()) {
                setIsLocked(false);
            } else {
                setIsLocked(true);
            }
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const res = await fetch('/api/verify-access-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: accessCode }),
            });
            const data = await res.json();
            
            if (data.success) {
                localStorage.setItem('abstract_code_unlocked_until', (Date.now() + 5 * 60 * 1000).toString());
                setIsLocked(false);
            } else {
                setError(data.message || 'Invalid access code. Please try again.');
            }
        } catch (err) {
            setError('Error verifying code. Please try again later.');
        }
    };

    const handleFileSelect = (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('File too large. Max 10 MB.');
            return;
        }
        setDocumentLink('');
        setUploadError('');
        setSelectedFile(file);
        setUploadedUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedFile && !documentLink) {
            setError('Please either upload a file or provide a link.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const submitForm = new FormData();
            submitForm.append('fullName', fullName);
            submitForm.append('registrationNo', registrationNo || accessCode);
            submitForm.append('accessCode', accessCode || registrationNo);
            submitForm.append('email', email);
            if (selectedFile) {
                submitForm.append('file', selectedFile);
            }
            if (documentLink) {
                submitForm.append('documentLink', documentLink);
            }

            const response = await fetch('/api/submit-abstract', {
                method: 'POST',
                body: submitForm,
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
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
                setUploadedUrl(null);
                setUploadError('');
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
        <div className={styles.overlay} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 99999, padding: '20px', overscrollBehavior: 'none', touchAction: 'none'
        }}>
            <div className={styles.modal} style={{
                background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', width: '100%', maxWidth: '450px',
                maxHeight: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column',
                position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                touchAction: 'auto'
            }}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal" style={{
                    position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '0.5rem',
                    borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.content}>
                    {!IS_ABSTRACT_SUBMISSION_OPEN ? (
                        <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto'
                            }}>
                                <Lock size={32} color="#ef4444" />
                            </div>
                            <h2 className={styles.title} style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                                {ABSTRACT_SUBMISSION_CLOSED_HEADING}
                            </h2>
                            <p className={styles.subtitle} style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 auto', maxWidth: '360px' }}>
                                {ABSTRACT_SUBMISSION_CLOSED_MESSAGE}
                            </p>
                        </div>
                    ) : submitSuccess ? (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Abstract Submitted Successfully!</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Thank you. Your abstract has been received and stored for committee review.</p>
                        </div>
                    ) : isLocked ? (
                        <form onSubmit={handleUnlock}>
                            <h2 className={styles.title}>Submit Abstract</h2>
                            <p className={styles.subtitle}>Please enter your registration access code to proceed.</p>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Access / Registration Code *</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g. 26GUJCON001 or IAPSMGC-70P4R7"
                                    value={accessCode}
                                    onChange={(e) => {
                                        setAccessCode(e.target.value);
                                        setRegistrationNo(e.target.value);
                                    }}
                                    autoFocus
                                    required
                                />
                                {error && <span className={styles.errorText} style={{ color: '#ef4444', fontSize: '0.82rem', display: 'block', marginTop: '0.4rem' }}>{error}</span>}
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Verify & Unlock Form
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.title}>Abstract Submission</h2>
                            <p className={styles.subtitle}>Fill in submitter details and upload your abstract document.</p>

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
                                <label className={styles.label}>Email Address *</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Upload Document or Provide Link *
                                    <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.4rem' }}>(PDF/DOCX, Max 10 MB)</span>
                                </label>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    style={{ display: 'none' }}
                                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
                                />

                                <div
                                    onClick={() => { if (!isSubmitting) fileInputRef.current?.click(); }}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        const f = e.dataTransfer.files?.[0];
                                        if (f) handleFileSelect(f);
                                    }}
                                    style={{
                                        border: `2px dashed ${isDragging ? '#FACC15' : selectedFile ? '#FACC15' : 'rgba(255,255,255,0.15)'}`,
                                        borderRadius: '12px',
                                        padding: '1.25rem',
                                        textAlign: 'center',
                                        cursor: isSubmitting ? 'wait' : 'pointer',
                                        transition: 'all 0.2s',
                                        background: isDragging ? 'rgba(250,204,21,0.06)' : selectedFile ? 'rgba(250,204,21,0.05)' : 'rgba(255,255,255,0.02)',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <Loader2 size={28} color="#FACC15" style={{ animation: 'spin 1s linear infinite' }} />
                                            <span style={{ color: '#FACC15', fontSize: '0.88rem', fontWeight: 600 }}>Uploading document to Google Drive...</span>
                                        </div>
                                    ) : selectedFile ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <CheckCircle2 size={28} color="#22c55e" />
                                            <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>✓ {selectedFile.name}</span>
                                            <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Click to change selected file</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <Upload size={28} color="#FACC15" />
                                            <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Click to upload or drag &amp; drop</span>
                                            <span style={{ color: '#475569', fontSize: '0.78rem' }}>PDF or DOCX · Max 10 MB</span>
                                        </div>
                                    )}
                                </div>

                                {uploadError && (
                                    <span style={{ color: '#ef4444', fontSize: '0.82rem', display: 'block', marginBottom: '0.5rem' }}>{uploadError}</span>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.85rem 0' }}>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                    <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>OR paste a link</span>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                </div>

                                <input
                                    type="url"
                                    className={styles.input}
                                    placeholder={selectedFile ? '(File attached above)' : 'https://docs.google.com/... or other link'}
                                    value={selectedFile ? '' : documentLink}
                                    disabled={!!selectedFile || isSubmitting}
                                    onChange={(e) => {
                                        setDocumentLink(e.target.value);
                                        if (e.target.value) {
                                            setSelectedFile(null);
                                            setUploadedUrl(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }
                                    }}
                                    style={selectedFile ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                                />
                            </div>

                            {error && (
                                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                                    <span style={{ color: '#ef4444', fontSize: '0.82rem', display: 'block' }}>⚠️ {error}</span>
                                </div>
                            )}

                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                        Submitting to Google Drive...
                                    </span>
                                ) : (
                                    'Submit to Committee'
                                )}
                            </button>
                        </form>
                    )}
                </div>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}
