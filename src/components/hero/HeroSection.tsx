"use client";

import React, { useState } from "react";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { BrandIcon } from "../common/BrandIcon";
import { HeroMockup } from "./HeroMockup";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";

interface HeroSectionProps {
  onOpenContactModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContactModal }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopyCli = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.npmCommand);
    setCopied(true);
    sound.playSuccess();
    showToast(`Copied "${PERSONAL_INFO.npmCommand}" to clipboard!`);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-zinc-200/80 bg-[#fcfcfc]">
      {/* Subtle fine grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Prominent Center Geometric Brand Icon */}
        <div className="mb-6 sm:mb-8 transition-transform duration-500 hover:rotate-90 cursor-pointer">
          <BrandIcon className="w-12 h-12 sm:w-16 sm:h-16 text-black" />
        </div>

        {/* Monumental Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-black uppercase max-w-5xl leading-[1.08] mb-4 sm:mb-6">
          BUILDING HIGH-PERFORMANCE <br className="hidden sm:inline" />
          DIGITAL EXPERIENCES
          <span className="block text-2xl sm:text-3xl md:text-4xl font-sans font-light tracking-widest text-zinc-600 mt-2">
            / BY {PERSONAL_INFO.name.toUpperCase()}
          </span>
        </h1>

        {/* Industrial Subheader / Descriptor */}
        <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-zinc-500 max-w-2xl mb-8">
          FULL-STACK ARCHITECTURE • OCI CLOUD &amp; DEVOPS • 3D WEB ENGINEERING <br className="hidden sm:inline" />
          <span className="text-zinc-400 text-[11px]">
            STATE ENGINEERING DEGREE (DDSI) — EMSI RABAT • MOROCCO
          </span>
        </p>

        {/* Small 3-Button Tray */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14 sm:mb-18">
          {/* Black Pill Button */}
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs sm:text-[13px] font-sans font-semibold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <span>EXPLORE SYSTEMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* White Pill Button */}
          <a
            href="#contact"
            onClick={() => {
              sound.playClick();
              if (onOpenContactModal) onOpenContactModal();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 text-black border border-zinc-300 text-xs sm:text-[13px] font-sans font-semibold transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
          >
            <span>REACH OUT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Interactive Copyable CLI Chip */}
          <button
            onClick={handleCopyCli}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-100/90 hover:bg-zinc-200/90 border border-zinc-200 text-zinc-800 text-xs font-mono transition-all cursor-pointer"
            title="Click to copy terminal command"
          >
            <span className="text-zinc-400">&gt;</span>
            <span>{PERSONAL_INFO.npmCommand}</span>
            <span className="text-zinc-300">|</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
        </div>

        {/* Hero Image/UI Showcase: Interactive Window Mockup */}
        <div className="w-full">
          <HeroMockup />
        </div>

      </div>
    </section>
  );
};
