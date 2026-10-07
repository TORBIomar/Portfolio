"use client";

import React, { useState } from "react";
import { STACK_MODELS } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const StackModelsBox: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <section id="stack" className="py-16 sm:py-20 border-b border-zinc-200/80 bg-[#f9f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Split Card matching Factory.ai layout */}
        <div className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>ADAPTIVE TECH STACK</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-black leading-snug">
                Move freely between distributed backends and reactive frontends
              </h3>

              <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Adaptive toolchains built for deterministic performance and velocity. Switch between enterprise Spring Boot microservices, containerized Docker infrastructure, WebAssembly CAD kernels, and event-driven n8n workflows without vendor lock-in.
              </p>

              {selectedTech && (
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700 animate-in fade-in duration-150">
                  <span className="font-bold text-black">{selectedTech}</span> is integrated across active production pipelines.
                </div>
              )}
            </div>

            {/* Right Column: Grid Chips (7 Cols) */}
            <div className="lg:col-span-7 bg-[#fcfcfc] p-4 sm:p-6 rounded-xl border border-zinc-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {STACK_MODELS.map((item) => {
                  const isSelected = selectedTech === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        sound.playClick();
                        setSelectedTech(item.name);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold truncate">
                          {item.name}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            isSelected
                              ? "bg-zinc-800 text-zinc-200"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <div
                        className={`text-[10px] font-sans mt-0.5 truncate ${
                          isSelected ? "text-zinc-300" : "text-zinc-500"
                        }`}
                      >
                        {item.type}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-200/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>* Validated across academic capstones, enterprise internships, and cloud deployments</span>
                <span className="text-zinc-500">16+ Core Tools</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
