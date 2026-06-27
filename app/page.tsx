import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import { AboutConference, Objectives, ConferenceTheme } from "@/components/sections/About";
import Themes from "@/components/sections/Themes";
import Timeline from "@/components/sections/Timeline";
import { Venue } from "@/components/sections/Venue";
import Footer from "@/components/sections/Footer";
import { Highlights } from "@/components/sections/Highlights";
import { SubmissionGuidelines } from "@/components/sections/SubmissionGuidelines";

export default function Home() {
    return (
        <main>
            <Header />
            <Hero />
            <AboutConference />
            <Venue />
            <ConferenceTheme />
            <Objectives />
            <Themes />
            <Timeline />
            <Highlights />
            <Footer />
        </main>
    );
}
