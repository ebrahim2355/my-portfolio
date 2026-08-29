import Contact from "@/views/contact/Contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Contact",
    description: "Want to reach me directly? Send me a message.",
    path: "/contact",
});

export default function Page() {
    return <Contact />;
}
