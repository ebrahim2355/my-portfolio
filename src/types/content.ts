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
