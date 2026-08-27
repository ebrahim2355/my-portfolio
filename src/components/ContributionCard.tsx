"use client";

import { motion } from "framer-motion";
import type { OpenSourceContribution } from "@/types/content";
import { formatMerged, formatStars } from "@/lib/opensource";

interface ContributionCardProps {
    contribution: OpenSourceContribution;
    // Position in the rendered list, used only to stagger the entrance.
    index: number;
    // Home page preview: clamps the write-up so three cards stay scannable.
    // The dedicated page shows it in full.
    compact?: boolean;
}

export default function ContributionCard({
    contribution: c,
    index,
    compact = false,
}: ContributionCardProps) {
    const proseClass = compact
        ? "mt-2 text-base-content/70 line-clamp-3"
        : "mt-2 text-base-content/70";

    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl bg-base-200 glow-box border border-primary/30 overflow-hidden shadow-xl hover:shadow-primary/40 transition-all"
        >
            <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
                    <span
                        aria-hidden="true"
                        className="text-4xl md:text-5xl font-extrabold text-primary/30 leading-none tabular-nums"
                    >
                        {String(c.id).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-56">
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-2xl font-bold text-primary">{c.project}</h3>
                            <span className="badge badge-outline border-warning/40 text-warning">
                                &#9733; {formatStars(c.stars)}
                            </span>
                            <span className="badge badge-outline border-success/40 text-success">
                                Merged
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-base-content/60">
                            <a
                                href={c.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                {c.repo}
                            </a>
                            {" · "}
                            {c.projectTagline}
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-lg font-semibold text-base-content wrap-break-word">
                    {c.title}
                </p>

                <p className="mt-1 text-sm text-base-content/60">
                    PR #{c.prNumber} {"·"} merged {formatMerged(c.mergedAt)}
                </p>

                <div className="mt-6 flex flex-col gap-5">
                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-secondary">
                            The Problem
                        </h4>
                        <p className={proseClass}>{c.problem}</p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-secondary">
                            What I Did
                        </h4>
                        <p className={proseClass}>{c.solution}</p>
                    </div>
                </div>

                <p className="mt-6 text-sm font-mono text-base-content/60">
                    <span className="text-success">+{c.additions}</span>
                    {" / "}
                    <span className="text-error">&minus;{c.deletions}</span>
                    {" · "}
                    {c.changedFiles} {c.changedFiles === 1 ? "file" : "files"} changed
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {c.tech.map((t) => (
                        <span
                            key={t}
                            className="badge badge-outline text-primary border-primary/40"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-neon btn-sm mt-6 px-6"
                >
                    View Merged PR &rarr;
                </a>
            </div>
        </motion.li>
    );
}
