'use client';

import { useState } from 'react';
import styles from './Contact.module.css';


export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Only allow digits, max 10
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, phone: digitsOnly }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                alert(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send message. Please check your connection and try again.');
        }
    };

    return (
        <section className={styles.contactSection} id="contact">
            <div className={styles.container}>
                <h2 className={styles.heading}>Contact Us</h2>
                <div className={styles.underline}></div>

                <div className={styles.grid}>
                    {/* Contact Info Column */}
                    <div className={styles.infoColumn}>
                        <div className={styles.infoBlock}>
                            <h3 className={styles.subHeading}>Contact Information :</h3>

                            <div className={styles.contactItem}>
                                <h4>Address</h4>
                                <p>Department of Community Medicine</p>
                                <p> 2nd floor, PIMSR, Parul University</p>
                                <p>Vadodara – 391760</p>
                            </div>

                            <div className={styles.contactItem}>
                                <h4>Email</h4>
                                <p>
                                    <a href="mailto:iapsmgc.conference@paruluniversity.ac.in" style={{ color: '#f0c040', wordBreak: 'break-all' }}>
                                        iapsmgc.conference@paruluniversity.ac.in
                                    </a>
                                </p>
                            </div>

                            <div className={styles.contactItem}>
                                <h4>Inquiry: Info of Organizing personnel</h4>
                                <p style={{ marginBottom: '0.5rem' }}>
                                    <strong>Dr Keyur Mistry</strong><br />
                                    Contact number - 9727913272
                                </p>
                                <p style={{ marginBottom: '0.5rem' }}>
                                    <strong>Dr Swapnil Raulji</strong><br />
                                    Contact number - 7046653327
                                </p>
                                <p>
                                    <strong>Dr Aditya Babaria</strong><br />
                                    Contact number - 9601490880
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className={styles.formColumn}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Contact Number (10 digits)"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={styles.input}
                                    inputMode="numeric"
                                    maxLength={10}
                                    pattern="[0-9]{10}"
                                    title="Please enter exactly 10 digits"
                                />
                                {formData.phone.length > 0 && (
                                    <p style={{
                                        fontSize: '0.75rem',
                                        marginTop: '0.35rem',
                                        color: formData.phone.length === 10 ? '#4ade80' : '#f0c040',
                                        textAlign: 'right'
                                    }}>
                                        {formData.phone.length}/10 digits
                                        {formData.phone.length === 10 ? ' ✓' : ''}
                                    </p>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={styles.textarea}
                                    required
                                    rows={5}
                                ></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
