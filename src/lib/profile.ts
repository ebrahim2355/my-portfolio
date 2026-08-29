import { experience, openSource, projects, skills } from "@/data";

// One place for how the site describes me, so the hero, the about page and the
// document metadata can't drift apart the way they did while the copy still
// said "MERN developer".
export const ROLE = "Full Stack Engineer";

export const CORE_STACK = ["NestJS", "Next.js", "TypeScript", "PostgreSQL"] as const;

export const TAGLINE =
    "I build CRM and commerce platforms with NestJS, Next.js and PostgreSQL — and ship merged fixes to the open-source tools other teams build on.";

// The home page's "About Me". Deliberately shorter and differently angled from
// the /about intro — the home page is the summary, /about carries the detail.
export const BIO = [
    "I'm a full stack engineer on a large-scale CRM and e-commerce platform — the catalogue, inventory, order and auth paths a business actually runs on.",
    "What I care about is the seams: the transaction boundary, the schema that has to survive the next feature, the assumption nobody wrote down until it broke something. When I'm not on that, I'm usually deep in someone else's codebase tracking a bug back to its cause.",
];

// The role that's still running, rather than experience[0]. Array order is a
// layout detail of the JSON, not a claim about what I'm doing now.
export const currentRole =
    experience.find((e) => /present/i.test(e.year)) ?? experience[0];

export const META_DESCRIPTION =
    "Ebrahim Ali is a full stack engineer building large-scale CRM and e-commerce platforms with NestJS, Next.js, TypeScript and PostgreSQL, with fixes merged into Twenty, Medusa and Saleor Dashboard.";

// Closest to what I'm hired for first. Anything with a category outside this
// list is appended rather than silently dropped from the section.
const CATEGORY_ORDER = ["Languages", "Backend", "Frontend", "Data", "Infrastructure"];

const uncategorised = [...new Set(skills.map((s) => s.category))].filter(
    (c) => !CATEGORY_ORDER.includes(c),
);

export const skillGroups = [...CATEGORY_ORDER, ...uncategorised]
    .map((category) => ({
        category,
        items: skills.filter((s) => s.category === category),
    }))
    .filter((group) => group.items.length > 0);

// The earliest engagement in experience.json (Zyplo, Feb 2024). A date rather
// than experience.length: counting entries rendered four roles as "4 years".
const CAREER_START = Date.UTC(2024, 1, 1);
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

// Floored, so the figure only ever understates. It moves once a year, which is
// the only window where a prerendered page and the client could disagree.
export const yearsBuilding = Math.max(1, Math.floor((Date.now() - CAREER_START) / YEAR_MS));

// Career-level numbers. The open-source specifics (stars, lines shipped) belong
// to contributionSummary in ./opensource and are deliberately not repeated here.
export const careerStats = [
    { label: "Years Building", value: `${yearsBuilding}+` },
    { label: "Projects Shipped", value: `${projects.length}` },
    { label: "Technologies", value: `${skills.length}` },
    { label: "Upstream PRs Merged", value: `${openSource.length}` },
];
