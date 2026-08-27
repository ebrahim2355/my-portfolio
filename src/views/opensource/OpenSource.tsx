"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { openSource } from "@/data";
import { ALL_MERGED_PRS_URL, contributionSummary } from "@/lib/opensource";
import ContributionCard from "@/components/ContributionCard";
import NeonParticles from "@/components/NeonParticles";

const ALL = "All";

export default function OpenSource() {
    const [filter, setFilter] = useState(ALL);

    // Distinct project names, in the order they first appear in the data.
    const projectList = useMemo(
        () => [ALL, ...Array.from(new Set(openSource.map((c) => c.project)))],
        [],
    );

    const visible = useMemo(
        () =>
            filter === ALL
                ? openSource
                : openSource.filter((c) => c.project === filter),
        [filter],
    );

    return (
        <main className="pt-24 pb-24 px-6 relative overflow-hidden">
            <NeonParticles count={35} />

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-4xl md:text-6xl font-extrabold text-primary glow"
                >
                    Open Source Contributions
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-base md:text-lg text-base-content/70 mt-4 max-w-2xl mx-auto"
                >
                    Every pull request I have had merged into a major open-source project
                    &mdash; the bug behind it, the reasoning that fixed it, and a link to
                    the review it went through.
                </motion.p>

                <motion.div
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
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

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mt-12"
                >
                    {projectList.map((project) => (
                        <button
                            key={project}
                            type="button"
                            aria-pressed={filter === project}
                            onClick={() => setFilter(project)}
                            className={`px-4 py-2 rounded-lg border
                                ${filter === project
                                    ? "border-primary bg-primary text-black"
                                    : "border-primary/40 text-primary hover:border-primary"}
                                glow-box transition-all`}
                        >
                            {project}
                        </button>
                    ))}
                </motion.div>

                {/* Serial numbers are rendered inside the card, so markers are suppressed. */}
                <ol className="mt-14 flex flex-col gap-8 list-none">
                    {visible.map((c, i) => (
                        <ContributionCard
                            key={`${c.repo}#${c.prNumber}`}
                            contribution={c}
                            index={i}
                        />
                    ))}
                </ol>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <a
                        href={ALL_MERGED_PRS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-neon-secondary h-auto min-w-64 px-10 py-3 text-lg font-semibold text-center hover:scale-105 transition-transform"
                    >
                        All Merged PRs on GitHub &rarr;
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
