import { Link } from "react-router";
import { motion } from "framer-motion";
import NeonParticles from "../../components/NeonParticles";

export default function ErrorPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
            <NeonParticles count={35} />

            <div className="relative z-20 max-w-2xl">

                {/* 404 Glitch Text */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-primary font-extrabold text-7xl md:text-9xl glitch-text select-none"
                    style={{
                        textShadow: "0 0 20px var(--color-primary), 0 0 40px var(--color-primary)"
                    }}
                >
                    404
                </motion.h1>

                {/* Glitch Effect Text */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold text-primary glow mt-4"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-base md:text-lg text-base-content/70 mt-4 max-w-md mx-auto"
                >
                    Looks like you've entered the neon void.
                    The page you’re looking for does not exist or may have been moved.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col md:flex-row gap-4 justify-center mt-10"
                >
                    <Link to="/" className="btn btn-primary btn-neon px-8 py-3">
                        Go Home
                    </Link>

                    <Link to="/projects" className="btn btn-secondary btn-neon px-8 py-3">
                        View Projects
                    </Link>
                </motion.div>
            </div>

            {/* Glowing Bottom Light */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-primary/20 to-transparent blur-xl"></div>
        </main>
    );
}
