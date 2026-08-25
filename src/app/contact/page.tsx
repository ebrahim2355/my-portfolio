import type { Metadata } from "next";
import Contact from "@/views/contact/Contact";

export const metadata: Metadata = {
    title: "Contact",
    description: "Want to reach me directly? Send me a message.",
    alternates: { canonical: "/contact" },
};

export default function Page() {
    return <Contact />;
}
