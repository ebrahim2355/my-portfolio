// src/pages/Home/Home.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import FeaturedProjects from "./FeaturedProjects";
import StatsSection from "./StatsSection";

export default function Home() {
    const particles = useMemo(
        () =>
            [...Array(25)].map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: Math.random() * 3 + 2,
                delay: Math.random() * 4,
            })),
        []
    );
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rafRef = useRef(0);

    // parallax effect
    useEffect(() => {
        const handle = (e) => {
            if (rafRef.current) {
                return;
            }

            rafRef.current = window.requestAnimationFrame(() => {
                setMousePos({
                    x: (e.clientX / window.innerWidth - 0.5) * 10,
                    y: (e.clientY / window.innerHeight - 0.5) * 10,
                });
                rafRef.current = 0;
            });
        };

        window.addEventListener("mousemove", handle, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handle);
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
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
