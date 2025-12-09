import { useEffect, useState } from "react";

export default function NeonParticles({ count = 20 }) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const gen = [...Array(count)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 2,
            delay: Math.random() * 5,
        }));
        setParticles(gen);
    }, [count]);

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
                        filter: "drop-shadow(0 0 8px var(--color-primary))",
                        animation: `waveMove 6s ${p.delay}s infinite ease-in-out`,
                        opacity: 0.8,
                    }}
                ></span>
            ))}
        </div>
    );
}
