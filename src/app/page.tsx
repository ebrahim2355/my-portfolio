import type { Metadata } from "next";
import Home from "@/views/home/Home";

export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

export default function Page() {
    return <Home />;
}
