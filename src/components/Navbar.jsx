import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";

const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rafRef = useRef(0);

    const particles = useMemo(
        () =>
            [...Array(25)].map(() => ({
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
            })),
        []
    );

    useEffect(() => {
        const handleMove = (e) => {
            if (rafRef.current) {
                return;
            }

            rafRef.current = window.requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 10;
                const y = (e.clientY / window.innerHeight - 0.5) * 10;
                setMousePos({ x, y });
                rafRef.current = 0;
            });
        };

        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMove);
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const magneticHover = (e) => {
        const { offsetX, target } = e.nativeEvent;
        const width = target.clientWidth;
        const move = (offsetX - width / 2) * 0.15;
        e.target.style.transform = `translateX(${move}px)`;
    };

    const magneticLeave = (e) => {
        e.target.style.transform = "translateX(0px)";
    };

    return (
        <div className="relative w-full neon-edge bg-base-300/30 backdrop-blur-2xl border-b border-primary/40">
            <div
                className="nav-particles"
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                }}
            >
                {particles.map((p, i) => (
                    <span key={i} style={p}></span>
                ))}
            </div>

            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary text-2xl glow flicker font-bold"
                >
                    <Link to="/">Ebrahim</Link>
                </motion.div>

                <div className="hidden md:flex gap-8">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onMouseMove={magneticHover}
                            onMouseLeave={magneticLeave}
                            className={({ isActive }) =>
                                `text-sm nav-link magnetic transition-all ${isActive
                                    ? "text-primary glow"
                                    : "text-base-content hover:text-primary hover:glow"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <button
                    type="button"
                    className="md:hidden text-primary text-3xl glow cursor-pointer"
                    aria-label="Toggle navigation menu"
                    aria-controls="mobile-nav"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {open && (
                <motion.div
                    id="mobile-nav"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-base-200/90 backdrop-blur-xl p-4 flex flex-col gap-4 shadow-[0_0_20px_var(--color-primary)] border-t border-primary/40"
                >
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="text-base-content hover:text-primary hover:glow transition-all"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
