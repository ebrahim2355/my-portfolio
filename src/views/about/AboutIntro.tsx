"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDownload } from "react-icons/fa6";
import myPhoto from "@/assets/my-photo.jpg";

export default function AboutIntro() {
    return (
        <section className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:py-16 py-10 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
            >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border-4 border-primary glow-box overflow-hidden">
                    <img src={myPhoto.src} alt="Portrait of Ebrahim" className="w-full h-full object-cover" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="md:col-span-2"
            >
                <h2 className="text-3xl font-bold text-primary glow">Hi, I&apos;m Ebrahim</h2>

                <p className="mt-4 text-base md:text-lg leading-relaxed text-base-content/80 max-w-6xl">
                    I build the parts of a product that have to be right &mdash; catalogues, inventory, orders,
                    payments and auth &mdash; on NestJS, PostgreSQL and Prisma, with Next.js on the front.
                    Most of my work now is on a large-scale CRM and e-commerce platform where a single wrong
                    assumption reaches real customers.
                </p>

                <p className="mt-4 text-base md:text-lg leading-relaxed text-base-content/80 max-w-6xl">
                    The same habit shows up in the open source I contribute to: I read the codebase until I can
                    explain <em>why</em> a bug happens, then fix the cause rather than the symptom. Maintainers at
                    Twenty, Medusa and Saleor have reviewed and merged that work.
                </p>

                <div className="mt-6 flex gap-4 flex-wrap">
                    <a href="/resume.pdf" download="Ebrahim-Ali-resume.pdf" className="btn btn-primary btn-neon px-6">
                        <FaDownload />
                        Download Resume
                    </a>
                    <Link href="/contact" className="btn btn-secondary btn-neon-secondary px-6">
                        Contact Me
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
