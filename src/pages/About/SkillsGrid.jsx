import { motion } from "framer-motion";
import skills from "../../data/skills.json";

export default function SkillsGrid() {
    return (
        <section className="relative py-10 md:py-20 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-primary glow font-bold mb-8 text-center">
                Skills
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skills.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-xl bg-base-200 glow border border-primary/20"
                    >
                        <div className="flex justify-between">
                            <span className="font-bold text-primary">{s.name}</span>
                            <span className="text-sm text-base-content/70">{s.level}%</span>
                        </div>

                        <div className="w-full bg-base-300 h-2 mt-3 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${s.level}%` }}></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
