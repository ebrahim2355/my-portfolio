"use client";

import { useEffect, useState } from "react";

/**
 * Builds `count` decorative particles on the client, after mount.
 *
 * The particle layers scatter themselves with Math.random(), so computing them
 * during render would make the prerendered HTML disagree with the hydrated
 * markup. Deferring to an effect keeps hydration clean while still producing a
 * fresh scatter on every page load, which is how the pre-Next build behaved.
 *
 * `make` must be a stable reference — declare it at module scope.
 */
export default function useRandomParticles<T>(count: number, make: () => T): T[] {
    const [particles, setParticles] = useState<T[]>([]);

    useEffect(() => {
        // Intentional: these values must stay client-only so they never take part
        // in hydration, which rules out computing them during render.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(Array.from({ length: count }, () => make()));
    }, [count, make]);

    return particles;
}
