import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import projects from "../../data/projects.json";
import NeonParticles from "../../components/NeonParticles";
import { Link } from "react-router";

export default function Projects() {
    const [filter, setFilter] = useState("All");

    // Collect unique tech stacks from all projects
    const techList = useMemo(() => {
        const s = new Set();
        projects.forEach((p) => p.tech?.forEach((t) => s.add(t)));
        return ["All", ...Array.from(s)];
    }, []);

    // Filter projects by selected tech
    const filteredProjects = useMemo(() => {
        if (filter === "All") return projects;
        return projects.filter((p) => p.tech.includes(filter));
    }, [filter]);

    return (
        <main className="pt-24 pb-24 px-6 relative overflow-hidden">
            {/* Background neon particles */}
            <NeonParticles count={35} />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-4xl md:text-6xl font-extrabold text-primary glow"
                >
                    Projects
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center text-base md:text-lg text-base-content/70 mt-4 max-w-2xl mx-auto"
                >
                    A collection of the work I’ve created — ranging from animated UI to full-stack web applications.
                </motion.p>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap justify-center gap-3 mt-10"
                >
                    {techList.map((tech) => (
                        <button
                            key={tech}
                            onClick={() => setFilter(tech)}
                            className={`px-4 py-2 rounded-lg border 
                                ${filter === tech
                                    ? "border-primary bg-primary text-black"
                                    : "border-primary/40 text-primary hover:border-primary"}
                                glow transition-all`}
                        >
                            {tech}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.map((p, i) => (
                        <motion.div
                            key={p.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-xl bg-base-200 glow border border-primary/30 overflow-hidden shadow-xl flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col h-full">
                                <h3 className="text-2xl font-bold text-primary line-clamp-2">
                                    {p.title}
                                </h3>

                                <p className="mt-2 text-base-content/70 line-clamp-4">
                                    {p.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {p.tech?.map((t, idx) => (
                                        <span key={idx} className="badge badge-outline text-primary border-primary/40">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="mt-auto flex gap-3 flex-wrap">
                                    <Link
                                        to={`/projects/${p.id}`}
                                        className="btn btn-sm btn-accent btn-neon-accent px-4 flex-1 w-full whitespace-nowrap"
                                    >
                                        View Details
                                    </Link>

                                    <a
                                        href={p.live}
                                        target="_blank"
                                        className="btn btn-sm btn-primary btn-neon px-4 flex-1 w-full"
                                    >
                                        Live
                                    </a>

                                    <a
                                        href={p.github}
                                        target="_blank"
                                        className="btn btn-sm btn-secondary btn-neon-secondary px-4"
                                    >
                                        Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
