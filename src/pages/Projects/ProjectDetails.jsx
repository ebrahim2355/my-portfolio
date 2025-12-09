import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import projects from "../../data/projects.json";
import NeonParticles from "../../components/NeonParticles";
import { useState } from "react";

export default function ProjectDetails() {
    const { id } = useParams();

    // Find the project by ID
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

                {/* Back Button */}
                <Link
                    to="/projects"
                    className="btn btn-outline btn-primary mb-6 glow"
                >
                    ← Back
                </Link>

                {/* Banner Image */}
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

                {/* Title + Description */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary glow">
                        {project.title}
                    </h1>

                    <p className="mt-4 text-base md:text-lg text-base-content/70 leading-relaxed">
                        {project.description}
                    </p>
                </motion.div>

                {/* Tech Stack */}
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

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex gap-4 flex-wrap"
                >
                    <a
                        href={project.live}
                        target="_blank"
                        className="btn btn-primary btn-neon px-6"
                    >
                        Live Demo
                    </a>

                    <a
                        href={project.github}
                        target="_blank"
                        className="btn btn-secondary btn-neon px-6"
                    >
                        Source Code
                    </a>
                </motion.div>

                {/* Optional extra screenshots section */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-14"
                    >
                        <h3 className="text-2xl font-bold text-primary">Screenshots</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            {project.screenshots.map((img, i) => (
                                <div
                                    key={i}
                                    className="overflow-hidden rounded-xl border border-primary/30 glow"
                                >
                                    <img
                                        src={img}
                                        onClick={() => setActiveImage(img)}
                                        className="w-full cursor-pointer hover:scale-110 transition-all duration-700"
                                    />

                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Fullscreen Image Viewer */}
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
