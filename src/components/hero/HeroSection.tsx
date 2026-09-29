import React from 'react';
import { ArrowRight, Server, Database, FileText, Cloud, Cpu, Activity, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../common/Button';
import { TerminalWidget } from './TerminalWidget';
import { HeroCanvas } from './HeroCanvas';
import { sound } from '../../utils/sound';
import { ScrambleText } from '../common/ScrambleText';

interface HeroSectionProps {
  onOpenRecruiterDossier?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRecruiterDossier }) => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden border-b border-black/10 dark:border-white/10">
      {/* Interactive AI Vector & Data Network Canvas */}
      <HeroCanvas />

      {/* Radial Center Spotlight */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#FF6B00]/[0.03] dark:bg-white/[0.035] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Engineering Narrative */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Live Telemetry & Availability Badge */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B0C10]/90 border border-neutral-200/80 dark:border-white/10 shadow-sm text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 beacon-green"></span>
                  <span className="text-neutral-500 dark:text-muted-foreground font-medium">STATUS:</span>
                  <span className="text-neutral-900 dark:text-foreground font-semibold uppercase">{PERSONAL_INFO.status}</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#0B0C10]/90 border border-neutral-200/80 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                  <span>BASED IN MOROCCO</span>
                  <span className="text-neutral-400 dark:text-white/20">•</span>
                  <Activity className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>SYSTEMS_NOMINAL</span>
                </div>
              </div>

              {/* Recruiter Fast-Facts Strip */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                <span className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-semibold text-neutral-800 dark:text-neutral-200">
                  Target: Software &amp; DevOps
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
                  PFE 2026/2027 &amp; Full-Time
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
                  French &amp; English (Fluent)
                </span>
              </div>
            </div>

            {/* Intro & Display Headline */}
            <div className="space-y-3">
              <p className="font-mono text-xs sm:text-sm tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                Hi, my name is <span className="bg-[#FF6B00] text-white font-semibold px-2 py-0.5 rounded shadow-sm">Omar</span> and I'm a
              </p>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-mono font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.08] uppercase">
                SOFTWARE &amp; DEVOPS <br />
                <span className="text-[#FF6B00] drop-shadow-[0_0_25px_rgba(255,107,0,0.3)]">
                  <ScrambleText text="ENGINEER." scrambleOnHover autoPlay={false} speed={25} />
                </span>
              </h1>
            </div>

            {/* Concrete Narrative Paragraph */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed max-w-2xl font-sans">
              Computer Engineering & Networks student at <strong className="text-neutral-900 dark:text-white font-semibold">EMSI Rabat</strong> (2022 – Present).
              Architecting production-ready backend services with <strong className="text-neutral-900 dark:text-white font-semibold">Spring Boot</strong>, cloud DevOps containerization with <strong className="text-neutral-900 dark:text-white font-semibold">Docker &amp; Linux</strong>, sub-100ms vector search with <strong className="text-neutral-900 dark:text-white font-semibold">ChromaDB &amp; Gemini RAG</strong>, and ACID relational database systems.
            </p>

            {/* Competency Badges with Hover Micro-interactions */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Server className="w-3.5 h-3.5 text-neutral-500 dark:text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
                <span>Backend (Spring Boot, REST, Microservices)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Cloud className="w-3.5 h-3.5 text-[#FF6B00] transition-colors" />
                <span className="text-neutral-900 dark:text-white font-medium">DevOps &amp; Cloud (Docker, Linux, CI/CD)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Cpu className="w-3.5 h-3.5 text-neutral-500 dark:text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
                <span>AI &amp; Vector RAG (Gemini, ChromaDB)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-neutral-500 dark:text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
                <span>Databases (PostgreSQL, Oracle DB, MySQL)</span>
              </div>
            </div>

            {/* Action CTAs with Generous Margins & Spacing */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4.5 pt-4 my-2">
              <a
                href="#projects"
                data-cursor="view"
                onClick={() => sound.playClick()}
                className="cursor-pointer"
              >
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  VIEW SYSTEMS →
                </Button>
              </a>

              {onOpenRecruiterDossier && (
                <div data-cursor="dossier">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      sound.playClick();
                      onOpenRecruiterDossier();
                    }}
                    icon={<Sparkles className="w-4 h-4 text-[#FF6B00]" />}
                    className="border-[#FF6B00]/30 hover:border-[#FF6B00]/70 shadow-xs"
                  >
                    RECRUITER DOSSIER ⚡
                  </Button>
                </div>
              )}

              <a
                href="#about"
                onClick={() => sound.playClick()}
                className="cursor-pointer"
              >
                <Button
                  variant="secondary"
                  size="md"
                >
                  ABOUT ME
                </Button>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="cursor-pointer"
              >
                <Button
                  variant="outline"
                  size="md"
                  icon={<FileText className="w-4 h-4 text-[#FF6B00]" />}
                >
                  RESUME / CV ↗
                </Button>
              </a>
            </div>

            {/* Telemetry metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-black/10 dark:border-white/10 max-w-lg">
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-white">Spring Boot</div>
                <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono mt-0.5">Enterprise Backend</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-[#FF6B00] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] beacon-orange" />
                  Docker &amp; Linux
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono mt-0.5">Cloud DevOps Ops</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-slate-200">Vector RAG</div>
                <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono mt-0.5">Gemini + ChromaDB</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Terminal Preview */}
          <div className="lg:col-span-5 w-full">
            <TerminalWidget />
          </div>

        </div>
      </div>
    </section>
  );
};
