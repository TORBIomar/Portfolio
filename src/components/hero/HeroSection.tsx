import React from 'react';
import { ArrowRight, Briefcase, Server, Code2, Database, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../common/Button';
import { TerminalWidget } from './TerminalWidget';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-14 md:pt-28 md:pb-16 overflow-hidden tech-grid-pattern border-b border-border/60">
      {/* Background radial gradient spotlight */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Engineering Narrative */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Live Availability Telemetry Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-foreground font-medium">Status:</span>
              <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.status}</span>
            </div>

            {/* Main Engineering Heading & Role Subtitle */}
            <div className="space-y-2">
              <div className="inline-block text-xs font-mono font-bold text-accent tracking-wider uppercase bg-accent-subtle border border-accent-border px-2.5 py-0.5 rounded">
                {PERSONAL_INFO.role}
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-mono font-bold tracking-tight text-foreground leading-[1.15]">
                Engineering <span className="text-accent">Scalable Full-Stack Systems</span> & Modern Web Platforms.
              </h1>
            </div>

            {/* Concrete Narrative Paragraph */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-sans">
              I am <strong className="text-foreground font-semibold">{PERSONAL_INFO.name}</strong>, a {PERSONAL_INFO.role} at EMSI Rabat (2022 – Present). 
              Experienced in architecting scalable web platforms, secure REST APIs with Spring Boot, database-backed systems, and modern interactive applications using clean, modular code.
            </p>

            {/* Quick Competency Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/80 border border-border">
                <Server className="w-3.5 h-3.5 text-accent" />
                <span>Backend & REST APIs (Spring Boot, Django, Laravel)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/80 border border-border">
                <Code2 className="w-3.5 h-3.5 text-accent" />
                <span>Modern Frontend (React, TypeScript, Tailwind)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/80 border border-border">
                <Database className="w-3.5 h-3.5 text-accent" />
                <span>Databases & AI (Oracle, MySQL, ChromaDB, Gemini)</span>
              </div>
            </div>

            {/* High Visibility CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects" className="cursor-pointer">
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Explore Featured Projects
                </Button>
              </a>

              <a href="#experience" className="cursor-pointer">
                <Button 
                  variant="secondary" 
                  size="md"
                  icon={<Briefcase className="w-4 h-4 text-accent" />}
                >
                  View Experience
                </Button>
              </a>

              <a 
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
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

            {/* Production metrics bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/80 max-w-lg">
              <div>
                <div className="text-xl font-mono font-bold text-accent">Full-Stack</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Web Platforms & APIs</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-foreground">Spring Boot</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Enterprise Architecture</div>
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-foreground">EMSI Rabat</div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">IIR (2022 – Present)</div>
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
