import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function TermsPage() {
    return (
        <main style={{ backgroundColor: '#0B1C35', minHeight: '100vh', color: 'white' }}>
            <Header variant="solid" />
            <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }} className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '3rem', borderRadius: '1rem', border: '1px solid rgba(255,215,0,0.1)' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#FACC15', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Terms & Conditions</h1>
                    
                    <section style={{ marginBottom: '2rem' }}>
                        <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1rem' }}>
                            Welcome to the International Conference on Bridging Disciplines (IAPSMGC CON 2026). By registering for or participating in the conference, you agree to comply with the following Terms and Conditions established by Parul Institute of Liberal Arts, Parul University.
                        </p>
                    </section>
                    
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>1. Registration & Payment</h2>
                        <ul style={{ lineHeight: '1.6', color: '#cbd5e1', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>All attendees must complete the registration form and submit the appropriate fee by the deadline explicitly stated on our website.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Registration is confirmed only after full payment is received and processed.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Delegates must bring a valid institutional ID or ticket receipt on the day of the conference for verification.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>2. Cancellation & Refund Policy</h2>
                        <ul style={{ lineHeight: '1.6', color: '#cbd5e1', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Registration fees are non-refundable once the payment is successful.</li>
                            <li style={{ marginBottom: '0.5rem' }}>In the unlikely event of conference cancellation due to unforeseen circumstances or force majeure, the organizers will reschedule the event but are not liable for travel or accommodation costs incurred by attendees.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>3. Academic Integrity & Submissions</h2>
                        <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1rem' }}>
                            All abstracts and papers submitted must be original and not previously published. The scientific committee reserves the right to reject submissions that fail to pass plagiarism checks or ethical guidelines. Decisions made by the peer-review committee are final in all circumstances.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#FACC15', marginBottom: '1rem' }}>4. Code of Conduct</h2>
                        <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1rem' }}>
                            Attendees must conduct themselves professionally and respectfully. The organizing committee reserves the right to revoke conference bounds privileges, without refund, for engaging in disruptive, unethical, or disrespectful behavior during the sessions.
                        </p>
                    </section>
                    
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>Last updated: March 2026</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
