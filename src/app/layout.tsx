import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonParticles from "@/components/NeonParticles";
import FireCursor from "@/components/FireCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ToasterProvider from "@/components/ToasterProvider";

const SITE_URL = "https://web-ebrahim-portfolio.vercel.app";
const SITE_TITLE = "Ebrahim Ali | MERN Stack Developer Portfolio";
const SOCIAL_DESCRIPTION =
    "Explore projects, skills, and experience from Ebrahim Ali's portfolio.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: "%s | Ebrahim Ali",
    },
    description:
        "Portfolio of Ebrahim Ali, a MERN stack developer building modern web applications with React, Tailwind, Node.js, and MongoDB.",
    robots: { index: true, follow: true },
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    openGraph: {
        type: "website",
        title: SITE_TITLE,
        description: SOCIAL_DESCRIPTION,
        url: "/",
        images: ["/icon.svg"],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SOCIAL_DESCRIPTION,
        images: ["/icon.svg"],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <div id="app-root">
                    <div className="relative">
                        <ScrollToTop />

                        <div className="fixed inset-0 -z-10 pointer-events-none">
                            <NeonParticles count={45} />
                        </div>

                        <header className="fixed top-0 left-0 right-0 z-100">
                            <Navbar></Navbar>
                        </header>

                        <div className="min-h-screen relative z-10">{children}</div>
                        <Footer></Footer>
                        <FireCursor />
                    </div>

                    <ToasterProvider />
                </div>
            </body>
        </html>
    );
}
