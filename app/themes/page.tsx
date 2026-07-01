import Themes from "@/components/sections/Themes";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function ThemesPage() {
    return (
        <main>
            <Header />
            <div style={{ paddingTop: '80px' }}>
                <Themes />
            </div>
            <Footer />
        </main>
    );
}
