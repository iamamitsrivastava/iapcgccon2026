'use client';
import { useState, useEffect } from 'react';
import { MapPin, Award, Users, Globe, TreePine, ChevronRight, Building2 } from 'lucide-react';
import Image from 'next/image';
import styles from './Venue.module.css';

export function Venue() {
    const images = [
        "/images/venue-slider-3.jpg",
        "/images/venue-slider-2.jpg",
        "/images/venue-slider-4.jpg",
        "/images/about-buddha.jpg",
        "/images/gate-hero.jpg",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const iapsmImages = [
        "/images/iapsm-1.jpg",
        "/images/iapsm-2.png",
        "/images/iapsm-3.png",
    ];
    const [iapsmIndex, setIapsmIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex: number) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIapsmIndex((prevIndex: number) => (prevIndex + 1) % iapsmImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [iapsmImages.length]);

    return (
        <section className={styles.venue} id="about-parul">
            <div className="container">

                {/* Section Header */}
                <div className={styles.sectionHeader}>
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
                            Recognized for its world-class infrastructure, industry-aligned curriculum, and outstanding placement records, Parul University houses state-of-the-art research facilities, dedicated innovation and incubation centers, and a diverse range of disciplines across multiple faculties. These include the Faculty of Engineering and Technology, Faculty of Management Studies, Faculty of Applied Sciences, Faculty of Computer Science and Applications, Faculty of Pharmacy, Faculty of Medicine, Faculty of Nursing, Faculty of Architecture and Planning, Faculty of Law, Faculty of Liberal Arts, Faculty of Design, Faculty of Commerce, Faculty of Agriculture, and Faculty of Hospitality and Tourism Management, creating a multidisciplinary academic ecosystem that encourages innovation, research, and holistic learning.
                        </p>

                        {/* Venue details */}
                        <div className={styles.featureChips}>
                            <span className={styles.chip}><strong>Main Inauguration:</strong>&nbsp;University Auditorium</span>
                            <span className={styles.chip}><strong>Scientific Sessions:</strong>&nbsp;Seminar Hall 1, Seminar Hall 2</span>
                            <span className={styles.chip}><strong>Workshops:</strong>&nbsp;Skill Labs</span>
                            <span className={styles.chip}><strong>Prayas Hall:</strong>&nbsp;Poster &amp; Dining</span>
                            <span className={styles.chip}><strong>Central Foyer:</strong>&nbsp;PIMSR Parking</span>
                        </div>

                        {/* Location */}
                        <a
                            href="https://www.google.com/maps/place/Parul+University,+Limda,+Ta.+Waghodiya,+Vadodara,+Gujarat+391760/@22.2930981,73.2242498,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.locationLink}
                        >
                            <div className={styles.locationIcon}>
                                <MapPin size={18} />
                            </div>
                            <div className={styles.locationInfo}>
                                <span className={styles.locationLabel}>CONFERENCE VENUE</span>
                                <span className={styles.locationText}>Parul University, Vadodara, Gujarat, India</span>
                            </div>
                            <ChevronRight size={16} className={styles.locationArrow} />
                        </a>
                    </div>

                    {/* Image & Badge Side */}
                    <div className={styles.imageSection}>
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

                        {/* Stats inside image column — fills white space */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.75rem',
                            marginTop: '1rem',
                        }}>
                            <div className={styles.statCard} style={{ padding: '1rem 1rem' }}>
                                <div className={styles.statIconWrap} style={{ marginBottom: '0.5rem' }}><Award size={22} /></div>
                                <div className={styles.statNumber} style={{ fontSize: '1.1rem' }}>NAAC A++</div>
                                <div className={styles.statTitle} style={{ fontSize: '0.75rem' }}>Youngest Pvt University</div>
                                <div className={styles.statDescription} style={{ fontSize: '0.7rem' }}>First Cycle Accreditation</div>
                            </div>
                            <div className={styles.statCard} style={{ padding: '1rem 1rem' }}>
                                <div className={styles.statIconWrap} style={{ marginBottom: '0.5rem' }}><Users size={22} /></div>
                                <div className={styles.statNumber} style={{ fontSize: '1.1rem' }}>65,000+</div>
                                <div className={styles.statTitle} style={{ fontSize: '0.75rem' }}>Total Students</div>
                                <div className={styles.statDescription} style={{ fontSize: '0.7rem' }}>From every state in India</div>
                            </div>
                            <div className={styles.statCard} style={{ padding: '1rem 1rem' }}>
                                <div className={styles.statIconWrap} style={{ marginBottom: '0.5rem' }}><Globe size={22} /></div>
                                <div className={styles.statNumber} style={{ fontSize: '1.1rem' }}>75+</div>
                                <div className={styles.statTitle} style={{ fontSize: '0.75rem' }}>Global Countries</div>
                                <div className={styles.statDescription} style={{ fontSize: '0.7rem' }}>4,500+ International Students</div>
                            </div>
                            <div className={styles.statCard} style={{ padding: '1rem 1rem' }}>
                                <div className={styles.statIconWrap} style={{ marginBottom: '0.5rem' }}><TreePine size={22} /></div>
                                <div className={styles.statNumber} style={{ fontSize: '1.1rem' }}>150+</div>
                                <div className={styles.statTitle} style={{ fontSize: '0.75rem' }}>Acres Campus</div>
                                <div className={styles.statDescription} style={{ fontSize: '0.7rem' }}>Eco-friendly Environment</div>
                            </div>
                        </div>
                    </div>{/* end imageSection */}
                </div>{/* end contentGrid */}





                {/* About IAPSM Gujarat Chapter */}
                <div id="about-iapsm" className={styles.facultyRow} style={{ marginTop: '8rem', scrollMarginTop: '100px' }}>
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
