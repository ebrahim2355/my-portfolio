"use client";

import { useEffect, useRef, useState } from "react";

// Pool sizes match the caps the previous implementation enforced with
// `prev.slice(-30)` / `prev.slice(-24)`. Slots are reused round-robin, so the
// oldest particle is the one recycled — the same thing the slice did.
const SPARK_POOL_SIZE = 32;
const STREAK_POOL_SIZE = 26;

// Unchanged spawn cadence, so the trail looks exactly as dense as before.
const SPARK_INTERVAL_MS = 24;
const STREAK_INTERVAL_MS = 16;
const MIN_STREAK_LENGTH = 6;

const CURSOR_EASING = 0.24;

/**
 * Fire-trail cursor.
 *
 * Every spark and streak used to be a React state update, and each one also
 * scheduled a `setTimeout` that fired a second update to remove it — roughly
 * 160 re-renders a second while the pointer moved, each re-rendering up to 54
 * nodes carrying three-layer box-shadows. Because the pointer usually moves
 * while you scroll, that landed directly on top of scrolling.
 *
 * The visuals are identical, but the particles are now a fixed pool of nodes
 * rendered once and driven imperatively: styles are written straight to the DOM
 * and the fade is handed to the Web Animations API, which runs it off the main
 * thread. React does no work at all once the layer has mounted.
 */
export default function FireCursor() {
    const [enabled, setEnabled] = useState(false);

    const cursorRef = useRef<HTMLDivElement | null>(null);
    const sparkNodes = useRef<(HTMLSpanElement | null)[]>([]);
    const streakNodes = useRef<(HTMLSpanElement | null)[]>([]);
    const sparkAnims = useRef<(Animation | null)[]>([]);
    const streakAnims = useRef<(Animation | null)[]>([]);

    const currentRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const previousRef = useRef<{ x: number; y: number } | null>(null);
    const rafRef = useRef(0);
    const sparkTimerRef = useRef(0);
    const streakTimerRef = useRef(0);
    const sparkSlotRef = useRef(0);
    const streakSlotRef = useRef(0);

    useEffect(() => {
        const pointerQuery = window.matchMedia("(pointer: fine)");
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const updateEnabled = () => {
            setEnabled(pointerQuery.matches && !motionQuery.matches);
        };

        updateEnabled();
        pointerQuery.addEventListener("change", updateEnabled);
        motionQuery.addEventListener("change", updateEnabled);

        return () => {
            pointerQuery.removeEventListener("change", updateEnabled);
            motionQuery.removeEventListener("change", updateEnabled);
        };
    }, []);

    useEffect(() => {
        if (!enabled) {
            document.documentElement.classList.remove("fire-cursor-active");
            return;
        }

        document.documentElement.classList.add("fire-cursor-active");

        // Captured once: these arrays are mutated in place and never reassigned,
        // so holding the reference is safe and keeps cleanup honest.
        const sparkAnimList = sparkAnims.current;
        const streakAnimList = streakAnims.current;

        const showCursor = (on: boolean) => {
            cursorRef.current?.classList.toggle("is-visible", on);
        };

        const spawnSpark = (x: number, y: number) => {
            const slot = sparkSlotRef.current;
            const node = sparkNodes.current[slot];
            sparkSlotRef.current = (slot + 1) % SPARK_POOL_SIZE;

            if (!node) {
                return;
            }

            const size = Math.random() * 4 + 2;
            const life = Math.random() * 320 + 620;
            const driftX = Math.random() * 26 - 13;
            const driftY = -(Math.random() * 54 + 36);

            node.style.left = `${x + (Math.random() * 12 - 6)}px`;
            node.style.top = `${y + (Math.random() * 10 - 5)}px`;
            node.style.width = `${size}px`;
            node.style.height = `${size}px`;

            // Cancel first: animate() appends, so reusing a slot without this
            // would pile up Animation objects on the node.
            sparkAnimList[slot]?.cancel();
            sparkAnimList[slot] = node.animate(
                [
                    { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
                    {
                        transform: `translate(${driftX}px, ${driftY}px) scale(0.1)`,
                        opacity: 0,
                    },
                ],
                { duration: life, easing: "ease-out", fill: "forwards" },
            );
        };

        const spawnStreak = (fromX: number, fromY: number, toX: number, toY: number) => {
            const dx = toX - fromX;
            const dy = toY - fromY;
            const length = Math.hypot(dx, dy);

            if (length < MIN_STREAK_LENGTH) {
                return;
            }

            const slot = streakSlotRef.current;
            const node = streakNodes.current[slot];
            streakSlotRef.current = (slot + 1) % STREAK_POOL_SIZE;

            if (!node) {
                return;
            }

            const thickness = Math.random() * 3 + 4;
            const life = Math.random() * 220 + 320;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            node.style.left = `${fromX}px`;
            node.style.top = `${fromY}px`;
            node.style.width = `${length}px`;
            node.style.height = `${thickness}px`;
            // Static for this streak; the animation only touches opacity and
            // brightness, so it will not fight this transform.
            node.style.transform = `translateY(-50%) rotate(${angle}deg)`;

            streakAnimList[slot]?.cancel();
            streakAnimList[slot] = node.animate(
                [
                    { opacity: 1, filter: "brightness(1.1)" },
                    { opacity: 0, filter: "brightness(0.72)" },
                ],
                { duration: life, easing: "ease-out", fill: "forwards" },
            );
        };

        const handleMove = (e: MouseEvent) => {
            targetRef.current.x = e.clientX;
            targetRef.current.y = e.clientY;
            showCursor(true);

            const now = performance.now();

            if (now - sparkTimerRef.current > SPARK_INTERVAL_MS) {
                sparkTimerRef.current = now;
                spawnSpark(e.clientX, e.clientY);
            }

            if (previousRef.current && now - streakTimerRef.current > STREAK_INTERVAL_MS) {
                streakTimerRef.current = now;
                spawnStreak(
                    previousRef.current.x,
                    previousRef.current.y,
                    e.clientX,
                    e.clientY,
                );
            }

            previousRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleLeave = () => {
            showCursor(false);
            previousRef.current = null;
        };

        const handleEnter = (e: MouseEvent) => {
            showCursor(true);
            if (typeof e?.clientX === "number" && typeof e?.clientY === "number") {
                targetRef.current.x = e.clientX;
                targetRef.current.y = e.clientY;
                currentRef.current.x = e.clientX;
                currentRef.current.y = e.clientY;
                previousRef.current = { x: e.clientX, y: e.clientY };
            }
        };

        const animate = () => {
            currentRef.current.x +=
                (targetRef.current.x - currentRef.current.x) * CURSOR_EASING;
            currentRef.current.y +=
                (targetRef.current.y - currentRef.current.y) * CURSOR_EASING;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;
            }

            rafRef.current = window.requestAnimationFrame(animate);
        };

        rafRef.current = window.requestAnimationFrame(animate);
        window.addEventListener("mousemove", handleMove, { passive: true });
        window.addEventListener("mouseleave", handleLeave);
        window.addEventListener("mouseenter", handleEnter);

        return () => {
            document.documentElement.classList.remove("fire-cursor-active");
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseleave", handleLeave);
            window.removeEventListener("mouseenter", handleEnter);
            window.cancelAnimationFrame(rafRef.current);
            sparkAnimList.forEach((a) => a?.cancel());
            streakAnimList.forEach((a) => a?.cancel());
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <div className="fire-cursor-layer" aria-hidden="true">
            {Array.from({ length: STREAK_POOL_SIZE }, (_, i) => (
                <span
                    key={i}
                    className="fire-streak"
                    ref={(node) => {
                        streakNodes.current[i] = node;
                    }}
                />
            ))}

            <div ref={cursorRef} className="fire-cursor-outline">
                <svg viewBox="0 0 24 32" className="fire-cursor-outline-svg">
                    <polygon
                        points="3,1 21,15 13,16 16,30 10,30 8,19 3,24"
                        className="fire-cursor-outline-glow"
                    />
                    <polygon
                        points="3,1 21,15 13,16 16,30 10,30 8,19 3,24"
                        className="fire-cursor-outline-stroke"
                    />
                </svg>
            </div>

            {Array.from({ length: SPARK_POOL_SIZE }, (_, i) => (
                <span
                    key={i}
                    className="fire-spark"
                    ref={(node) => {
                        sparkNodes.current[i] = node;
                    }}
                />
            ))}
        </div>
    );
}
