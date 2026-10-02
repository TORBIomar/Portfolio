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
    <footer className="bg-white dark:bg-black border-t border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                <span>omar</span>
                <span className="text-neutral-500 dark:text-neutral-400">.torbi</span>
              </span>
              <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
                Software &amp; DevOps Engineer • EMSI Rabat
              </p>
            </div>
          </div>

          {/* Simple Clean Status Banner */}
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white beacon-white" />
            <span className="text-neutral-800 dark:text-neutral-200 font-sans font-medium">Rabat, Morocco</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="text-neutral-500 dark:text-neutral-400 font-sans font-medium">OCI Certified Pro</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-2 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer ml-1"
              title="Return to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Technical Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2 font-mono">
            <GitBranch className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
            <span>rev.2026.4 // build clean</span>
            <span>•</span>
            <span className="font-sans">© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 font-sans font-medium">
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
