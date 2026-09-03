import type { MetadataRoute } from "next";
import { projects } from "@/data";
import { SITE_URL } from "@/lib/metadata";

/**
 * Generated rather than hand-maintained in public/sitemap.xml, which listed the
 * five top-level pages and silently omitted every project detail page — eight
 * prerendered routes, each already carrying its own canonical and card
 * metadata, so all eight were meant to be indexed on their own.
 *
 * Deriving the project entries from the data means adding a ninth project can
 * no longer ship a sitemap that ignores it.
 */

// "/home" is left out deliberately: it renders the same view as "/" and points
// its canonical there, so listing it would invite the duplicate to be indexed.
const STATIC_PATHS = ["/", "/about", "/projects", "/open-source", "/contact"];

// No `lastModified`: nothing in the data records when a page last changed, and
// stamping the build time would tell crawlers every URL changes on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        ...STATIC_PATHS,
        ...projects.map((project) => `/projects/${project.id}`),
    ];

    return paths.map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
