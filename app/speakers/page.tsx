import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function SpeakersPage() {
    return (
        <main>
            <Header />
            <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Speakers</h1>
                <p>Information about the speakers will be updated soon.</p>
            </div>
            <Footer />
        </main>
    );
}
