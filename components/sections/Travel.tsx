'use client';
import { useState } from 'react';
import { MapPin, Plane, Train, Car, Hotel, Camera, Info } from 'lucide-react';
import TouristSlider from './TouristSlider';
import styles from './Travel.module.css';

export default function Travel() {
    const [mapSrc, setMapSrc] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.413233214488!2d73.3613!3d22.2891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fca876ed3a4d3%3A0x6a05e5d36e7616f7!2sParul%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin");

    return (
        <section className={styles.travel}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Travel & Accommodation</h1>
                    <p className={styles.subtitle}>
                        Plan your trip to Vadodara for IAPSMGC CON 2026. Find information on travel, visas, and local stays.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Car size={32} /> How to Reach
                        </h2>
                        <div className={styles.reachItem}>
                            <h4><Plane size={18} /> By Air</h4>
                            <p>
                                Vadodara Airport (BDQ) is the nearest airport, connected to major Indian cities.
                                The university is approximately a 30-minute drive from the airport.
                            </p>
                            <button
                                onClick={() => setMapSrc("https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Vadodara+Airport+BDQ+to+Parul+University&t=&z=13&ie=UTF8&iwloc=B&output=embed")}
                                className={styles.reachButton}
                            >
                                Reach Parul: By Air <MapPin size={16} />
                            </button>
                        </div>
                        <div className={styles.reachItem}>
                            <h4><Train size={18} /> By Rail</h4>
                            <p>
                                Vadodara Junction (BRC) is a major railway station on the Western Railway line,
                                with excellent connectivity across India.
                            </p>
                            <button
                                onClick={() => setMapSrc("https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Vadodara+Junction+BRC+to+Parul+University&t=&z=13&ie=UTF8&iwloc=B&output=embed")}
                                className={styles.reachButton}
                            >
                                Reach Parul: By Rail <MapPin size={16} />
                            </button>
                        </div>
                        <div className={styles.reachItem}>
                            <h4><Car size={18} /> By Road</h4>
                            <p>
                                Vadodara is connected by National Highway 48 & National Expressway 1.
                                Taxis and local transport are readily available to reach the university campus.
                            </p>
                            <button
                                onClick={() => setMapSrc("https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Parul+University+Vadodara&t=&z=14&ie=UTF8&iwloc=B&output=embed")}
                                className={styles.reachButton}
                            >
                                Reach Parul: By Road <MapPin size={16} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.mapWrapper}>
                        <h2 className={styles.sectionTitle}>
                            <MapPin size={32} /> Conference Venue
                        </h2>
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className={styles.mapFrame}
                        ></iframe>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Hotel size={32} /> Accommodation
                        </h2>
                        <ul className={styles.accommodationList}>
                            <li className={styles.accommodationItem}>
                                <span className={styles.hotelName}>University Guest House</span>
                                <span className={styles.hotelDistance}>On Campus</span>
                            </li>
                            <li className={styles.accommodationItem}>
                                <span className={styles.hotelName}>Vadpadraka Hotel & Resort</span>
                                <span className={styles.hotelDistance}>2.3 km from venue</span>
                            </li>
                            <li className={styles.accommodationItem}>
                                <span className={styles.hotelName}>Hotel Grand Mercure</span>
                                <span className={styles.hotelDistance}>19.5 km from venue</span>
                            </li>
                            <li className={styles.accommodationItem}>
                                <span className={styles.hotelName}>Effotel by Sayaji</span>
                                <span className={styles.hotelDistance}>19.5 km from venue</span>
                            </li>
                            <li className={styles.accommodationItem}>
                                <span className={styles.hotelName}>Courtyard by Marriott</span>
                                <span className={styles.hotelDistance}>23.1 km from venue</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>
                            <Camera size={32} /> Nearby Attractions
                        </h2>
                        <div className={styles.attractionGrid}>
                            <div className={styles.attractionItem}>
                                <h5>Laxmi Vilas Palace</h5>
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>A magnificent royal residence larger than Buckingham Palace.</p>
                            </div>
                            <div className={styles.attractionItem}>
                                <h5>Sayaji Baug</h5>
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>A large park housing a zoo, museums, and a planetarium.</p>
                            </div>
                            <div className={styles.attractionItem}>
                                <h5>Champaner-Pavagadh</h5>
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>A UNESCO World Heritage Site with historical ruins.</p>
                            </div>
                            <div className={styles.attractionItem}>
                                <h5>Statue of Unity</h5>
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>The world&apos;s tallest statue, a monumental tribute.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sliderHeader}>
                    <h2 className={styles.sectionTitle} style={{ justifyContent: 'center' }}>
                        <Camera size={32} /> Local Highlights
                    </h2>
                    <TouristSlider aspectRatio="21 / 9" maxWidth="1200px" />
                </div>

            </div>
        </section>
    );
}
