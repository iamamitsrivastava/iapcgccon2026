'use client';
import { useState, useEffect } from 'react';
import { MapPin, Award, Users, Globe, TreePine, ChevronRight, Building2 } from 'lucide-react';
import Image from 'next/image';
import styles from './Venue.module.css';

export function Venue() {
    const images = [
        "/images/pu-dhoni.png",
        "/images/pu-new-1.jpg",
        "/images/pu-new-2.png",
        "/images/pu-new-3.jpg",
        "/images/pu-new-4.png",
        "/images/pu-new-5.png",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const deptImages = [
        "/images/dept-new-1.jpg",
        "/images/award-stage.jpg",
        "/images/dept-1.png",
        "/images/dept-6.jpg",
    ];
    const [deptIndex, setDeptIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex: number) => (prevIndex + 1) % images.length);
        }, 5000);

        const deptInterval = setInterval(() => {
            setDeptIndex((prevIndex: number) => (prevIndex + 1) % deptImages.length);
        }, 4000);

        return () => {
            clearInterval(interval);
            clearInterval(deptInterval);
        };
    }, [images.length, deptImages.length]);

    return (
        <section className={styles.venue} id="about-parul">
            <div className="container">

                {/* ── About the Department ── */}
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>
                        <Building2 size={14} />
                        Department of Community Medicine
                    </span>
                    <h2 className={styles.sectionTitle}>About the Department</h2>
                    <div className={styles.titleDivider}>
                        <span className={styles.dividerLine}></span>
                        <span className={styles.dividerDot}></span>
                        <span className={styles.dividerLine}></span>
                    </div>
                </div>

                <div className={styles.contentGrid}>
                    <div className={styles.textContent}>
                        <p className={styles.bodyText}>
                            The Department of Community Medicine, Parul Institute of Medical Sciences &amp; Research, Parul University, is dedicated to advancing public health through excellence in medical education, research, and community service. The department provides competency-based undergraduate and postgraduate training while promoting evidence-based public health practice and preventive healthcare.
                        </p>
                        <p className={styles.bodyText}>
                            With a strong emphasis on academic excellence and community engagement, the department regularly organizes continuing medical education programmes, workshops, seminars, field visits, and health awareness initiatives. The department actively promotes research, community-based learning, and public health practice through field visits, outreach programmes, health awareness campaigns, collaborations with public health institutions, and participation in national health programmes. Through these efforts, it continues to contribute towards strengthening public health systems and developing competent public health professionals.
                        </p>
                    </div>

                    <div className={styles.imageSection} style={{ padding: 0 }}>
                        <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            {deptImages.map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt={`Department Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{
                                        objectFit: 'cover',
                                        opacity: deptIndex === index ? 1 : 0,
                                        transition: 'opacity 1s ease-in-out',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className={styles.sectionHeader} style={{ marginTop: '5rem' }}>
                    <span className={styles.sectionTag}>
                        <Building2 size={14} />
                        The Host Institution
                    </span>
                    <h2 className={styles.sectionTitle}>About Parul University</h2>
                    <p className={styles.sectionSubtitle}>
                        India&apos;s youngest private university to receive NAAC A++ accreditation in the first cycle
                    </p>
                    <div className={styles.titleDivider}>
                        <span className={styles.dividerLine}></span>
                        <span className={styles.dividerDot}></span>
                        <span className={styles.dividerLine}></span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Text Content */}
                    <div className={styles.textContent}>
                        <p className={styles.bodyText}>
                            Nestled in the vibrant city of <strong>Vadodara, Gujarat</strong>, Parul University has emerged as a beacon of academic excellence and innovation. With a sprawling <strong>150+ acre eco-friendly campus</strong>, the university is home to students from every Indian state and <strong>75+ countries</strong>, making it one of the most culturally diverse educational destinations in the country
                        </p>
                        <p className={styles.bodyText}>
                            Recognized for its world-class infrastructure, industry-aligned curriculum, and outstanding placement records, Parul University houses state-of-the-art research facilities, dedicated innovation and incubation centers, and a diverse range of disciplines across multiple faculties. These include the Faculty of Engineering and Technology, Faculty of Management Studies, Faculty of Applied Sciences, Faculty of Computer Science and Applications, Faculty of Pharmacy, Faculty of Medicine, Faculty of Nursing, Faculty of Architecture and Planning, Faculty of Law, Faculty of Community Medicine, Faculty of Design, Faculty of Commerce, Faculty of Agriculture, and Faculty of Hospitality and Tourism Management, creating a multidisciplinary academic ecosystem that encourages innovation, research, and holistic learning.
                        </p>
                    </div>

                    {/* Image & Badge Side */}
                    <div className={styles.imageSection}>
                        <div style={{ position: 'relative' }}>
                            <div className={styles.imageWrapper}>
                                {images.map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt={`Parul University Campus View ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{
                                        objectFit: 'cover',
                                        opacity: currentIndex === index ? 1 : 0,
                                        transition: 'opacity 1s ease-in-out',
                                    }}
                                />
                            ))}

                            {/* Slider dots */}
                            <div className={styles.sliderDots}>
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.imageAccent}></div>

                        {/* Floating NAAC Badge */}
                        <div className={styles.floatingBadge}>
                            <Award size={24} />
                            <div>
                                <strong>NAAC A++</strong>
                                <span>First Cycle</span>
                            </div>
                        </div>
                        </div>

                    </div>{/* end imageSection */}
                </div>{/* end contentGrid */}

                {/* Stats in a full-width row at the bottom of the section */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCardPremium}>
                        <div className={styles.statIconWrapPremium}><Award size={28} /></div>
                        <div className={styles.statNumberPremium}>NAAC A++</div>
                        <div className={styles.statTitlePremium}>Youngest Pvt University</div>
                        <div className={styles.statDescriptionPremium}>First Cycle Accreditation</div>
                    </div>
                    <div className={styles.statCardPremium}>
                        <div className={styles.statIconWrapPremium}><Users size={28} /></div>
                        <div className={styles.statNumberPremium}>65,000+</div>
                        <div className={styles.statTitlePremium}>Total Students</div>
                        <div className={styles.statDescriptionPremium}>From every state in India</div>
                    </div>
                    <div className={styles.statCardPremium}>
                        <div className={styles.statIconWrapPremium}><Globe size={28} /></div>
                        <div className={styles.statNumberPremium}>75+</div>
                        <div className={styles.statTitlePremium}>Global Countries</div>
                        <div className={styles.statDescriptionPremium}>4,500+ International Students</div>
                    </div>
                    <div className={styles.statCardPremium}>
                        <div className={styles.statIconWrapPremium}><TreePine size={28} /></div>
                        <div className={styles.statNumberPremium}>150+</div>
                        <div className={styles.statTitlePremium}>Acres Campus</div>
                        <div className={styles.statDescriptionPremium}>Eco-friendly Environment</div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export function AboutIAPSM() {
    const iapsmImages = [
        "/images/iapsmgc-chapter-1.jpg",
        "/images/iapsmgc-chapter-2.jpg",
        "/images/iapsmgc-chapter-3.jpg",
        "/images/iapsmgc-chapter-4.jpg"
    ];
    const [iapsmIndex, setIapsmIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIapsmIndex((prevIndex: number) => (prevIndex + 1) % iapsmImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [iapsmImages.length]);

    return (
        <section className={styles.venue} id="about-iapsm" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                {/* About IAPSM Gujarat Chapter */}
                <div className={styles.facultyRow}>
                    {/* Image side */}
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            {iapsmImages.map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt={`IAPSM Gujarat Chapter ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{
                                        objectFit: 'cover',
                                        opacity: iapsmIndex === index ? 1 : 0,
                                        transition: 'opacity 1s ease-in-out',
                                    }}
                                />
                            ))}

                            {/* Slider dots */}
                            <div className={styles.sliderDots}>
                                {iapsmImages.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.dot} ${iapsmIndex === index ? styles.dotActive : ''}`}
                                        onClick={() => setIapsmIndex(index)}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Text side */}
                    <div className={styles.textContent}>
                        <span className={styles.sectionTag} style={{ marginBottom: '0.5rem', background: 'transparent', border: 'none', padding: 0 }}>
                            ORGANISER
                        </span>
                        <h2 className={styles.sectionTitle} style={{ fontSize: '2.4rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                            About IAPSM Gujarat Chapter
                        </h2>
                        <p className={styles.bodyText}>
                            The <strong>Indian Association of Preventive &amp; Social Medicine (IAPSM)</strong> is the apex national body of community and public health professionals in India. The <strong>Gujarat Chapter of IAPSM</strong> represents community medicine faculty, public health practitioners, and researchers across the state of Gujarat.
                        </p>
                        <p className={styles.bodyText}>
                            The chapter actively promotes academic excellence in preventive and social medicine, fosters inter-institutional collaboration, advocates for evidence-based public health policy, and supports capacity building in community health at undergraduate, postgraduate, and doctoral levels. It organises annual conferences, workshops, and continuing medical education (CME) programmes to advance public health science and practice across Gujarat.
                        </p>
                        <p className={styles.bodyText}>
                            IAPSM Gujarat Chapter is committed to strengthening India&apos;s public health workforce and aligning state-level health interventions with national goals such as the Sustainable Development Goals (SDGs) and the Viksit Bharat vision.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
}
