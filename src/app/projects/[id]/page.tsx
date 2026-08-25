import type { Metadata } from "next";
import { projects } from "@/data";
import ProjectDetails from "@/views/projects/ProjectDetails";

interface PageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return projects.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => Number(id) === p.id);

    if (!project) {
        return { title: "Project Not Found" };
    }

    return {
        title: project.title,
        description: project.description,
        alternates: { canonical: `/projects/${project.id}` },
        openGraph: {
            type: "article",
            title: project.title,
            description: project.description,
            url: `/projects/${project.id}`,
            images: [project.image],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: [project.image],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    // Deliberately no notFound() here: an unknown id renders the inline
    // "Project Not Found" panel, matching how the Vite SPA behaved.
    return <ProjectDetails id={id} />;
}
