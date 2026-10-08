'use client';
import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle2, Lock } from 'lucide-react';
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
                    padding: '2.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                        <Lock size={32} color="#ef4444" />
                    </div>
                    <h2 className={styles.title} style={{ color: '#f8fafc', marginBottom: '0.75rem', fontSize: '1.5rem', textAlign: 'center' }}>
                        Abstract Submission Closed
                    </h2>
                    <p style={{ color: '#ef4444', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5, margin: '0 0 1.75rem 0', textAlign: 'center' }}>
                        Submission is over, No further submissions are accepted
                    </p>
                    <button
                        onClick={onClose}
                        className={styles.submitBtn}
                        style={{ maxWidth: '180px', margin: '0 auto', cursor: 'pointer' }}
                    >
                        Close
                    </button>
                </div>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}
