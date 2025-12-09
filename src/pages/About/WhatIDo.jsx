import { motion } from "framer-motion";

export default function WhatIDo() {
    const items = [
        {
            title: "Frontend Development",
            text: "React, Tailwind, DaisyUI, animations, accessibility, UI engineering."
        },
        {
            title: "Backend Development",
            text: "Node.js, Express, JWT auth, REST APIs, database design."
        },
        {
            title: "Design & UX",
            text: "Component systems, neon UI design, motion design, user experience."
        }
    ];

    return (
        <section className="relative py-10 md:py-20">
            <h2 className="text-3xl md:text-4xl text-primary glow font-bold text-center">What I Do</h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="p-6 rounded-2xl bg-base-200/40 glow border border-primary/20"
                    >
                        <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                        <p className="mt-2 text-base-content/70">{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
