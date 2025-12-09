import { motion } from "framer-motion";

export default function AboutHeader() {
    return (
        <section className="relative text-center md:py-20 py-10">
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-extrabold text-primary glow"
            >
                About Me
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto"
            >
                A passionate MERN-stack developer crafting futuristic UI with clean code and beautiful animations.
            </motion.p>
        </section>
    );
}
