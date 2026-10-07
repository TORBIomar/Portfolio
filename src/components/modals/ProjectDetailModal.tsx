"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "../common/SocialIcons";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#09090b] rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl overflow-y-auto flex flex-col justify-between animate-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 font-mono text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
              {project.categoryLabel}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold">
                FEATURED
              </span>
            )}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 font-sans">
          
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black dark:text-white mb-2 transition-colors">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors">
            {project.description}
          </div>

          {/* Metrics Row */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Engineered Telemetry &amp; Specs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center transition-colors"
                >
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                    {m.label}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-black dark:text-white mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Highlights */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Architectural Highlights
            </h3>
            <div className="space-y-2">
              {project.architecturalHighlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-black dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Deep Dive: Key Decisions & Bottlenecks */}
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Engineering Analysis
            </h3>

            <div className="p-4 rounded-xl bg-zinc-900 dark:bg-[#121214] border border-transparent dark:border-zinc-800 text-zinc-300 text-xs font-mono space-y-2">
              <div className="text-white font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architecture Overview:</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                {project.architectureDetails.overview}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/50 text-xs space-y-1.5">
              <div className="text-amber-900 dark:text-amber-400 font-bold font-mono flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Performance Bottleneck Resolved:</span>
              </div>
              <p className="text-amber-800 dark:text-amber-200/90 leading-relaxed font-sans">
                {project.architectureDetails.performanceBottlenecksResolved}
              </p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-transparent dark:border-zinc-800 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md px-6 sm:px-8 py-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSuccess()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-sans font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
            >
              <span>Launch Live System</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
