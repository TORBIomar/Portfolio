"use client";

import React from "react";
import { sound } from "@/utils/sound";
import { ArrowRight, Play, ExternalLink, Box, Sparkles } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface FeaturedHighlightBannerProps {
  onOpenProject: (projectId: string) => void;
}

export const FeaturedHighlightBanner: React.FC<FeaturedHighlightBannerProps> = ({
  onOpenProject,
}) => {
  return (
    <section className="py-20 sm:py-28 border-b border-zinc-200/80 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="rounded-3xl bg-white border border-zinc-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Atmospheric 3D CAD Visual (6 Cols) */}
            <div className="lg:col-span-6 bg-[#0d0e12] p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden text-zinc-300">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Title & Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span>ZAHIRI METAL × THREE.JS WASM</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-[10px] font-mono text-cyan-300">
                  Featured Case Study
                </span>
              </div>

              {/* Middle 3D Wireframe / Atmospheric Render */}
              <div className="my-10 relative z-10 flex flex-col items-center justify-center">
                <div className="w-full max-w-sm aspect-video rounded-xl bg-gradient-to-tr from-[#161720] to-[#0a0b0e] border border-zinc-800 p-4 flex flex-col justify-between shadow-2xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="text-cyan-400">CSG BOOLEAN SUBTRACTION</span>
                    <span>TUBE PRO CNC</span>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <div className="w-36 h-12 rounded-full border-2 border-cyan-400/80 bg-cyan-900/30 flex items-center justify-center relative">
                      <div className="w-6 h-6 rounded-full border border-dashed border-cyan-300 animate-spin" />
                      <span className="absolute text-[9px] font-mono text-cyan-200">
                        Ø80 × 600mm
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                    <span>WEB WORKERS: 60 FPS</span>
                    <span className="text-emerald-400">STEP EXPORT READY</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="relative z-10 flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenProject("zahiri-metal-cad");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                  <span>INSPECT 3D ARCHITECTURE</span>
                </button>
              </div>
            </div>

            {/* Right Column: Mission Quote & Narrative (6 Cols) */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-widest block mb-6">
                  ENGINEERING PHILOSOPHY
                </span>

                {/* Monumental Quote */}
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-black leading-snug mb-8">
                  “Clean architecture is not an afterthought — it is the bedrock that allows software to evolve, scale, and endure under real-world production pressure.”
                </blockquote>

                {/* Attribution */}
                <div className="border-l-2 border-black pl-4 mb-10">
                  <div className="font-mono text-sm font-bold text-black">
                    Omar Torbi
                  </div>
                  <div className="font-sans text-xs text-zinc-500 mt-0.5">
                    Software &amp; DevOps Engineer • State Degree (DDSI) EMSI Rabat
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenProject("zahiri-metal-cad");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-sans font-semibold transition-colors cursor-pointer"
                >
                  <span>READ CASE STUDY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://zahiri-metal-3d-cad.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSuccess()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 text-black text-xs font-sans font-semibold transition-colors cursor-pointer"
                >
                  <span>VIEW LIVE CAD DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
