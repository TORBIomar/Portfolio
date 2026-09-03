import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b101c] border-t border-border/80 text-muted-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border/60">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-accent">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-foreground">
                {PERSONAL_INFO.name}
              </span>
              <p className="font-mono text-xs text-muted-foreground">
                Computer Engineering Student | Full-Stack Developer • EMSI Rabat
              </p>
            </div>
          </div>

          {/* Real-time System Status Banner */}
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-emerald-400 font-semibold">All Systems Operational</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">{utcTime || '16:45:00 UTC'}</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-slate-600 transition-colors cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-slate-600 transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-slate-600 transition-colors cursor-pointer"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer ml-2"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Technical Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Rabat / Béni Mellal, Morocco.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React 18 + TypeScript</span>
            <span>•</span>
            <span>Spring Boot & 3D WebGL</span>
            <span>•</span>
            <span>WCAG AA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
