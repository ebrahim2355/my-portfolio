import OpenSource from "@/views/opensource/OpenSource";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Open Source",
    socialTitle: "Open Source — merged into Twenty, Medusa & Saleor Dashboard",
    description:
        "Five pull requests merged into Twenty, Medusa and Saleor Dashboard — the bug, the cause, and why each fix was scoped that way.",
    path: "/open-source",
});

export default function Page() {
    return <OpenSource />;
}
