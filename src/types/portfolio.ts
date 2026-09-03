export type ProjectCategory = 'all' | 'backend' | 'fullstack' | 'systems' | 'frontend';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'backend' | 'fullstack' | 'systems' | 'frontend';
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

export interface ClusterNodeState {
  id: string;
  name: string;
  ip: string;
  role: 'LEADER' | 'FOLLOWER' | 'CANDIDATE' | 'OFFLINE';
  status: 'healthy' | 'syncing' | 'down';
  term: number;
  commitIndex: number;
  latencyMs: number;
  cpuLoadPercent: number;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'HEARTBEAT' | 'ELECT';
  message: string;
}
