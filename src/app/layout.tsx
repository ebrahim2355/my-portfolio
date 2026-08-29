import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonParticles from "@/components/NeonParticles";
import FireCursor from "@/components/FireCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ToasterProvider from "@/components/ToasterProvider";
import { META_DESCRIPTION } from "@/lib/profile";

const SITE_URL = "https://ebrahim.dev";
const SITE_TITLE = "Ebrahim Ali | Full Stack Engineer — NestJS, Next.js, PostgreSQL";
const SOCIAL_DESCRIPTION =
    "Full stack engineer building CRM and commerce platforms — with fixes merged into Twenty, Medusa and Saleor Dashboard.";

// Raster, not the SVG favicon: no social crawler renders SVG, so every shared
// link used to unfurl with a blank image. 1200x630 is the Open Graph standard.
const SOCIAL_IMAGE = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "MD. Ebrahim Ali — Full Stack Engineer — NestJS, Next.js, TypeScript, PostgreSQL — ebrahim.dev",
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: "%s | Ebrahim Ali",
    },
    description: META_DESCRIPTION,
    robots: { index: true, follow: true },
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    openGraph: {
        type: "website",
        title: SITE_TITLE,
        description: SOCIAL_DESCRIPTION,
        url: "/",
        images: [SOCIAL_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SOCIAL_DESCRIPTION,
        images: [SOCIAL_IMAGE],
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
