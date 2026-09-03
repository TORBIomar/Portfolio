import React, { useState } from 'react';
import { Terminal, Cpu, Layout, Cloud, Layers, Box, Search } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-accent" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-accent" />;
      case 'Layout':
        return <Layout className="w-4 h-4 text-accent" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-accent" />;
      case 'Box':
        return <Box className="w-4 h-4 text-accent" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-accent" />;
      default:
        return <Layers className="w-4 h-4 text-accent" />;
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

  return (
    <section id="skills" className="py-14 sm:py-16 border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <SectionHeading
            badge="Engineering Arsenal"
            title="Technical Competencies & Systems Matrix"
            subtitle="Organized across core languages, enterprise backend frameworks, modern frontend, databases, and systems."
            className="mb-0"
          />

          {/* Search input for instant skill filtering */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by tech or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Filter skills"
            />
          </div>
        </div>

        {/* Domain Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-accent text-background font-bold shadow-glow-sm'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-accent text-background font-bold shadow-glow-sm'
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Categories & Skills Matrix Display */}
        <div className="space-y-6">
          {filteredCategories.map((category) => {
            if (!category) return null;
            return (
              <div key={category.id} className="space-y-3">
                {/* Category Header */}
                <div className="flex items-center gap-2 pb-1.5 border-b border-border/60">
                  <div className="p-1 rounded-md bg-muted text-accent">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-card border border-border hover:border-slate-500/80 transition-all duration-200 flex flex-col justify-between group hover:shadow-card-elevated"
                    >
                      {/* Top: Skill name & proficiency pill */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="font-mono text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                          {skill.name}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {skill.experienceYears}y exp
                          </span>
                          <span className="px-2 py-0.5 rounded bg-muted text-emerald-400 font-mono text-[10px] font-bold border border-slate-700">
                            {skill.proficiency}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Real-world production context */}
                      <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                        {skill.productionContext}
                      </p>

                      {/* Bottom: Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-[#121927] text-muted-foreground font-mono text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
