"use client";

import { useEffect, type RefObject } from "react";

/**
 * Translates `ref`'s element with the pointer, without re-rendering React.
 *
 * The offset used to live in component state, so every frame of pointer
 * movement re-rendered the whole subtree — on the home page that meant all six
 * sections, even though only the parallax layer read the value. Writing to the
 * node directly keeps the effect identical for one style mutation per frame.
 *
 * The caller owns the CSS transition that smooths the movement.
 */
export default function useParallax(
    ref: RefObject<HTMLElement | null>,
    strength = 10,
) {
    useEffect(() => {
        const node = ref.current;

        if (!node) {
            return;
        }

        let frame = 0;

        const handleMove = (e: MouseEvent) => {
            // Coalesce to one write per frame; later events in the same frame
            // are dropped rather than queued.
            if (frame) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * strength;
                const y = (e.clientY / window.innerHeight - 0.5) * strength;
                node.style.transform = `translate(${x}px, ${y}px)`;
                frame = 0;
            });
        };

        window.addEventListener("mousemove", handleMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMove);
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, [ref, strength]);
}
