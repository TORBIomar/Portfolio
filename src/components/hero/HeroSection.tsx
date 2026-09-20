import React from 'react';
import { ArrowRight, Server, Database, FileText, Sparkles, Cloud, Cpu, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../common/Button';
import { TerminalWidget } from './TerminalWidget';
import { HeroCanvas } from './HeroCanvas';
import { sound } from '../../utils/sound';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden border-b border-white/10 tech-grid-pattern">
      {/* Interactive AI Vector & Data Network Canvas */}
      <HeroCanvas />

      {/* Radial Center Spotlight */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Engineering Narrative */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Live Telemetry & Availability Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d121e]/90 border border-white/10 shadow-sm text-xs font-mono backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-muted-foreground font-medium">Status:</span>
                <span className="text-accent font-semibold">{PERSONAL_INFO.status}</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d121e]/90 border border-white/10 text-xs font-mono text-muted-foreground">
                <Activity className="w-3 h-3 text-cyan animate-pulse" />
                <span>BACKEND_CLUSTER_HEALTHY</span>
              </div>
            </div>

            {/* Heading & Role */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent tracking-wider uppercase bg-accent/10 border border-accent/25 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>{PERSONAL_INFO.role}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-mono font-extrabold tracking-tight text-white leading-[1.15]">
                Engineering <br />
                <span className="text-accent">
                  Scalable Backend Systems,
                </span> <br />
                <span className="text-cyan">
                  AI & Cloud DevOps.
                </span>
              </h1>
            </div>

            {/* Concrete Narrative Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              I am <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>, a Computer Engineering & Networks student at EMSI Rabat (2022 – Present).
              Specializing in enterprise backend services with <strong>Spring Boot</strong>, dense vector RAG discovery with <strong>ChromaDB & Google Gemini API</strong>, relational/NoSQL database architectures, and containerized deployment with <strong>Docker & Linux</strong>.
            </p>

            {/* Competency Badges with Hover Micro-interactions */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <div
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1320]/80 border border-white/10 text-slate-300 hover:border-accent/40 transition-colors"
              >
                <Server className="w-3.5 h-3.5 text-accent" />
                <span>Backend (Spring Boot, REST APIs, Laravel)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1320]/80 border border-white/10 text-slate-300 hover:border-cyan/40 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan" />
                <span>AI & Vector RAG (Gemini API, ChromaDB)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1320]/80 border border-white/10 text-slate-300 hover:border-amber/40 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-amber" />
                <span>Databases (Oracle, PostgreSQL, MySQL, Mongo)</span>
              </div>
              <div
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1320]/80 border border-white/10 text-slate-300 hover:border-accent/40 transition-colors"
              >
                <Cloud className="w-3.5 h-3.5 text-accent" />
                <span>DevOps & Systems (Docker, Linux, Git)</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
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
                  Explore AI & Backend Systems
                </Button>
              </a>

              <a
                href="#skills"
                onClick={() => sound.playClick()}
                className="cursor-pointer"
              >
                <Button
                  variant="secondary"
                  size="md"
                  icon={<Cpu className="w-4 h-4 text-cyan" />}
                >
                  Technical Arsenal
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
                  icon={<FileText className="w-4 h-4 text-accent" />}
                >
                  Download CV
                </Button>
              </a>
            </div>

            {/* Telemetry metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-xl font-mono font-bold text-accent">Spring Boot</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Enterprise Backend</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-cyan">Vector RAG</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Gemini + ChromaDB</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-foreground">Docker & Linux</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Cloud Containerization</div>
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
