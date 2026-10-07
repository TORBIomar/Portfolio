"use client";

import React from "react";
import { FOUNDATION_PILLARS } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { Server, Cloud, Database, ArrowRight } from "lucide-react";

export const FeaturesGrid: React.FC = () => {
  const icons = [Server, Cloud, Database];

  return (
    <section id="architecture" className="py-20 sm:py-28 border-b border-zinc-200/80 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-black uppercase mb-3">
            The foundation for high-performance software
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
            Architect, containerize, and ship dependable engineering systems across web, backend, and cloud infrastructure.
          </p>
        </div>

        {/* 3-Column Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOUNDATION_PILLARS.map((pillar, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={pillar.number}
                onMouseEnter={() => sound.playHover()}
                className="rounded-2xl bg-white border border-zinc-200 p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-zinc-400 hover:shadow-sm group"
              >
                <div>
                  {/* Top metadata tag */}
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                    <span className="font-mono text-sm font-bold text-zinc-400">
                      {pillar.number}
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest text-black uppercase px-2 py-0.5 rounded bg-zinc-100">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Headline & Description */}
                  <div className="pt-6">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-black mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Bullets */}
                <div className="pt-4 border-t border-zinc-100 space-y-2 text-xs font-mono text-zinc-500">
                  {pillar.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
