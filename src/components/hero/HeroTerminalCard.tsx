"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download, Terminal, Sparkles, ExternalLink } from "lucide-react";
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
      {/* Ambient background glow behind the card */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

        {/* Outer Frame */}
        <div className="relative rounded-2xl bg-[#090b10] border border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Subtle Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0d1117] border-b border-zinc-800/80 text-xs font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-zinc-400 text-[11px] sm:text-xs">
                terminal-card.svg
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-500 hidden sm:inline text-[11px]">
                profile spec v2.4
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Command Button */}
              <button
                onClick={handleCopyCommand}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 text-[11px] transition-all cursor-pointer"
                title="Copy terminal runner command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3 h-3 text-zinc-400" />
                    <span>npx omar-torbi</span>
                    <Copy className="w-3 h-3 text-zinc-400 ml-0.5" />
                  </>
                )}
              </button>

              {/* View Raw SVG Link */}
              <a
                href="/card.svg"
                target="_blank"
                rel="noreferrer"
                download="omar-torbi-card.svg"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-[11px] transition-all"
                title="Download raw SVG card"
              >
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Raw SVG</span>
              </a>
            </div>
          </div>

          {/* Card Presentation Container */}
          <div className="relative p-2 sm:p-4 bg-[#0d1117] flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.006 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              <img
                src="/card.svg"
                alt="Omar Torbi — Terminal Profile Card ($ whoami)"
                className="w-full h-auto max-w-[760px] rounded-lg shadow-xl select-none"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#090b10] border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              <span>Available for high-impact engineering roles</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500">
              <span className="hidden md:inline">EMSI Rabat — Computer Engineering</span>
              <span className="text-zinc-400">Rabat / Béni Mellal, MA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
