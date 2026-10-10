import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Lock } from 'lucide-react';
import { IS_ABSTRACT_SUBMISSION_OPEN, ABSTRACT_SUBMISSION_CLOSED_HEADING, ABSTRACT_SUBMISSION_CLOSED_MESSAGE } from "@/lib/submissionConfig";

export const metadata = {
  title: "Abstract Submission | IAPSMGCCON 2026",
  description: "Abstract Submission for 33rd Annual State Conference of IAPSM Gujarat Chapter.",
};

export default function AbstractSubmissionPage() {
    return (
        <main style={{ backgroundColor: '#0b1c35', minHeight: '100vh', color: '#ffffff' }}>
            <Header />
            <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff', textAlign: 'center' }}>
                    Abstract Submission
                </h1>

                <div style={{
                    width: '100%',
                    maxWidth: '560px',
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
                }}>
                    {!IS_ABSTRACT_SUBMISSION_OPEN ? (
                        <>
                            <div style={{
                                width: '72px',
                                height: '72px',
                                borderRadius: '50%',
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto'
                            }}>
                                <Lock size={36} color="#ef4444" />
                            </div>
                            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                                {ABSTRACT_SUBMISSION_CLOSED_HEADING}
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', margin: '0 auto', maxWidth: '420px' }}>
                                {ABSTRACT_SUBMISSION_CLOSED_MESSAGE}
                            </p>
                        </>
                    ) : (
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FACC15', marginBottom: '1rem' }}>
                                Abstract Submissions Open
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Please use the Submit Abstract option on the main landing page to submit your abstract.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
