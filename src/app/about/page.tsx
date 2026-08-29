import type { Metadata } from "next";
import About from "@/views/about/About";

export const metadata: Metadata = {
    title: "About",
    description:
        "Full stack engineer working on large-scale CRM and commerce systems — domain-driven NestJS services, PostgreSQL schemas, and Next.js interfaces built to be maintained.",
    alternates: { canonical: "/about" },
};

export default function Page() {
    return <About />;
}
