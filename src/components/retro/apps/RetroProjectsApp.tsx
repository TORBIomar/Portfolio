import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../../data/portfolioData';
import { Project } from '../../../types/portfolio';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

export const RetroProjectsApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'featured' | 'software-engineering' | 'devops-automation'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesFilter =
      categoryFilter === 'all'
        ? true
        : categoryFilter === 'featured'
        ? proj.featured
        : proj.category === categoryFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const selectedProject: Project | undefined =
    PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const getTechColor = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('spring') || t.includes('java')) return 'bg-emerald-100 text-emerald-900 border-emerald-400';
    if (t.includes('docker') || t.includes('linux') || t.includes('oci')) return 'bg-blue-100 text-blue-900 border-blue-400';
    if (t.includes('react') || t.includes('typescript')) return 'bg-cyan-100 text-cyan-900 border-cyan-400';
    if (t.includes('python') || t.includes('n8n')) return 'bg-amber-100 text-amber-900 border-amber-400';
    if (t.includes('three') || t.includes('wasm')) return 'bg-purple-100 text-purple-900 border-purple-400';
    if (t.includes('mysql') || t.includes('postgres') || t.includes('chroma')) return 'bg-rose-100 text-rose-900 border-rose-400';
    return 'bg-neutral-100 text-neutral-800 border-neutral-300';
  };

  return (
    <div className="flex flex-col h-full bg-[#F3F4F6] text-black font-screen text-xs overflow-hidden">
      {/* 1. Finder Top Toolbar with Generous Space and Margins */}
      <div className="p-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-black flex flex-wrap items-center justify-between gap-3 shadow-xs select-none">
        {/* Left: Filter Buttons with Roomy Padding */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-neutral-700 mr-1">
            Category:
          </span>
          {[
            { id: 'all', label: `All (${PROJECTS_DATA.length})` },
            { id: 'featured', label: '★ Featured' },
            { id: 'software-engineering', label: 'Software' },
            { id: 'devops-automation', label: 'DevOps & Scraping' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                retroSound.playClick();
                setCategoryFilter(btn.id as any);
              }}
              className={`px-4 py-2 my-1 text-xs font-bold border-2 border-black cursor-pointer transition-all shadow-xs ${
                categoryFilter === btn.id
                  ? 'bg-blue-600 text-white shadow-inner scale-102'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Right: Search & View Toggle */}
        <div className="flex items-center gap-2.5 my-auto">
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 my-1 text-xs font-mono border-2 border-black bg-white focus:outline-none w-56 shadow-inner"
          />

          <div className="flex border-2 border-black bg-white my-1">
            <button
              onClick={() => {
                retroSound.playClick();
                setViewMode('list');
              }}
              title="List View"
              className={`px-3.5 py-2 text-xs font-bold cursor-pointer ${
                viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              List
            </button>
            <button
              onClick={() => {
                retroSound.playClick();
                setViewMode('grid');
              }}
              title="Icon Grid View"
              className={`px-3.5 py-2 text-xs font-bold border-l-2 border-black cursor-pointer ${
                viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Split Content with Generous Room */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Project Explorer List */}
        <div className="w-full md:w-5/12 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white overflow-y-auto p-3 space-y-2">
          {viewMode === 'list' ? (
            filteredProjects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    retroSound.playClick();
                    setSelectedProjectId(proj.id);
                  }}
                  className={`p-3.5 border-2 cursor-pointer select-none transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 shadow-[3px_3px_0px_#2563EB]'
                      : 'bg-white border-neutral-300 hover:border-black hover:bg-neutral-50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    <RetroIcon name="folder" size={26} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs sm:text-sm truncate tracking-wide text-neutral-950">
                        {proj.title}
                      </span>
                      {proj.featured && (
                        <span className="text-[9px] px-2 py-0.5 bg-amber-400 text-black font-bold border border-black shadow-xs shrink-0">
                          ★ STAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs truncate mt-0.5 text-neutral-600 font-medium">
                      {proj.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] px-1.5 py-0.2 font-mono font-bold border ${getTechColor(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-1">
              {filteredProjects.map((proj) => {
                const isSelected = proj.id === selectedProjectId;
                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      retroSound.playClick();
                      setSelectedProjectId(proj.id);
                    }}
                    className={`p-3 flex flex-col items-center justify-center text-center cursor-pointer border-2 transition-all ${
                      isSelected
                        ? 'bg-blue-100 border-blue-600 shadow-[3px_3px_0px_#2563EB]'
                        : 'bg-white border-neutral-300 hover:border-black'
                    }`}
                  >
                    <RetroIcon name="folder" size={36} />
                    <span className="font-bold text-xs mt-3 line-clamp-2 leading-tight">
                      {proj.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Technical Inspector Pane */}
        <div className="w-full md:w-7/12 flex-1 bg-[#FAFAFA] overflow-y-auto p-4 flex flex-col justify-between">
          {selectedProject ? (
            <div className="space-y-4">
              {/* Header Box */}
              <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
                <div className="flex flex-wrap items-start justify-between gap-2 border-b-2 border-black pb-2.5 mb-2.5">
                  <div>
                    <h2 className="font-screen text-lg font-bold text-black">
                      {selectedProject.title}
                    </h2>
                    <p className="text-sm text-blue-900 font-bold mt-1">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-blue-900 text-white font-bold px-2.5 py-1 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-neutral-800 bg-neutral-50 p-3 border border-neutral-300">
                  {selectedProject.description}
                </p>
              </div>

              {/* Metrics Grid */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-black text-center shadow-xs"
                    >
                      <div className="text-[10px] uppercase font-bold text-amber-800">{m.label}</div>
                      <div className="font-bold text-sm font-mono text-black truncate mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Architectural Specifications */}
              <div className="p-4 bg-white border-2 border-black shadow-xs space-y-2">
                <div className="flex items-center gap-2 border-b-2 border-black pb-1.5 mb-2">
                  <RetroIcon name="cpu" size={18} />
                  <span className="font-bold text-xs uppercase tracking-wider text-black">
                    Architectural Specifications &amp; Design Decisions
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-800">
                  {selectedProject.architecturalHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 text-sm shrink-0">›</span>
                      <span className="leading-relaxed">{hl}</span>
                    </li>
                  ))}
                </ul>

                {selectedProject.architectureDetails?.performanceBottlenecksResolved && (
                  <div className="mt-3 pt-2.5 border-t border-neutral-200 bg-amber-50 p-2.5 border border-amber-300">
                    <span className="font-bold text-[11px] uppercase text-amber-900 block mb-0.5">
                      Performance Bottleneck Resolved:
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      {selectedProject.architectureDetails.performanceBottlenecksResolved}
                    </p>
                  </div>
                )}
              </div>

              {/* Tech Stack Chips */}
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block mb-1.5 text-neutral-700">
                  Stack Components:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-mono font-bold border-2 ${getTechColor(tech)} shadow-xs`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-500 italic text-xs">
              Select an item to view technical specifications
            </div>
          )}

          {/* Action Buttons Toolbar at Bottom with Roomy Padding */}
          {selectedProject && (
            <div className="mt-5 pt-3.5 border-t-2 border-black flex flex-wrap gap-3 justify-end items-center">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => retroSound.playClick()}
                  className="px-5 py-2.5 my-1 bg-emerald-500 text-black border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-emerald-400 active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Live 3D CAD</span>
                  <span>↗</span>
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => retroSound.playClick()}
                  className="px-5 py-2.5 my-1 bg-white text-black border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-neutral-100 active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <RetroIcon name="terminal" size={16} />
                  <span>Inspect Code on GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Status Bar */}
      <div className="px-4 py-1.5 bg-white border-t-2 border-black flex justify-between items-center text-xs text-neutral-600 font-mono select-none">
        <span>{filteredProjects.length} items listed • All Architectures Production-Grade</span>
        <span>Storage: 1.44 MB Floppy (OmarOS Volume)</span>
      </div>
    </div>
  );
};
