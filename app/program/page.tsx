import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import {
    Calendar, Clock, MapPin, Users, BookOpen, FlaskConical,
    Brain, Globe, FileText, Cpu, ChevronRight, Award
} from 'lucide-react';

export const metadata = {
    title: 'Scientific Program | IAPSMGC CON 2026',
    description: 'Pre-Conference Workshops and Main Conference Scientific Program for IAPSMGC CON 2026 at PIMSR, Parul University, Vadodara.',
};

/* ─── Workshop Data ─── */
const workshops = [
    {
        id: 1,
        icon: <FlaskConical size={26} />,
        title: 'IBM SPSS Statistics / R for Health Research',
        color: '#D4AF37',
        duration: 'Full Day (9:00 AM – 5:00 PM)',
        capacity: '30 participants',
        description:
            'Hands-on workshop covering data entry, descriptive statistics, hypothesis testing, regression analysis, and data visualization using IBM SPSS and R. Participants will work with real-world public health datasets.',
        outcomes: [
            'Data cleaning and preparation for analysis',
            'Descriptive and inferential statistics',
            'Chi-square, t-test, ANOVA, regression',
            'Kaplan-Meier survival analysis',
            'Creating publication-ready tables & graphs',
        ],
        facilitator: 'Expert Biostatistician',
        mode: 'Hands-on (Bring your laptop)',
    },
    {
        id: 2,
        icon: <BookOpen size={26} />,
        title: 'Research Methodology for Medical Professionals',
        color: '#D4AF37',
        duration: 'Half Day (9:00 AM – 1:00 PM)',
        capacity: '50 participants',
        description:
            'A comprehensive session on study design, sampling techniques, questionnaire development, ethical considerations, and translational research principles for healthcare practitioners.',
        outcomes: [
            'Study design selection and justification',
            'Sample size calculation & sampling methods',
            'Validated questionnaire development',
            'Research ethics and informed consent',
            'From question to publishable paper',
        ],
        facilitator: 'Senior Community Medicine Faculty',
        mode: 'Interactive Lecture + Case Studies',
    },
    {
        id: 3,
        icon: <FileText size={26} />,
        title: 'Scientific Writing & SUBMISSION Guidlines',
        color: '#D4AF37',
        duration: 'Half Day (2:00 PM – 6:00 PM)',
        capacity: '50 participants',
        description:
            'Master the art of crafting high-quality scientific manuscripts, navigating peer review, and understanding SUBMISSION Guidlines — including plagiarism, authorship criteria, and predatory journals.',
        outcomes: [
            'Structuring IMRaD format manuscripts',
            'Writing effective abstracts & titles',
            'Responding to peer reviewer comments',
            'ICMJE authorship criteria',
            'Identifying predatory vs. reputed journals',
        ],
        facilitator: 'Experienced Medical Editor & Author',
        mode: 'Workshop + Writing Exercises',
    },
    {
        id: 4,
        icon: <Globe size={26} />,
        title: 'GIS Mapping in Public Health & Epidemiology',
        color: '#D4AF37',
        duration: 'Full Day (9:00 AM – 5:00 PM)',
        capacity: '25 participants',
        description:
            'Introduction to Geographic Information Systems (GIS) for spatial epidemiology, disease mapping, and health resource planning using QGIS and Google Earth Engine.',
        outcomes: [
            'GIS fundamentals and spatial data concepts',
            'Disease burden mapping by district',
            'Health facility accessibility analysis',
            'Choropleth and dot-density maps',
            'Integrating GIS with epidemiological data',
        ],
        facilitator: 'GIS & Spatial Epidemiology Expert',
        mode: 'Hands-on (Bring your laptop)',
    },
    {
        id: 5,
        icon: <Cpu size={26} />,
        title: 'AI in Medical Education & Healthcare',
        color: '#D4AF37',
        duration: 'Half Day (9:00 AM – 1:00 PM)',
        capacity: '40 participants',
        description:
            'An immersive workshop exploring how Artificial Intelligence is reshaping medical education, clinical decision support, diagnostic imaging, and public health surveillance.',
        outcomes: [
            'AI fundamentals for non-engineers',
            'AI tools in CBME and simulation',
            'ChatGPT & LLMs in medical research',
            'AI-assisted radiology & pathology',
            'Ethical considerations in healthcare AI',
        ],
        facilitator: 'AI in Medicine Specialist',
        mode: 'Demonstration + Interactive',
    },
    {
        id: 6,
        icon: <Award size={26} />,
        title: 'Leadership in Public Health',
        color: '#D4AF37',
        duration: 'Half Day (2:00 PM – 6:00 PM)',
        capacity: '40 participants',
        description:
            'Developing transformational leaders for public health through frameworks of strategic thinking, policy advocacy, team dynamics, and crisis communication for a Viksit Bharat.',
        outcomes: [
            'Leadership styles in public health context',
            'Strategic planning for health programmes',
            'Stakeholder management & advocacy',
            'Crisis communication and risk messaging',
            'Building resilient public health teams',
        ],
        facilitator: 'National Public Health Leader',
        mode: 'Case-based Learning + Group Discussion',
    },
];

/* ─── Page Component ─── */
export default function ProgramPage() {
    return (
        <main>
            <Header variant="solid" />

            {/* Hero Banner */}
            <div className="program-hero">
                <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
                    <span style={{ display: 'block', color: '#D4AF37', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        IAPSMGC CON 2026
                    </span>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                        Scientific Program
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
                        Three days of learning, collaboration, and discovery — from hands-on pre-conference workshops to high-impact plenary sessions.
                    </p>

                    <div className="program-meta-row">
                        <div className="program-meta-item">
                            <Calendar size={18} style={{ color: '#D4AF37' }} />
                            <span>26 November 2026 — Pre-Conference</span>
                        </div>
                        <div className="program-meta-item">
                            <Calendar size={18} style={{ color: '#D4AF37' }} />
                            <span>27–28 November 2026 — Main Conference</span>
                        </div>
                        <div className="program-meta-item">
                            <MapPin size={18} style={{ color: '#D4AF37' }} />
                            <span>PIMSR, Parul University, Vadodara</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Pre-Conference Workshops Section ── */}
            <section className="program-section" id="workshops">
                <div className="container">
                    {/* Section header */}
                    <div className="program-section-header">
                        <div className="program-day-badge">
                            <Calendar size={20} />
                            <span>Day 0</span>
                        </div>
                        <div>
                            <h2 className="program-section-title">Pre-Conference Workshops</h2>
                            <p className="program-section-date">26 November 2026 · PIMSR Skills Lab & Conference Halls</p>
                        </div>
                    </div>

                    <p className="program-section-intro">
                        Six intensive, skill-building workshops led by domain experts. Each workshop is designed for limited participants to ensure maximum interaction and hands-on learning. Separate registration required.
                    </p>

                    {/* Workshop Cards */}
                    <div className="workshops-grid">
                        {workshops.map((ws, i) => (
                            <div key={ws.id} className="workshop-card" style={{ '--accent': ws.color, animationDelay: `${i * 0.08}s` } as React.CSSProperties}>

                                {/* Header row */}
                                <div className="workshop-header">
                                    <div className="workshop-icon">
                                        {ws.icon}
                                    </div>
                                    <span className="workshop-num">
                                        Workshop {String(ws.id).padStart(2, '0')}
                                    </span>
                                </div>

                                <h3 className="workshop-title">{ws.title}</h3>
                                <p className="workshop-desc">{ws.description}</p>

                                {/* Meta pills */}
                                <div className="workshop-pills">
                                    <span className="pill">
                                        <Clock size={12} />{ws.duration}
                                    </span>
                                    <span className="pill">
                                        <Users size={12} />{ws.capacity}
                                    </span>
                                </div>

                                {/* Learning outcomes */}
                                <div className="workshop-outcomes">
                                    <p className="outcomes-label">Learning Outcomes</p>
                                    <ul>
                                        {ws.outcomes.map((o, oi) => (
                                            <li key={oi}>
                                                <ChevronRight size={13} style={{ color: ws.color, flexShrink: 0 }} />
                                                <span>{o}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Footer */}
                                <div className="workshop-footer">
                                    <span className="workshop-facilitator">
                                        <Brain size={13} style={{ color: ws.color }} />{ws.facilitator}
                                    </span>
                                    <span className="workshop-mode">{ws.mode}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Workshop  Note */}
                    <div className="workshop-note">
                        <div className="workshop-note-icon">📋</div>
                        <div>
                            <p className="workshop-note-title">Workshop Registration</p>
                            <p className="workshop-note-body">
                                Pre-conference workshops require separate registration. Seats are limited. Early registration is encouraged. Workshop fee is included in delegate registration packages.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Conference Overview ── */}
            <section className="program-section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <div className="program-section-header">
                        <div className="program-day-badge" style={{ background: 'linear-gradient(135deg, #D4AF37, #aa8c2c)', color: '#0a1124' }}>
                            <Calendar size={20} />
                            <span>Days 1 & 2</span>
                        </div>
                        <div>
                            <h2 className="program-section-title">Main Conference</h2>
                            <p className="program-section-date">27–28 November 2026 · PIMSR Auditorium & Conference Halls</p>
                        </div>
                    </div>

                    <div className="main-conf-grid">
                        {[
                            { icon: '🎙️', title: 'Keynote Addresses', desc: 'Distinguished national and international public health leaders sharing vision and insights on policy to practice.' },
                            { icon: '🧩', title: 'Panel Discussions', desc: 'Expert panels on health policy, digital health, environmental health, and the Viksit Bharat framework.' },
                            { icon: '📢', title: 'Oral Presentations', desc: 'Peer-reviewed original research presentations across all 10 scientific tracks with Q&A sessions.' },
                            { icon: '📋', title: 'Poster Presentations', desc: 'Interactive poster walks covering epidemiology, community medicine, and field studies.' },
                            { icon: '🏆', title: 'Best Paper Awards', desc: 'Awards for the best oral and poster presentations in each scientific track.' },
                            { icon: '🤝', title: 'Networking Sessions', desc: 'Structured networking lunches and gala dinner for delegates to foster collaboration.' },
                        ].map((item, i) => (
                            <div key={i} className="main-conf-card">
                                <div className="main-conf-icon">{item.icon}</div>
                                <h3 className="main-conf-title">{item.title}</h3>
                                <p className="main-conf-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Register CTA ── */}
            <section style={{ background: '#0a1124', padding: '4rem 0', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ color: 'white', marginBottom: '0.75rem' }}>Ready to Join IAPSMGC CON 2026?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                        Register now to secure your spot at the workshops and main conference.
                    </p>
                    <a href="/registration" className="program-register-btn">Register Now →</a>
                </div>
            </section>

            <Footer />

            <style>{`
                /* ── Hero ── */
                .program-hero {
                    background: linear-gradient(90deg, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.8) 40%, rgba(10, 15, 30, 0.9) 100%), url('/images/gate-hero.jpg') center/cover;
                    border-bottom: 1px solid rgba(212,175,55,0.15);
                }
                .program-meta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                .program-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                /* ── Sections ── */
                .program-section { padding: 5rem 0; background: #ffffff; }
                .program-section-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.25rem;
                    margin-bottom: 1.25rem;
                }
                .program-day-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.5rem 1rem;
                    background: #D4AF37;
                    color: #0f172a;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    white-space: nowrap;
                    flex-shrink: 0;
                    margin-top: 0.35rem;
                }
                .program-section-title {
                    font-size: clamp(1.5rem, 3vw, 2.25rem);
                    font-weight: 800;
                    color: #0F172A;
                    margin-bottom: 0.25rem;
                }
                .program-section-date {
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                .program-section-intro {
                    color: #475569;
                    font-size: 1rem;
                    line-height: 1.7;
                    max-width: 780px;
                    margin-bottom: 2.5rem;
                }

                /* ── Workshop Cards Grid ── */
                .workshops-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }
                .workshop-card {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    border-left: 4px solid #D4AF37;
                    padding: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                    transition: transform 0.25s, box-shadow 0.25s;
                    animation: fadeUp 0.5s ease both;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .workshop-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .workshop-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding-top: 0.25rem;
                }
                .workshop-icon {
                    width: 48px; height: 48px;
                    border-radius: 12px;
                    background: rgba(212,175,55,0.1);
                    color: #D4AF37;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .workshop-num {
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    opacity: 0.8;
                    color: #D4AF37;
                }
                .workshop-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #0F172A;
                    line-height: 1.35;
                    margin: 0;
                }
                .workshop-desc {
                    font-size: 0.87rem;
                    color: #475569;
                    line-height: 1.6;
                    margin: 0;
                }
                .workshop-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    padding: 0.3rem 0.75rem;
                    background: #f1f5f9;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #475569;
                }
                .workshop-outcomes { margin-top: 0.25rem; }
                .outcomes-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #94a3b8;
                    margin-bottom: 0.5rem;
                }
                .workshop-outcomes ul {
                    list-style: none; padding: 0; margin: 0;
                    display: flex; flex-direction: column; gap: 0.35rem;
                }
                .workshop-outcomes li {
                    display: flex; align-items: flex-start; gap: 0.4rem;
                    font-size: 0.82rem; color: #475569; line-height: 1.4;
                }
                .workshop-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: auto;
                    padding-top: 0.75rem;
                    border-top: 1px solid #f1f5f9;
                }
                .workshop-facilitator {
                    display: flex; align-items: center; gap: 0.35rem;
                    font-size: 0.78rem; font-weight: 600; color: #475569;
                }
                .workshop-mode {
                    font-size: 0.75rem; color: #94a3b8;
                    background: #f8fafc; padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                }

                /* ── Workshop Note ── */
                .workshop-note {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    background: #fffbeb;
                    border: 1px solid #fcd34d;
                    border-left: 4px solid #f59e0b;
                    border-radius: 10px;
                    padding: 1.25rem 1.5rem;
                }
                .workshop-note-icon { font-size: 1.5rem; flex-shrink: 0; }
                .workshop-note-title {
                    font-weight: 700; color: #92400e;
                    margin-bottom: 0.3rem; font-size: 0.95rem;
                }
                .workshop-note-body { font-size: 0.87rem; color: #78350f; line-height: 1.6; }

                /* ── Main Conference Grid ── */
                .main-conf-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                    margin-top: 2rem;
                }
                .main-conf-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    border-left: 4px solid #D4AF37;
                    padding: 1.5rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .main-conf-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                }
                .main-conf-icon { font-size: 2rem; margin-bottom: 0.75rem; color: #D4AF37; }
                .main-conf-title {
                    font-size: 1rem; font-weight: 700;
                    color: #0F172A; margin-bottom: 0.5rem;
                }
                .main-conf-desc { font-size: 0.87rem; color: #475569; line-height: 1.6; }

                /* ── CTA ── */
                .program-register-btn {
                    display: inline-flex; align-items: center;
                    padding: 0.9rem 2.5rem;
                    background: linear-gradient(135deg, #D4AF37 0%, #aa8c2c 100%);
                    color: #0a1124;
                    font-size: 1rem; font-weight: 800;
                    letter-spacing: 0.05em;
                    text-decoration: none; border-radius: 8px;
                    box-shadow: 0 6px 20px rgba(212,175,55,0.35);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .program-register-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 32px rgba(212,175,55,0.5);
                }

                /* ── Responsive ── */
                @media (max-width: 1024px) {
                    .workshops-grid { grid-template-columns: repeat(2, 1fr); }
                    .main-conf-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                    .workshops-grid { grid-template-columns: 1fr; }
                    .main-conf-grid { grid-template-columns: 1fr; }
                    .program-meta-row { flex-direction: column; gap: 0.75rem; }
                    .program-section-header { flex-direction: column; }
                }
            `}</style>
        </main>
    );
}
