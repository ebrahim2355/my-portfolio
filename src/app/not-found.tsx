import type { Metadata } from "next";
import ErrorPage from "@/views/error/ErrorPage";

export const metadata: Metadata = {
    title: "Page Not Found",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return <ErrorPage />;
}
