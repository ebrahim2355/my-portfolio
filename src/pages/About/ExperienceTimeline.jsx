import { motion } from "framer-motion";
import experience from "../../data/experience.json"

export default function ExperienceTimeline() {
    return (
        <section className="relative py-10 md:py-20 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-primary glow font-bold mb-10">Experience</h2>

            <div className="relative ml-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/30">
                {experience.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8 mb-10"
                    >
                        <span className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-primary glow"></span>

                        <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                        <p className="text-sm text-base-content/60">{exp.company} • {exp.year}</p>

                        <p className="mt-2 text-base-content/70">{exp.description}</p>

                        <div className="mt-3 flex gap-2 flex-wrap">
                            {exp.skillsUsed?.map((s, idx) => (
                                <span key={idx} className="badge badge-primary">{s}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
