import { Award } from 'lucide-react';
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
        title: "Shri H.M. Patel Trophy for Young Scientist",
        text: "it was initiated to increase the interest in research in junior members of IAPSM and encourage who is doing good work in research by awarding the trophy and certificate."
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
