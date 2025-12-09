// src/pages/Home/StatsSection.jsx
import { motion } from "framer-motion";
import projects from "../../data/projects.json";
import skills from "../../data/skills.json";
import experience from "../../data/experience.json";

export default function StatsSection() {
    const stats = [
        { label: "Projects", value: projects.length },
        { label: "Skills", value: skills.length },
        { label: "Experience", value: experience.length },
        { label: "Impact", value: projects.length + skills.length },
    ];

    return (
        <motion.section
            className="py-20 px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        className="p-6 rounded-xl bg-base-200 glow border border-primary/30 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <h3 className="text-3xl font-bold text-primary">{s.value}</h3>
                        <p className="text-base-content/70">{s.label}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
