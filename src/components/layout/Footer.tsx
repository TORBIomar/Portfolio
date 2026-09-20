import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Instagram, ArrowUp, GitBranch } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

export const Footer: React.FC = () => {
  const [rbtTime, setRbtTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Casablanca',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setRbtTime(timeStr);
      } catch {
        const d = new Date();
        setRbtTime(d.toTimeString().slice(0, 8));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080d] border-t border-white/10 text-muted-foreground py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0e1422] border border-white/10 flex items-center justify-center text-accent">
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
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0e1422] border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-accent font-semibold">ALL_SYSTEMS_ONLINE</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-slate-300">RBT {rbtTime || '14:30:00'}</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-xl bg-[#0e1422] border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-xl bg-[#0e1422] border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-xl bg-[#0e1422] border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors cursor-pointer"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#0e1422] border border-white/10 text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors cursor-pointer ml-1"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Technical Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-accent" />
            <span>rev.2026.4 // build clean</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>React 18 + TS</span>
            <span>•</span>
            <span>Spring Boot</span>
            <span>•</span>
            <span>Three.js / Wasm</span>
            <span>•</span>
            <span className="text-accent">Zero AI Slop</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
