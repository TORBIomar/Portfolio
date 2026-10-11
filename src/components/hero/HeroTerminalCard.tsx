"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download, Terminal } from "lucide-react";
import { sound } from "@/utils/sound";
import { useToast } from "@/components/common/Toast";

export const HeroTerminalCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

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
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

        {/* Outer Frame */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#3D160E] to-[#240B06] border border-[#6E2314] dark:bg-gradient-to-b dark:from-[#FFF7F4] dark:to-[#FDF0EC] dark:border-[#ECC6BC] hover:border-accent/40 transition-colors shadow-[0_20px_50px_rgba(61,22,14,0.3)] dark:shadow-[0_20px_50px_rgba(255,176,161,0.18)] overflow-hidden">
          
          {/* Subtle Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#4A1D13] dark:bg-[#F8DFD7] border-b border-[#6E2314] dark:border-[#ECC6BC] text-xs font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-zinc-200 dark:text-neutral-800 font-semibold text-[11px] sm:text-xs">
                terminal-card.svg
              </span>
              <span className="text-zinc-500 dark:text-neutral-400 hidden sm:inline">|</span>
              <span className="text-zinc-400 dark:text-neutral-600 hidden sm:inline text-[11px]">
                profile spec v2.4
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Command Button */}
              <button
                onClick={handleCopyCommand}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 dark:bg-white/80 dark:hover:bg-white text-white dark:text-neutral-800 border border-white/20 dark:border-[#ECC6BC] hover:border-accent/60 text-[11px] transition-all cursor-pointer shadow-2xs"
                title="Copy terminal runner command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-accent font-bold" />
                    <span className="text-accent font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3 h-3 text-zinc-300 dark:text-neutral-500" />
                    <span>npx omar-torbi</span>
                    <Copy className="w-3 h-3 text-zinc-300 dark:text-neutral-500 ml-0.5" />
                  </>
                )}
              </button>

              {/* View Raw SVG Link */}
              <a
                href="/card.svg"
                target="_blank"
                rel="noreferrer"
                download="omar-torbi-card.svg"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 dark:bg-white/70 dark:hover:bg-white text-white dark:text-neutral-900 border border-white/20 dark:border-[#ECC6BC] text-[11px] transition-all shadow-2xs"
                title="Download raw SVG card"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Raw SVG</span>
              </a>
            </div>
          </div>

          {/* Card Presentation Container */}
          <div className="relative p-2 sm:p-4 bg-[#2B0E07] dark:bg-[#FFF9F7] flex items-center justify-center transition-colors">
            <motion.div
              whileHover={{ scale: 1.004 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              {/* Light Mode: Displays the Darker Terracotta Card */}
              <img
                src="/card.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-xl select-none block dark:hidden"
                loading="eager"
              />
              {/* Dark Mode: Displays the Inverted Light/White Terracotta Card */}
              <img
                src="/card-light.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-xl select-none hidden dark:block"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#3A140D] dark:bg-[#F8DFD7] border-t border-[#6E2314] dark:border-[#ECC6BC] text-[11px] font-mono text-zinc-300 dark:text-neutral-700 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold">●</span>
              <span className="font-semibold text-zinc-100 dark:text-neutral-900">Available for high-impact engineering roles</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 dark:text-neutral-600">
              <span className="hidden md:inline">EMSI Rabat — Computer Engineering</span>
              <span className="font-semibold text-zinc-200 dark:text-neutral-800">Rabat / Béni Mellal, MA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
