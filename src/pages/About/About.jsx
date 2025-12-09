import NeonParticles from "../../components/NeonParticles";
import AboutHeader from "./AboutHeader";
import AboutIntro from "./AboutIntro";
import CTASection from "./CTASection";
import ExperienceTimeline from "./ExperienceTimeline";
import SkillsGrid from "./SkillsGrid";
import WhatIDo from "./WhatIDo";


export default function About() {
    return (
        <main className="pt-24 relative overflow-hidden px-6">
            {/* Neon background particles */}
            <NeonParticles count={40} />

            <div className="relative z-10">
                <AboutHeader />
                <AboutIntro />
                <WhatIDo />
                <ExperienceTimeline />
                <SkillsGrid />
                <CTASection />
            </div>
        </main>
    );
}
