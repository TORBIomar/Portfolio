import React, { useState } from 'react';
import { Search, Code2 } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'ai', label: 'AI & Vector RAG' },
    { id: 'backend', label: 'Enterprise Backend' },
    { id: 'data', label: 'Data Systems & Algorithms' },
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'ai' && project.category.includes('ai')) ||
      (selectedCategory === 'backend' && (project.category.includes('backend') || project.techStack.includes('Spring Boot'))) ||
      (selectedCategory === 'data' && (project.category.includes('data') || project.techStack.includes('MySQL') || project.techStack.includes('Algorithms')));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            badge="Engineering Portfolio"
            title="Featured Production Systems & Architecture"
            subtitle="Deep-dive into production-grade applications across WebGL CAD kernels, enterprise Spring Boot services, and AI RAG systems."
            className="mb-0"
          />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e1422] border border-white/10 text-xs font-mono text-muted-foreground self-start md:self-auto shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>{filteredProjects.length} Systems Active</span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#0a0e18] p-2.5 rounded-2xl border border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-background font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                      : 'text-slate-400 hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                sound.playKey();
                setSearchQuery(e.target.value);
              }}
              placeholder="Filter by tech (e.g. Three.js)..."
              className="w-full bg-[#101524] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-foreground placeholder-muted-foreground outline-none focus:border-accent/50"
              aria-label="Filter projects by technology"
            />
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center space-y-3 bg-[#0a0e18] rounded-2xl border border-white/10">
            <Code2 className="w-8 h-8 mx-auto text-muted-foreground opacity-40" />
            <div className="text-sm font-mono text-muted-foreground">
              No systems match query "{searchQuery}"
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-accent hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Architecture Modal */}
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        )}

      </div>
    </section>
  );
};
