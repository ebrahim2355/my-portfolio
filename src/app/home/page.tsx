import type { Metadata } from "next";
import Home from "@/views/home/Home";

// The Vite router served the home page at both "/" and "/home", so the route is
// kept. Its canonical points at "/" so the duplicate is not indexed separately.
export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

export default function Page() {
    return <Home />;
}
