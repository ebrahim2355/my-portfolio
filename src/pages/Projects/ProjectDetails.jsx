import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import projects from "../../data/projects.json";
import NeonParticles from "../../components/NeonParticles";

export default function ProjectDetails() {
    const { id } = useParams();
    const project = projects.find((p) => p.id == id);
    const [activeImage, setActiveImage] = useState(null);

    if (!project) {
        return (
            <main className="pt-24 text-center text-primary">
                <h1 className="text-4xl font-bold">Project Not Found</h1>
                <Link to="/projects" className="btn btn-primary btn-neon mt-6">
                    Back to Projects
                </Link>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-20 relative overflow-hidden">
            <NeonParticles count={40} />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <Link to="/projects" className="btn btn-outline btn-primary mb-6 glow">
                    &larr; Back
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-xl overflow-hidden border border-primary/40 glow shadow-xl"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full max-h-[380px] object-cover object-top"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary glow">{project.title}</h1>

                    <p className="mt-4 text-base md:text-lg text-base-content/70 leading-relaxed">{project.description}</p>

                    {(project.role || project.duration) && (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {project.role && (
                                <span className="badge badge-outline text-primary border-primary/40">
                                    Role: {project.role}
                                </span>
                            )}
                            {project.duration && (
                                <span className="badge badge-outline text-primary border-primary/40">
                                    Duration: {project.duration}
                                </span>
                            )}
                        </div>
                    )}
                </motion.div>

                {project.problem && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mt-8 p-6 rounded-xl bg-base-200/40 border border-primary/30 glow"
                    >
                        <h3 className="text-2xl font-bold text-primary">Problem</h3>
                        <p className="mt-3 text-base-content/75 leading-relaxed">{project.problem}</p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                >
                    <h3 className="text-2xl font-bold text-primary">Tech Stack</h3>

                    <div className="flex gap-2 flex-wrap mt-3">
                        {project.tech.map((t, i) => (
                            <span key={i} className="badge badge-outline text-primary border-primary/40">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {project.decisions?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mt-8"
                    >
                        <h3 className="text-2xl font-bold text-primary">Key Engineering Decisions</h3>
                        <ul className="mt-3 space-y-2 text-base-content/75">
                            {project.decisions.map((point, idx) => (
                                <li key={idx} className="p-4 rounded-lg bg-base-200/40 border border-primary/20">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {project.highlights?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.38 }}
                        className="mt-8"
                    >
                        <h3 className="text-2xl font-bold text-primary">What I Built</h3>
                        <ul className="mt-3 space-y-2 text-base-content/75">
                            {project.highlights.map((item, idx) => (
                                <li key={idx} className="p-4 rounded-lg bg-base-200/40 border border-primary/20">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {project.outcomes?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8"
                    >
                        <h3 className="text-2xl font-bold text-primary">Impact</h3>
                        <ul className="mt-3 space-y-2 text-base-content/75">
                            {project.outcomes.map((item, idx) => (
                                <li key={idx} className="p-4 rounded-lg bg-base-200/40 border border-primary/20">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex gap-4 flex-wrap"
                >
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-neon px-6"
                    >
                        Live Demo
                    </a>

                    {project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-neon-secondary px-6"
                        >
                            Source Code
                        </a>
                    ) : (
                        <span
                            title="This repository is private"
                            aria-label="This repository is private"
                            className="btn btn-secondary btn-neon-secondary px-6 opacity-70 pointer-events-none cursor-not-allowed"
                        >
                            Private Repo
                        </span>
                    )}
                </motion.div>

                {project.screenshots && project.screenshots.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-14"
                    >
                        <h3 className="text-2xl font-bold text-primary">Screenshots</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 items-start">
                            {project.screenshots.map((img, i) => (
                                <div key={i} className="self-start overflow-hidden rounded-xl border border-primary/30 glow">
                                    <img
                                        src={img}
                                        alt={`${project.title} screenshot ${i + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        onClick={() => setActiveImage(img)}
                                        className="w-full cursor-pointer hover:scale-110 transition-all duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {activeImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
                    onClick={() => setActiveImage(null)}
                >
                    <motion.img
                        src={activeImage}
                        alt={`${project.title} screenshot preview`}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="max-w-[90%] max-h-[90%] rounded-xl border border-primary/50 glow shadow-2xl"
                    />
                </motion.div>
            )}
        </main>
    );
}
