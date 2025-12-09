import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="relative md:py-20 py-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-2xl bg-base-200/40 glow border border-primary/30 inline-block"
            >
                <h3 className="text-2xl text-primary font-bold">Want to work together?</h3>
                <p className="mt-2 text-base-content/70">
                    I’m open to freelance work and full-time opportunities.
                </p>

                <a href="/contact" className="btn btn-primary btn-neon mt-4 px-8">
                    Contact Me
                </a>
            </motion.div>
        </section>
    );
}
