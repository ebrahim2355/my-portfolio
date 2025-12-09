import { motion } from "framer-motion";
import NeonParticles from "../../components/NeonParticles";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        toast.loading("Sending...", { id: "send" });

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                data,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                toast.success("Message sent successfully!", { id: "send" });
                reset();
            })
            .catch(() => {
                toast.error("Something went wrong!", { id: "send" });
            });
    };

    return (
        <main className="pt-24 pb-12 px-6 relative overflow-hidden">
            <NeonParticles count={30} />

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-4xl md:text-6xl font-extrabold text-primary glow"
                >
                    Contact Me
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center text-base md:text-lg text-base-content/70 mt-4 max-w-2xl mx-auto"
                >
                    Want to reach me directly? Send me a message 👇
                </motion.p>

                {/* Main Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-primary glow">Let's Connect</h2>

                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-primary text-3xl glow" />
                            <p className="text-base-content/80">web.ebrahimali@gmail.com</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaPhone className="text-primary text-3xl glow" />
                            <p className="text-base-content/80">+880 1771-899062</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaLocationDot className="text-primary text-3xl glow" />
                            <p className="text-base-content/80">Rajshahi, Bangladesh</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5 bg-base-200/40 p-8 rounded-xl border glow border-primary/30"
                    >
                        {/* Name */}
                        <div>
                            <label className="text-primary font-semibold">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Your Name"
                                className="input input-bordered w-full bg-base-100"
                            />
                            {errors.name && (
                                <p className="text-error text-sm mt-1">Name is required</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-primary font-semibold">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="you@example.com"
                                className="input input-bordered w-full bg-base-100"
                            />
                            {errors.email && (
                                <p className="text-error text-sm mt-1">Valid email required</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-primary font-semibold">Message</label>
                            <textarea
                                {...register("message", { required: true, minLength: 10 })}
                                placeholder="Your message..."
                                className="textarea textarea-bordered w-full bg-base-100 h-32"
                            ></textarea>
                            {errors.message && (
                                <p className="text-error text-sm mt-1">Message must be at least 10 characters</p>
                            )}
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary btn-neon w-full"
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </main>
    );
}