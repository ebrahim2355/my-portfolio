import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const generated = [...Array(15)].map(() => ({
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }));
        setParticles(generated);
    }, []);

    return (
        <footer className="relative mt-32 pt-20 pb-12 bg-base-200/40 backdrop-blur-xl overflow-hidden">

            {/* CURVED TOP WITH GRADIENT GLOW */}
            <div className="absolute -top-14 left-0 w-full overflow-hidden">
                <div className="w-[160%] h-28 mx-auto rounded-b-full bg-gradient-to-b from-primary/50 to-transparent blur-xl"></div>
            </div>

            {/* NEON LASER SCANNING LINE */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/60 animate-scanLine shadow-[0_0_12px_var(--color-primary)]"></div>

            {/* FLOATING PARTICLES */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
                {particles.map((p, i) => (
                    <span
                        key={i}
                        style={{
                            position: "absolute",
                            bottom: "-10px",
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            background: "var(--color-primary)",
                            borderRadius: "50%",
                            filter: "drop-shadow(0 0 6px var(--color-primary))",
                            animation: `footerFloat 4s ${p.delay}s infinite ease-in-out`,
                        }}
                    ></span>
                ))}
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-6xl mx-auto text-center px-6">

                {/* TITLE */}
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-bold text-primary glow"
                >
                    Let’s Build Something Amazing
                </motion.h3>

                {/* SOCIAL ICONS */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 flex justify-center gap-6"
                >
                    <motion.a
                        href="https://github.com/ebrahim2355"
                        target="_blank"
                        whileHover={{ scale: 1.2 }}
                        className="text-primary text-3xl glow hover:text-secondary transition"
                    >
                        <FaGithub />
                    </motion.a>

                    <motion.a
                        href="https://linkedin.com/in/ebrahim235"
                        target="_blank"
                        whileHover={{ scale: 1.2 }}
                        className="text-primary text-3xl glow hover:text-secondary transition"
                    >
                        <FaLinkedin />
                    </motion.a>

                    <motion.a
                        href="https://facebook.com/ebrahim2355"
                        target="_blank"
                        whileHover={{ scale: 1.2 }}
                        className="text-primary text-3xl glow hover:text-secondary transition"
                    >
                        <FaFacebook />
                    </motion.a>

                    <motion.a
                        href="mailto:web.ebrahimali@gmail.com"
                        target="_blank"
                        whileHover={{ scale: 1.2 }}
                        className="text-primary text-3xl glow hover:text-secondary transition"
                    >
                        <FaEnvelope />
                    </motion.a>
                </motion.div>

                {/* QUICK LINKS */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-10 flex justify-center gap-6 flex-wrap text-base-content/70"
                >
                    {["Home", "About", "Projects", "Experience", "Contact"].map((t) => (
                        <a key={t} href={`/${t.toLowerCase()}`} className="hover:text-primary transition">
                            {t}
                        </a>
                    ))}
                </motion.div>

                {/* COPYRIGHT */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-10 text-base-content/50 text-sm"
                >
                    © {new Date().getFullYear()} Ebrahim — All Rights Reserved
                </motion.p>
            </div>
        </footer>
    );
}
