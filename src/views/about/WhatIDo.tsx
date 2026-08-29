"use client";

import { motion } from "framer-motion";

export default function WhatIDo() {
    const items = [
        {
            title: "Backend Architecture",
            text: "Domain-driven NestJS services with module boundaries that hold: transactional side effects behind ports, PostgreSQL schemas and Prisma migrations designed for workflows that outlive the feature."
        },
        {
            title: "Product Frontend",
            text: "Next.js and TypeScript interfaces built for the people who maintain them next — reusable components, real accessibility, and performance treated as a requirement rather than a pass at the end."
        },
        {
            title: "Debugging Other People's Code",
            text: "Reading an unfamiliar codebase until the cause is provable, not guessed — the skill behind fixes merged upstream into Twenty, Medusa and Saleor Dashboard."
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
                        className="p-6 rounded-2xl bg-base-200/40 glow-box border border-primary/20"
                    >
                        <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                        <p className="mt-2 text-base-content/70">{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
