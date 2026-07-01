import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function AbstractSubmissionPage() {
    return (
        <main>
            <Header />
            <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Abstract Submission</h1>
                <p>Details and guidelines for abstract submission will be available shortly.</p>
            </div>
            <Footer />
        </main>
    );
}
