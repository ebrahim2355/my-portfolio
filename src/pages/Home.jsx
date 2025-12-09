import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import myPhoto from "../assets/my-photo.jpg"

const Home = () => {
    const [particles, setParticles] = useState([]);

    // Generate particles ONCE
    useEffect(() => {
        const generated = [...Array(20)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 2,
        }));
        setParticles(generated);
    }, []);

    // Split-text animation helper
    const splitText = (text) =>
        text.split("").map((char, i) => (
            <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="inline-block"
            >
                {char}
            </motion.span>
        ));

    return (
        <div className="pt-24">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden">

                {/* Particles */}
                <div className="absolute inset-0 pointer-events-none">
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
                                animation: "waveMove 6s infinite ease-in-out",
                            }}
                        ></span>
                    ))}
                </div>

                {/* Left Content */}
                <div className="relative z-10 max-w-xl">
                    <h1 className="text-3xl md:text-6xl font-extrabold leading-tight text-primary glow">
                        {splitText("Hi, I'm Ebrahim")}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-3 text-base md:text-xl text-base-content/80"
                    >
                        {splitText("I create futuristic UI and web experiences.")}
                    </motion.p>

                    <div className="mt-8 flex gap-4">
                        <button className="btn btn-primary btn-neon text-sm md:text-lg px-6 md:px-10">
                            View Projects
                        </button>
                        <button className="btn btn-secondary btn-neon text-sm md:text-lg px-6 md:px-10">
                            Contact Me
                        </button>
                    </div>
                </div>

                {/* Right Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative mt-10 md:mt-0"
                >
                    <div className="w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-primary glow mx-auto overflow-hidden">
                        <img
                            src={myPhoto}
                            alt="Ebrahim"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </section>

            {/* --- ABOUT PREVIEW --- */}
            <section className="py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-primary glow">
                    About Me
                </h2>
                <p className="mt-4 text-base md:text-xl text-base-content/70 max-w-2xl mx-auto">
                    Passionate MERN Stack developer building immersive visual experiences
                    with clean UI, animation, and futuristic neon design.
                </p>
            </section>

            {/* --- SKILLS STRIP --- */}
            <section className="py-12 bg-base-300/30 backdrop-blur-xl">
                <div className="flex gap-10 animate-marquee whitespace-nowrap">
                    <span className="text-primary glow text-xl md:text-3xl">React</span>
                    <span className="text-secondary glow text-xl md:text-3xl">Tailwind</span>
                    <span className="text-accent glow text-xl md:text-3xl">Node.js</span>
                    <span className="text-primary glow text-xl md:text-3xl">MongoDB</span>
                    <span className="text-secondary glow text-xl md:text-3xl">Framer Motion</span>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="py-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                    ["3+", "Years Experience"],
                    ["15+", "Projects Completed"],
                    ["5+", "Tech Stacks"],
                    ["100%", "Client Satisfaction"],
                ].map(([num, label], i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="p-6 rounded-xl bg-base-200 glow border border-primary/40"
                    >
                        <h3 className="text-3xl md:text-4xl text-primary font-bold">{num}</h3>
                        <p className="text-base-content/80">{label}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default Home;
