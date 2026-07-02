'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TouristSlider.module.css';

export const landmarkImages = [
    '/images/landmark-palace.jpg',
    '/images/landmark-castle-new.jpg',
    '/images/landmark-dome.jpg',
    '/images/landmark-shiva-statue.png',
    '/images/landmark-statue.png'
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
            {landmarkImages.map((src, index) => (
                <Image
                    key={index}
                    src={src}
                    alt={`Landmark ${index + 1}`}
                    fill
                    className={`${styles.slideImage} ${index === currentSlide ? styles.active : ''}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                        objectFit: 'cover'
                    }}
                />
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
