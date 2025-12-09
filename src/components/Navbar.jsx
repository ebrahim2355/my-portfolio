import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [particles, setParticles] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    /** Generate particle positions AFTER mount (React 19 safe) */
    useEffect(() => {
        const generated = [...Array(25)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        }));
        setParticles(generated);
    }, []);

    /** Mouse movement → parallax motion */
    useEffect(() => {
        const handleMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10; // small tilt left/right
            const y = (e.clientY / window.innerHeight - 0.5) * 10; // small tilt up/down
            setMousePos({ x, y });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
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

    const links = [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
        { name: "Projects", to: "/projects" },
        { name: "Contact", to: "/contact" },
    ];

    return (
        <div className="fixed top-0 left-0 w-full z-50 neon-edge bg-base-300/30 backdrop-blur-2xl border-b border-primary/40">

            {/* PARTICLE LAYER */}
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


            {/* REST OF NAVBAR BELOW… */}


            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo with Flicker */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary text-2xl glow flicker font-bold"
                >
                    <Link to="/">Ebrahim</Link>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8">
                    {links.map((link, i) => (
                        <NavLink
                            key={i}
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

                {/* Mobile Icon */}
                <div
                    className="md:hidden text-primary text-3xl glow cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-base-200/90 backdrop-blur-xl p-4 flex flex-col gap-4 shadow-[0_0_20px_var(--color-primary)] border-t border-primary/40"
                >
                    {links.map((link, i) => (
                        <NavLink
                            key={i}
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
