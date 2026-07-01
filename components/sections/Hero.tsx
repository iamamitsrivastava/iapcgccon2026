'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, FileText, Award, Layers, Search, Globe, X, CheckCircle2, Clock, Lock } from 'lucide-react';
import Image from 'next/image';
import { conference } from '@/data/conference';
import styles from './Hero.module.css';

// Unique IAPSMGC access codes for Full Paper submission
const VALID_ACCESS_CODES = [
  'IAPSMGC2026', 'IAPSMGC-X7K4M2', 'IAPSMGC-P9R8T5', 'IAPSMGC-W3N6Q1', 'IAPSMGC-H8V2L7', 'IAPSMGC-Z4M9K3',
  'IAPSMGC-B7T5X8', 'IAPSMGC-R2Q6N4', 'IAPSMGC-K9W3P7', 'IAPSMGC-C5L8T2', 'IAPSMGC-Y1M7R6',
  'IAPSMGC-F4X9K8', 'IAPSMGC-N2P6W3', 'IAPSMGC-T8R1M5', 'IAPSMGC-Q7V4L9', 'IAPSMGC-D3K8X2',
  'IAPSMGC-M5T7Q4', 'IAPSMGC-V8P2N9', 'IAPSMGC-A6W3K7', 'IAPSMGC-L4R8X1', 'IAPSMGC-E9M2T6',
  'IAPSMGC-G7Q5P3', 'IAPSMGC-U2N8W4', 'IAPSMGC-J6X1R9', 'IAPSMGC-S4K7M2', 'IAPSMGC-B8V3T5',
  'IAPSMGC-Y2P9L4', 'IAPSMGC-H5N1Q7', 'IAPSMGC-C7R4X8', 'IAPSMGC-W9K2M6', 'IAPSMGC-F3T8P1',
  'IAPSMGC-N6Q4V7', 'IAPSMGC-R1X9L3', 'IAPSMGC-D8M5K2', 'IAPSMGC-T4W7P9', 'IAPSMGC-A2N6R8',
  'IAPSMGC-L9Q3X5', 'IAPSMGC-G4K8T1', 'IAPSMGC-U7P2M9', 'IAPSMGC-J1R6W4', 'IAPSMGC-S8X3Q2',
  'IAPSMGC-B5T9N7', 'IAPSMGC-Y4K1P6', 'IAPSMGC-H2M8R3', 'IAPSMGC-C9W5Q7', 'IAPSMGC-W1X4T8',
  'IAPSMGC-F7P3N2', 'IAPSMGC-N8R6K5', 'IAPSMGC-R4M1Q9', 'IAPSMGC-D2T7W3', 'IAPSMGC-T9P5X1',
  'IAPSMGC-A8K4N6', 'IAPSMGC-L1R7M2', 'IAPSMGC-G5Q9T4', 'IAPSMGC-U3W8P7', 'IAPSMGC-J2N4X9',
  'IAPSMGC-S7K5R1', 'IAPSMGC-B9M3Q8', 'IAPSMGC-Y6T2P4', 'IAPSMGC-H1W7N5', 'IAPSMGC-C4R9X2',
  'IAPSMGC-W8K6M1', 'IAPSMGC-F2Q7T9', 'IAPSMGC-N5P1R4', 'IAPSMGC-R8X2W6', 'IAPSMGC-D1M9K7',
  'IAPSMGC-T6Q3N8', 'IAPSMGC-A4P7R2', 'IAPSMGC-L8W1X5', 'IAPSMGC-G2K9M4', 'IAPSMGC-U5T8Q1',
  'IAPSMGC-J9R4N6', 'IAPSMGC-S3P2W8', 'IAPSMGC-B1X7K9', 'IAPSMGC-Y8M4T2', 'IAPSMGC-H6Q1R7',
  'IAPSMGC-C2N9P5', 'IAPSMGC-W4K3X8', 'IAPSMGC-F9T6M1', 'IAPSMGC-N1R8Q4', 'IAPSMGC-R7W2P9',
  'IAPSMGC-D5K4N3', 'IAPSMGC-T1M8X6', 'IAPSMGC-A9Q7R5', 'IAPSMGC-L3P4W2', 'IAPSMGC-G8N1K7',
  'IAPSMGC-U6X9T3', 'IAPSMGC-J4M2Q8', 'IAPSMGC-S1R5P7', 'IAPSMGC-B6W8N4', 'IAPSMGC-Y3K2X9',
  'IAPSMGC-H7T4M1', 'IAPSMGC-C1Q8R6', 'IAPSMGC-W5P9N2', 'IAPSMGC-F8X3K4', 'IAPSMGC-N4M7T5',
  'IAPSMGC-R2Q1W8', 'IAPSMGC-D9P6N3', 'IAPSMGC-T3K5X7', 'IAPSMGC-A7R8M1', 'IAPSMGC-L2W4Q9',
  'IAPSMGC-G9N5P2', 'IAPSMGC-U1X6K8', 'IAPSMGC-J7T3R4', 'IAPSMGC-S5M9Q1', 'IAPSMGC-B2P8W7',
  'IAPSMGC-Y9K6N4', 'IAPSMGC-H3X1T8', 'IAPSMGC-C8R7M5', 'IAPSMGC-W2Q4P1', 'IAPSMGC-F5N9K6',
  'IAPSMGC-N7X2R3', 'IAPSMGC-R3T8M4', 'IAPSMGC-D6W1Q9', 'IAPSMGC-T2P7K5', 'IAPSMGC-A1N4X8',
  'IAPSMGC-L7R2M9', 'IAPSMGC-G3Q6W5', 'IAPSMGC-U8T1P4', 'IAPSMGC-J5K9N2', 'IAPSMGC-S9X4R7',
  'IAPSMGC-B4M1Q6', 'IAPSMGC-Y7P3W8', 'IAPSMGC-H9K5T2', 'IAPSMGC-C3N8R1', 'IAPSMGC-W7X5M9',
  'IAPSMGC-F1Q2P8', 'IAPSMGC-N9T4K3', 'IAPSMGC-R5M7W1', 'IAPSMGC-D4X8Q2', 'IAPSMGC-T7P1N6',
  'IAPSMGC-A3R9K4', 'IAPSMGC-L5W6M8', 'IAPSMGC-G1Q3T7', 'IAPSMGC-U9N2P5', 'IAPSMGC-J8X7R1',
  'IAPSMGC-S2K4M9', 'IAPSMGC-B3T1Q8', 'IAPSMGC-Y5W9N7', 'IAPSMGC-H4P2X6', 'IAPSMGC-C6R3K1',
  'IAPSMGC-W9M8T5', 'IAPSMGC-F4Q1N7', 'IAPSMGC-N3P6R2', 'IAPSMGC-R9X5K8', 'IAPSMGC-D7M2W4',
  'IAPSMGC-T5Q8N1', 'IAPSMGC-A2P9R3', 'IAPSMGC-L6X4K7', 'IAPSMGC-G7M1T9', 'IAPSMGC-U4Q5W2',
  'IAPSMGC-J1N8P6', 'IAPSMGC-S6R2X4', 'IAPSMGC-B8K7M3', 'IAPSMGC-Y1T5Q9', 'IAPSMGC-H2W6N8',
  'IAPSMGC-C5P4R7', 'IAPSMGC-W3X9K1', 'IAPSMGC-F6M2T4', 'IAPSMGC-N2Q8P7', 'IAPSMGC-R1W5K6',
  'IAPSMGC-D8X7M9', 'IAPSMGC-T4N3Q2', 'IAPSMGC-A5P1R8', 'IAPSMGC-L9K2W7', 'IAPSMGC-G4T6M3',
  'IAPSMGC-U2X1N5', 'IAPSMGC-J3Q7P4', 'IAPSMGC-S7W8R9', 'IAPSMGC-B1M5K2', 'IAPSMGC-Y4T3N6',
  'IAPSMGC-H8Q9P1', 'IAPSMGC-C7X2R5', 'IAPSMGC-W6K1M4', 'IAPSMGC-F2N7T8', 'IAPSMGC-N8P5Q3',
  'IAPSMGC-R6W4X1', 'IAPSMGC-D3K9M7', 'IAPSMGC-T8R2N4', 'IAPSMGC-A1Q6P9', 'IAPSMGC-L4W3K8',
  'IAPSMGC-G6M7T2', 'IAPSMGC-U7P9X1', 'IAPSMGC-J2R4N8', 'IAPSMGC-S8K3Q5', 'IAPSMGC-B9W1M6',
  'IAPSMGC-Y2T7P3', 'IAPSMGC-H5X8R4', 'IAPSMGC-C1N6Q7',
];



export default function Hero() {
  const profiles = [
    {
      name: "Shri Ram Madhav",
      title: "President, India Foundation",
      badge: "National Advisory Committee",
      image: "/images/ram-madhav-new.jpg"
    },
    {
      name: "Prof. Yogesh Singh",
      title: "AICTE Chairman & VC, Delhi University",
      badge: "National Advisory Committee",
      image: "/images/yogesh-singh.jpg"
    },
    {
      name: "Dr. Jigar Inamdar",
      title: "Chairman, Ramanujan College, DU",
      badge: "National Advisory Committee",
      image: "/images/jigar-inamdar.png"
    },
    {
      name: "Dr. Krishna Kant Dave",
      title: "Vice Chancellor, Bahra University",
      badge: "National Advisory Committee",
      image: "/images/krishna-kant-dave.jpg"
    },
    {
      name: "Dr. Rajan Welukar",
      title: "Vice Chancellor, ATLAS SkillTech University",
      badge: "National Advisory Committee",
      image: "/images/rajan-welukar.jpg"
    }
  ];

  const sliderImages = [
    "/images/iapsm-audience-1.jpg",
    "/images/iapsm-audience-2.jpg",
    "/images/iapsm-audience-3.jpg",
    "/images/iapsm-audience-4.jpg"
  ];

  const [currentProfile, setCurrentProfile] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionType, setSubmissionType] = useState<'FULL_PAPER' | 'ABSTRACT'>('FULL_PAPER');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    documentLink: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Target date: 27th Nov 2026, 09:00:00 IST
    const targetDate = new Date('2026-11-27T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const countdownInterval = setInterval(updateTimer, 1000);

    // Profile rotation interval
    const profileInterval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length);
    }, 5000);

    // Image slider interval
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4500);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(profileInterval);
      clearInterval(slideInterval);
    };
  }, [profiles.length]);


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name: fullName, email, documentLink } = formData;

      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbymq8pRHk--R9ItUFGBkmwFrCnfuqzUr4BojT4wOG8l5edYgFrp1D_1fDHTAVe8eyh1kg/exec",
        {
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
        }
      );

      if (res.status === 200) {
        setSubmissionSuccess(true);

        setTimeout(() => {
          setIsModalOpen(false);
          setSubmissionSuccess(false);
          setFormData({ name: "", email: "", documentLink: "" });
        }, 2000);
      } else {
        throw new Error("Server error");
      }

    } catch (error: any) {
      console.error("Submission error:", error);
      alert("Submission failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.background}>
        <Image
          src="/images/gate-hero-new.jpg"
          alt="Hero Background"
          fill
          priority
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.content}>
            <div className={`${styles.presenter} ${styles.animate} ${styles['delay-100']}`} style={{ borderBottom: 'none', marginBottom: '0.25rem', display: 'block' }}>DEPARTMENT OF COMMUNITY MEDICINE</div>
            <div className={`${styles.presenter} ${styles.animate} ${styles['delay-100']}`}>PARUL INSTITUTE OF MEDICAL SCIENCES &amp; RESEARCH PRESENTS</div>

            <h1 className={`${styles.title} ${styles.animate} ${styles['delay-200']}`}>
              {conference.title}
            </h1>

            <p className={`${styles.subtitle} ${styles.animate} ${styles['delay-300']}`}>
              Digital Health for All: Bridging Equity, Access and Innovation
            </p>

            <div className={`${styles.meta} ${styles.animate} ${styles['delay-400']}`}>
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} size={24} />
                <span>
                  <strong>Pre-Conference: </strong>26 Nov 2026 &nbsp;|&nbsp;
                  <strong>Conference: </strong>27–28 Nov 2026
                </span>
              </div>
              <div className={styles.metaItem}>
                <MapPin className={styles.metaIcon} size={24} />
                <span>PIMSR, Parul University, Vadodara</span>
              </div>
            </div>

            <div className={`${styles.actions} ${styles.animate} ${styles['delay-500']}`}>
              {(!isMounted || !isExpired) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubmissionType('ABSTRACT');
                    setIsCodeVerified(false);
                    setIsModalOpen(true);
                  }}
                  className={styles.btnSecondary}
                  style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.6rem 1.5rem', cursor: 'pointer', outline: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', lineHeight: 1 }}>
                    Submit Abstract <Lock size={18} />
                  </div>
                </button>
              )}

              <button onClick={() => { setSubmissionType('FULL_PAPER'); setIsCodeVerified(false); setIsModalOpen(true); }} className={styles.btnPrimary} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}>
                Submit Full Paper <Lock size={18} />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`${styles.trustBar} ${styles.animate} ${styles['delay-600']}`}>
              <div className={styles.trustItem}>
                <Award className={styles.trustIcon} size={20} />
                <span>NAAC A++ Accredited University</span>
              </div>
              <div className={styles.trustItem}>
                <Globe className={styles.trustIcon} size={20} />
                <span>International Conference</span>
              </div>
              <div className={styles.trustItem}>
                <Layers className={styles.trustIcon} size={20} />
                <span>Peer-Reviewed Publications</span>
              </div>
              <div className={styles.trustItem}>
                <Search className={styles.trustIcon} size={20} />
                <span>Indexed in Scopus / WoS</span>
              </div>
            </div>

          </div>


        </div>

        {/* Timer Row */}
        {isMounted && !isExpired && (
          <div className={`${styles.statsRow} ${styles.animate} ${styles['delay-700']}`}>
            <div className={styles.statItem} style={{ justifyContent: 'center' }}>
              <Clock size={42} color="var(--color-secondary)" strokeWidth={1.5} style={{ marginBottom: '0.5rem' }} />
              <span className={styles.statLabel}>Countdown</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className={styles.statLabel}>Days</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className={styles.statLabel}>Hours</span>
            </div>
            <div className={styles.statLine}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className={styles.statLabel}>Minutes</span>
            </div>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => { setIsModalOpen(false); setIsCodeVerified(false); setAccessCode(''); setCodeError(''); setSubmissionSuccess(false); }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => { setIsModalOpen(false); setIsCodeVerified(false); setAccessCode(''); setCodeError(''); setSubmissionSuccess(false); }}
            >
              <X size={24} />
            </button>

            {submissionSuccess ? (
              <div className={styles.successState}>
                <div className={styles.successIconWrapper}>
                  <CheckCircle2
                    size={64}
                    className={styles.successCheck}
                  />
                </div>
                <h2 className={styles.successTitle}>Success!</h2>
                <p className={styles.successSubtitle}>
                  Your document has been successfully submitted.
                </p>
              </div>
            ) : !isCodeVerified ? (
              <>
                <h2 className={styles.modalTitle}>Enter Access Code</h2>
                <p className={styles.modalSubtitle}>
                  Please enter your provided submission code to access the {submissionType === 'FULL_PAPER' ? 'paper' : 'abstract'} submission form.<br/><br/>
                  <span style={{color: '#ffbf00', fontWeight: 'bold'}}>Note: One code is valid only once.</span>
                </p>
                <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
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
                        if (VALID_ACCESS_CODES.includes(code)) {
                          const usedCodes = JSON.parse(localStorage.getItem('used_access_codes') || '[]');
                          if (usedCodes.includes(code)) {
                            setCodeError('This code has already been used. One code is valid only once.');
                          } else {
                            // Burn the code immediately upon verification
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
                    if (VALID_ACCESS_CODES.includes(code)) {
                      const usedCodes = JSON.parse(localStorage.getItem('used_access_codes') || '[]');
                      if (usedCodes.includes(code)) {
                        setCodeError('This code has already been used. One code is valid only once.');
                      } else {
                        // Burn the code immediately upon verification
                        usedCodes.push(code);
                        localStorage.setItem('used_access_codes', JSON.stringify(usedCodes));
                        setIsCodeVerified(true);
                      }
                    } else {
                      setCodeError('Invalid access code. Please try again.');
                    }
                  }}
                  className={styles.submitModalBtn}
                >
                  Verify Code
                </button>
              </>
            ) : (
              <>
                <h2 className={styles.modalTitle}>
                  {submissionType === 'FULL_PAPER' ? 'Submit Full Paper' : 'Submit Abstract'}
                </h2>
                <p className={styles.modalSubtitle}>
                  Please fill the details below. Your submission will be recorded securely.
                </p>

                <form onSubmit={handleFormSubmit} className={styles.modalForm}>

                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className={styles.formGroup} style={{ marginBottom: "1.5rem" }}>
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
                    <label htmlFor="documentLink">Document Link *</label>
                    <input
                      type="url"
                      id="documentLink"
                      required
                      value={formData.documentLink || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, documentLink: e.target.value })
                      }
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
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitModalBtn}
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
