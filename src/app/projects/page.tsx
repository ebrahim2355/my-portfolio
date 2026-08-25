import type { Metadata } from "next";
import Projects from "@/views/projects/Projects";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Selected product builds with clear problem statements, engineering decisions, and delivery outcomes.",
    alternates: { canonical: "/projects" },
};

export default function Page() {
    return <Projects />;
}
