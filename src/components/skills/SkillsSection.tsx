import React, { useState } from 'react';
import { Terminal, Cpu, Layout, Cloud, Layers, Box, Search } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'Layout':
        return <Layout className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'Box':
        return <Box className="w-4 h-4 text-neutral-900 dark:text-white" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-neutral-900 dark:text-white" />;
      default:
        return <Layers className="w-4 h-4 text-neutral-900 dark:text-white" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) {
      return null;
    }

    const filteredSkills = cat.skills.filter((skill) => {
      const matchSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.productionContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSearch;
    });

    if (filteredSkills.length === 0) return null;

    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(Boolean);

  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            badge="03. Capabilities & Runtimes"
            title="TECHNICAL MATRIX"
            subtitle="Categorized across DevOps automation, enterprise Spring Boot architectures, relational schema optimization, and 3D web systems."
            className="mb-0"
          />

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-[#09090B] border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 self-start md:self-auto shrink-0">
            <span className="text-neutral-900 dark:text-white font-bold">SYS//CAP</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span>{totalSkillsCount} Production Competencies</span>
          </div>
        </div>

        {/* Core Domains Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white/40 transition-colors">
            <div className="text-neutral-900 dark:text-white font-mono text-xs font-bold mb-1.5">01 / DEVOPS &amp; CLOUD</div>
            <h3 className="text-base font-sans font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">DevOps &amp; Cloud Infrastructure</h3>
            <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Multi-stage Alpine Docker builds, hardened Linux environments, Oracle Cloud Infrastructure (OCI certified DevOps &amp; Architect Pro), and n8n webhook pipelines.
            </p>
          </div>

          <div className="p-5 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white/40 transition-colors">
            <div className="text-neutral-900 dark:text-white font-mono text-xs font-bold mb-1.5">02 / SOFTWARE ARCHITECTURE</div>
            <h3 className="text-base font-sans font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">Backend &amp; Distributed Systems</h3>
            <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Spring Boot 3 REST microservices, stateless JWT authentication, Spring Security RBAC, JPA Hibernate query optimization, and decoupled clean architecture.
            </p>
          </div>

          <div className="p-5 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white/40 transition-colors">
            <div className="text-neutral-900 dark:text-white font-mono text-xs font-bold mb-1.5">03 / PERSISTENCE &amp; DATA</div>
            <h3 className="text-base font-sans font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">Enterprise Relational &amp; Vector Data</h3>
            <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Normalized relational schemas, PL/SQL packages, and ACID guarantees across PostgreSQL, Oracle DB, and MySQL, plus sub-100ms ChromaDB vector retrieval.
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-neutral-50 dark:bg-[#09090B] p-2 rounded-md border border-neutral-300 dark:border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveCategory('all');
              }}
              className={`px-3 py-1.5 rounded-md font-sans text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/5'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-md font-sans text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/5'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by tech (e.g. Docker, Spring)..."
              value={searchQuery}
              onChange={(e) => {
                sound.playKey();
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-neutral-100 dark:bg-[#09090B] border border-black/5 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs sm:text-sm font-sans text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              aria-label="Filter skills"
            />
          </div>
        </div>

        {/* Categories & Skills Matrix Display */}
        <div className="space-y-10">
          {filteredCategories.map((category) => {
            if (!category) return null;
            return (
              <div key={category.id} className="space-y-4">
                {/* Category Title */}
                <div className="flex items-center gap-2 pb-2 border-b border-black/10 dark:border-white/10">
                  <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-[#18181B] border border-black/10 dark:border-white/10">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                      {category.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.skills.map((skill) => {
                    const isExpert = skill.proficiency === 'Expert';

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => sound.playHover()}
                        className="p-4 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white/50 transition-colors flex flex-col justify-between group"
                      >
                        {/* Top: Skill name & proficiency pill */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                            <div className="font-sans text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                              {skill.name}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-sans text-[11px] text-neutral-500 dark:text-neutral-400">
                                {skill.experienceYears}y
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[11px] font-sans font-medium border ${
                                isExpert
                                  ? 'bg-neutral-900/10 text-neutral-900 dark:bg-white/10 dark:text-white border-neutral-300 dark:border-white/20'
                                  : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10'
                              }`}>
                                {skill.proficiency}
                              </span>
                            </div>
                          </div>

                          {/* Middle: Real-world production context */}
                          <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed mb-3">
                            {skill.productionContext}
                          </p>
                        </div>

                        {/* Bottom: Tags */}
                        <div className="flex flex-wrap gap-1 pt-2 border-t border-neutral-200 dark:border-neutral-800/80 mt-auto">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-[#111218] text-neutral-600 dark:text-neutral-400 font-sans text-[11px] font-medium border border-neutral-200 dark:border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
