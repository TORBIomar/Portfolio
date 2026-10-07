"use client";

import React from "react";
import { BrandIcon } from "../common/BrandIcon";
import { sound } from "@/utils/sound";
import { ArrowRight, FileText } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface CtaCardProps {
  onOpenContactModal?: () => void;
}

export const CtaCard: React.FC<CtaCardProps> = ({ onOpenContactModal }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#fcfcfc] border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Textured Atmospheric Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#181920] to-[#0c0d11] border border-zinc-800 p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none" />

          {/* Geometric Flower Mark */}
          <div className="flex justify-center mb-6 relative z-10">
            <BrandIcon className="w-12 h-12 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight uppercase max-w-2xl mx-auto leading-tight mb-4 relative z-10">
            Ready to build the software of the future?
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mb-10 relative z-10">
            Available for End-of-Studies (PFE) Internship (starting February 2027) &amp; full-time Software / DevOps engineering opportunities.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <a
              href="#contact"
              onClick={() => {
                sound.playClick();
                if (onOpenContactModal) onOpenContactModal();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02]"
            >
              <span>INITIATE CONTACT</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.resumeUrlEn}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSuccess()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-zinc-700 text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
