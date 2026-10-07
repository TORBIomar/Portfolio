"use client";

import React, { useState } from "react";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import {
  ExternalLink,
  ArrowRight,
  Box,
  Layers,
  Sparkles,
  ShieldCheck,
  Workflow,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "../common/SocialIcons";
import { motion } from "framer-motion";

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderThumbnailMockup = (project: Project) => {
    switch (project.mockupType) {
      case "cad":
        return (
          <div className="w-full h-44 bg-[#0c0d11] rounded-2xl border border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Box className="w-3.5 h-3.5" /> Wasm CSG Engine
              </span>
              <span className="text-emerald-400 font-bold">60.2 FPS</span>
            </div>

            {/* 3D Wireframe Graphic */}
            <div className="flex items-center justify-center py-2 relative">
              <div className="w-40 h-14 border border-cyan-500/70 rounded-full bg-cyan-950/25 flex items-center justify-center relative shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <div className="w-5 h-5 rounded-full border border-cyan-400 border-dashed animate-spin" />
                <span className="absolute -top-2.5 left-10 text-[9px] font-mono text-cyan-300 bg-[#0c0d11] px-1.5 border border-cyan-800/80 rounded">
                  Ø80mm Extrusion
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex justify-between pt-2 border-t border-zinc-800/80">
              <span>Toolpath: ISO-6983</span>
              <span className="text-cyan-300">STEP 3D CNC</span>
            </div>
          </div>
        );

      case "recruitment":
        return (
          <div className="w-full h-44 bg-[#0c0d11] rounded-2xl border border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Spring Boot 3
              </span>
              <span className="text-zinc-400 font-mono">RBAC + JWT</span>
            </div>

            {/* Pipeline Stage Blocks */}
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-center">
                <div className="text-zinc-500">APPLICANTS</div>
                <div className="text-white font-bold text-sm mt-0.5">142</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-center">
                <div className="text-zinc-500">PIPELINE</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">28</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-center">
                <div className="text-zinc-500">OFFERS</div>
                <div className="text-cyan-400 font-bold text-sm mt-0.5">6</div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex justify-between pt-2 border-t border-zinc-800/80">
              <span>Zero N+1 Overhead</span>
              <span className="text-emerald-400">MySQL 8.0</span>
            </div>
          </div>
        );

      case "library":
        return (
          <div className="w-full h-44 bg-[#0c0d11] rounded-2xl border border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-violet-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Gemini &amp; Chroma
              </span>
              <span className="text-violet-300 font-mono">Dense RAG</span>
            </div>

            {/* Vector Similarity Nodes */}
            <div className="flex items-center justify-center gap-3 py-3">
              <div className="w-8 h-8 rounded-full border border-violet-500 bg-violet-950/50 flex items-center justify-center text-[10px] font-mono text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                v1
              </div>
              <div className="h-px w-12 bg-dashed bg-violet-400/80" />
              <div className="w-8 h-8 rounded-full border border-emerald-500 bg-emerald-950/50 flex items-center justify-center text-[10px] font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                v2
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex justify-between pt-2 border-t border-zinc-800/80">
              <span>HNSW Cosine Dist</span>
              <span className="text-violet-400">&lt;100ms Query</span>
            </div>
          </div>
        );

      case "matrix":
      default:
        return (
          <div className="w-full h-44 bg-[#0c0d11] rounded-2xl border border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Workflow className="w-3.5 h-3.5" /> n8n Automation
              </span>
              <span className="text-zinc-400 font-mono">Playwright</span>
            </div>

            {/* Route abortion badge */}
            <div className="flex flex-col items-center justify-center py-2 text-center">
              <span className="text-amber-400 font-mono text-sm font-black">4x THROUGHPUT</span>
              <span className="text-[10px] text-zinc-400 font-mono mt-0.5">Media Route Abort Stream</span>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex justify-between pt-2 border-t border-zinc-800/80">
              <span>Zoho API Webhook</span>
              <span className="text-emerald-400">Zero Loss</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-zinc-200/90 bg-[#fcfcfc] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/80 border border-zinc-300 text-zinc-800 text-xs font-mono font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-black" />
            <span>03 // FLAGSHIP SYSTEMS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-neutral-950 uppercase mb-3">
            Featured Engineered Systems
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
            The 4 primary platforms representing my engineering standards across full-stack backend architecture, containerized automation, and 3D graphics.
          </p>
        </motion.div>

        {/* 2x2 Grid of the 4 Flagship Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredId(project.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                sound.playClick();
                onSelectProject(project);
              }}
              className="rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-neutral-950 hover:shadow-lg group cursor-pointer shadow-xs"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="mb-5">
                  {renderThumbnailMockup(project)}
                </div>

                {/* Header Metadata */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                    {project.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] font-mono font-semibold">
                    FEATURED
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-xl text-neutral-950 mb-1.5 group-hover:text-black transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-xs text-neutral-500 mb-3">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed mb-6">
                  {project.summary}
                </p>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-zinc-100">
                  {project.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 text-neutral-800 text-[11px] font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Row */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-950 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-3 text-neutral-400">
                    <GithubIcon className="w-4 h-4 hover:text-black transition-colors" />
                    {project.liveUrl && (
                      <ExternalLink className="w-4 h-4 hover:text-black transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
