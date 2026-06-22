'use client';
import { conference } from "@/data/conference";
import Header from "@/components/sections/Header";
import Footer from "../../components/sections/Footer";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CommitteeMember } from "@/types";
import advisoryStyles from "@/components/sections/Advisory.module.css";

const CheckCircle2 = ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9 12l2 2 4-4"></path>
    </svg>
);

export default function CommitteePage() {
    return (
        <main style={{ backgroundColor: '#0B1C35', minHeight: '100vh', color: 'white' }}>
            <Header variant="solid" />

            {/* Hero / Header Section */}
            <section style={{ textAlign: 'center', paddingTop: '10rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <ScrollReveal>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'var(--font-heading)',
                        marginBottom: '1rem',
                        letterSpacing: '0.02em'
                    }}>
                        Conference Committees
                    </h1>
                    <div style={{ width: '60px', height: '4px', background: '#FACC15', margin: '0.5rem auto 2rem auto', borderRadius: '2px' }}></div>
                    <p style={{
                        color: '#94a3b8',
                        fontSize: '1.25rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: 1.6
                    }}>
                        Meet the dedicated team of experts and professionals who are working to make IAPSMGC CON 2026 a premier scientific event.
                    </p>
                </ScrollReveal>
            </section>




            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

                {/* --- LEADERSHIP --- */}
                <div id="leadership" style={{ marginBottom: '6rem', scrollMarginTop: '6rem' }}>
                    {/* President & Vice President Section */}
                    <section style={{ marginBottom: '8rem' }}>
                        {/* Leadership Row 1 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '3rem',
                            maxWidth: '1200px',
                            margin: '0 auto',
                            marginBottom: '4rem',
                            justifyContent: 'center'
                        }}>
                            {([
                                conference.committees.president as CommitteeMember,
                                conference.committees.vicePresidents?.find((p: CommitteeMember) => p.name.includes("Parul")),
                                conference.committees.vicePresidents?.find((p: CommitteeMember) => p.name.includes("Komal"))
                            ].filter(Boolean) as CommitteeMember[]).map((person: CommitteeMember, idx: number) => (
                                <ScrollReveal key={`row1-${idx}`}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            position: 'relative',
                                            aspectRatio: '1/1',
                                            borderRadius: '50%',
                                            maxWidth: '250px',
                                            margin: '0 auto',
                                            overflow: 'hidden',
                                            border: '4px solid #FACC15',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                            transition: 'transform 0.3s ease',
                                            marginBottom: '2rem'
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
                                                    <span style={{ color: '#94a3b8' }}>No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                        <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Leadership Row 2 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '4rem'
                        }}>
                            {([
                                conference.committees.vicePresidents?.find((p: CommitteeMember) => p.name.includes("Geetika"))
                            ].filter(Boolean) as CommitteeMember[]).map((person: CommitteeMember, idx: number) => (
                                <ScrollReveal key={`row2-${idx}`}>
                                    <div style={{ textAlign: 'center', width: '350px' }}>
                                        <div style={{
                                            position: 'relative',
                                            aspectRatio: '1/1',
                                            borderRadius: '50%',
                                            maxWidth: '250px',
                                            margin: '0 auto',
                                            overflow: 'hidden',
                                            border: '4px solid #FACC15',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                            transition: 'transform 0.3s ease',
                                            marginBottom: '2rem'
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
                                                    <span style={{ color: '#94a3b8' }}>No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                        <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>


                    {/* Chief Patrons Section */}
                    <section style={{ marginBottom: '8rem' }}>
                        <ScrollReveal>
                            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                gap: '3rem',
                                maxWidth: '1000px',
                                margin: '0 auto',
                                justifyContent: 'center'
                            }}>
                                {conference.committees.chiefPatrons.slice(0, 2).map((person, idx) => (
                                    <div key={idx} style={{ textAlign: 'center' }}>
                                        <div style={{
                                            position: 'relative',
                                            aspectRatio: '1/1',
                                            borderRadius: '50%',
                                            maxWidth: '250px',
                                            margin: '0 auto',
                                            overflow: 'hidden',
                                            border: '4px solid #FACC15',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                            marginBottom: '2rem'
                                        }}>
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                fill
                                                style={{ objectFit: 'cover', objectPosition: 'top' }}
                                            />
                                        </div>
                                        <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </section>


                </div>

                {/* --- ORGANIZING TEAM --- */}
                <div id="organizing" style={{ marginBottom: '6rem', scrollMarginTop: '6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
                        <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(250, 204, 21, 0.3))' }}></div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FACC15', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Organizing Team</h2>
                        <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(250, 204, 21, 0.3))' }}></div>
                    </div>

                    {/* Secretary Section - Separate Row */}
                    {conference.committees.secretaries && conference.committees.secretaries.length > 0 && (
                        <section style={{ marginBottom: '6rem' }}>
                            <ScrollReveal>
                                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                                </div>
                                <div style={{
                                    maxWidth: '400px',
                                    margin: '0 auto',
                                    textAlign: 'center'
                                }}>
                                    {conference.committees.secretaries.map((person: CommitteeMember, idx: number) => (
                                        <div key={`sec-${idx}`}>
                                            <div style={{
                                                position: 'relative',
                                                aspectRatio: '1/1',
                                                borderRadius: '50%',
                                                maxWidth: '250px',
                                                margin: '0 auto',
                                                overflow: 'hidden',
                                                border: '4px solid #FACC15',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                                marginBottom: '2rem',
                                                transition: 'transform 0.3s ease'
                                            }}>
                                                <Image
                                                    src={person.image!}
                                                    alt={person.name}
                                                    fill
                                                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                                                />
                                            </div>
                                            <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                            <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>
                    )}

                    {/* Convener & Co-Conveners Section */}
                    {((conference.committees as any).conveners?.length || (conference.committees as any).coConveners?.length) ? (
                        <section style={{ marginBottom: '8rem' }}>
                            <ScrollReveal>
                                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '4rem',
                                    maxWidth: '1200px',
                                    margin: '0 auto',
                                    alignItems: 'start',
                                    justifyContent: 'center'
                                }}>
                                    {(conference.committees as any).conveners?.map((person: CommitteeMember, idx: number) => (
                                        <div key={`conv-${idx}`} style={{ textAlign: 'center', width: '300px', margin: '0 auto' }}>
                                            <div style={{
                                                position: 'relative',
                                                aspectRatio: '1/1',
                                                borderRadius: '50%',
                                                maxWidth: '250px',
                                                width: '100%',
                                                margin: '0 auto',
                                                overflow: 'hidden',
                                                border: '4px solid #FACC15',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                                marginBottom: '2rem',
                                                transition: 'transform 0.3s ease'
                                            }}>
                                                <Image
                                                    src={person.image!}
                                                    alt={person.name}
                                                    fill
                                                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                                                />
                                            </div>
                                            <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                            <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                        </div>
                                    ))}

                                    {(conference.committees as any).coConveners?.map((person: CommitteeMember, idx: number) => (
                                        <div key={`coconv-${idx}`} style={{ textAlign: 'center', width: '300px', margin: '0 auto' }}>
                                            <div style={{
                                                position: 'relative',
                                                aspectRatio: '1/1',
                                                borderRadius: '50%',
                                                maxWidth: '250px',
                                                width: '100%',
                                                margin: '0 auto',
                                                overflow: 'hidden',
                                                border: '4px solid #FACC15',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                                marginBottom: '2rem',
                                                transition: 'transform 0.3s ease'
                                            }}>
                                                <Image
                                                    src={person.image!}
                                                    alt={person.name}
                                                    fill
                                                    style={{ objectFit: 'cover', objectPosition: person.name.includes("Ashish") ? 'center 30%' : person.name.includes("Ashok") ? 'center 25%' : 'top' }}
                                                />
                                            </div>
                                            <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                            <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>
                    ) : null}

                    {/* Organizing Secretaries Section */}
                    {conference.committees.organizingSecretaries && conference.committees.organizingSecretaries.length > 0 && (
                        <section style={{ marginBottom: '8rem' }}>
                            <ScrollReveal>
                                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '3rem',
                                    maxWidth: '1000px',
                                    margin: '0 auto',
                                    justifyContent: 'center'
                                }}>
                                    {conference.committees.organizingSecretaries.map((person: CommitteeMember, idx: number) => (
                                        <div key={`orgsec-${idx}`} style={{ textAlign: 'center' }}>
                                            <div style={{
                                                position: 'relative',
                                                aspectRatio: '1/1',
                                                borderRadius: '50%',
                                                maxWidth: '250px',
                                                margin: '0 auto',
                                                overflow: 'hidden',
                                                border: '4px solid #FACC15',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                                marginBottom: '2rem',
                                                transition: 'transform 0.3s ease'
                                            }}>
                                                <Image
                                                    src={person.image!}
                                                    alt={person.name}
                                                    fill
                                                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                                                />
                                            </div>
                                            <p style={{ color: '#FACC15', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{person.role}</p>
                                            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{person.name}</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>{person.affiliation}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>
                    )}

                </div>

                {/* --- OPERATIONAL COMMITTEES --- */}
                <div id="operational" style={{ paddingBottom: '8rem', scrollMarginTop: '6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
                        <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(250, 204, 21, 0.3))' }}></div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FACC15', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Committees</h2>
                        <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(250, 204, 21, 0.3))' }}></div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {[
                            { name: "Advisory Committee", list: conference.committees.advisory },
                            { name: "Scientific Committee", list: conference.committees.scientificCommittee },
                            { name: "Registration Committee", list: conference.committees.registrationCommittee },
                            { name: "Souvenir Committee", list: (conference.committees as any).souvenirCommittee },
                            { name: "Cultural Committee", list: conference.committees.culturalCommittee },
                            { name: "Transport & Accommodation Committee", list: (conference.committees as any).transportAccommodation },
                            { name: "Venue & Stage Committee", list: (conference.committees as any).venueStage }
                        ].map((comm, idx) => comm.list && comm.list.length > 0 && (
                            <ScrollReveal key={idx}>
                                <div className={advisoryStyles.opCard} style={{
                                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                                    backdropFilter: 'blur(16px)',
                                    padding: '2rem 2rem 2.5rem',
                                    borderRadius: '1.25rem',
                                    border: '1px solid rgba(250, 204, 21, 0.12)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    height: '100%',
                                    position: 'relative' as const,
                                    overflow: 'hidden' as const,
                                }}>
                                    <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #FACC15, #f59e0b, #d97706)' }} />
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
                                        <div style={{ background: 'linear-gradient(135deg, #FACC15, #f59e0b)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(250, 204, 21, 0.3)' }}>
                                            <CheckCircle2 size={20} color="#0B1C35" />
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FACC15', letterSpacing: '0.03em' }}>{comm.name}</h3>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {comm.list.map((name: string, itemIdx: number) => (
                                            <li key={itemIdx} style={{ padding: '0.55rem 0', color: '#e2e8f0', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderBottom: itemIdx !== comm.list.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FACC15', display: 'inline-block', flexShrink: 0, marginTop: '8px', boxShadow: '0 0 8px rgba(250,204,21,0.5)' }}></span>
                                                <span style={{ fontWeight: String(name).includes('(Lead)') || String(name).includes('(Chairman)') ? 700 : 500, color: String(name).includes('(Lead)') || String(name).includes('(Chairman)') ? '#FACC15' : 'inherit', lineHeight: 1.4 }}>{String(name)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}
