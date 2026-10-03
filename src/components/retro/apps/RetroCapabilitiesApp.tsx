import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../../data/portfolioData';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

export const RetroCapabilitiesApp: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(SKILL_CATEGORIES[0].id);
  const [searchFilter, setSearchFilter] = useState('');

  const activeCategory =
    SKILL_CATEGORIES.find((c) => c.id === selectedCategoryId) || SKILL_CATEGORIES[0];

  const renderMeter = (proficiency: string) => {
    const isExpert = proficiency === 'Expert';
    return (
      <div className="flex items-center gap-1.5 font-mono text-xs">
        <div className="flex gap-[3px] bg-neutral-900 p-1 border-2 border-black">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((block) => (
            <div
              key={block}
              className={`w-2 h-3.5 ${
                isExpert
                  ? block <= 10
                    ? 'bg-emerald-400'
                    : 'bg-neutral-700'
                  : block <= 8
                  ? 'bg-amber-400'
                  : 'bg-neutral-700'
              }`}
            />
          ))}
        </div>
        <span className={`font-bold px-1.5 ${isExpert ? 'text-emerald-700' : 'text-amber-700'}`}>
          {isExpert ? '100% EXPERT' : '85% ADV'}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F3F4F6] text-black font-screen text-xs overflow-hidden">
      {/* Top Banner with Retro Colors & Generous Room */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-b-2 border-black flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <RetroIcon name="cpu" size={28} />
          <div>
            <span className="font-bold text-sm text-black">System Profiler: Stacks &amp; Capabilities</span>
            <span className="text-xs text-emerald-800 font-mono block mt-0.5">
              Architectural Engine &bull; Omar Torbi
            </span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Filter skills (Docker, Spring, OCI)..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="px-3.5 py-2 my-1 text-xs font-mono border-2 border-black bg-white focus:outline-none w-64 shadow-inner"
        />
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Subsystem Navigation */}
        <div className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white overflow-y-auto p-3 space-y-1.5">
          <span className="font-bold text-[10px] uppercase tracking-wider text-neutral-500 px-1 block mb-1">
            Subsystems
          </span>
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  retroSound.playClick();
                  setSelectedCategoryId(cat.id);
                }}
                className={`w-full text-left px-3.5 py-2.5 my-1 text-xs font-bold border-2 transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-black border-black shadow-[3px_3px_0px_#000] scale-101'
                    : 'bg-white text-neutral-800 border-neutral-300 hover:border-black hover:bg-neutral-50'
                }`}
              >
                <span className="truncate">{cat.title}</span>
                <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.2 ml-1 rounded-xs font-bold">
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Skills Panel with Roomy Cards & Large Text */}
        <div className="flex-1 bg-[#FAFAFA] overflow-y-auto p-4 space-y-4">
          {searchFilter.trim() !== '' ? (
            <div className="space-y-4">
              <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5">
                Search Results matching "{searchFilter}"
              </div>
              <div className="space-y-3">
                {SKILL_CATEGORIES.flatMap((c) =>
                  c.skills.filter(
                    (s) =>
                      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      s.productionContext.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      s.tags?.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
                  )
                ).map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 border-2 border-black bg-white shadow-[3px_3px_0px_#000] space-y-2"
                  >
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <span className="font-bold text-base text-black">{skill.name}</span>
                      {renderMeter(skill.proficiency)}
                    </div>
                    <p className="text-xs text-neutral-800 leading-relaxed bg-neutral-50 p-2.5 border border-neutral-200">
                      {skill.productionContext}
                    </p>
                    {skill.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {skill.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-300 font-mono font-bold"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Category Header */}
              <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-black shadow-xs">
                <h2 className="font-bold text-base tracking-wide text-black">
                  {activeCategory.title}
                </h2>
                <p className="text-xs text-emerald-950 font-medium mt-1 leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {activeCategory.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_#000000] space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm text-black">{skill.name}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-black text-white">
                          {skill.proficiency}
                        </span>
                      </div>
                      {renderMeter(skill.proficiency)}
                    </div>

                    <div className="text-xs text-neutral-800 bg-[#F8FAFC] p-3 border border-neutral-300 leading-relaxed">
                      <span className="font-bold text-neutral-500 uppercase text-[10px] block mb-1">
                        Production Context &amp; Verified Delivery:
                      </span>
                      {skill.productionContext}
                    </div>

                    {skill.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-emerald-50 border border-emerald-400 text-[10px] font-mono font-bold text-emerald-900"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-1.5 bg-white border-t-2 border-black flex justify-between items-center text-xs text-neutral-600 font-mono select-none">
        <span>Hardware Bus: 64-bit • Memory Verified</span>
        <span>Diagnostic: All Stacks Operational (Zero Fatal Errors)</span>
      </div>
    </div>
  );
};
