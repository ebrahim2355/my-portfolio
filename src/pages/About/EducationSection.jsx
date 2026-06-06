import { motion } from "framer-motion";

export default function EducationSection() {
    return (
        <section className="relative py-10 md:py-20">
            <h2 className="text-3xl md:text-4xl text-primary glow font-bold text-center">Education</h2>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-10 max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-base-200/40 glow border border-primary/20"
            >
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                    BSc in Computer Science
                </h3>
                <p className="mt-2 text-base-content/70">University of Rajshahi</p>
                <p className="mt-1 text-base-content/60">2020 - 2025</p>
                <p className="mt-4 text-base-content/80">
                    Completed a Bachelor of Science in Computer Science, building a strong foundation in programming, problem solving, software engineering concepts, and practical application development alongside academic coursework.
                </p>
            </motion.div>
        </section>
    );
}
