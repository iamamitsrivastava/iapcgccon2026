'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, FileText, Award, Layers, Search, Globe, X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { conference } from '@/data/conference';
import styles from './Hero.module.css';

// 100 unique access codes for Full Paper submission
const VALID_ACCESS_CODES = [
  'ICBD-A1X7', 'ICBD-B2K9', 'ICBD-C3M4', 'ICBD-D4P8', 'ICBD-E5R2',
  'ICBD-F6T3', 'ICBD-G7V5', 'ICBD-H8W1', 'ICBD-J9Y6', 'ICBD-K1Z4',
  'ICBD-L2A8', 'ICBD-M3B7', 'ICBD-N4C5', 'ICBD-P5D9', 'ICBD-Q6E3',
  'ICBD-R7F1', 'ICBD-S8G6', 'ICBD-T9H2', 'ICBD-U1J4', 'ICBD-V2K8',
  'ICBD-W3L7', 'ICBD-X4M5', 'ICBD-Y5N9', 'ICBD-Z6P3', 'ICBD-A7Q1',
  'ICBD-B8R6', 'ICBD-C9S2', 'ICBD-D1T4', 'ICBD-E2U8', 'ICBD-F3V7',
  'ICBD-G4W5', 'ICBD-H5X9', 'ICBD-J6Y3', 'ICBD-K7Z1', 'ICBD-L8A6',
  'ICBD-M9B2', 'ICBD-N1C4', 'ICBD-P2D8', 'ICBD-Q3E7', 'ICBD-R4F5',
  'ICBD-S5G9', 'ICBD-T6H3', 'ICBD-U7J1', 'ICBD-V8K6', 'ICBD-W9L2',
  'ICBD-X1M4', 'ICBD-Y2N8', 'ICBD-Z3P7', 'ICBD-A4Q5', 'ICBD-B5R9',
  'ICBD-C6S3', 'ICBD-D7T1', 'ICBD-E8U6', 'ICBD-F9V2', 'ICBD-G1W4',
  'ICBD-H2X8', 'ICBD-J3Y7', 'ICBD-K4Z5', 'ICBD-L5A9', 'ICBD-M6B3',
  'ICBD-N7C1', 'ICBD-P8D6', 'ICBD-Q9E2', 'ICBD-R1F4', 'ICBD-S2G8',
  'ICBD-T3H7', 'ICBD-U4J5', 'ICBD-V5K9', 'ICBD-W6L3', 'ICBD-X7M1',
  'ICBD-Y8N6', 'ICBD-Z9P2', 'ICBD-A3R4', 'ICBD-B4S8', 'ICBD-C5T7',
  'ICBD-D6U5', 'ICBD-E7V9', 'ICBD-F8W3', 'ICBD-G9X1', 'ICBD-H1Y6',
  'ICBD-J2Z2', 'ICBD-K3A4', 'ICBD-L4B8', 'ICBD-M5C7', 'ICBD-N6D5',
  'ICBD-P7E9', 'ICBD-Q8F3', 'ICBD-R9G1', 'ICBD-S1H6', 'ICBD-T2J2',
  'ICBD-U3K4', 'ICBD-V4L8', 'ICBD-W5M7', 'ICBD-X6N5', 'ICBD-Y7P9',
  'ICBD-Z8Q3', 'ICBD-A9R1', 'ICBD-B1S6', 'ICBD-C2T2', 'ICBD-D3U4',
  'ICBD-K6N1', 'ICBD-L7O2', 'ICBD-M8P3', 'ICBD-N9Q4', 'ICBD-O1R5',
  'ICBD-P2S6', 'ICBD-Q3T7', 'ICBD-R4U8', 'ICBD-S5V9', 'ICBD-T6W1',
  'ICBD-U7X2', 'ICBD-V8Y3', 'ICBD-W9Z4', 'ICBD-X1A5', 'ICBD-Y2B6',
  'ICBD-Z3C7', 'ICBD-A4D8', 'ICBD-B5E9', 'ICBD-C6F1', 'ICBD-D7G2',
  'ICBD-E8H3', 'ICBD-F9I4', 'ICBD-G1J5', 'ICBD-H2K6', 'ICBD-I3L7',
  'ICBD-J4M8', 'ICBD-K5N9', 'ICBD-L6O1', 'ICBD-M7P2', 'ICBD-N8Q3',
  'ICBD-O9R4', 'ICBD-P1S5', 'ICBD-Q2T6', 'ICBD-R3U7', 'ICBD-S4V8',
  'ICBD-T5W9', 'ICBD-U6X1', 'ICBD-V7Y2', 'ICBD-W8Z3', 'ICBD-X9A4',
  'ICBD-Y1B5', 'ICBD-Z2C6', 'ICBD-A3D7', 'ICBD-B4E8', 'ICBD-C5F9',
  'ICBD-D6G1', 'ICBD-E7H2', 'ICBD-F8I3', 'ICBD-G9J4', 'ICBD-H1K5',
  'ICBD-I2L6', 'ICBD-J3M7', 'ICBD-K4N8', 'ICBD-L5O9', 'ICBD-M6P1',
  'ICBD-N7Q2', 'ICBD-O8R3', 'ICBD-P9S4', 'ICBD-Q1T5', 'ICBD-R2U6',
  'ICBD-S3V7', 'ICBD-T4W8', 'ICBD-U5X9', 'ICBD-V6Y1', 'ICBD-W7Z2',
  'ICBD-X8A3', 'ICBD-Y9B4', 'ICBD-Z1C5', 'ICBD-A2D6', 'ICBD-B3E7',
  'ICBD-C4F8', 'ICBD-D5G9', 'ICBD-E6H1', 'ICBD-F7I2', 'ICBD-G8J3',
  'ICBD-H9K4', 'ICBD-I1L5', 'ICBD-J2M6', 'ICBD-K3N7', 'ICBD-L4O8',
  'ICBD-M5P9', 'ICBD-N6Q1', 'ICBD-O7R2', 'ICBD-P8S3', 'ICBD-Q9T4',
  'ICBD-R1U5', 'ICBD-S2V6', 'ICBD-T3W7', 'ICBD-U4X8', 'ICBD-V5Y9',
  'ICBD-W6Z1', 'ICBD-X7A2', 'ICBD-Y8B3', 'ICBD-Z9C4', 'ICBD-A1D5',
  'ICBD-B2E6', 'ICBD-C3F7', 'ICBD-D4G8', 'ICBD-E5H9', 'ICBD-F6I1',
  'ICBD-EEB2', 'ICBD-8D49', 'ICBD-502C', 'ICBD-AC67', 'ICBD-275C',
  'ICBD-91EE', 'ICBD-C1DA', 'ICBD-59CC', 'ICBD-E8B1', 'ICBD-3D07',
  'ICBD-CCB5', 'ICBD-0F57', 'ICBD-9556', 'ICBD-DE71', 'ICBD-C3EF',
  'ICBD-DF60', 'ICBD-6873', 'ICBD-DF17', 'ICBD-AFEA', 'ICBD-1B0E',
  'ICBD-582D', 'ICBD-2F30', 'ICBD-5172', 'ICBD-1630', 'ICBD-CAC4',
  'ICBD-3E58', 'ICBD-CB5F', 'ICBD-DC98', 'ICBD-DEE6', 'ICBD-911E',
  'ICBD-E95A', 'ICBD-D4DD', 'ICBD-3B5A', 'ICBD-37E1', 'ICBD-CFA8',
  'ICBD-BA23', 'ICBD-F08B', 'ICBD-8F21', 'ICBD-3BAC', 'ICBD-64BD',
  'ICBD-01F6', 'ICBD-ABE0', 'ICBD-C872', 'ICBD-A160', 'ICBD-A1BD',
  'ICBD-B8EA', 'ICBD-42B2', 'ICBD-0623', 'ICBD-03E7', 'ICBD-B769',
  'ICBD-23E2', 'ICBD-87EA', 'ICBD-CB10', 'ICBD-D39D', 'ICBD-1532',
  'ICBD-9E58', 'ICBD-DD6D', 'ICBD-6E9C', 'ICBD-24DE', 'ICBD-10C2',
  'ICBD-42F5', 'ICBD-338B', 'ICBD-3F84', 'ICBD-6E69', 'ICBD-4F81',
  'ICBD-ED66', 'ICBD-6ABA', 'ICBD-EE87', 'ICBD-EA18', 'ICBD-5F40',
  'ICBD-05AB', 'ICBD-4462', 'ICBD-3BB0', 'ICBD-9B85', 'ICBD-FB50',
  'ICBD-0190', 'ICBD-2911', 'ICBD-37AE', 'ICBD-0AA8', 'ICBD-26BE',
  'ICBD-3774', 'ICBD-161D', 'ICBD-D8BB', 'ICBD-F7DD', 'ICBD-9D8A',
  'ICBD-FB06', 'ICBD-F765', 'ICBD-63F4', 'ICBD-3BFA', 'ICBD-9D16',
  'ICBD-47E8', 'ICBD-B884', 'ICBD-23C5', 'ICBD-AF34', 'ICBD-3234',
  'ICBD-BCC2', 'ICBD-6045', 'ICBD-81A8', 'ICBD-8734', 'ICBD-E8CC',
  'ICBD-6B95', 'ICBD-D33A', 'ICBD-410D', 'ICBD-B2C9', 'ICBD-B2C8',
  'ICBD-F1E3', 'ICBD-696F', 'ICBD-ECD6', 'ICBD-1BEA', 'ICBD-3619',
  'ICBD-7FF5', 'ICBD-EB9D', 'ICBD-9B34', 'ICBD-FC5D', 'ICBD-A2D7',
  'ICBD-7D84', 'ICBD-443B', 'ICBD-2C4C', 'ICBD-FC3A', 'ICBD-DF13',
  'ICBD-E6E5', 'ICBD-75EC', 'ICBD-81D9', 'ICBD-27DC', 'ICBD-DFA8',
  'ICBD-4C3E', 'ICBD-FED4', 'ICBD-4DB0', 'ICBD-5E69', 'ICBD-EFC2',
  'ICBD-7FA1', 'ICBD-6B7A', 'ICBD-D8BA', 'ICBD-3E22', 'ICBD-D18A',
  'ICBD-0326', 'ICBD-E401', 'ICBD-CAB4', 'ICBD-9377', 'ICBD-8D1A',
  'ICBD-6E4E', 'ICBD-6B91', 'ICBD-00C8', 'ICBD-BC04', 'ICBD-3240',
  'ICBD-0638', 'ICBD-F3B8', 'ICBD-3A08', 'ICBD-0CFF', 'ICBD-C24F',
  'ICBD-93CB', 'ICBD-3F9C', 'ICBD-517E', 'ICBD-3F18', 'ICBD-4A8D',
  'ICBD-1680', 'ICBD-DE4A', 'ICBD-4076', 'ICBD-BF2F', 'ICBD-2A7D',
  'ICBD-315A', 'ICBD-C3EE', 'ICBD-F201', 'ICBD-0919', 'ICBD-E572',
  'ICBD-8F86', 'ICBD-3E41', 'ICBD-D4F2', 'ICBD-D40E', 'ICBD-F89F',
  'ICBD-3132', 'ICBD-8605', 'ICBD-0716', 'ICBD-04B4', 'ICBD-9529',
  'ICBD-3E6C', 'ICBD-5B3C', 'ICBD-DFEE', 'ICBD-D858', 'ICBD-D0E3',
  'ICBD-D317', 'ICBD-F40A', 'ICBD-CF05', 'ICBD-80EF', 'ICBD-813C',
  'ICBD-F0F6', 'ICBD-3BB9', 'ICBD-3518', 'ICBD-8E0E', 'ICBD-4243',
  'ICBD-829D', 'ICBD-913D', 'ICBD-4789', 'ICBD-EFC0', 'ICBD-15C4',
  'ICBD-8072', 'ICBD-B665', 'ICBD-6E2C', 'ICBD-A644', 'ICBD-5306',
  'ICBD-A1F7', 'ICBD-B2G8', 'ICBD-C3H9', 'ICBD-D4J1', 'ICBD-E5K2',
  'ICBD-F6L3', 'ICBD-G7M4', 'ICBD-H8N5', 'ICBD-J9P6', 'ICBD-K1Q7',
  'ICBD-L2R8', 'ICBD-M3S9', 'ICBD-N4T1', 'ICBD-P5U2', 'ICBD-Q6V3',
  'ICBD-R7W4', 'ICBD-S8X5', 'ICBD-T9Y6', 'ICBD-U1Z7', 'ICBD-V2A8',
  'ICBD-W3B9', 'ICBD-X4C1', 'ICBD-Y5D2', 'ICBD-Z6E3', 'ICBD-A7F4',
  'ICBD-B8G5', 'ICBD-C9H6', 'ICBD-D1J7', 'ICBD-E2K8', 'ICBD-F3L9',
  'ICBD-G4M1', 'ICBD-H5N2', 'ICBD-J6P3', 'ICBD-K7Q4', 'ICBD-L8R5',
  'ICBD-M9S6', 'ICBD-N1T7', 'ICBD-P2U8', 'ICBD-Q3V9', 'ICBD-R4W1',
  'ICBD-S5X2', 'ICBD-T6Y3', 'ICBD-U7Z4', 'ICBD-V8A5', 'ICBD-W9B6',
  'ICBD-X1C7', 'ICBD-Y2D8', 'ICBD-Z3E9', 'ICBD-A4F1', 'ICBD-B5G2',
  'ICBD-C6H3', 'ICBD-D7J4', 'ICBD-E8K5', 'ICBD-F9L6', 'ICBD-G1M7',
  'ICBD-H2N8', 'ICBD-J3P9', 'ICBD-K4Q1', 'ICBD-L5R2', 'ICBD-M6S3',
  'ICBD-N7T4', 'ICBD-P8U5', 'ICBD-Q9V6', 'ICBD-R1W7', 'ICBD-S2X8',
  'ICBD-T3Y9', 'ICBD-U4Z1', 'ICBD-V5A2', 'ICBD-W6B3', 'ICBD-X7C4',
  'ICBD-Y8D5', 'ICBD-Z9E6', 'ICBD-A1F8', 'ICBD-B2G9', 'ICBD-C3H1',
  'ICBD-D4J2', 'ICBD-E5K3', 'ICBD-F6L4', 'ICBD-G7M5', 'ICBD-H8N6',
  'ICBD-J9P7', 'ICBD-K1Q8', 'ICBD-L2R9', 'ICBD-M3S1', 'ICBD-N4T2',
  'ICBD-P5U3', 'ICBD-Q6V4', 'ICBD-R7W5', 'ICBD-S8X6', 'ICBD-T9Y7',
  'ICBD-U1Z8', 'ICBD-V2A9', 'ICBD-W3B1', 'ICBD-X4C2', 'ICBD-Y5D3',
  'ICBD-Z6E4', 'ICBD-A7F5', 'ICBD-B8G6', 'ICBD-C9H7', 'ICBD-D1J8',
  'ICBD-E2K9', 'ICBD-F3L1', 'ICBD-G4M2', 'ICBD-H5N3', 'ICBD-J6P4',
  'ICBD-K7Q5', 'ICBD-L8R6', 'ICBD-M9S7', 'ICBD-N1T8', 'ICBD-P2U9',
  'ICBD-Q3V1', 'ICBD-R4W2', 'ICBD-S5X3', 'ICBD-T6Y4', 'ICBD-U7Z5',
  'ICBD-V8A6', 'ICBD-W9B7', 'ICBD-X1C8', 'ICBD-Y2D9', 'ICBD-Z3E1',
  'ICBD-A4F2', 'ICBD-B5G3', 'ICBD-C6H4', 'ICBD-D7J5', 'ICBD-E8K6',
  'ICBD-F9L7', 'ICBD-G1M8', 'ICBD-H2N9', 'ICBD-J3P1', 'ICBD-K4Q2',
  'ICBD-L5R3', 'ICBD-M6S4', 'ICBD-N7T5', 'ICBD-P8U6', 'ICBD-Q9V7',
  'ICBD-R1W8', 'ICBD-S2X9', 'ICBD-T3Y1', 'ICBD-U4Z2', 'ICBD-V5A3',
  'ICBD-W6B4', 'ICBD-X7C5', 'ICBD-Y8D6', 'ICBD-Z9E7', 'ICBD-A1F9',
  'ICBD-B2G1', 'ICBD-C3H2', 'ICBD-D4J3', 'ICBD-E5K4', 'ICBD-F6L5',
  'ICBD-G7M6', 'ICBD-H8N7', 'ICBD-J9P8', 'ICBD-K1Q9', 'ICBD-L2R1',
  'ICBD-M3S2', 'ICBD-N4T3', 'ICBD-P5U4', 'ICBD-Q6V5', 'ICBD-R7W6',
  'ICBD-S8X7', 'ICBD-T9Y8', 'ICBD-U1Z9', 'ICBD-V2A1', 'ICBD-W3B2',
  'ICBD-X4C3', 'ICBD-Y5D4', 'ICBD-Z6E5', 'ICBD-A7F6', 'ICBD-B8G7',
  'ICBD-C9H8', 'ICBD-D1J9', 'ICBD-E2K1', 'ICBD-F3L2', 'ICBD-G4M3',
  'ICBD-H5N4', 'ICBD-J6P5', 'ICBD-K7Q6', 'ICBD-L8R7', 'ICBD-M9S8',
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
    "/images/iapsm-1.jpg",
    "/images/iapsm-2.png",
    "/images/iapsm-3.png"
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    documentLink: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Target date: 30th June 2026, 23:59:59
    const targetDate = new Date('2026-06-30T23:59:59').getTime();

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
            type: "FULL_PAPER",
            fullName,
            email,
            documentLink
          }),
        }
      );

      // 🔥 SIMPLE SUCCESS CHECK
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
        <div
          className={styles.backgroundImage}
          style={{ width: '100%', height: '100%', position: 'absolute', background: 'url(/images/gate-hero.jpg) center/cover' }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.content}>
            <div className={`${styles.presenter} ${styles.animate} ${styles['delay-100']}`}>PARUL INSTITUTE OF MEDICAL SCIENCES &amp; RESEARCH PRESENTS</div>

            <h1 className={`${styles.title} ${styles.animate} ${styles['delay-200']}`}>
              {conference.title}
            </h1>

            <p className={`${styles.subtitle} ${styles.animate} ${styles['delay-300']}`}>
              International Conference on Digital Health for All: Bridging Equity,
              <br />
              <span style={{ fontWeight: 600, color: 'white' }}>Access, and Innovation</span>
            </p>

            <div className={`${styles.meta} ${styles.animate} ${styles['delay-400']}`}>
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} size={24} />
                <span>
                  <strong>Pre-Conference:</strong> 26 Nov 2026 &nbsp;|&nbsp;
                  <strong>Main:</strong> 27–28 Nov 2026
                </span>
              </div>
              <div className={styles.metaItem}>
                <MapPin className={styles.metaIcon} size={24} />
                <span>PIMSR, Parul University, Vadodara</span>
              </div>
            </div>

            <div className={`${styles.actions} ${styles.animate} ${styles['delay-500']}`}>
              <button onClick={() => setIsModalOpen(true)} className={styles.btnPrimary} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}>
                Submit Full Paper <ArrowRight size={20} />
              </button>

              {(!isMounted || !isExpired) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={styles.btnSecondary}
                  style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.6rem 1.5rem', cursor: 'pointer', outline: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', lineHeight: 1 }}>
                    Submit Abstract <FileText size={18} />
                  </div>
                  {isMounted && !isExpired && (
                    <div style={{ fontSize: '0.75rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      <span style={{ color: '#FACC15' }}>{timeLeft.days}D</span> :
                      <span style={{ color: '#FACC15' }}>{timeLeft.hours}H</span> :
                      <span style={{ color: '#FACC15' }}>{timeLeft.minutes}M</span> :
                      <span style={{ color: '#FACC15' }}>{timeLeft.seconds}S</span>
                    </div>
                  )}
                </button>
              )}
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

          <div className={`${styles.visuals} ${styles.animate} ${styles['delay-500']}`}>
            <div className={styles.sliderContainer}>
              {sliderImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Event ${index + 1}`}
                  className={`${styles.slideImage} ${index === currentSlide ? styles.active : ''}`}
                />
              ))}
              <div className={styles.sliderIndicators}>
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={`${styles.statsRow} ${styles.animate} ${styles['delay-700']}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>300+</span>
            <span className={styles.statLabel}>Attendees</span>
          </div>
          <div className={styles.statLine}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>20+</span>
            <span className={styles.statLabel}>Speakers</span>
          </div>
          <div className={styles.statLine}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5+</span>
            <span className={styles.statLabel}>Countries</span>
          </div>
          <div className={styles.statLine}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>2+</span>
            <span className={styles.statLabel}>Workshops / Panel Discussion</span>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => { setIsModalOpen(false); setIsCodeVerified(false); setAccessCode(''); setCodeError(''); }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => { setIsModalOpen(false); setIsCodeVerified(false); setAccessCode(''); setCodeError(''); }}
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
                  Please enter your provided submission code to access the paper submission form.
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
                        if (VALID_ACCESS_CODES.includes(accessCode.trim().toUpperCase())) {
                          setIsCodeVerified(true);
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
                    if (VALID_ACCESS_CODES.includes(accessCode.trim().toUpperCase())) {
                      setIsCodeVerified(true);
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
                <h2 className={styles.modalTitle}>Submit Full Paper</h2>
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
