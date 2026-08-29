"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BIO, CORE_STACK, currentRole } from "@/lib/profile";

export default function AboutSection() {
    return (
        <motion.section
            className="py-28 px-6 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="text-4xl md:text-6xl font-extrabold text-primary glow">About Me</h2>

            <div className="mt-10 p-8 md:p-12 bg-base-200/40 rounded-2xl border border-primary/40 backdrop-blur-xl glow-box">
                {/* Written in my own voice rather than the current job's
                    description — the full role detail lives on the /about
                    timeline, which this section used to duplicate outright. */}
                {BIO.map((paragraph, i) => (
                    <p
                        key={i}
                        className={`text-lg md:text-xl text-base-content/80 leading-relaxed ${i > 0 ? "mt-5" : ""}`}
                    >
                        {paragraph}
                    </p>
                ))}

                {/* The four technologies the work is actually built on, not the
                    whole skillsUsed array. */}
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    {CORE_STACK.map((tech) => (
                        <span key={tech} className="badge badge-primary px-4 py-3 text-base glow-box">
                            {tech}
                        </span>
                    ))}
                </div>

                <p className="mt-8 text-base-content/60">
                    Currently{" "}
                    <span className="text-base-content/80">{currentRole.role}</span> at{" "}
                    <span className="text-base-content/80">{currentRole.company}</span>
                    <span className="mx-2 text-primary/50">&middot;</span>
                    {currentRole.year}
                </p>

                <Link
                    href="/about"
                    className="mt-6 inline-block link link-primary text-sm font-semibold"
                >
                    Read the full background &rarr;
                </Link>
            </div>
        </motion.section>
    );
}
