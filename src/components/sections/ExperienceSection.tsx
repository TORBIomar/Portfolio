"use client";

import React from "react";
import { EXPERIENCES_DATA } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-zinc-200/80 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
            PRACTICAL EXECUTION &amp; INTERNSHIPS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-black uppercase mb-3">
            Industry Experience &amp; Academic Track
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-600">
            Delivering production systems across industrial CAD manufacturing, public administration logistics, and computer science engineering.
          </p>
        </div>

        {/* 3 Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERIENCES_DATA.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => sound.playHover()}
              className="p-7 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-between transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                    {exp.company}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-black mb-1">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-5">
                  <MapPin className="w-3 h-3" />
                  <span>{exp.location}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5 text-xs font-sans text-zinc-600 mb-6">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-1">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
