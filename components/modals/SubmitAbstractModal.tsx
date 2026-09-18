'use client';
import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle2 } from 'lucide-react';
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

    const handleFileSelect = async (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('File too large. Max 10 MB.');
            return;
        }
        setDocumentLink('');
        setUploadError('');
        setSelectedFile(file);
        setUploadedUrl(null);
        setIsUploading(true);

        const fd = new FormData();
        fd.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (data.success && data.url) {
                setUploadedUrl(data.url);
            } else {
                setUploadError(data.error || 'Upload failed. Please paste a link instead.');
                setSelectedFile(null);
            }
        } catch {
            setUploadError('Upload failed. Please paste a link instead.');
            setSelectedFile(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!uploadedUrl && !documentLink) {
            setError('Please either upload a file or provide a link.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const finalDocumentLink = uploadedUrl || documentLink;

            if (!finalDocumentLink) {
                throw new Error('No document URL available. Please re-upload or paste a link.');
            }

            // Now submit with the public URL (no file attachment)
            const submitForm = new FormData();
            submitForm.append('fullName', fullName);
            submitForm.append('registrationNo', registrationNo);
            submitForm.append('email', email);
            submitForm.append('documentLink', finalDocumentLink);

            const response = await fetch('/api/submit-abstract', {
                method: 'POST',
                body: submitForm,
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

                <div className={styles.content} style={{
                    padding: '1.5rem', overflowY: 'auto', overscrollBehavior: 'contain', flex: 1,
                    WebkitOverflowScrolling: 'touch'
                }}>
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
                                        <label className={styles.label}>
                                            Upload Document or Provide Link *
                                            <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.4rem' }}>(PDF/DOCX, Max 10 MB)</span>
                                        </label>

                                        {/* Hidden file input */}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            style={{ display: 'none' }}
                                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
                                        />

                                        {/* Drag-and-drop zone — matches payment proof style */}
                                        <div
                                            onClick={() => { if (!isUploading) fileInputRef.current?.click(); }}
                                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                            onDragLeave={() => setIsDragging(false)}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                setIsDragging(false);
                                                const f = e.dataTransfer.files?.[0];
                                                if (f) handleFileSelect(f);
                                            }}
                                            style={{
                                                border: `2px dashed ${isDragging ? '#FACC15' : uploadedUrl ? '#FACC15' : 'rgba(255,255,255,0.15)'}`,
                                                borderRadius: '12px',
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                cursor: isUploading ? 'wait' : 'pointer',
                                                transition: 'all 0.2s',
                                                background: isDragging ? 'rgba(250,204,21,0.06)' : uploadedUrl ? 'rgba(250,204,21,0.05)' : 'rgba(255,255,255,0.02)',
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            {isUploading ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Loader2 size={28} color="#FACC15" style={{ animation: 'spin 1s linear infinite' }} />
                                                    <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Uploading...</span>
                                                </div>
                                            ) : uploadedUrl ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                    <CheckCircle2 size={28} color="#22c55e" />
                                                    <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>✓ {selectedFile?.name}</span>
                                                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Click to replace</span>
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

                                        {/* OR divider */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.85rem 0' }}>
                                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                            <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>OR paste a link</span>
                                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                                        </div>

                                        <input
                                            type="url"
                                            className={styles.input}
                                            placeholder={uploadedUrl ? '(File uploaded above)' : 'https://docs.google.com/... or other link'}
                                            value={uploadedUrl ? '' : documentLink}
                                            disabled={!!uploadedUrl}
                                            onChange={(e) => {
                                                setDocumentLink(e.target.value);
                                                if (e.target.value) {
                                                    setSelectedFile(null);
                                                    setUploadedUrl(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }
                                            }}
                                            style={uploadedUrl ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
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
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}
