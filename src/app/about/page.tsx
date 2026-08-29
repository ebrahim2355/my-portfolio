import About from "@/views/about/About";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "About",
    description:
        "Full stack engineer working on large-scale CRM and commerce systems — domain-driven NestJS services, PostgreSQL schemas, and Next.js interfaces built to be maintained.",
    path: "/about",
});

export default function Page() {
    return <About />;
}
