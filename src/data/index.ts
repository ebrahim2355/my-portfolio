import type { Experience, OpenSourceContribution, Project, Skill } from "@/types/content";
import experienceJson from "./experience.json";
import openSourceJson from "./opensource.json";
import projectsJson from "./projects.json";
import skillsJson from "./skills.json";

export const projects = projectsJson as Project[];
export const skills = skillsJson as Skill[];
export const experience = experienceJson as Experience[];
export const openSource = openSourceJson as OpenSourceContribution[];
