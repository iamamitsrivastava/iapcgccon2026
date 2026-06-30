import Header from "@/components/sections/Header";
import Footer from "../../../components/sections/Footer";
import { SubmissionGuidelines } from "@/components/sections/SubmissionGuidelines";
import styles from './page.module.css';
import {
    FileText,
    BookOpen,
    CheckCircle,
    AlertCircle,
    Users,
    Shield,
    Copy,
    PenTool,
    Globe,
    Download,
    Mail,
    ChevronRight,
    Trophy
} from 'lucide-react';

export default function PublishingEthicsPage() {
    return (
        <main className={styles.main}>
            <Header variant="solid" />

            {/* ── Hero Section ── */}
            <section className={styles.heroSection}>
                <h1 className={styles.callForAbstractTitle}>Call for Abstract</h1>
                <div style={{
                    maxWidth: '900px',
                    margin: '2rem auto',
                    padding: '2rem 2.5rem',
                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderLeft: '4px solid #FACC15',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
                }}>
                    <p style={{ color: '#cbd5e1', textAlign: 'center', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                        The Scientific Committee warmly invites researchers, academicians, public health professionals, postgraduate students, and practitioners to submit original research abstracts for Oral and Poster Presentations at the conference.<br/><br/>
                        Abstracts addressing a wide range of topics related to community medicine and public health, aligned with the conference themes and sub-themes, are encouraged. Selected abstracts will be showcased during the scientific sessions, and outstanding oral and poster presentations will be recognized with awards.
                    </p>
                </div>
                <h1 className={styles.title}>
                    Submission <span className={styles.titleAccent}>Guidlines</span>
                </h1>
            </section>

            <SubmissionGuidelines />

            {/* ── Main Content ── */}
            <div className={styles.container}>

                {/* ── Presentation Options ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem',
                    marginTop: '-2rem'
                }}>
                    {/* Oral Presentation Card */}
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
                        borderRadius: '1rem',
                        padding: '2.5rem 2rem',
                        position: 'relative',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderTop: '4px solid #FACC15',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
                    }}>
                        <div style={{
                            width: '4rem',
                            height: '4rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(250, 204, 21, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(250, 204, 21, 0.2)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: 'white',
                            fontFamily: 'var(--font-heading)',
                            marginBottom: '1rem'
                        }}>Oral Presentation</h3>
                        <p style={{
                            color: '#e2e8f0',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            flexGrow: 1,
                            marginBottom: '2rem'
                        }}>
                            Prepare your 10-12 slides using official conference PPT format (Times new roman). Ensure your presentation fits within the allocated time slot.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <a href="https://drive.google.com/file/d/1SMEuw0oHrfG33vPIAWx2GFEK5eJJQl-R/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: 'linear-gradient(135deg, #FACC15, #d4af37)',
                                color: '#0B1C35',
                                padding: '0.85rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                width: 'fit-content'
                            }}>
                                <Download size={18} />
                                Download Template
                            </a>
                            <a href="/Oral_Presentation_Guidelines.pdf" target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: 'transparent',
                                color: '#FACC15',
                                padding: '0.85rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                border: '2px solid #FACC15',
                                transition: 'all 0.3s ease',
                                width: 'fit-content'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                View Guidelines
                            </a>
                        </div>
                    </div>

                    {/* Poster Presentation Card */}
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
                        borderRadius: '1rem',
                        padding: '2.5rem 2rem',
                        position: 'relative',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderTop: '4px solid #FACC15',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
                    }}>
                        <div style={{
                            width: '4rem',
                            height: '4rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(250, 204, 21, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(250, 204, 21, 0.2)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: 'white',
                            fontFamily: 'var(--font-heading)',
                            marginBottom: '1rem'
                        }}>Poster Presentation</h3>
                        <p style={{
                            color: '#e2e8f0',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            flexGrow: 1,
                            marginBottom: '2rem'
                        }}>
                            Follow the guidelines to prepare your poster for an effective presentation. The size of poster is 3 &times; 4 feet.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <a href="/Poster_Presentation_Template.pdf" target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: 'linear-gradient(135deg, #FACC15, #d4af37)',
                                color: '#0B1C35',
                                padding: '0.85rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                width: 'fit-content'
                            }}>
                                <Download size={18} />
                                Download Template
                            </a>
                            <a href="/Poster_Presentation_Guidelines.pdf" target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: 'transparent',
                                border: '2px solid #FACC15',
                                color: '#FACC15',
                                padding: '0.85rem 1.5rem',
                                borderRadius: '0.5rem',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                width: 'fit-content'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                View Guidelines
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                    <a href="/Author_Guidelines_IAPSMGC_CON_2026.pdf" download style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        background: '#dca433', // matching the button in the screenshot which is a solid goldish color
                        color: '#0B1C35',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                    }}>
                        <Download size={22} />
                        DOWNLOAD AUTHOR GUIDELINES
                    </a>
                </div>

                {/* HM Patel Award Session */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
                        borderRadius: '1rem',
                        padding: '2.5rem 2.5rem',
                        position: 'relative',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderTop: '4px solid #FACC15',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                        maxWidth: '800px',
                        width: '100%'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(250, 204, 21, 0.1)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                                border: '1px solid rgba(250, 204, 21, 0.2)'
                            }}>
                                <Trophy color="#FACC15" size={28} />
                            </div>
                            <h3 style={{
                                fontSize: '1.6rem',
                                fontWeight: '800',
                                color: 'white',
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '0.5rem'
                            }}>HM Patel Award Session</h3>
                        </div>
                        <ul style={{
                            color: '#e2e8f0',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            paddingLeft: '1.5rem',
                            marginBottom: '0'
                        }}>
                            <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>This prestigious session will include the oral presentations selected by the scientific committee as per the criteria of the H M Patel session; a panel of judges will decide the winners.</li>
                            <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>The authors of all presentations selected for this award session will be informed in advance through e-mail.</li>
                            <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>Format follows the Oral Presentation guidelines above unless the committee specifies otherwise.</li>
                            <li style={{ marginBottom: '0', listStyleType: 'disc' }}>The presenting authors of all selected papers for this session must submit an undertaking regarding their age, designation, originality of the research work (not being presented or published in part or toto elsewhere), and the contribution of the presenting author.</li>
                        </ul>
                    </div>
                </div>

                {/* ── Quick Navigation ── */}
                <nav className={styles.tocSection}>
                    {[
                        { label: 'Authors & Their Responsibilities', href: '#author-resp' },
                        { label: 'References', href: '#references' },
                        { label: 'Peer-Review Process', href: '#peer-review' },
                        { label: 'Paper Submission Guidelines', href: '#pub-ethics' },
                        { label: 'Manuscript Formatting Requirements', href: '#manuscript' },
                        { label: 'Policy on Retraction & Correction', href: '#retraction' },
                        { label: 'Originality & Plagiarism', href: '#originality' },
                        { label: 'Authorship of the Paper', href: '#authorship' },
                        { label: 'Copyright & Accessibility', href: '#copyright' },
                    ].map((item, i) => (
                        <a key={i} href={item.href} className={styles.tocItem}>
                            <span className={styles.tocNumber}>{i + 1}</span>
                            {item.label}
                        </a>
                    ))}
                </nav>



                {/* ── 2. Authors & Their Responsibilities ── */}
                <div className={styles.section} id="author-resp">
                        <div className={styles.sectionHeader}>
                            <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                                <Users className={styles.iconBlue} />
                            </div>
                            <h2 className={styles.sectionTitle}>Authors &amp; Their Responsibilities</h2>
                        </div>
                        <div className={styles.content}>
                            <p>
                                The paper must be an original, unpublished work written in English. The submitted paper should not have been published
                                before or be under consideration for publication in another conference proceeding or journal. All authors whose names
                                appear on the paper must have made substantial contributions to the scientific work and share collective responsibility and
                                accountability for the results.
                            </p>
                            <p>
                                All papers undergo a double blind peer-review process. Finally, the conference editors review each submission and may reject it if it
                                does not meet the conference requirements, is not related to the conference subject matter, or is of poor quality. In the second
                                stage of the review process, the paper is sent to an independent reviewer. Reviewers evaluate the paper and may recommend to
                                accept it in its current form, with minor corrections, major corrections, or only after corrections and repeated review, or to
                                reject it. Reviewers include their recommendations and comments, which are then sent to the author(s). The editors
                                should not reverse decisions on publication unless serious problems are identified.
                            </p>
                        </div>
                    </div>

                {/* ── 4. References ── */}
                <div className={styles.section} id="references">
                    <div className={styles.sectionHeader}>
                        <div className={`${styles.iconBox} ${styles.iconBoxGold}`}>
                            <BookOpen className={styles.iconGold} />
                        </div>
                        <h2 className={styles.sectionTitle}>References</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            The list of references must be alphabetically arranged according to the first element in the line. All references cited in the text must be part
                            of the reference list and vice versa. Use VANCOUVER SUPERSCRIPT style with DOI. 
                        </p>
                        <div className={styles.referenceBox}>
                            Doe J, Smith A. The impact of modern treatments on patient survival. Lancet. 2024;403(1042):1124-30. doi: 10.1016/s0140-6736(24)00123-x
                        </div>
                    </div>
                </div>

                {/* ── 5. Peer-Review Process ── */}
                <div className={styles.section} id="peer-review">
                    <div className={styles.sectionHeader}>
                        <div className={`${styles.iconBox} ${styles.iconBoxGreen}`}>
                            <Shield className={styles.iconGreen} />
                        </div>
                        <h2 className={styles.sectionTitle}>Peer-Review Process</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            All submitted papers are checked by the editors to ensure compliance with the conference&apos;s ethical policies and requirements. The editors
                            decide which papers to publish and are guided by the conference editorial team&apos;s policies and legal requirements such as copyright
                            infringement and plagiarism. Papers that do not follow the ethical policy or conference requirements are rejected before the peer-review
                            process. If a manuscript passes the editorial checks, it is assigned to an independent expert for double-blind peer review. Reviewers should be
                            objective and have no conflict of interest. They should also point out relevant published work that is not yet cited.
                        </p>
                        <p>Reviewers are asked to evaluate the paper and they may recommend to:</p>
                    </div>
                    <ul className={styles.stepList}>
                        <li className={styles.stepItem}>
                            <span className={`${styles.stepBadge} ${styles.stepBadgeGreen}`}>A</span>
                            <div>
                                <span className={styles.stepLabel}>Accept</span>
                                <span className={styles.stepText}>Accept the paper in its current form</span>
                            </div>
                        </li>
                        <li className={styles.stepItem}>
                            <span className={`${styles.stepBadge} ${styles.stepBadgeBlue}`}>B</span>
                            <div>
                                <span className={styles.stepLabel}>Minor Corrections</span>
                                <span className={styles.stepText}>Accept the paper with minor corrections</span>
                            </div>
                        </li>
                        <li className={styles.stepItem}>
                            <span className={`${styles.stepBadge} ${styles.stepBadgeYellow}`}>C</span>
                            <div>
                                <span className={styles.stepLabel}>Major Corrections</span>
                                <span className={styles.stepText}>Accept only after corrections and repeated review</span>
                            </div>
                        </li>
                        <li className={styles.stepItem}>
                            <span className={`${styles.stepBadge} ${styles.stepBadgeRed}`}>D</span>
                            <div>
                                <span className={styles.stepLabel}>Reject</span>
                                <span className={styles.stepText}>Scientific content does not meet conference standards</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* ── 6. Publication Ethics (Featured) ── */}
                <div className={styles.featuredSection} id="pub-ethics">
                    <div className={styles.sectionHeader}>
                        <div className={`${styles.iconBox} ${styles.iconBoxGold}`}>
                            <AlertCircle className={styles.iconGold} />
                        </div>
                        <h2 className={styles.sectionTitle}>Paper Submission Guidelines</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            The conference proceedings editors ensure a peer review process and ethical policies and standards to ensure high-quality scientific
                            works are added to the field of scholarly publication.
                        </p>
                    </div>
                    <div className={styles.ethicsGrid}>
                        {[
                            'Any potential conflict of interest involving the author(s) should be disclosed in the paper prior to submission.',
                            'Authors must accurately present their research findings and provide an objective discussion of the significance of their results.',
                            'Sufficient details about the research methodology and data used in the study must be included in the paper.',
                            'Submitting manuscripts to multiple conference proceedings or journals simultaneously is not allowed.',
                            'Republishing non-novel content is prohibited.',
                            'If errors or inaccuracies are discovered by the authors after their paper has been published, they must inform the conference editors immediately so that appropriate actions can be taken.',
                            'Plagiarism, data fabrication, and image manipulation are strictly prohibited. Any manuscript found to be involved in such violations will be immediately rejected, and any future manuscripts submitted by the same authors will be rejected for a period of two years.',
                        ].map((text, i) => (
                            <div key={i} className={styles.ethicsItem}>
                                <ChevronRight className={styles.ethicsItemIcon} />
                                <span className={styles.ethicsItemText}>{text}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.contactBanner}>
                        <Mail className={styles.contactBannerIcon} />
                        <span>
                            For complaints or concerns regarding published articles, contact us at{' '}
                            <a href="mailto:iapsmgccon2026@paruluniversity.ac.in" className={styles.link}>iapsmgccon2026@paruluniversity.ac.in</a>.
                            We will acknowledge your email and provide an estimated timeframe for investigating your concerns.
                        </span>
                    </div>
                </div>

                {/* ── Manuscript Formatting Requirements ── */}
                <div className={styles.section} id="manuscript">
                    <div className={styles.sectionHeader}>
                        <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
                            <FileText className={styles.iconPurple} />
                        </div>
                        <h2 className={styles.sectionTitle}>Manuscript Formatting Requirements</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            The length of full paper should be minimum 7000 words (single line spacing) and should follow the structure of Introduction,
                            Methodology, Results, Discussion and Conclusion. Each participant may submit a maximum of two papers, one as the
                            main author and one as a co-author.
                        </p>
                        <p>The paper should include the following:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Title of the paper.</li>
                            <li className={styles.listItem}>Author&apos;s full name and academic title(s).</li>
                            <li className={styles.listItem}>Author&apos;s complete affiliation, including the name of the department, faculty, and university, address, and email address. Please indicate the corresponding author if necessary.</li>
                            <li className={styles.listItem}>An abstract of 300 words to outline the paper&apos;s purpose, research methods, and crucial findings.</li>
                            <li className={styles.listItem}>Keywords, with a maximum of 5 words/phrases.</li>
                        </ul>
                        <p style={{ marginTop: '1rem' }}><strong style={{ color: '#fdfdfdff' }}>Technical Requirements:</strong></p>
                        <p>
                            Tables, figures, and equations should have separate numbering and be placed in the text at the appropriate paragraph,
                            immediately after the reference. Equations must be typed using the Microsoft Equation 3.0 or MathType.
                        </p>
                    </div>
                </div>

                {/* ── 7 & 8. Retraction & Originality (Side-by-side) ── */}
                <div className={styles.grid}>
                    <div className={styles.section} id="retraction">
                        <div className={styles.sectionHeader}>
                            <div className={`${styles.iconBox} ${styles.iconBoxRed}`}>
                                <AlertCircle className={styles.iconRed} />
                            </div>
                            <h2 className={styles.sectionTitle}>Policy on Retraction &amp; Correction</h2>
                        </div>
                        <div className={styles.content}>
                            <p>
                                Maintaining the integrity of the literature is of utmost importance to the editors. Corrections to published works will
                                be made based on the situation, and the original article will be replaced with a note indicating the reason for retraction and
                                the corrected version. If plagiarism is discovered, the entire article will be removed from the conference proceedings.
                            </p>
                            <p>
                                If an author discovers a significant error or inaccuracy in their published work, they have an obligation to promptly inform
                                the conference editors or publisher and work with them to retract or correct the paper.
                            </p>
                        </div>
                    </div>

                    <div className={styles.section} id="originality">
                        <div className={styles.sectionHeader}>
                            <div className={`${styles.iconBox} ${styles.iconBoxTeal}`}>
                                <Copy className={styles.iconTeal} />
                            </div>
                            <h2 className={styles.sectionTitle}>Originality &amp; Plagiarism</h2>
                        </div>
                        <div className={styles.content}>
                            <p>
                                Authors should ensure that they have produced entirely original works, and if they have used the work and/or words of
                                others, they must properly cite or quote them. Plagiarism takes many forms, from rewriting another&apos;s paper as one&apos;s
                                own to copying or paraphrasing substantial parts of another&apos;s paper (without attribution) to claiming results from
                                research conducted by others.
                            </p>
                            <p>
                                Properly acknowledge and cite others&apos; work.
                                Obtain permission for any copyrighted material used.
                                Avoid plagiarism in all its forms, including self-plagiarism.
                                All forms of plagiarism are unacceptable and constitute unethical publishing behavior. Manuscripts must have a
                                plagiarism similarity index of not more than 10%, and AI-generated content is strictly prohibited.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── 9. Authorship ── */}
                <div className={styles.section} id="authorship">
                    <div className={styles.sectionHeader}>
                        <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
                            <PenTool className={styles.iconPurple} />
                        </div>
                        <h2 className={styles.sectionTitle}>Authorship of the Paper</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            Only those who have contributed significantly to the conception, design, execution, or interpretation of the study reported should be listed
                            as authors. All those who have made significant contributions should be listed as co-authors. Acknowledgement or listing as contributors
                            should be given to those who have participated in specific aspects of the research project. The corresponding author is responsible for
                            ensuring that the manuscript is the authors&apos; original work,
                            that appropriate co-authors are included on the paper, that no inappropriate co-authors are included, and that all co-authors
                            have seen and approved the final version of the paper and have agreed to its submission for publication.
                        </p>
                    </div>
                </div>

                {/* ── 10. Copyright Bar ── */}
                <div className={styles.copyrightBar} id="copyright">
                    <div className={styles.copyrightIcon}>
                        <BookOpen />
                    </div>
                    <div className={styles.copyrightContent}>
                        <h4>Copyright &amp; Accessibility</h4>
                        <p>
                            The conference proceedings offers access to the contents in the open access system on the principles of non-exclusive license Creative Commons.
                        </p>
                        <a href="/Author_Copyright_Declaration_Form.pdf" download style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem',
                            padding: '0.65rem 1.5rem',
                            background: 'linear-gradient(135deg, #FACC15, #d4af37)',
                            color: '#0B1C35',
                            borderRadius: '0.75rem',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(250, 204, 21, 0.3)',
                        }}>
                            <Download size={16} />
                            Download Copyright Declaration Form
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
