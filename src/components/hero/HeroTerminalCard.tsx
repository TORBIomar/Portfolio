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

        {/* Outer Frame: Translucent Glass in White Mode (Warmer Terracotta), Transparent Lighter Terracotta Glass in Dark Mode */}
        <div className="relative rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-[#A42F17]/25 dark:border-[#FFB0A1]/30 hover:border-[#A42F17]/50 dark:hover:border-[#FFB0A1]/60 transition-colors shadow-[0_12px_40px_rgba(164,47,23,0.06)] dark:shadow-[0_20px_50px_rgba(255,176,161,0.08)] overflow-hidden">
          
          {/* Subtle Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#A42F17]/[0.06] dark:bg-[#FFB0A1]/[0.08] backdrop-blur-md border-b border-[#A42F17]/15 dark:border-[#FFB0A1]/20 text-xs font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[#5C1A0D] dark:text-[#FFB0A1] font-semibold text-[11px] sm:text-xs">
                terminal-card.svg
              </span>
              <span className="text-[#8C4435]/60 dark:text-[#FFB0A1]/50 hidden sm:inline">|</span>
              <span className="text-[#8C4435] dark:text-[#FFD8D0] hidden sm:inline text-[11px]">
                profile spec v2.4
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Command Button */}
              <button
                onClick={handleCopyCommand}
                data-cursor-label="Copy"
                className="cursor-target inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.16] text-[#5C1A0D] dark:text-[#FAF7F5] border border-[#A42F17]/25 dark:border-[#FFB0A1]/35 hover:border-[#A42F17]/60 dark:hover:border-[#FFB0A1] text-[11px] transition-all cursor-pointer shadow-2xs"
                title="Copy terminal runner command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-accent font-bold" />
                    <span className="text-accent font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3 h-3 text-[#8C4435] dark:text-[#FFB0A1]" />
                    <span>npx omar-torbi</span>
                    <Copy className="w-3 h-3 text-[#8C4435] dark:text-[#FFB0A1] ml-0.5" />
                  </>
                )}
              </button>

              {/* View Raw SVG Link */}
              <a
                href={isDark ? "/card.svg" : "/card-light.svg"}
                target="_blank"
                rel="noreferrer"
                download={isDark ? "omar-torbi-card.svg" : "omar-torbi-card-transparent.svg"}
                data-cursor-label="Download"
                className="cursor-target inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.16] text-[#5C1A0D] dark:text-[#FAF7F5] border border-[#A42F17]/25 dark:border-[#FFB0A1]/35 hover:border-[#A42F17]/60 dark:hover:border-[#FFB0A1] text-[11px] transition-all shadow-2xs"
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
              {/* Light Mode: Displays the Transparent Warmer Terracotta Card */}
              <img
                src="/card-light.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                width={760}
                height={300}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-sm select-none block dark:hidden"
                loading="eager"
              />
              {/* Dark Mode: Displays the Transparent Lighter Terracotta Card */}
              <img
                src="/card.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                width={760}
                height={300}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-xl select-none hidden dark:block"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#A42F17]/[0.06] dark:bg-[#FFB0A1]/[0.08] backdrop-blur-md border-t border-[#A42F17]/15 dark:border-[#FFB0A1]/20 text-[11px] font-mono text-[#6B2011] dark:text-[#FFD8D0] transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold">●</span>
              <span className="font-semibold text-[#3D160E] dark:text-[#FAF7F5]">Available for high-impact engineering roles</span>
            </div>

            <div className="flex items-center gap-4 text-[#6B2011] dark:text-[#FFD8D0]">
              <span className="hidden md:inline">EMSI Rabat — Computer Engineering</span>
              <span className="font-semibold text-[#3D160E] dark:text-[#FFB0A1]">Rabat / Béni Mellal, MA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
