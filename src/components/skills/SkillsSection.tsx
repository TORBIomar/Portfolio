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

  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            badge="Engineering Arsenal"
            title="Technical Competencies & Systems Matrix"
            subtitle="Organized across core languages, enterprise backend frameworks, modern frontend, databases, and systems."
            className="mb-0"
          />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e1422] border border-white/10 text-xs font-mono text-muted-foreground self-start md:self-auto shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>{totalSkillsCount} Production Competencies</span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#0a0e18] p-2.5 rounded-2xl border border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-accent text-background font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                  : 'text-slate-400 hover:text-foreground hover:bg-white/5'
              }`}
            >
              All Disciplines
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-accent text-background font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                    : 'text-slate-400 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Spring, Docker)..."
              value={searchQuery}
              onChange={(e) => {
                sound.playKey();
                setSearchQuery(e.target.value);
              }}
              className="w-full bg-[#101524] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-foreground placeholder-muted-foreground outline-none focus:border-accent/50"
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
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <div className="p-1.5 rounded-lg bg-[#0e1422] border border-white/10 text-accent">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-foreground">
                      {category.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
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
                        className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 hover:border-accent/40 transition-all duration-200 flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]"
                      >
                        {/* Top: Skill name & proficiency pill */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="font-mono text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                              {skill.name}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[11px] text-muted-foreground">
                                {skill.experienceYears}y exp
                              </span>
                              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${
                                isExpert
                                  ? 'bg-accent/10 text-accent border-accent/30'
                                  : 'bg-cyan/10 text-cyan border-cyan/30'
                              }`}>
                                {skill.proficiency}
                              </span>
                            </div>
                          </div>

                          {/* Proficiency Meter Bar */}
                          <div className="w-full bg-[#101524] h-1 rounded-full overflow-hidden mb-3">
                            <div
                              className={`h-full rounded-full ${
                                isExpert ? 'bg-accent shadow-[0_0_8px_#00FF9D]' : 'bg-cyan shadow-[0_0_8px_#00E5FF]'
                              }`}
                              style={{ width: proficiencyPct }}
                            />
                          </div>

                          {/* Middle: Real-world production context */}
                          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                            {skill.productionContext}
                          </p>
                        </div>

                        {/* Bottom: Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 mt-auto">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-[#101626] text-slate-400 font-mono text-[10px] border border-white/5"
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
