import Image from 'next/image';
import { conference } from '@/data/conference';
import styles from './Speakers.module.css';

export default function Speakers() {
    return (
        <section className={`section ${styles.speakers}`} id="speakers">
            <div className="container">
                <div className="text-center">
                    <h2 className={styles.heading}>International Speakers</h2>
                </div>

                <div className={styles.gridCols}>
                    {conference.speakers.map((speaker, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardInner}>
                                {/* Front Face */}
                                <div className={styles.cardFront}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={speaker.image || "/images/speaker-placeholder.png"}
                                            alt={speaker.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className={styles.image}
                                            priority={index === 0}
                                        />
                                        <div className={styles.nameOverlay}>
                                            <h3 className={styles.name}>{speaker.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className={styles.cardBack}>
                                    <div className={styles.backContent}>
                                        <h3 className={styles.backName}>{speaker.name}</h3>
                                        <div className={styles.role}>{speaker.role}</div>
                                        <div className={styles.institution}>{speaker.institution}</div>
                                        <div className={styles.divider}></div>
                                        {speaker.details && (
                                            <div className={styles.bioContainer}>
                                                <p className={styles.bio}>{speaker.details}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* National Speakers Section */}
                <div className="text-center" style={{ marginTop: '5rem' }}>
                    <h2 className={styles.heading}>National</h2>
                </div>

                <div className={styles.gridCols}>
                    {(conference as any).nationalSpeakers?.map((speaker: any, index: number) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardInner}>
                                {/* Front Face */}
                                <div className={styles.cardFront}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={speaker.image || "/images/speaker-placeholder.png"}
                                            alt={speaker.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className={styles.image}
                                        />
                                        <div className={styles.nameOverlay}>
                                            <h3 className={styles.name}>{speaker.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className={styles.cardBack}>
                                    <div className={styles.backContent}>
                                        <h3 className={styles.backName}>{speaker.name}</h3>
                                        <div className={styles.role}>{speaker.role}</div>
                                        <div className={styles.institution}>{speaker.institution}</div>
                                        <div className={styles.divider}></div>
                                        {speaker.details && (
                                            <div className={styles.bioContainer}>
                                                <p className={styles.bio}>{speaker.details}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
