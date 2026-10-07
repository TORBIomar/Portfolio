"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    sound.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 border-b border-zinc-200/90 bg-[#f9f9fa] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/80 border border-zinc-300 text-zinc-800 text-xs font-mono font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-black" />
            <span>04 // SYSTEM SPECS &amp; FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-neutral-950 uppercase mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
            Direct technical answers regarding my professional availability, backend engineering standards, and systems architecture.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-neutral-900 shadow-sm ring-1 ring-neutral-900/5"
                    : "bg-white/80 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    <span className="font-mono text-xs sm:text-sm font-bold text-neutral-400 shrink-0">
                      0{idx + 1}.
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-zinc-100 text-neutral-700">
                          {item.tag}
                        </span>
                      </div>
                      <span className="font-sans text-sm sm:text-base font-bold text-neutral-950 block">
                        {item.question}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={`p-1.5 rounded-full border shrink-0 ${
                      isOpen
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-zinc-100 text-neutral-500 border-zinc-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-zinc-100 font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        <div className="pl-7 sm:pl-9">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span>Have an unconventional question?</span>
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="font-bold text-neutral-950 hover:underline flex items-center gap-1"
            >
              <span>Reach out directly</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
