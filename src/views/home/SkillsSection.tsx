"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/profile";

export default function SkillsSection() {
    return (
        <section className="py-24 bg-base-300/30 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold text-center text-primary glow"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Toolkit
                </motion.h2>

                <motion.p
                    className="mt-5 max-w-2xl mx-auto text-center text-base-content/70"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Grouped by where it sits in the stack, not scored out of a hundred &mdash;
                    the merged pull requests and the projects below are the evidence.
                </motion.p>

                <div className="mt-12 grid gap-5 sm:grid-cols-2">
                    {skillGroups.map((group, i) => (
                        <motion.div
                            key={group.category}
                            className="p-6 rounded-xl bg-base-200 border border-primary/20 glow-box"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary">
                                {group.category}
                            </h3>

                            <ul className="mt-4 flex flex-wrap gap-2 list-none">
                                {group.items.map((s) => (
                                    <li
                                        key={s.name}
                                        className="px-3 py-1.5 rounded-lg bg-base-300/60 border border-primary/20 text-base-content/85"
                                    >
                                        {s.name}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
