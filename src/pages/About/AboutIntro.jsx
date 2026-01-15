import { motion } from "framer-motion";
import myPhoto from "../../assets/my-photo.jpg";
import { FaDownload } from "react-icons/fa6";

export default function AboutIntro() {
    return (
        <section className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:py-16 py-10 items-center">

            {/* Photo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
            >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border-4 border-primary glow overflow-hidden">
                    <img src={myPhoto} className="w-full h-full object-cover" />
                </div>
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="md:col-span-2"
            >
                <h2 className="text-3xl font-bold text-primary glow">Hi, I’m Ebrahim 👋</h2>

                <p className="mt-4 text-base md:text-lg leading-relaxed text-base-content/80 max-w-6xl">
                    I build modern, responsive, and visually rich web applications using React, Next.js, Tailwind,
                    Node.js, Express, and MongoDB. I love creating futuristic UIs, smooth animations,
                    and clean reusable component architecture.
                </p>

                <div className="mt-6 flex gap-4 flex-wrap">
                    <a href="/resume.pdf" download="Ebrahim-Ali-resume.pdf" className="btn btn-primary btn-neon px-6">
                        <FaDownload />
                        Download Resume</a>
                    <a href="/contact" className="btn btn-secondary btn-neon-secondary px-6">Contact Me</a>
                </div>
            </motion.div>
        </section>
    );
}
