"use client";

import useRandomParticles from "@/hooks/useRandomParticles";

interface Particle {
    top: string;
    left: string;
    size: number;
    delay: number;
}

const makeParticle = (): Particle => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 5,
});

interface NeonParticlesProps {
    count?: number;
}

export default function NeonParticles({ count = 20 }: NeonParticlesProps) {
    const particles = useRandomParticles(count, makeParticle);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, i) => (
                <span
                    key={i}
                    style={{
                        position: "absolute",
                        top: p.top,
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        background: "var(--color-primary)",
                        borderRadius: "50%",
                        // box-shadow rather than a filter-based shadow: identical on a
                        // small solid circle, but it avoids giving every particle its
                        // own filter surface to rasterize.
                        boxShadow: "0 0 8px var(--color-primary)",
                        animation: `waveMove 6s ${p.delay}s infinite ease-in-out`,
                        willChange: "transform, opacity",
                        opacity: 0.8,
                    }}
                ></span>
            ))}
        </div>
    );
}
