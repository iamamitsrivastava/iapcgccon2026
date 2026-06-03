import { BookOpen, Award, FileText, Share2, Mic, BadgeCheck } from 'lucide-react';
import styles from './Highlights.module.css';
import ScrollReveal from '@/components/ui/ScrollReveal';

const awardsData = [
    {
        icon: <Award size={24} strokeWidth={1.5} />,
        title: "Best Oral Paper Presentation",
        text: "Recognizing outstanding oral presentations with profound impact."
    },
    {
        icon: <Award size={24} strokeWidth={1.5} />,
        title: "Best Poster Award",
        text: "Honoring the most visually and scientifically compelling poster presentations."
    },
    {
        icon: <Award size={24} strokeWidth={1.5} />,
        title: "Young Researcher Award",
        text: "Celebrating the achievements of promising young researchers."
    },
    {
        icon: <Award size={24} strokeWidth={1.5} />,
        title: "Lifetime Contribution Award",
        text: "A prestigious award honoring significant lifetime contributions to the field."
    },
    {
        icon: <Award size={24} strokeWidth={1.5} />,
        title: "Presidential Appreciation Awards",
        text: "Special recognition from the President for exceptional dedication."
    }
];

export function Highlights() {
    return (
        <section className={`section ${styles.highlights}`} id="highlights">
            <div className="container">
                <ScrollReveal>
                    <div className={styles.header}>
                        <span className={styles.subtitle}>RECOGNITION</span>
                        <h2 className={styles.title}>Awards</h2>
                    </div>
                </ScrollReveal>

                <div className={styles.grid}>
                    {awardsData.map((item, index) => (
                        <ScrollReveal
                            key={index}
                            animation="fade-up"
                            delay={(index * 100) as 0 | 100 | 200 | 300 | 400 | 500}
                        >
                            <div className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <p className={styles.text}>{item.text}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
