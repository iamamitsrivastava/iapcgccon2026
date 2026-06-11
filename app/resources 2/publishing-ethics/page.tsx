import Header from "@/components/sections/Header";
import Footer from "../../../components/sections/Footer";
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
    Globe
} from 'lucide-react';


export default function PublishingEthicsPage() {
    return (
        <main className={styles.main}>
            {/* Dark header variant for consistency */}
            <Header variant="solid" />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Publishing Ethics</h1>
                    <p className={styles.subtitle}>Publication ethics and malpractice statement for IAPSMGC CON 2026.</p>

                    <a href="/Author_Guidelines_ICBD_2026.pdf" download className={styles.downloadBtn}>
                        Download Author Guidelines
                    </a>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <CheckCircle className={styles.icon} />
                        <h2 className={styles.sectionTitle}>PUBLICATION ETHICS AND MALPRACTICE STATEMENT</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            The International Conference on Bridging Disciplines 2026 (IAPSMGC CON 2026) is dedicated to maintaining
                            the highest standards of ethical integrity in scholarly publishing. The conference provides an international platform for
                            academicians, researchers, industry professionals, and policymakers to deliberate on contemporary issues related to
                            liberal arts, humanities, and social sciences, in alignment with global academic standards.
                        </p>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <Users className={styles.icon} />
                            <h2 className={styles.sectionTitle}>Authors and Their Responsibilities</h2>
                        </div>
                        <div className={styles.content}>
                            <p>
                                The paper must be an original, unpublished work written in English. The submitted paper should not have been published
                                before or be under consideration for publication in another conference proceeding or journal. All authors whose names
                                appear on the paper must have made substantial contributions to the scientific work and share collective responsibility and
                                accountability for the results.
                            </p>
                            <br />
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

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FileText className={styles.icon} />
                            <h2 className={styles.sectionTitle}>Manuscript Formatting Requirements</h2>
                        </div>
                        <div className={styles.content}>
                            <p>
                                The paper&apos;s length should be up to 10 pages (single line spacing) and should follow the structure of Introduction,
                                Methodology, Results, Discussion and Conclusion. Each participant may submit a maximum of two papers, one as the
                                main author and one as a co-author.
                            </p>
                            <p>The paper should include the following:</p>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Title of the paper.</li>
                                <li className={styles.listItem}>Author&apos;s full name and academic title(s).</li>
                                <li className={styles.listItem}>Author&apos;s complete affiliation, including the name of the department, faculty, and university, address, and email address. Please indicate the corresponding author if necessary.</li>
                                <li className={styles.listItem}>An abstract of 200-250 words to outline the paper&apos;s purpose, research methods, and crucial findings.</li>
                                <li className={styles.listItem}>Keywords, with a maximum of 5 words/phrases.</li>
                            </ul>
                            <p><strong>Technical Requirements:</strong></p>
                            <p>
                                Tables, figures, and equations should have separate numbering and be placed in the text at the appropriate paragraph,
                                immediately after the reference. Equations must be typed using the Microsoft Equation 3.0 or MathType.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <BookOpen className={styles.icon} />
                        <h2 className={styles.sectionTitle}>References</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            The list of references must be alphabetically arranged according to the first element in the line. All references cited in the text must be part
                            of the reference list and vice versa. Use APA style with DOI.
                        </p>
                        <div className={styles.referenceBox}>
                            Reference (APA Format): Anil, K., Jain, A. K., Mehta, R. K., Bidwai, A., Singh, A., & Rajani, H. (2024). Value addition to
                            durum wheat semolina spaghetti through use of fruit peel solids. Scientific Reports, 14(1), 12345.
                            https://doi.org/10.1038/s41598-024-12345-6.
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Shield className={styles.icon} />
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
                        <ul className={styles.list}>
                            <li className={styles.listItem}>(a) Accept the paper in its current form,</li>
                            <li className={styles.listItem}>(b) Accept the paper with minor corrections,</li>
                            <li className={styles.listItem}>(c) Accept the paper only after corrections and repeated review, and</li>
                            <li className={styles.listItem}>(d) Reject paper, as the scientific content does not correspond to the conference standards.</li>
                        </ul>
                    </div>
                </div>

                <div className={`${styles.section} ${styles.darkSection}`}>
                    <div className={styles.sectionHeader}>
                        <AlertCircle className={styles.icon} style={{ color: '#fbbf24' }} />
                        <h2 className={styles.sectionTitle}>Publication Ethics</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            The conference proceedings editors ensure a peer review process and ethical policies and standards to ensure high-quality scientific
                            works are added to the field of scholarly publication.
                        </p>
                        <ul className={styles.list} style={{ marginTop: '1rem' }}>
                            <div className={styles.grid}>
                                <div>
                                    <li className={styles.listItem}>Any potential conflict of interest involving the author(s) should be disclosed in the paper prior to submission.</li>
                                    <li className={styles.listItem}>Authors must accurately present their research findings and provide an objective discussion of the significance of their results.</li>
                                    <li className={styles.listItem}>Sufficient details about the research methodology and data used in the study must be included in the paper.</li>
                                    <li className={styles.listItem}>Submitting manuscripts to multiple conference proceedings or journals simultaneously is not allowed.</li>
                                </div>
                                <div>
                                    <li className={styles.listItem}>Republishing non-novel content is prohibited.</li>
                                    <li className={styles.listItem}>If errors or inaccuracies are discovered by the authors after their paper has been published, they must inform the conference editors immediately so that appropriate actions can be taken.</li>
                                    <li className={styles.listItem}>Plagiarism, data fabrication, and image manipulation are strictly prohibited. Any manuscript found to be involved in such violations will be immediately rejected, and any future manuscripts submitted by the same authors will be rejected for a period of two years.</li>
                                </div>
                            </div>
                        </ul>
                        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            For any complaints or concerns regarding published articles, please contact us at <a href="mailto:iahp@paruluniversity.ac.in" className={styles.link}>iahp@paruluniversity.ac.in</a>. We will acknowledge
                            your email and provide an estimated timeframe for investigating and resolving your complaints or concerns.
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <AlertCircle className={styles.icon} style={{ color: '#ef4444' }} />
                            <h2 className={styles.sectionTitle}>Policy on Retraction and Correction</h2>
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

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <Copy className={styles.icon} />
                            <h2 className={styles.sectionTitle}>Originality and Plagiarism</h2>
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

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <PenTool className={styles.icon} />
                        <h2 className={styles.sectionTitle}>Authorship of the Paper</h2>
                    </div>
                    <div className={styles.content}>
                        <p>
                            Only those who have contributed significantly to the conception, design, execution, or interpretation of the study reported should be listed
                            as authors. All those who have made significant contributions should be listed as co-authors. Acknowledgement or listing as contributors
                            should be given to those who have participated in specific aspects of the research project. The corresponding author is responsible for
                            Ensure that the manuscript is the authors&apos; original work.
                            ensuring that appropriate co-authors are included on the paper, that no inappropriate co-authors are included, and that all co-authors
                            have seen and approved the final version of the paper and have agreed to its submission for publication.
                        </p>
                    </div>
                </div>

                <div className={styles.sectionWrapper}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <BookOpen style={{ color: '#D4AF37', flexShrink: 0 }} />
                        <div>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.1rem' }}>Copyright and Accessibility</h4>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
                                The conference proceedings offers access to the contents in the open access system on the principles of non-exclusive license Creative Commons.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            {/* New Sections */}
            <section className={styles.section} id="data-availability">
                <div className={styles.sectionHeader}>
                    <BookOpen className={styles.icon} />
                    <h2 className={styles.sectionTitle}>Data Availability &amp; Reproducibility</h2>
                </div>
                <div className={styles.content} style={{ textAlign: 'justify' }}>
                    <p>All data supporting the findings of the conference papers should be deposited in recognized public repositories and linked in the manuscript. Authors are encouraged to provide code, datasets, and supplementary material to enable reproducibility of results.</p>
                </div>
            </section>
            <section className={styles.section} id="conflict-of-interest">
                <div className={styles.sectionHeader}>
                    <Shield className={styles.icon} />
                    <h2 className={styles.sectionTitle}>Conflict of Interest</h2>
                </div>
                <div className={styles.content} style={{ textAlign: 'justify' }}>
                    <p>Authors must disclose any financial, personal, or professional relationships that could be perceived to influence the work. Failure to disclose conflicts may result in rejection or retraction.</p>
                </div>
            </section>
            <section className={styles.section} id="open-access">
                <div className={styles.sectionHeader}>
                    <Globe className={styles.icon} />
                    <h2 className={styles.sectionTitle}>Open Access &amp; Licensing</h2>
                </div>
                <div className={styles.content} style={{ textAlign: 'justify' }}>
                    <p>Proceedings will be published under a Creative Commons Attribution-NonCommercial (CC BY-NC) license, allowing free access for non‑commercial use while protecting authors&apos; rights.</p>
                </div>
            </section>
            <section className={styles.section} id="ethical-review">
                <div className={styles.sectionHeader}>
                    <CheckCircle className={styles.icon} />
                    <h2 className={styles.sectionTitle}>Ethical Review Process</h2>
                </div>
                <div className={styles.content} style={{ textAlign: 'justify' }}>
                    <p>All submissions undergo an ethical review to ensure compliance with standards on human subjects, animal welfare, and data protection. Authors must provide necessary ethical approval statements where applicable.</p>
                </div>
            </section>
            <section className={styles.section} id="author-responsibilities">
                <div className={styles.sectionHeader}>
                    <PenTool className={styles.icon} />
                    <h2 className={styles.sectionTitle}>Author Responsibilities &amp; Contributions</h2>
                </div>
                <div className={styles.content} style={{ textAlign: 'justify' }}>
                    <p>Each listed author must have made a substantial contribution to the conception, design, execution, or interpretation of the study. Contributions should be clearly described in the manuscript.
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    );
}
