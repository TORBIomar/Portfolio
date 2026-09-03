import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../types/portfolio';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: "All Architectures", value: "all" },
    { label: "Distributed Systems", value: "systems" },
    { label: "Backend Core", value: "backend" },
    { label: "Modern Frontend & 3D", value: "frontend" },
    { label: "Full-Stack Orchestration", value: "fullstack" },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            badge="Engineering Portfolio"
            title="Featured System Implementations"
            subtitle="Deep-dive into production-ready architectures, low-latency execution engines, and WebGL rendering pipelines built from first principles."
            className="mb-0"
          />

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-card border border-border shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-accent text-background font-bold shadow-glow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(proj) => setModalProject(proj)}
            />
          ))}
        </div>

        {/* Empty State Guardrail */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-card rounded-xl border border-dashed border-border">
            <p className="font-mono text-sm text-muted-foreground">
              No projects located for category "{selectedCategory}".
            </p>
          </div>
        )}

      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};
