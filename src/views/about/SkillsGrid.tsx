"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/profile";

export default function SkillsGrid() {
    return (
        <section className="relative py-10 md:py-20 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-primary glow font-bold mb-10 text-center">
                Skills
            </h2>

            {/* Category-per-row, so this reads as a reference list rather than
                repeating the home page's card layout over the same data. */}
            <dl className="flex flex-col gap-8">
                {skillGroups.map((group, i) => (
                    <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="grid md:grid-cols-4 gap-4 items-baseline border-b border-primary/15 pb-6 last:border-0"
                    >
                        <dt className="text-sm font-semibold uppercase tracking-widest text-secondary">
                            {group.category}
                        </dt>

                        <dd className="md:col-span-3 flex flex-wrap gap-2">
                            {group.items.map((s) => (
                                <span
                                    key={s.name}
                                    className="px-3 py-1.5 rounded-lg bg-base-200 border border-primary/20 text-base-content/85"
                                >
                                    {s.name}
                                </span>
                            ))}
                        </dd>
                    </motion.div>
                ))}
            </dl>
        </section>
    );
}
