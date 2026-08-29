"use client";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import FeaturedProjects from "./FeaturedProjects";
import OpenSourceSection from "./OpenSourceSection";
import StatsSection from "./StatsSection";
import useRandomParticles from "@/hooks/useRandomParticles";
import type { HeroParticle } from "./HeroSection";

const makeParticle = (): HeroParticle => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 4,
});

export default function Home() {
    const particles = useRandomParticles(25, makeParticle);

    // The hero's mouse parallax lives in HeroSection via useParallax, which
    // writes the transform to its own node. Holding that offset here re-rendered
    // every section below on each frame of pointer movement.
    return (
        <main className="pt-28 relative overflow-hidden">
            <HeroSection particles={particles} />
            <AboutSection />
            <SkillsSection />
            {/* Upstream work outranks my own projects as evidence, so it comes
                first — a maintainer merged it, I didn't grade it myself. */}
            <OpenSourceSection />
            <FeaturedProjects />
            <StatsSection />
        </main>
    );
}
