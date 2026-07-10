'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TouristSlider.module.css';

export const landmarkImages = [
    { src: '/images/landmark-laxmi-vilas.png', name: 'Lakshmi Vilas Palace' },
    { src: '/images/landmark-sayaji-baug.png', name: 'Sayaji Baug' },
    { src: '/images/landmark-champaner.png', name: 'Champaner-Pavagadh' },
    { src: '/images/landmark-statue-unity.png', name: 'Statue of Unity' },
    { src: '/images/landmark-kirti-mandir.png', name: 'Kirti Mandir' },
];

interface TouristSliderProps {
    className?: string;
    aspectRatio?: string;
    maxWidth?: string;
}

export default function TouristSlider({ className, aspectRatio = '3 / 4', maxWidth = '380px' }: TouristSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % landmarkImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div 
            className={`${styles.sliderContainer} ${className}`} 
            style={{ 
                aspectRatio, 
                maxWidth 
            }}
        >
            {landmarkImages.map((img, index) => (
                <div key={index} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: index === currentSlide ? 10 : 1,
                }}>
                    <Image
                        src={img.src}
                        alt={img.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{
                            objectFit: 'cover',
                            transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
                            transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 6s ease',
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(250, 204, 21, 0.3)',
                        zIndex: 12,
                        whiteSpace: 'nowrap' as const,
                    }}>
                        <p style={{
                            color: '#FACC15',
                            fontWeight: 700,
                            fontSize: '1rem',
                            margin: 0,
                            letterSpacing: '0.5px',
                        }}>
                            {img.name}
                        </p>
                    </div>
                </div>
            ))}
            {/* Slide Indicators */}
            <div className={styles.sliderIndicators}>
                {landmarkImages.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
