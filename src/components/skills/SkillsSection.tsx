import React, { useState } from 'react';
import { Terminal, Cpu, Layout, Cloud, Layers, Box, Search, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-[#FF6B00]" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#FF6B00]" />;
      case 'Layout':
        return <Layout className="w-4 h-4 text-[#FF6B00]" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-[#FF6B00]" />;
      case 'Box':
        return <Box className="w-4 h-4 text-[#FF6B00]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#FF6B00]" />;
      default:
        return <Layers className="w-4 h-4 text-[#FF6B00]" />;
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
            badge="03. Core Competencies"
            title="CAPABILITIES MATRIX"
            subtitle="Organized across DevOps & Cloud infrastructure, enterprise backend engineering, software architecture, and databases."
            className="mb-0"
          />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0B0C10] border border-neutral-200/80 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 self-start md:self-auto shrink-0 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>{totalSkillsCount} Production Competencies</span>
          </div>
        </div>

        {/* Core Domains Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm hover:border-[#FF6B00]/40 transition-colors">
            <div className="text-[#FF6B00] font-mono text-xs font-bold mb-2">01 / DEVOPS &amp; CLOUD</div>
            <h3 className="text-lg font-mono font-bold text-neutral-900 dark:text-white mb-2">DevOps &amp; Cloud Infrastructure</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Multi-stage Alpine Docker builds, hardened Linux operations, Oracle Cloud (OCI certified DevOps &amp; Architect Pro), and event-driven n8n webhook automations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm hover:border-[#FF6B00]/40 transition-colors">
            <div className="text-[#FF6B00] font-mono text-xs font-bold mb-2">02 / SOFTWARE ARCHITECTURE</div>
            <h3 className="text-lg font-mono font-bold text-neutral-900 dark:text-white mb-2">Backend &amp; Distributed Systems</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Spring Boot 3 REST microservices, stateless JWT authentication, Spring Security RBAC, JPA Hibernate query optimization, and decoupled clean architecture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm hover:border-[#FF6B00]/40 transition-colors">
            <div className="text-[#FF6B00] font-mono text-xs font-bold mb-2">03 / PERSISTENCE &amp; DATA</div>
            <h3 className="text-lg font-mono font-bold text-neutral-900 dark:text-white mb-2">Enterprise Relational &amp; Vector Data</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              Normalized relational schemas, PL/SQL packages, and ACID guarantees across PostgreSQL, Oracle DB, and MySQL, plus sub-100ms ChromaDB vector retrieval.
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-[#0B0C10] p-2.5 rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-bold shadow-[0_0_16px_rgba(255,107,0,0.35)]'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
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
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-bold shadow-[0_0_16px_rgba(255,107,0,0.35)]'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
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
              placeholder="Search skill (e.g. Docker, Spring)..."
              value={searchQuery}
              onChange={(e) => {
                sound.playKey();
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-neutral-100 dark:bg-[#07080B] border border-black/5 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-[#FF6B00]/60 transition-colors"
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
                  <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-[#0F1016] border border-black/10 dark:border-white/10">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-neutral-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill) => {
                    const isExpert = skill.proficiency === 'Expert';
                    const proficiencyPct = isExpert ? '95%' : '80%';

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => sound.playHover()}
                        className="p-4 rounded-xl bg-white dark:bg-[#0B0C10] border border-neutral-200/80 dark:border-white/10 hover:border-[#FF6B00]/40 transition-all duration-200 flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(255,107,0,0.1)] shadow-xs"
                      >
                        {/* Top: Skill name & proficiency pill */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="font-mono text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#FF6B00] transition-colors">
                              {skill.name}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                                {skill.experienceYears}y exp
                              </span>
                              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${
                                isExpert
                                  ? 'bg-[#FF6B00]/15 text-[#FF6B00] border-[#FF6B00]/40'
                                  : 'bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-black/10 dark:border-white/10'
                              }`}>
                                {skill.proficiency}
                              </span>
                            </div>
                          </div>

                          {/* Proficiency Meter Bar */}
                          <div className="w-full bg-neutral-100 dark:bg-[#07080B] h-1 rounded-full overflow-hidden mb-3">
                            <div
                              className={`h-full rounded-full ${
                                isExpert ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA05C] shadow-[0_0_8px_rgba(255,107,0,0.6)]' : 'bg-neutral-400 dark:bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.4)]'
                              }`}
                              style={{ width: proficiencyPct }}
                            />
                          </div>

                          {/* Middle: Real-world production context */}
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-3">
                            {skill.productionContext}
                          </p>
                        </div>

                        {/* Bottom: Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5 mt-auto">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#0F1016] text-neutral-600 dark:text-neutral-400 font-mono text-[10px] border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/30 hover:text-[#FF6B00] dark:hover:text-white transition-colors"
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
