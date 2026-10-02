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
    { id: 'software', label: 'Software Engineering' },
    { id: 'devops', label: 'DevOps & Automation' },
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'software' && (project.category.includes('software') || project.techStack.includes('Spring Boot 3') || project.techStack.includes('Spring Boot') || project.techStack.includes('React'))) ||
      (selectedCategory === 'devops' && (project.category.includes('devops') || project.techStack.includes('Docker') || project.techStack.includes('n8n') || project.techStack.includes('Python')));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            badge="02. Systems & Engineering"
            title="ENGINEERED SYSTEMS"
            subtitle="Deep-dive into production-grade systems across enterprise Spring Boot architectures, automated cloud pipelines, and 3D web platforms."
            className="mb-0"
          />

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 self-start md:self-auto shrink-0">
            <span className="text-neutral-900 dark:text-white font-bold">SYS//RUN</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span>{filteredProjects.length} Systems Active</span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-neutral-50 dark:bg-[#09090B] p-2 rounded-md border border-neutral-300 dark:border-white/10">
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
                  className={`px-3 py-1.5 rounded-md font-sans text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                sound.playKey();
                setSearchQuery(e.target.value);
              }}
              placeholder="Filter by tech (e.g. Docker, Spring)..."
              className="w-full bg-neutral-100 dark:bg-black border border-black/5 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs sm:text-sm font-sans text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
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
          <div className="py-20 text-center space-y-3 bg-white dark:bg-[#09090B] rounded-2xl border border-black/10 dark:border-white/10">
            <Code2 className="w-8 h-8 mx-auto text-neutral-400 dark:text-neutral-500 opacity-60" />
            <div className="text-sm font-sans text-neutral-500 dark:text-neutral-400">
              No systems match query "{searchQuery}"
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-sans font-semibold text-neutral-900 dark:text-white hover:underline cursor-pointer"
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
