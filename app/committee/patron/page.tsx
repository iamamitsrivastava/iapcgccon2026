'use client';
import { conference } from "@/data/conference";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CommitteeMember } from "@/types";

export default function PatronsPage() {
    const members: CommitteeMember[] = [
        conference.committees.president as CommitteeMember,
        ...(conference.committees.vicePresidents?.filter((p: CommitteeMember) => p.name.includes("Parul") || p.name.includes("Komal")) || []) as CommitteeMember[],
    ].filter(Boolean);

    return (
        <main style={{ backgroundColor: '#0B1C35', minHeight: '100vh', color: 'white' }}>
            <Header variant="solid" />

            {/* Hero Section */}
            <section style={{ textAlign: 'center', paddingTop: '10rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <ScrollReveal>
                    {/* Breadcrumb */}
                    <p style={{ color: '#FACC15', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        <a href="/committee" style={{ color: '#FACC15', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }}>Committee</a>
                        <span style={{ opacity: 0.4, margin: '0 0.75rem' }}>›</span>
                        Patron
                    </p>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'var(--font-heading)',
                        marginBottom: '1rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                    }}>
                        Patron
                    </h1>

                    <div style={{ width: '80px', height: '4px', background: 'linear-gradient(to right, #FACC15, #d4af37)', borderRadius: '2px', margin: '1.5rem auto' }} />

                    <p style={{
                        color: '#94a3b8',
                        maxWidth: '38rem',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                    }}>
                        Meet the honorable Patrons of Parul University supporting IAPSMGC CON 2026.
                    </p>
                </ScrollReveal>
            </section>

            {/* Members Section */}
            <section style={{ paddingBottom: '8rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        justifyContent: 'center',
                        alignItems: 'start'
                    }}>
                        {members.map((person, idx) => (
                            <ScrollReveal key={idx}>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2.5rem 2rem',
                                    borderRadius: '24px',
                                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                                    border: '1px solid rgba(250, 204, 21, 0.1)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                                    height: '100%',
                                }}
                                    className="office-bearer-card"
                                >
                                    {/* Image Block */}
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        maxWidth: '220px',
                                        aspectRatio: '1/1',
                                        borderRadius: '50%',
                                        border: '4px solid #FACC15',
                                        overflow: 'hidden',
                                        margin: '0 auto 1.5rem auto',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                                    }}>
                                        {person.image ? (
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                fill
                                                style={{ objectFit: 'cover', objectPosition: 'top' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b' }}>
                                                <span style={{ color: '#475569', fontSize: '3rem' }}>👤</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Text Block */}
                                    <p style={{
                                        color: '#FACC15',
                                        fontSize: '0.95rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {person.role || 'Patron'}
                                    </p>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 800,
                                        color: 'white',
                                        marginBottom: '0.5rem',
                                        fontFamily: 'var(--font-heading)',
                                        letterSpacing: '0.02em',
                                    }}>
                                        {person.name}
                                    </h3>
                                    {person.affiliation && (
                                        <p style={{
                                            color: '#94a3b8',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                            lineHeight: 1.5,
                                            whiteSpace: 'pre-line'
                                        }}>
                                            {person.affiliation}
                                        </p>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
