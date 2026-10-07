"use client";

import React from "react";
import { PROCESS_INFO_CARDS } from "@/data/portfolioData";
import { sound } from "@/utils/sound";

export const DetailedInfoCards: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-b border-zinc-200/80 bg-[#f9f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-18">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
            ENGINEERING WORKFLOW &amp; PRINCIPLES
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-black uppercase">
            How I approach software engineering
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_INFO_CARDS.map((card) => (
            <div
              key={card.number}
              onMouseEnter={() => sound.playHover()}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-between transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                  <span className="font-mono text-xs font-bold text-zinc-400 group-hover:text-black transition-colors">
                    {card.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    {card.subtitle}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-black mb-3">
                  {card.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 font-mono text-[10px] text-zinc-400">
                Pillar {card.number} // Deterministic
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
