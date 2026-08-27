"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { openSource } from "@/data";
import { contributionSummary } from "@/lib/opensource";
import ContributionCard from "@/components/ContributionCard";

// Mirrors FeaturedProjects: prefer the explicitly featured entries, and fall
// back to the top of the list so the preview is never empty if no flag is set.
const featured = openSource.filter((c) => c.featured);
const preview = (featured.length > 0 ? featured : openSource).slice(0, 3);

export default function OpenSourceSection() {
    return (
        <motion.section
            id="open-source"
            className="py-24 px-6 bg-base-300/30 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.h2
                className="text-4xl md:text-6xl font-extrabold text-center text-primary glow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Open Source
            </motion.h2>

            <motion.p
                className="mt-5 max-w-3xl mx-auto text-center text-base-content/70"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
            >
                Bugs I tracked down and fixed in production codebases used by thousands of
                teams &mdash; each one reviewed and merged by the project&rsquo;s own
                maintainers.
            </motion.p>

            <motion.div
                className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
            >
                {contributionSummary.map((s) => (
                    <div
                        key={s.label}
                        className="p-5 rounded-xl bg-base-200 glow-box border border-primary/30 text-center"
                    >
                        <h3 className="text-3xl font-bold text-primary">{s.value}</h3>
                        <p className="mt-1 text-sm text-base-content/70">{s.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* Serial numbers are rendered inside the card, so markers are suppressed. */}
            <ol className="mt-16 max-w-4xl mx-auto flex flex-col gap-8 list-none">
                {preview.map((c, i) => (
                    <ContributionCard
                        key={`${c.repo}#${c.prNumber}`}
                        contribution={c}
                        index={i}
                        compact
                    />
                ))}
            </ol>

            <motion.div
                className="mt-14 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Link
                    href="/open-source"
                    className="btn btn-primary btn-neon h-auto min-w-64 px-10 py-3 text-lg font-semibold text-center hover:scale-105 transition-transform"
                >
                    View All Contributions &rarr;
                </Link>
            </motion.div>
        </motion.section>
    );
}
