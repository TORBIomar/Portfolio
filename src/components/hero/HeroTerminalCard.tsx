"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download, Terminal } from "lucide-react";
import { sound } from "@/utils/sound";
import { useToast } from "@/components/common/Toast";

export const HeroTerminalCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleCopyCommand = () => {
    sound.playSuccess();
    navigator.clipboard.writeText("npx omar-torbi");
    setCopied(true);
    showToast("Copied 'npx omar-torbi' to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
      {/* Subtle ambient accent background halo */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

        {/* Outer Frame: Translucent Glass in White Mode, Dark Terracotta Glass in Dark Mode */}
        <div className="relative rounded-2xl bg-white/40 dark:bg-[#120704]/60 backdrop-blur-xl border border-zinc-200/90 dark:border-[#6E2314]/50 hover:border-accent/40 dark:hover:border-accent/40 transition-colors shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Subtle Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-zinc-100/60 dark:bg-[#1C0B06]/60 backdrop-blur-md border-b border-zinc-200/90 dark:border-[#6E2314]/50 text-xs font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold text-[11px] sm:text-xs">
                terminal-card.svg
              </span>
              <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-500 dark:text-zinc-400 hidden sm:inline text-[11px]">
                profile spec v2.4
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Command Button */}
              <button
                onClick={handleCopyCommand}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-[#6E2314]/60 hover:border-accent/60 text-[11px] transition-all cursor-pointer shadow-2xs"
                title="Copy terminal runner command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-accent font-bold" />
                    <span className="text-accent font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                    <span>npx omar-torbi</span>
                    <Copy className="w-3 h-3 text-zinc-500 dark:text-zinc-400 ml-0.5" />
                  </>
                )}
              </button>

              {/* View Raw SVG Link */}
              <a
                href={isDark ? "/card.svg" : "/card-light.svg"}
                target="_blank"
                rel="noreferrer"
                download={isDark ? "omar-torbi-card.svg" : "omar-torbi-card-transparent.svg"}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-[#6E2314]/60 text-[11px] transition-all shadow-2xs"
                title="Download raw SVG card"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Raw SVG</span>
              </a>
            </div>
          </div>

          {/* Card Presentation Container: Transparent Canvas */}
          <div className="relative p-2 sm:p-4 bg-transparent flex items-center justify-center transition-colors">
            <motion.div
              whileHover={{ scale: 1.004 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              {/* Light Mode: Displays the Transparent Terracotta Card */}
              <img
                src="/card-light.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-sm select-none block dark:hidden"
                loading="eager"
              />
              {/* Dark Mode: Displays the Warm Terracotta Card */}
              <img
                src="/card.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-xl select-none hidden dark:block"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-zinc-100/60 dark:bg-[#1C0B06]/60 backdrop-blur-md border-t border-zinc-200/90 dark:border-[#6E2314]/50 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold">●</span>
              <span className="font-semibold text-neutral-900 dark:text-zinc-100">Available for high-impact engineering roles</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
              <span className="hidden md:inline">EMSI Rabat — Computer Engineering</span>
              <span className="font-semibold text-neutral-800 dark:text-zinc-200">Rabat / Béni Mellal, MA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
