import { useEffect, useRef, useState } from "react";

export default function FireCursor() {
    const [enabled, setEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sparks, setSparks] = useState([]);
    const [streaks, setStreaks] = useState([]);
    const cursorRef = useRef(null);
    const currentRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const previousRef = useRef(null);
    const rafRef = useRef(0);
    const sparkTimerRef = useRef(0);
    const streakTimerRef = useRef(0);
    const sparkIdRef = useRef(0);
    const streakIdRef = useRef(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

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

        const spawnSpark = (x, y) => {
            const id = sparkIdRef.current++;
            const spark = {
                id,
                x: x + (Math.random() * 12 - 6),
                y: y + (Math.random() * 10 - 5),
                size: Math.random() * 4 + 2,
                life: Math.random() * 320 + 620,
                driftX: Math.random() * 26 - 13,
                driftY: -(Math.random() * 54 + 36),
            };

            setSparks((prev) => [...prev.slice(-30), spark]);

            window.setTimeout(() => {
                if (!mountedRef.current) {
                    return;
                }
                setSparks((prev) => prev.filter((item) => item.id !== id));
            }, spark.life);
        };

        const spawnStreak = (fromX, fromY, toX, toY) => {
            const dx = toX - fromX;
            const dy = toY - fromY;
            const length = Math.hypot(dx, dy);

            if (length < 6) {
                return;
            }

            const id = streakIdRef.current++;
            const streak = {
                id,
                x: fromX,
                y: fromY,
                length,
                angle: Math.atan2(dy, dx) * (180 / Math.PI),
                thickness: Math.random() * 3 + 4,
                life: Math.random() * 220 + 320,
            };

            setStreaks((prev) => [...prev.slice(-24), streak]);

            window.setTimeout(() => {
                if (!mountedRef.current) {
                    return;
                }
                setStreaks((prev) => prev.filter((item) => item.id !== id));
            }, streak.life);
        };

        const handleMove = (e) => {
            targetRef.current.x = e.clientX;
            targetRef.current.y = e.clientY;
            setVisible(true);

            const now = performance.now();
            if (now - sparkTimerRef.current > 24) {
                sparkTimerRef.current = now;
                spawnSpark(e.clientX, e.clientY);
            }

            if (previousRef.current && now - streakTimerRef.current > 16) {
                streakTimerRef.current = now;
                spawnStreak(previousRef.current.x, previousRef.current.y, e.clientX, e.clientY);
            }

            previousRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleLeave = () => {
            setVisible(false);
            previousRef.current = null;
        };

        const handleEnter = (e) => {
            setVisible(true);
            if (typeof e?.clientX === "number" && typeof e?.clientY === "number") {
                targetRef.current.x = e.clientX;
                targetRef.current.y = e.clientY;
                currentRef.current.x = e.clientX;
                currentRef.current.y = e.clientY;
                previousRef.current = { x: e.clientX, y: e.clientY };
            }
        };

        const animate = () => {
            currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.24;
            currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.24;

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
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <div className="fire-cursor-layer" aria-hidden="true">
            {streaks.map((streak) => (
                <span
                    key={streak.id}
                    className="fire-streak"
                    style={{
                        left: `${streak.x}px`,
                        top: `${streak.y}px`,
                        width: `${streak.length}px`,
                        height: `${streak.thickness}px`,
                        transform: `translateY(-50%) rotate(${streak.angle}deg)`,
                        animationDuration: `${streak.life}ms`,
                    }}
                ></span>
            ))}

            <div ref={cursorRef} className={`fire-cursor-outline ${visible ? "is-visible" : ""}`}>
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

            {sparks.map((spark) => (
                <span
                    key={spark.id}
                    className="fire-spark"
                    style={{
                        left: `${spark.x}px`,
                        top: `${spark.y}px`,
                        width: `${spark.size}px`,
                        height: `${spark.size}px`,
                        "--spark-drift-x": `${spark.driftX}px`,
                        "--spark-drift-y": `${spark.driftY}px`,
                        animationDuration: `${spark.life}ms`,
                    }}
                ></span>
            ))}
        </div>
    );
}
