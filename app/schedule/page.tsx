import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function SchedulePage() {
    return (
        <main>
            <Header />
            <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Schedule</h1>
                <p>The detailed conference schedule will be published here soon.</p>
            </div>
            <Footer />
        </main>
    );
}
