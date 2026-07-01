import { Venue } from "@/components/sections/Venue";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function VenuePage() {
    return (
        <main>
            <Header />
            <div style={{ paddingTop: '80px' }}>
                <Venue />
            </div>
            <Footer />
        </main>
    );
}
