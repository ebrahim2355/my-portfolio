import type { Metadata } from "next";
import OpenSource from "@/views/opensource/OpenSource";

export const metadata: Metadata = {
    title: "Open Source",
    description:
        "Merged pull requests to major open-source projects including Twenty, Medusa, and Saleor Dashboard.",
    alternates: { canonical: "/open-source" },
};

export default function Page() {
    return <OpenSource />;
}
