import React from 'react';
import { Terminal, Github, Linkedin, Instagram, ArrowUp, GitBranch } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#FF6B00] shadow-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                <span>omar</span>
                <span className="text-[#FF6B00]">.torbi</span>
              </span>
              <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                Software &amp; DevOps Engineer • EMSI Rabat
              </p>
            </div>
          </div>

          {/* Simple Clean Status Banner */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-xs font-mono shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span className="text-neutral-800 dark:text-neutral-200 font-medium">Rabat, Morocco</span>
            <span className="text-black/10 dark:text-white/20">|</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">OCI Certified Pro</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95 cursor-pointer ml-1 shadow-xs"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Technical Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>rev.2026.4 // build clean</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
            <span>React 18 + TS</span>
            <span>•</span>
            <span>Spring Boot</span>
            <span>•</span>
            <span>Docker &amp; OCI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
