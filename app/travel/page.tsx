import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import Travel from '@/components/sections/Travel';

export const metadata = {
    title: 'Travel & Accommodation | IAPSMGC CON 2026',
    description: 'Travel information and accommodation options for IAPSMGC CON 2026 at Parul University, Vadodara.',
};

export default function TravelPage() {
    return (
        <main>
            <Header variant="solid" />
            <Travel />
            <Footer />
        </main>
    );
}
