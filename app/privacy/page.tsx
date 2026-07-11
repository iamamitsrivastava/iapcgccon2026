import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function PrivacyPage() {
    return (
        <main style={{ backgroundColor: '#0B1C35', minHeight: '100vh', color: 'white' }}>
            <Header variant="solid" />
            <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }} className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '3rem', borderRadius: '1rem', border: '1px solid rgba(255,215,0,0.1)' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#FACC15', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Privacy Policy</h1>

                    <section style={{ marginBottom: '2rem' }}>
                        <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1rem' }}>
                            At IAPSMGC CON 2026 (Digital Health for All: Bridging Equity, Access and Innovation), organized by Parul Institute of Community Medicine, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website, register for the conference, or submit papers.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>1. Information We Collect</h2>
                        <ul style={{ lineHeight: '1.6', color: '#cbd5e1', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Personal Information:</strong> Name, email address, phone number, institutional affiliation, and dietary preferences (during registration).</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Academic Information:</strong> Submitted abstracts, research papers, co-author details, and related academic credentials.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Payment Information:</strong> Transactions processed for registration fees are handled securely through third-party gateways. We do not store your credit card details.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
                        <ul style={{ lineHeight: '1.6', color: '#cbd5e1', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>To process your conference registration and abstract submissions.</li>
                            <li style={{ marginBottom: '0.5rem' }}>To communicate with you regarding schedule updates, acceptance notifications, and conference logistics.</li>
                            <li style={{ marginBottom: '0.5rem' }}>To publish proceedings, agendas, and certificates of participation.</li>
                            <li style={{ marginBottom: '0.5rem' }}>To ensure a safe and accessible environment during the event.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>3. Data Protection and Sharing</h2>
                        <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1rem' }}>
                            Your data is strictly confidential. We do not sell, trade, or rent your personal data to third parties. Information may only be shared with our trusted publishing partners strictly for the formulation of conference proceedings and Scopus-indexed publications.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>4. Contact Us</h2>
                        <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1rem' }}>
                            If you have questions about this Privacy Policy, please contact us at <strong>iapsmgc.conference@paruluniversity.ac.in
                            </strong>.
                        </p>
                    </section>

                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>Last updated: July 2026</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
