import type { Metadata } from "next";
import About from "@/views/about/About";

export const metadata: Metadata = {
    title: "About",
    description:
        "MERN stack developer focused on scalable frontend systems, practical backend architecture, and measurable product impact.",
    alternates: { canonical: "/about" },
};

export default function Page() {
    return <About />;
}
