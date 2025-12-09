// src/pages/Home/SkillsSection.jsx
import { motion } from "framer-motion";
import skills from "../../data/skills.json";

export default function SkillsSection() {
    return (
        <section className="py-16 bg-base-300/30 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    className="flex gap-6 items-center justify-center flex-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {skills.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 min-w-36 rounded-xl bg-base-200 border border-primary/20 glow text-center"
                        >
                            <h3 className="text-xl font-bold text-primary">{s.name}</h3>
                            <p className="text-sm text-base-content/70">{s.category}</p>

                            <div className="w-full bg-base-300 rounded-full h-2 mt-3 overflow-hidden">
                                <div
                                    className="h-full bg-primary"
                                    style={{ width: `${s.level}%`, transition: "width 1s" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
