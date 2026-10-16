"use client";

import React from "react";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { useLanguage } from "@/context/LanguageContext";
import {
  ExternalLink,
  ArrowRight,
  Box,
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
  const { language, t } = useLanguage();

  const renderThumbnailMockup = (project: Project) => {
    switch (project.mockupType) {
      case "cad":
        return (
          <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#09090b] dark:to-[#121214] border border-neutral-200/90 dark:border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-accent/40 transition-all duration-300 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
                <Box className="w-3.5 h-3.5 text-accent" /> Wasm CSG Engine
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-bold font-mono text-[11px] border border-accent/20">
                60.2 FPS
              </span>
            </div>

            {/* 3D Wireframe Blueprint Graphic */}
            <div className="flex items-center justify-center py-2 relative">
              <div className="w-48 h-16 border border-neutral-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-900/80 flex items-center justify-center relative shadow-xs">
                <div className="w-6 h-6 rounded-full border-2 border-accent border-dashed animate-spin" />
                <span className="absolute -top-3 left-6 text-[9.5px] font-mono text-accent bg-white dark:bg-[#09090b] px-2 py-0.5 border border-accent/30 rounded-full shadow-2xs font-semibold">
                  Ø80mm Extrusion
                </span>
                <span className="absolute -bottom-2.5 right-6 text-[9px] font-mono text-neutral-500 dark:text-zinc-400 bg-white dark:bg-[#09090b] px-1.5 border border-neutral-200 dark:border-zinc-800 rounded">
                  X:140.2 Y:88.4
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 flex justify-between pt-2 border-t border-neutral-200/90 dark:border-zinc-800">
              <span>Toolpath: ISO-6983</span>
              <span className="text-accent font-semibold">STEP 3D CNC</span>
            </div>
          </div>
        );

      case "recruitment":
        return (
          <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#09090b] dark:to-[#121214] border border-neutral-200/90 dark:border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-accent/40 transition-all duration-300 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Spring Boot 3
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold font-mono text-[11px] border border-accent/20">
                RBAC + JWT
              </span>
            </div>

            {/* Pipeline Stage Blocks */}
            <div className="grid grid-cols-3 gap-2.5 py-1.5">
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200/90 dark:border-zinc-800 text-center shadow-xs">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-zinc-400 uppercase font-semibold">APPLICANTS</div>
                <div className="text-neutral-950 dark:text-white font-bold text-sm mt-0.5">142</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200/90 dark:border-zinc-800 text-center shadow-xs">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-zinc-400 uppercase font-semibold">PIPELINE</div>
                <div className="text-neutral-800 dark:text-zinc-200 font-bold text-sm mt-0.5">28</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-accent/30 dark:border-accent/40 text-center shadow-xs relative overflow-hidden">
                <div className="text-[10px] font-mono text-accent uppercase font-semibold">OFFERS</div>
                <div className="text-accent font-black text-sm mt-0.5">6</div>
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-accent" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 flex justify-between pt-2 border-t border-neutral-200/90 dark:border-zinc-800">
              <span>Zero N+1 Overhead</span>
              <span className="text-neutral-800 dark:text-zinc-200 font-semibold">MySQL 8.0 Indexed</span>
            </div>
          </div>
        );

      case "library":
        return (
          <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#09090b] dark:to-[#121214] border border-neutral-200/90 dark:border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-accent/40 transition-all duration-300 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Gemini &amp; Chroma
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold font-mono text-[11px] border border-accent/20">
                Dense RAG
              </span>
            </div>

            {/* Vector Similarity Nodes */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-xs font-mono font-bold text-neutral-800 dark:text-white shadow-xs">
                  q
                </div>
                <span className="text-[9px] font-mono text-neutral-400 dark:text-zinc-500 uppercase">Query</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-0.5 w-6 bg-accent/40 border-t border-dashed border-accent" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-xl border border-accent/50 bg-accent/10 dark:bg-accent/15 flex items-center justify-center text-xs font-mono font-black text-accent shadow-xs">
                  d₁
                </div>
                <span className="text-[9px] font-mono text-accent font-bold uppercase">Top-1</span>
              </div>

              <div className="flex items-center">
                <div className="h-0.5 w-6 bg-neutral-300 dark:bg-zinc-700 border-t border-dashed border-neutral-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-zinc-600" />
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-xs font-mono font-bold text-neutral-600 dark:text-zinc-400 shadow-xs">
                  d₂
                </div>
                <span className="text-[9px] font-mono text-neutral-400 dark:text-zinc-500 uppercase">Top-2</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 flex justify-between pt-2 border-t border-neutral-200/90 dark:border-zinc-800">
              <span>Reciprocal Rank Fusion</span>
              <span className="text-accent font-bold">Cos Sim: 0.941</span>
            </div>
          </div>
        );

      case "matrix":
      default:
        return (
          <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#09090b] dark:to-[#121214] border border-neutral-200/90 dark:border-zinc-800 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-accent/40 transition-all duration-300 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
                <Workflow className="w-3.5 h-3.5 text-accent" /> n8n Orchestrator
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold font-mono text-[11px] border border-accent/20">
                24/7 Webhooks
              </span>
            </div>

            {/* Playwright Headless Flow */}
            <div className="flex flex-col items-center justify-center py-2 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200/90 dark:border-zinc-800 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-bold text-accent">10,000+ Profiles Scraped</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 dark:text-zinc-400 font-mono mt-2">
                <span className="px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300">Playwright Headless</span>
                <span>•</span>
                <span>Media Route Abort Stream</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 dark:text-zinc-400 flex justify-between pt-2 border-t border-neutral-200/90 dark:border-zinc-800">
              <span>Zoho API Webhook</span>
              <span className="text-accent font-bold">0% Data Loss</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-zinc-200/90 dark:border-white/10 bg-[#fcfcfc] dark:bg-[#000000] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium mb-3 shadow-2xs">
            <span className="text-accent font-bold">03.</span>
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span>{t.projects.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-neutral-950 dark:text-white uppercase mb-3 transition-colors">
            {t.projects.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors">
            {t.projects.subtitle}
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
              }}
              onClick={() => {
                sound.playClick();
                onSelectProject(project);
              }}
              className="rounded-3xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-accent/40 hover:shadow-lg dark:hover:shadow-[0_12px_32px_-4px_var(--accent-glow)] group cursor-pointer shadow-xs cursor-target"
              data-cursor-label={language === "fr" ? "Explorer" : "Inspect"}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="mb-5">
                  {renderThumbnailMockup(project)}
                </div>

                {/* Header Metadata */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {project.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30 text-[10px] font-mono font-semibold">
                    FEATURED
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-xl text-neutral-950 dark:text-white mb-1.5 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 transition-colors">
                  {project.summary}
                </p>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  {project.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-neutral-800 dark:text-zinc-200 text-[11px] font-mono font-medium border border-transparent dark:border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Row */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-950 dark:text-white group-hover:text-accent group-hover:translate-x-1 transition-all">
                    <span>{language === "fr" ? "Explorer l'Architecture" : "Inspect Architecture"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </div>

                  <div className="flex items-center gap-3 text-neutral-400 dark:text-zinc-500">
                    <GithubIcon className="w-4 h-4 hover:text-black dark:hover:text-white transition-colors" />
                    {project.liveUrl && (
                      <ExternalLink className="w-4 h-4 hover:text-black dark:hover:text-white transition-colors" />
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
