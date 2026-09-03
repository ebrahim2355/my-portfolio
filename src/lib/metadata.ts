import type { Metadata } from "next";

// Shared with the sitemap, which has to spell out absolute URLs: `metadataBase`
// only resolves the relative paths in page metadata, never a sitemap entry.
export const SITE_URL = "https://ebrahim.dev";

// Raster, not the SVG favicon: no social crawler renders SVG. Served at the
// source export's full resolution rather than downscaled to 1200x630 — a card
// is displayed around 520px wide on a 2x screen, so the extra pixels are what
// keep the smaller lines from going soft.
export const SOCIAL_IMAGE = {
    url: "/og.jpg",
    width: 1731,
    height: 909,
    alt: "MD. Ebrahim Ali — Full Stack Engineer — NestJS, Next.js, TypeScript, PostgreSQL — ebrahim.dev",
};

const SITE_NAME = "Ebrahim Ali";

interface PageMetaInput {
    title: string;
    description: string;
    /** Route path, e.g. "/open-source". Becomes both canonical and og:url. */
    path: string;
    /**
     * Card headline. Next's title.template only reaches <title>, so without
     * this og:title would be the bare page name — "Open Source" on its own,
     * with no indication whose it is. Defaults to "<title> | Ebrahim Ali".
     */
    socialTitle?: string;
}

/**
 * Per-page social metadata.
 *
 * Next.js does not merge `openGraph` field by field — a page that declares one
 * replaces the parent's entirely, and a page that declares none inherits the
 * parent's whole block including its `url`. Leaving it out meant every page
 * announced the home page as its canonical URL, so sharing /open-source told
 * LinkedIn it was looking at the home page.
 */
export function pageMetadata({
    title,
    description,
    path,
    socialTitle,
}: PageMetaInput): Metadata {
    const cardTitle = socialTitle ?? `${title} | ${SITE_NAME}`;

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: "website",
            title: cardTitle,
            description,
            url: path,
            images: [SOCIAL_IMAGE],
        },
        twitter: {
            card: "summary_large_image",
            title: cardTitle,
            description,
            images: [SOCIAL_IMAGE],
        },
    };
}
