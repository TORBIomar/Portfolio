"use client";

import React from "react";
import { ENDORSEMENTS_DATA } from "@/data/portfolioData";
import { sound } from "@/utils/sound";

export const TestimonialsRow: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 border-b border-zinc-200/80 bg-[#f9f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-200/60 text-zinc-700 text-xs font-mono font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              <span>TESTIMONIALS &amp; PRINCIPLES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-black">
              Trusted by teams that ship
            </h2>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Validated Enterprise Standards
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENDORSEMENTS_DATA.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="p-6 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-between transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group"
            >
              <div>
                {/* Organization Logo / Name */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
                  <span className="font-mono text-xs font-bold text-black tracking-wider">
                    {item.organization}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    {item.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-sans text-xs sm:text-[13px] text-zinc-700 leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              {/* Author & Role */}
              <div className="pt-4 border-t border-zinc-100 text-xs">
                <div className="font-mono font-bold text-black">{item.author}</div>
                <div className="text-[11px] font-sans text-zinc-500 mt-0.5">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
