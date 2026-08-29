import Projects from "@/views/projects/Projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Projects",
    description:
        "Selected product builds with clear problem statements, engineering decisions, and delivery outcomes.",
    path: "/projects",
});

export default function Page() {
    return <Projects />;
}
