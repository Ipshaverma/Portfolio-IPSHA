import data from "./data.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string | null;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  tech: string[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  url?: string;
};

export type Award = {
  id: string;
  title: string;
  organization?: string;
};

export type TechStackItem = {
  name: string;
  icon: string;
};

export async function getProjects(): Promise<Project[]> {
  return data.projects;
}

export async function getExperience(): Promise<Experience[]> {
  return data.experience;
}

export async function getCertifications(): Promise<Certification[]> {
  return data.certifications;
}

export async function getAwards(): Promise<Award[]> {
  return data.awards;
}

export function getPersonalData() {
  return data.personal;
}

export function getTechStack(): TechStackItem[] {
  return data.techStack;
}

export function getEducation() {
  return data.education;
}
