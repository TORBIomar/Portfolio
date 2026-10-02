import React, { useState } from 'react';
import { ArrowRight, Server, Database, FileText, Cloud, ShieldCheck, Download } from 'lucide-react';
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
    <section className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden border-b border-neutral-300 dark:border-neutral-800">
      {/* Interactive Architectural Coordinate Blueprint Canvas */}
      <HeroCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Architectural Status Tag / Professional Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-medium">
                <span className="text-neutral-900 dark:text-white font-bold">#</span>
                <span>EMSI RABAT • DDSI (ENGINEERING DEGREE)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white font-mono text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OCI DEVOPS &amp; ARCHITECT PRO CERTIFIED</span>
              </div>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                ENGINEER // <span className="text-neutral-900 dark:text-white font-bold">{PERSONAL_INFO.name}</span> • RABAT, MA [34.02° N, 6.84° W]
              </p>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-mono font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.05] uppercase">
                SOFTWARE &amp; DEVOPS <br />
                <span className="text-neutral-900 dark:text-white underline underline-offset-8 decoration-neutral-300 dark:decoration-neutral-700">
                  <ScrambleText text="ENGINEER." scrambleOnHover autoPlay={false} speed={25} />
                </span>
              </h1>
            </div>

            {/* Concrete Narrative Paragraph */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-sans">
              Engineering production-ready backend architectures with <strong className="text-neutral-900 dark:text-white font-semibold">Spring Boot</strong> and automated cloud infrastructure with <strong className="text-neutral-900 dark:text-white font-semibold">Docker, Linux, and OCI</strong>. Focused on modular design, resilient REST APIs, relational schema optimization (PostgreSQL, Oracle DB, MySQL), and event-driven automation.
            </p>

            {/* Core Competency Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-sans">
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Server className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span className="font-medium text-neutral-900 dark:text-white">Backend (Spring Boot 3, REST, JPA)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Cloud className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span className="font-medium text-neutral-900 dark:text-white">DevOps &amp; Cloud (Docker, Linux, OCI)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white transition-all cursor-default shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span className="font-medium text-neutral-900 dark:text-white">Databases (PostgreSQL, Oracle, MySQL)</span>
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
                  icon={<FileText className="w-4 h-4 text-neutral-900 dark:text-white" />}
                  onClick={() => {
                    sound.playClick();
                    setResumeMenuOpen(!resumeMenuOpen);
                  }}
                >
                  RESUME / CV ▾
                </Button>

                {resumeMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 shadow-xl py-1 z-50 font-sans text-xs animate-in fade-in duration-100">
                    <a
                      href={PERSONAL_INFO.resumeUrlEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sound.playSuccess();
                        setResumeMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <span>Resume (English)</span>
                      <Download className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    </a>
                    <a
                      href={PERSONAL_INFO.resumeUrlFr}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sound.playSuccess();
                        setResumeMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors border-t border-neutral-200 dark:border-neutral-800"
                    >
                      <span>CV (Français)</span>
                      <Download className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
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
                  icon={<ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-white" />}
                >
                  TECHNICAL DOSSIER
                </Button>
              )}
            </div>

            {/* Telemetry metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-300 dark:border-neutral-800 max-w-lg">
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-white">Spring Boot 3</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">Enterprise Backend</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                  Docker &amp; Linux
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">Containerization &amp; Ops</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-neutral-900 dark:text-white">OCI Certified</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">DevOps &amp; Architect</div>
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
