"use client";

import React, { useState } from "react";
import { EXPERIENCES_DATA } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ExperienceSection: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES_DATA[0].id);

  const activeExp = EXPERIENCES_DATA.find((e) => e.id === activeExpId) || EXPERIENCES_DATA[0];

  return (
    <section id="experiences" className="py-24 sm:py-32 border-b border-zinc-200/90 bg-[#fcfcfc] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/80 border border-zinc-300 text-zinc-800 text-xs font-mono font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5 text-black" />
            <span>02 // EXPERIENCE &amp; ACADEMICS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-neutral-950 uppercase mb-3">
            Industry Experience &amp; Academic Track
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
            Delivering production systems across industrial CAD manufacturing, public administration logistics, and computer science engineering at EMSI Rabat.
          </p>
        </motion.div>

        {/* Desktop & Mobile Interactive Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Organization Switcher Tabs (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            {EXPERIENCES_DATA.map((exp, idx) => {
              const isActive = activeExpId === exp.id;
              return (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sound.playClick();
                    setActiveExpId(exp.id);
                  }}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-md ring-1 ring-neutral-950/20"
                      : "bg-white text-neutral-800 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold tracking-wider uppercase ${
                        isActive ? "text-neutral-300" : "text-neutral-500"
                      }`}>
                        {exp.company}
                      </span>
                    </div>
                    <div className={`font-sans text-sm font-bold line-clamp-1 ${
                      isActive ? "text-white" : "text-neutral-950"
                    }`}>
                      {exp.role}
                    </div>
                    <div className={`font-mono text-[11px] ${
                      isActive ? "text-neutral-400" : "text-neutral-400"
                    }`}>
                      {exp.period}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? "text-white translate-x-1" : "text-neutral-400"
                  }`} />
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Active Experience Detail Panel (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-7 sm:p-9 rounded-3xl bg-white border border-zinc-200/90 shadow-xs"
              >
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      {activeExp.company}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-black text-neutral-950">
                      {activeExp.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-600 sm:text-right">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{activeExp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{activeExp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Callout Strip */}
                <div className="grid grid-cols-3 gap-3 my-6">
                  {activeExp.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-xl bg-[#f9f9fa] border border-zinc-200 text-center"
                    >
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">
                        {m.label}
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-neutral-950 mt-1">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievements List */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Key Deliverables &amp; Architectural Focus
                  </span>
                  {activeExp.highlights.map((h, hIdx) => (
                    <motion.div
                      key={hIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: hIdx * 0.05 }}
                      className="flex items-start gap-3 font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies Footer */}
                <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-neutral-400 mr-2">
                    Core Technologies:
                  </span>
                  {activeExp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-neutral-800 text-xs font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
