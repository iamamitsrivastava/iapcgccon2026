import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import Sponsorship from '@/components/sections/Sponsorship';

export const metadata = {
    title: 'Sponsorship Opportunities | IAPSMGC CON 2026',
    description: 'Partner with IAPSMGC CON 2026 and connect with a global community of innovators through various sponsorship packages.',
};

export default function SponsorshipPage() {
    return (
        <main>
            <Header variant="solid" />
            <Sponsorship />
            <Footer />
        </main>
    );
}
