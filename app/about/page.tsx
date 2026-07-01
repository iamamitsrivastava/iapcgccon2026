import { AboutConference } from "@/components/sections/About";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
    return (
        <main>
            <Header />
            <div style={{ paddingTop: '80px' }}>
                <AboutConference />
            </div>
            <Footer />
        </main>
    );
}
