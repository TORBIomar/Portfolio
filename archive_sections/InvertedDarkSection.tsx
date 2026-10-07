"use client";

import React from "react";
import { INDUSTRIES_DATA } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { ArrowRight } from "lucide-react";

export const InvertedDarkSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#0d0e12] text-zinc-300 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-950/60 border border-orange-800/80 text-orange-400 text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>DOMAINS &amp; SECTORS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
              Built for industries that demand non-negotiable reliability
            </h2>

            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Production-grade software delivery where uptime, memory hygiene, schema integrity, and compliance are paramount. Built without fragile dependencies or shortcuts.
            </p>

            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:underline uppercase pt-2 cursor-pointer"
            >
              <span>DISCUSS ENGINEERING NEEDS</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>

          {/* Right Column: 2x3 Grid with Fine Dark Dividers (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INDUSTRIES_DATA.map((ind, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  className="p-5 sm:p-6 rounded-2xl bg-[#14151a] border border-zinc-800/90 transition-all duration-200 hover:border-zinc-600 hover:bg-[#181920] group"
                >
                  <h3 className="font-serif font-bold text-base text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
