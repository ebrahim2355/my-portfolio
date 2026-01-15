// src/pages/Home/HeroSection.jsx
import { motion } from "framer-motion";
import myPhoto from "../../assets/my-photo.jpg";
import projects from "../../data/projects.json";
import skills from "../../data/skills.json";
import experience from "../../data/experience.json";
import { FaDownload } from "react-icons/fa6";

const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.06, when: "beforeChildren" },
    },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

// Split text helper
const Split = ({ text }) =>
    text.split("").map((ch, i) => (
        <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
        >
            {ch}
        </motion.span>
    ));

export default function HeroSection({ particles, mousePos }) {
    const projectsCount = projects.length; const skillsCount = skills.length; const experienceCount = experience.length;
    return (
        <section className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-10 relative z-10 max-w-7xl mx-auto">

            {/* PARALLAX PARTICLES */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                    transition: "transform 0.1s ease",
                }}
            >
                {particles.map((p, i) => (
                    <span
                        key={i}
                        style={{
                            position: "absolute",
                            top: p.top,
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            background: "var(--color-primary)",
                            borderRadius: "50%",
                            filter: "drop-shadow(0 0 8px var(--color-primary))",
                            animation: `waveMove 6s ${p.delay}s infinite ease-in-out`,
                        }}
                    />
                ))}
            </div>

            {/* LEFT CONTENT */}
            <motion.div className="max-w-xl text-center md:text-left flex flex-col" variants={container} initial="hidden" animate="show">
                <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary glow" variants={item}>
                    <Split text={"Hi, I'm Ebrahim"} />
                </motion.h1>

                <motion.p className="mt-4 text-base sm:text-lg lg:text-xl text-base-content/80 max-w-lg" variants={item}>
                    <Split text={"I design and build futuristic, animated web experiences."} />
                </motion.p>

                <motion.div className="mt-8 flex justify-center md:justify-start gap-4 flex-wrap" variants={item}>
                    <a href="/resume.pdf" download="Ebrahim-Ali-resume.pdf" className="btn btn-primary btn-neon px-6">
                        <FaDownload />
                        Download Resume</a>
                    <a href="/contact" className="btn btn-secondary btn-neon-secondary px-6 py-3 text-sm sm:text-base">Contact Me</a>
                </motion.div>

                {/* quick stats */}
                <motion.div className="mt-8 flex gap-6 flex-wrap justify-center md:justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} > <div className="p-3 rounded-lg bg-base-200 glow border border-primary/30 min-w-[110px] text-center"> <div className="text-2xl md:text-3xl font-bold text-primary">{projectsCount}</div> <div className="text-sm text-base-content/70">Projects</div> </div> <div className="p-3 rounded-lg bg-base-200 glow border border-primary/30 min-w-[110px] text-center"> <div className="text-2xl md:text-3xl font-bold text-primary">{skillsCount}</div> <div className="text-sm text-base-content/70">Skills</div> </div> <div className="p-3 rounded-lg bg-base-200 glow border border-primary/30 min-w-[110px] text-center"> <div className="text-2xl md:text-3xl font-bold text-primary flex justify-center gap-2 items-center">{experienceCount} <span className="text-xl">year</span></div> <div className="text-sm text-base-content/70">Experience</div> </div> </motion.div>
            </motion.div>


            {/* RIGHT PHOTO */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}>
                <div className="w-[260px] h-[260px] md:w-[320px] md:h-80 rounded-full border-4 border-primary glow overflow-hidden shadow-xl">
                    <img src={myPhoto} alt="Ebrahim" className="w-full h-full object-cover" />
                </div>
            </motion.div>
        </section >
    );
}
