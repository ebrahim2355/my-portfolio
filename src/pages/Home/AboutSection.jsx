// src/pages/Home/AboutSection.jsx
import { motion } from "framer-motion";
import experience from "../../data/experience.json";

export default function AboutSection() {
    const exp = experience[0];

    return (
        <motion.section
            className="py-28 px-6 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="text-4xl md:text-6xl font-extrabold text-primary glow">
                About Me
            </h2>

            <div className="mt-10 p-8 md:p-12 bg-base-200/40 rounded-2xl border border-primary/40 backdrop-blur-xl glow">
                <p className="text-lg md:text-xl text-base-content/80 leading-relaxed">
                    {exp.description}
                </p>

                <div className="mt-6 flex justify-center gap-4 flex-wrap">
                    {exp.skillsUsed.map((s, i) => (
                        <span key={i} className="badge badge-primary px-4 py-3 text-base glow">
                            {s}
                        </span>
                    ))}
                </div>

                <p className="mt-6 text-base-content/60">
                    {exp.year} — {exp.company} ({exp.type})
                </p>
            </div>
        </motion.section>
    );
}
