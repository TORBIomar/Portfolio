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
    <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10 text-neutral-600 dark:text-muted-foreground py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#FF6B00] shadow-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-neutral-900 dark:text-foreground">
                <span>omar</span>
                <span className="text-[#FF6B00]">.torbi</span>
              </span>
              <p className="font-mono text-xs text-neutral-500 dark:text-muted-foreground">
                Computer Engineering Student | Software &amp; DevOps Engineer • EMSI Rabat
              </p>
            </div>
          </div>

          {/* Real-time System Status Banner */}
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-xs font-mono shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 beacon-green"></span>
              <span className="text-neutral-900 dark:text-slate-200 font-semibold">ALL_SYSTEMS_ONLINE</span>
            </div>
            <span className="text-black/10 dark:text-white/20">|</span>
            <span className="text-neutral-600 dark:text-slate-300">RBT {rbtTime || '14:30:00'}</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-muted-foreground hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-muted-foreground hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-muted-foreground hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-muted-foreground hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer ml-1 shadow-xs"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Technical Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-muted-foreground">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>rev.2026.4 // build clean</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-600 dark:text-slate-400">
            <span>React 18 + TS</span>
            <span>•</span>
            <span>Spring Boot</span>
            <span>•</span>
            <span>Three.js / Wasm</span>
            <span>•</span>
            <span className="text-[#FF6B00] font-semibold">Zero AI Slop</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
