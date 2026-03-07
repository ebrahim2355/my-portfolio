import { useEffect, useRef, useState } from "react";

export default function FireCursor() {
    const [enabled, setEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sparks, setSparks] = useState([]);
    const [trail, setTrail] = useState([]);
    const cursorRef = useRef(null);
    const currentRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(0);
    const sparkTimerRef = useRef(0);
    const trailTimerRef = useRef(0);
    const sparkIdRef = useRef(0);
    const trailIdRef = useRef(0);
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

        const spawnTrail = (x, y) => {
            const id = trailIdRef.current++;
            const node = {
                id,
                x: x + (Math.random() * 8 - 4),
                y: y + (Math.random() * 6 - 3),
                size: Math.random() * 20 + 18,
                life: Math.random() * 200 + 300,
                driftX: Math.random() * 20 - 10,
                driftY: -(Math.random() * 20 + 10),
                rotate: Math.random() * 24 - 12,
            };

            setTrail((prev) => [...prev.slice(-14), node]);

            window.setTimeout(() => {
                if (!mountedRef.current) {
                    return;
                }
                setTrail((prev) => prev.filter((item) => item.id !== id));
            }, node.life);
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
            if (now - trailTimerRef.current > 18) {
                trailTimerRef.current = now;
                spawnTrail(e.clientX, e.clientY);
            }
        };

        const handleLeave = () => setVisible(false);
        const handleEnter = () => setVisible(true);

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
            {trail.map((node) => (
                <span
                    key={node.id}
                    className="fire-trail"
                    style={{
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${node.size}px`,
                        height: `${node.size * 1.3}px`,
                        "--trail-drift-x": `${node.driftX}px`,
                        "--trail-drift-y": `${node.driftY}px`,
                        "--trail-rotate": `${node.rotate}deg`,
                        animationDuration: `${node.life}ms`,
                    }}
                ></span>
            ))}

            <div ref={cursorRef} className={`fire-cursor ${visible ? "is-visible" : ""}`}>
                <span className="fire-core"></span>
                <span className="fire-glow"></span>
                <span className="fire-flame flame-1"></span>
                <span className="fire-flame flame-2"></span>
                <span className="fire-flame flame-3"></span>
                <span className="fire-plume"></span>
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
