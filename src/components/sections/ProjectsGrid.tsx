"use client";

import React, { useState } from "react";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import {
  ExternalLink,
  ArrowRight,
  Search,
  Box,
  Layers,
  Sparkles,
  ShieldCheck,
  Workflow,
  Music,
  Warehouse,
  Car,
  Grid,
} from "lucide-react";
import { GithubIcon } from "../common/SocialIcons";

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Systems (8)" },
    { id: "software", label: "Enterprise Backend" },
    { id: "ai-3d", label: "3D CAD & AI RAG" },
    { id: "devops", label: "DevOps & Automation" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Render stylized dark miniature mockups for each card
  const renderThumbnailMockup = (project: Project) => {
    switch (project.mockupType) {
      case "cad":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Box className="w-3 h-3" /> Wasm CSG
              </span>
              <span className="text-zinc-500">60 FPS</span>
            </div>
            {/* 3D Wireframe Graphic */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-28 h-10 border border-cyan-500/60 rounded-full bg-cyan-950/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-cyan-400 border-dashed" />
                <span className="absolute -top-2 left-6 text-[8px] font-mono text-cyan-300 bg-[#0d0e12] px-1">
                  Ø80mm
                </span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>G-code: ISO-6983</span>
              <span className="text-zinc-400">STEP 3D CNC</span>
            </div>
          </div>
        );

      case "recruitment":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> Spring Boot 3
              </span>
              <span className="text-zinc-500">RBAC / JWT</span>
            </div>
            {/* Pipeline Stage Blocks */}
            <div className="grid grid-cols-3 gap-1.5 py-2">
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-center">
                <div className="text-zinc-500">APPLIED</div>
                <div className="text-white font-bold">142</div>
              </div>
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-center">
                <div className="text-zinc-500">INTERVIEW</div>
                <div className="text-emerald-400 font-bold">28</div>
              </div>
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-center">
                <div className="text-zinc-500">OFFER</div>
                <div className="text-cyan-400 font-bold">6</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Zero N+1 Queries</span>
              <span className="text-emerald-400">200 OK</span>
            </div>
          </div>
        );

      case "library":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-violet-400">
                <Sparkles className="w-3 h-3" /> Gemini &amp; Chroma
              </span>
              <span className="text-zinc-500">Dense RAG</span>
            </div>
            {/* Vector Similarity Nodes */}
            <div className="flex items-center justify-center gap-2 py-3">
              <div className="w-6 h-6 rounded-full border border-violet-500 bg-violet-950/40 flex items-center justify-center text-[9px] font-mono text-violet-300">
                v1
              </div>
              <div className="h-px w-8 bg-dashed bg-violet-400" />
              <div className="w-6 h-6 rounded-full border border-emerald-500 bg-emerald-950/40 flex items-center justify-center text-[9px] font-mono text-emerald-300">
                v2
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Cosine Dist &lt; 0.12</span>
              <span className="text-violet-400">Sub-100ms</span>
            </div>
          </div>
        );

      case "matrix":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Workflow className="w-3 h-3" /> n8n Automation
              </span>
              <span className="text-zinc-500">Playwright</span>
            </div>
            {/* Route abortion badge */}
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-amber-400 font-mono text-xs font-bold">4x THROUGHPUT</span>
              <span className="text-[9px] text-zinc-500 font-mono">Media Route Abort Stream</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Zoho API Webhook</span>
              <span className="text-emerald-400">Zero Loss</span>
            </div>
          </div>
        );

      case "spotify":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Music className="w-3 h-3" /> Spotify PKCE
              </span>
              <span className="text-zinc-500">OAuth 2.0</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-white font-mono text-xs font-bold">FISHER-YATES</span>
              <span className="text-[9px] text-zinc-400 font-mono">10,000+ Tracks Batch</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Unbiased Shuffle</span>
              <span className="text-emerald-400">Rate Guard</span>
            </div>
          </div>
        );

      case "inventory":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Warehouse className="w-3 h-3" /> ONSSA Logistics
              </span>
              <span className="text-zinc-500">ACID SQL</span>
            </div>
            <div className="space-y-1 py-1">
              <div className="flex justify-between text-[9px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded">
                <span>STOCK_DISPATCH</span>
                <span className="text-emerald-400">COMMITTED</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded">
                <span>AUDIT_LOG_ENTRY</span>
                <span className="text-cyan-400">VERIFIED</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Normalized MVC</span>
              <span className="text-sky-400">Zero Discrepancy</span>
            </div>
          </div>
        );

      case "desktop":
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-orange-400">
                <Car className="w-3 h-3" /> Java Desktop
              </span>
              <span className="text-zinc-500">Swing MVC</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-white font-mono text-xs font-bold">MULTITHREADED</span>
              <span className="text-[9px] text-zinc-400 font-mono">Sync Mutex Locks</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>JDBC Persistence</span>
              <span className="text-orange-400">Race-Free</span>
            </div>
          </div>
        );

      case "checkers":
      default:
        return (
          <div className="w-full h-36 bg-[#0d0e12] rounded-lg border border-zinc-800 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-rose-400">
                <Grid className="w-3 h-3" /> JavaFX AI
              </span>
              <span className="text-zinc-500">Minimax</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-white font-mono text-xs font-bold">ALPHA-BETA PRUNING</span>
              <span className="text-[9px] text-zinc-400 font-mono">Sub-200ms Search Depth</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>Heuristic Tree</span>
              <span className="text-rose-400">Java 17 OOP</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-zinc-200/80 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-black uppercase mb-3">
            Engineered systems &amp; case studies
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
            Turn software intent into deterministic, production-grade applications. Explore 8 deep-dive systems across backend, cloud, and 3D web platforms.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-black text-white font-semibold"
                    : "bg-white text-zinc-600 hover:text-black border border-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                sound.playKey();
                setSearchQuery(e.target.value);
              }}
              placeholder="Search tech (e.g. Spring, Docker)..."
              className="w-full bg-white border border-zinc-200 rounded-full pl-9 pr-3 py-1.5 text-xs font-sans text-black placeholder-zinc-400 outline-none focus:border-zinc-400 transition-colors"
            />
          </div>
        </div>

        {/* 2x4 Grid (8 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => sound.playHover()}
              className="rounded-2xl bg-white border border-zinc-200/90 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-zinc-400 hover:shadow-sm group cursor-pointer"
              onClick={() => {
                sound.playClick();
                onSelectProject(project);
              }}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="mb-4">
                  {renderThumbnailMockup(project)}
                </div>

                {/* Sub-badge / Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500">
                    {project.categoryLabel}
                  </span>
                  {project.featured && (
                    <span className="px-1.5 py-0.2 rounded bg-black text-white text-[9px] font-mono">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-serif font-bold text-base text-black mb-1.5 group-hover:text-zinc-700 transition-colors">
                  {project.title}
                </h3>

                {/* Brief Description */}
                <p className="font-sans text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                  {project.summary}
                </p>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-zinc-100">
                  {project.techStack.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-400 text-[10px] font-mono">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Action CTA */}
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-black pt-1">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect System</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <GithubIcon className="w-3.5 h-3.5 hover:text-black transition-colors" />
                    {project.liveUrl && (
                      <ExternalLink className="w-3.5 h-3.5 hover:text-black transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
