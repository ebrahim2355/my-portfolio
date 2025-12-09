// src/pages/Home/Home.jsx
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import FeaturedProjects from "./FeaturedProjects";
import StatsSection from "./StatsSection";

export default function Home() {
    const [particles, setParticles] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // generate particles
    useEffect(() => {
        const p = [...Array(25)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 2,
            delay: Math.random() * 4,
        }));
        setParticles(p);
    }, []);

    // parallax effect
    useEffect(() => {
        const handle = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 10,
                y: (e.clientY / window.innerHeight - 0.5) * 10,
            });
        };
        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    return (
        <main className="pt-28 relative overflow-hidden">
            <HeroSection particles={particles} mousePos={mousePos} />
            <AboutSection />
            <SkillsSection />
            <FeaturedProjects />
            <StatsSection />
        </main>
    );
}
