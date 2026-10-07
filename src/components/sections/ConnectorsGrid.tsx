"use client";

import React from "react";
import { CONNECTORS_DATA } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { ArrowRight } from "lucide-react";

export const ConnectorsGrid: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 border-b border-zinc-200/80 bg-[#f9f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-200/60 border border-zinc-300 text-zinc-700 text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
              <span>INTEGRATIONS &amp; TOOLS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-black leading-snug">
              Plugs into the stack you already run.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Software and infrastructure tools work together seamlessly. From source control and multi-stage Docker builds to cloud virtual cloud networks and automated webhook dispatches, systems maintain continuous cohesion.
            </p>

            <a
              href="#stack"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black hover:underline uppercase pt-2 cursor-pointer"
            >
              <span>VIEW TECH CAPABILITIES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right Column: 4x4 Grid of Tool Icons (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-4 gap-3 sm:gap-3.5">
              {CONNECTORS_DATA.map((conn) => (
                <div
                  key={conn.name}
                  onMouseEnter={() => sound.playHover()}
                  className="aspect-square rounded-2xl bg-white border border-zinc-200/90 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800 group-hover:bg-black group-hover:text-white transition-colors mb-2 font-mono text-xs font-bold">
                    {conn.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-mono text-[11px] font-bold text-zinc-900 group-hover:text-black truncate w-full">
                    {conn.name}
                  </span>
                  <span className="text-[9px] font-sans text-zinc-400 truncate w-full hidden sm:block">
                    {conn.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
