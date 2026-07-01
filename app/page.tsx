import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import { Objectives, ConferenceTheme } from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import { AboutIAPSM } from "@/components/sections/Venue";
import Footer from "@/components/sections/Footer";
import { Highlights } from "@/components/sections/Highlights";
import { SubmissionGuidelines } from "@/components/sections/SubmissionGuidelines";

export default function Home() {
    return (
        <main>
            <Header />
            <Hero />
            <AboutIAPSM />
            <ConferenceTheme />
            <Objectives />
            <Timeline />
            <Highlights />
            <Footer />
        </main>
    );
}
