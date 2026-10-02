import React, { useState } from 'react';
import { ArrowRight, Server, Database, FileText, Cloud, ShieldCheck, Sparkles, Download } from 'lucide-react';
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
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden border-b border-black/10 dark:border-white/10">
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
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Sub-header / Professional Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                <span>EMSI RABAT • DDSI</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OCI DEVOPS &amp; ARCHITECT CERTIFIED</span>
              </div>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                Hello, my name is <span className="bg-[#FF6B00] text-white font-semibold px-2 py-0.5 rounded shadow-sm">Omar</span>
              </p>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-mono font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.08] uppercase">
                SOFTWARE &amp; DEVOPS <br />
                <span className="text-[#FF6B00] drop-shadow-[0_0_25px_rgba(255,107,0,0.3)]">
                  <ScrambleText text="ENGINEER." scrambleOnHover autoPlay={false} speed={25} />
                </span>
              </h1>
            </div>

            {/* Concrete Narrative Paragraph */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-sans">
              Engineering production-ready backend architectures with <strong className="text-neutral-900 dark:text-white font-semibold">Spring Boot</strong> and automated cloud infrastructure with <strong className="text-neutral-900 dark:text-white font-semibold">Docker, Linux, and OCI</strong>. Focused on modular design, resilient REST APIs, relational schema optimization (PostgreSQL, Oracle DB, MySQL), and event-driven automation.
            </p>

            {/* Core Competency Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Server className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="font-medium text-neutral-900 dark:text-white">Backend (Spring Boot 3, REST, JPA)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Cloud className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="font-medium text-neutral-900 dark:text-white">DevOps &amp; Cloud (Docker, Linux, OCI)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B0C10]/80 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-slate-300 hover:border-[#FF6B00]/40 hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Databases (PostgreSQL, Oracle, MySQL)</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
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

              {/* Resume Button with Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="md"
                  icon={<FileText className="w-4 h-4 text-[#FF6B00]" />}
                  onClick={() => {
                    sound.playClick();
                    setResumeMenuOpen(!resumeMenuOpen);
                  }}
                >
                  RESUME / CV ▾
                </Button>

                {resumeMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#0E0F14] border border-black/10 dark:border-white/10 shadow-xl py-1.5 z-50 font-mono text-xs animate-in fade-in duration-150">
                    <a
                      href={PERSONAL_INFO.resumeUrlEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sound.playSuccess();
                        setResumeMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3.5 py-2 text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#FF6B00] transition-colors"
                    >
                      <span>Resume (English)</span>
                      <Download className="w-3.5 h-3.5 text-[#FF6B00]" />
                    </a>
                    <a
                      href={PERSONAL_INFO.resumeUrlFr}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sound.playSuccess();
                        setResumeMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3.5 py-2 text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#FF6B00] transition-colors border-t border-black/5 dark:border-white/5"
                    >
                      <span>CV (Français)</span>
                      <Download className="w-3.5 h-3.5 text-[#FF6B00]" />
                    </a>
                  </div>
                )}
              </div>

              {onOpenRecruiterDossier && (
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
              )}
            </div>

            {/* Telemetry metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-black/10 dark:border-white/10 max-w-lg">
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-white">Spring Boot 3</div>
                <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono mt-0.5">Enterprise Backend</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-[#FF6B00] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                  Docker &amp; Linux
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono mt-0.5">Containerization &amp; Ops</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-white">OCI Certified</div>
                <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono mt-0.5">DevOps &amp; Architect</div>
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
