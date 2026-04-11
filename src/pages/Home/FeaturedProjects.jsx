import { Link } from "react-router";
import { motion } from "framer-motion";
import projects from "../../data/projects.json";

export default function FeaturedProjects() {
    const featured = projects.filter((p) => p.featured).slice(0, 2);

    return (
        <motion.section
            id="projects"
            className="py-24 px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.h2
                className="text-4xl md:text-6xl font-extrabold text-center text-primary glow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Featured Projects
            </motion.h2>

            <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {featured.map((p, i) => (
                    <motion.div
                        key={p.id}
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        viewport={{ once: true }}
                        className="rounded-xl bg-base-200 glow border border-primary/30 overflow-hidden shadow-xl hover:shadow-primary/40 transition-all"
                    >
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-primary line-clamp-2">{p.title}</h3>

                            <p className="mt-2 text-base-content/70 line-clamp-4">{p.description}</p>

                            {p.role && (
                                <div className="mt-3">
                                    <span className="badge badge-outline text-primary border-primary/40">
                                        {p.role}
                                    </span>
                                </div>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {p.tech?.map((t, idx) => (
                                    <span key={idx} className="badge badge-outline text-primary border-primary/40">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <a
                                    href={p.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-neon btn-sm px-4 w-full flex-1"
                                >
                                    Live
                                </a>
                                {p.github ? (
                                    <a
                                        href={p.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary btn-neon-secondary btn-sm px-4 w-full flex-1"
                                    >
                                        Code
                                    </a>
                                ) : (
                                    <span
                                        title="This repository is private"
                                        aria-label="This repository is private"
                                        className="btn btn-secondary btn-neon-secondary btn-sm px-4 w-full flex-1 opacity-70 pointer-events-none cursor-not-allowed"
                                    >
                                        Private Repo
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-14 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to="/projects"
                    className="btn btn-primary btn-wide btn-neon px-10 py-3 text-lg font-semibold hover:scale-105 transition-transform"
                >
                    View All Projects &rarr;
                </Link>
            </motion.div>
        </motion.section>
    );
}
