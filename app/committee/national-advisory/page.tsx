'use client';
import { conference } from "@/data/conference";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CommitteeMember } from "@/types";

export default function NationalAdvisoryPage() {

    const groupedMembers = [
        { category: "Chief Guest", members: [] as CommitteeMember[] },
        { category: "Guest of Honour", members: [] as CommitteeMember[] },
        { category: "Academic Leadership & Chairpersons", members: [] as CommitteeMember[] },
        { category: "Deans & Department Heads", members: [] as CommitteeMember[] },
        { category: "Professors & Advisors", members: [] as CommitteeMember[] }
    ];

    (conference.committees.nationalAdvisory || []).forEach(member => {
        const r = (member.role || '').toLowerCase();
        if (member.name.includes('Maheswar Satpathy')) {
            groupedMembers[4].members.push(member);
        } else if (member.name.includes('Ram Madhav')) {
            groupedMembers[0].members.push(member);
        } else if (r.includes('mp')) {
            groupedMembers[1].members.push(member);
        } else if (r.includes('vice chancellor') || r.includes('chairman') || r.includes('founder') || r.includes('director')) {
            groupedMembers[2].members.push(member);
        } else if (r.includes('dean') || r.includes('head') || r.includes('hod')) {
            groupedMembers[3].members.push(member);
        } else {
            groupedMembers[4].members.push(member);
        }
    });

    const activeGroups = groupedMembers.filter(g => g.members.length > 0);

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
                        National Advisory
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
                        National Advisory
                    </h1>

                    <div style={{ width: '80px', height: '4px', background: 'linear-gradient(to right, #FACC15, #d4af37)', borderRadius: '2px', margin: '1.5rem auto' }} />

                    <p style={{
                        color: '#94a3b8',
                        maxWidth: '38rem',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                    }}>
                        Eminent national scholars and academicians guiding the academic direction of IAPSMGC CON 2026.
                    </p>
                </ScrollReveal>
            </section>

            {/* Members Tree Flow */}
            <section style={{ paddingBottom: '8rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {activeGroups.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {activeGroups.map((group, groupIdx) => (
                                <div key={groupIdx} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: groupIdx === activeGroups.length - 1 ? '0' : '2rem' }}>

                                    {/* Category Title */}
                                    <h2 style={{
                                        fontSize: '1rem',
                                        fontWeight: 800,
                                        color: '#FACC15',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.15em',
                                        marginBottom: '3.5rem',
                                        background: 'linear-gradient(90deg, rgba(250,204,21,0.05) 0%, rgba(250,204,21,0.15) 50%, rgba(250,204,21,0.05) 100%)',
                                        padding: '0.5rem 2.5rem',
                                        borderRadius: '99px',
                                        borderTop: '1px solid rgba(250, 204, 21, 0.3)',
                                        borderBottom: '1px solid rgba(250, 204, 21, 0.3)',
                                        textAlign: 'center',
                                        position: 'relative'
                                    }}>
                                        {group.category}
                                    </h2>

                                    {/* Members Grid for this Tier */}
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '3rem',
                                        width: '100%',
                                        maxWidth: '1000px'
                                    }}>
                                        {group.members.map((person: CommitteeMember, idx: number) => (
                                            <ScrollReveal key={idx}>
                                                <div style={{
                                                    textAlign: 'center',
                                                    width: group.category === "Chief Guest" ? '100%' : '280px',
                                                    maxWidth: group.category === "Chief Guest" ? '800px' : '280px',
                                                    margin: '0 auto',
                                                    background: group.category === "Chief Guest" ? 'rgba(30, 41, 59, 0.3)' : 'transparent',
                                                    padding: group.category === "Chief Guest" ? '2.5rem' : '0',
                                                    borderRadius: group.category === "Chief Guest" ? '24px' : '0',
                                                    border: group.category === "Chief Guest" ? '1px solid rgba(250, 204, 21, 0.1)' : 'none',
                                                }}>
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
                                                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s',
                                                    }}
                                                        className="advisor-image-container"
                                                    >
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
                                                    <h3 style={{
                                                        fontSize: group.category === "Chief Guest" ? '2rem' : '1.4rem',
                                                        fontWeight: 800,
                                                        color: 'white',
                                                        marginBottom: '0.4rem',
                                                        fontFamily: 'var(--font-heading)',
                                                        letterSpacing: '0.02em',
                                                    }}>
                                                        {person.name}
                                                    </h3>
                                                    {person.role && (
                                                        <p style={{
                                                            color: '#FACC15',
                                                            fontSize: '0.95rem',
                                                            fontWeight: 600,
                                                            marginBottom: '0.35rem',
                                                            lineHeight: 1.3
                                                        }}>
                                                            {person.role}
                                                        </p>
                                                    )}
                                                    {person.affiliation && (
                                                        <p style={{
                                                            color: '#94a3b8',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 500,
                                                            lineHeight: 1.5,
                                                            marginBottom: person.details ? '0.75rem' : '0'
                                                        }}>
                                                            {person.affiliation}
                                                        </p>
                                                    )}
                                                    {person.details && (
                                                        <p style={{
                                                            color: '#e2e8f0',
                                                            fontSize: '1.05rem',
                                                            lineHeight: 1.7,
                                                            textAlign: 'justify',
                                                            textAlignLast: 'center',
                                                            marginTop: '1rem',
                                                            paddingTop: '1rem',
                                                            borderTop: '1px solid rgba(250,204,21,0.2)'
                                                        }}>
                                                            {person.details}
                                                        </p>
                                                    )}
                                                </div>
                                            </ScrollReveal>
                                        ))}
                                    </div>

                                    {/* Connector Line if not last tier */}
                                    {groupIdx < activeGroups.length - 1 && (
                                        <div style={{
                                            width: '2px',
                                            height: '70px',
                                            background: 'linear-gradient(to bottom, rgba(250, 204, 21, 0.8), transparent)',
                                            margin: '3rem auto 1rem auto'
                                        }} />
                                    )}

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8' }}>
                            <p style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>🏛️</p>
                            <p>National Advisory Committee members will be announced soon.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
