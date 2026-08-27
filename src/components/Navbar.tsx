"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import useRandomParticles from "@/hooks/useRandomParticles";
import useParallax from "@/hooks/useParallax";

const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Open Source", to: "/open-source" },
    { name: "Contact", to: "/contact" },
];

interface Particle {
    top: string;
    left: string;
}

const makeParticle = (): Particle => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
});

// Mirrors react-router's NavLink matching (no `end` prop): an exact match, or a
// prefix match that lands on a path separator. The separator check is what keeps
// "/" from matching every route.
const isLinkActive = (pathname: string, to: string) =>
    pathname === to ||
    (pathname.startsWith(to) && pathname.charAt(to.length) === "/");

const Navbar = () => {
    // usePathname is typed string | null; in an App Router client component it is
    // always a string. The fallback just leaves every link inactive.
    const pathname = usePathname() ?? "";
    const [open, setOpen] = useState(false);
    const particles = useRandomParticles(25, makeParticle);
    // Written directly to the particle layer; keeping it in state re-rendered the
    // whole navbar on every frame of pointer movement.
    const particlesRef = useRef<HTMLDivElement>(null);
    useParallax(particlesRef);

    const magneticHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { offsetX, target } = e.nativeEvent;
        const width = (target as HTMLElement).clientWidth;
        const move = (offsetX - width / 2) * 0.15;
        (e.target as HTMLElement).style.transform = `translateX(${move}px)`;
    };

    const magneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        (e.target as HTMLElement).style.transform = "translateX(0px)";
    };

    return (
        <div className="relative w-full neon-edge bg-base-300/30 backdrop-blur-2xl border-b border-primary/40">
            <div className="nav-particles" ref={particlesRef}>
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
                    <Link href="/">Ebrahim</Link>
                </motion.div>

                <div className="hidden md:flex gap-8">
                    {links.map((link) => {
                        const isActive = isLinkActive(pathname, link.to);

                        return (
                            <Link
                                key={link.to}
                                href={link.to}
                                aria-current={isActive ? "page" : undefined}
                                onMouseMove={magneticHover}
                                onMouseLeave={magneticLeave}
                                className={`text-sm nav-link magnetic transition-all ${isActive
                                    ? "text-primary glow"
                                    : "text-base-content hover:text-primary hover:glow"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
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
                    {links.map((link) => {
                        const isActive = isLinkActive(pathname, link.to);

                        return (
                            <Link
                                key={link.to}
                                href={link.to}
                                aria-current={isActive ? "page" : undefined}
                                onClick={() => setOpen(false)}
                                className={`text-base-content hover:text-primary hover:glow transition-all${isActive ? " active" : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
