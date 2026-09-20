export type ProjectCategory = 'all' | 'ai-backend' | 'backend-data' | 'data-algorithms' | 'data-systems' | 'systems-frontend' | 'backend' | 'fullstack' | 'systems' | 'frontend';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  architecturalHighlights: string[];
  metrics: ProjectMetric[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  architectureDetails: {
    overview: string;
    keyDecisions: string[];
    performanceBottlenecksResolved: string;
  };
}

export interface SkillItem {
  name: string;
  proficiency: 'Production' | 'Advanced' | 'Expert';
  experienceYears: number;
  productionContext: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Leadership';
  summary: string;
  achievements: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
}

