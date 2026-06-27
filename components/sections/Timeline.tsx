import { CalendarClock, Send, CheckCircle, FileText } from 'lucide-react';
import { conference } from '@/data/conference';
import styles from './Timeline.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { TimelineItem } from '@/types';

export default function Timeline() {
    const icons = [
        <Send key="1" size={24} />,        // Abstract Submission
        <FileText key="2" size={24} />,    // Full Paper Submission
        <CheckCircle key="3" size={24} />, // Notification
        <CheckCircle key="4" size={24} />, // Pre-Conference
        <CalendarClock key="5" size={24} />, // Conference
    ];

    return (
        <section className={`section ${styles.timelineSection}`} id="dates">
            <div className="container">
                <ScrollReveal>
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <span className="text-uppercase" style={{ color: 'var(--color-secondary)' }}>Timeline</span>
                        <h2 style={{ color: 'white' }}>Key Dates</h2>
                    </div>
                </ScrollReveal>

                <div className={styles.timeline}>
                    {conference.timeline.map((item: TimelineItem, index: number) => (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <ScrollReveal key={index} delay={(index * 100) as any} animation="fade-up">
                            <div className={styles.item}>
                                <div className={styles.dot}>
                                    {icons[index]}
                                </div>
                                <span className={styles.date}>{item.date}</span>
                                <span className={styles.label}>{item.label}</span>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
