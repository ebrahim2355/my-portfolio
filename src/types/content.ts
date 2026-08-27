export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    live: string;
    github: string;
    featured: boolean;
    role: string;
    duration: string;
    problem: string;
    features?: string[];
    decisions: string[];
    highlights: string[];
    outcomes: string[];
    screenshots: string[];
}

export interface Skill {
    name: string;
    level: number;
    category: string;
    icon: string;
}

export interface Experience {
    year: string;
    role: string;
    company: string;
    location: string;
    type: string;
    description: string;
    highlights: string[];
    skillsUsed: string[];
}

export interface OpenSourceContribution {
    // Serial position in the section: contributions are ordered deliberately
    // (widest-reach project first), not by merge date.
    id: number;
    project: string;
    repo: string;
    repoUrl: string;
    // Snapshot of the repo's star count. Rendered with a trailing "+" so it
    // stays truthful as the number grows.
    stars: number;
    projectTagline: string;
    // Surfaced in the home page preview. The dedicated page lists every entry.
    featured: boolean;
    title: string;
    prNumber: number;
    url: string;
    mergedAt: string;
    problem: string;
    solution: string;
    additions: number;
    deletions: number;
    changedFiles: number;
    tech: string[];
}
