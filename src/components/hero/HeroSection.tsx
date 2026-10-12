"use client";

import React from "react";
import { ArrowRight, Search, Server, Cloud, Database } from "lucide-react";
import { HeroTerminalCard } from "./HeroTerminalCard";
import { FOUNDATION_PILLARS, FOUNDATION_PILLARS_FR } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenContactModal?: () => void;
  onOpenCommandPalette?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContactModal, onOpenCommandPalette }) => {
  const { language, t } = useLanguage();
  const pillarIcons = [Server, Cloud, Database];
  const activePillars = language === "fr" ? FOUNDATION_PILLARS_FR : FOUNDATION_PILLARS;

  const handleOpenPalette = () => {
    sound.playClick();
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-zinc-200/90 dark:border-white/10 bg-[#fcfcfc] dark:bg-[#000000] scroll-mt-20">
      {/* Subtle fine grid background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-35 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Section 01 Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-semibold mb-6 shadow-2xs text-neutral-700 dark:text-neutral-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-mono text-accent font-bold">01.</span>
          <span>{t.hero.tag}</span>
        </div>

        {/* Center Official Brand Logo */}
        <div className="mb-4 cursor-pointer flex items-center justify-center">
          <img
            src="/logo/logo-white.webp"
            alt="Omar Torbi"
            width={128}
            height={64}
            fetchPriority="high"
            decoding="async"
            className="h-14 sm:h-16 w-auto object-contain hidden dark:block"
          />
          <img
            src="/logo/logo-black.webp"
            alt="Omar Torbi"
            width={128}
            height={64}
            fetchPriority="high"
            decoding="async"
            className="h-14 sm:h-16 w-auto object-contain block dark:hidden"
          />
        </div>

        {/* Signature Name Highlight Badge (Salah Khadir style) */}
        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg font-sans tracking-wide mb-3 flex flex-wrap items-center justify-center gap-x-1.5">
          <span>{language === "fr" ? "Bonjour, je m'appelle" : "Hi, my name is"}</span>
          <span className="relative inline-block px-2.5 py-0.5 bg-accent text-white dark:text-neutral-950 font-bold before:absolute before:-inset-1 before:bg-accent before:-skew-y-3 before:-z-10 mx-1.5 shadow-xs">
            Omar Torbi
          </span>
          <span>{language === "fr" ? "et je suis un" : "and I'm a"}</span>
        </p>

        {/* Monumental, Ultra-Clear Headline (Critical LCP element - rendered instantly) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight text-neutral-950 dark:text-white uppercase max-w-5xl leading-[1.04] mb-5">
          {language === "fr" ? (
            <>
              INGÉNIEUR LOGICIEL <br className="hidden sm:inline" />
              &amp; DEVOPS
            </>
          ) : (
            <>
              SOFTWARE AND DEVOPS <br className="hidden sm:inline" />
              ENGINEER
            </>
          )}
        </h1>

        {/* Crisp Subheader */}
        <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-neutral-700 dark:text-neutral-300 max-w-3xl mb-8 leading-relaxed font-semibold">
          {language === "fr" ? (
            <>
              ARCHITECTURE SYSTÈMES • CLOUD OCI &amp; DEVOPS • INGÉNIERIE 3D WEB <br className="hidden sm:inline" />
              <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-normal">
                DIPLÔME D'INGÉNIEUR D'ÉTAT (DDSI) — EMSI RABAT • MAROC
              </span>
            </>
          ) : (
            <>
              FULL-STACK ARCHITECTURE • OCI CLOUD &amp; DEVOPS • 3D WEB ENGINEERING <br className="hidden sm:inline" />
              <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-normal">
                STATE ENGINEERING DEGREE (DDSI) — EMSI RABAT • MOROCCO
              </span>
            </>
          )}
        </p>

        {/* 3-Button Action Tray */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14 sm:mb-18">
          {/* Main Action Button */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sound.playClick()}
            data-cursor-label="Projects"
            className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 text-xs sm:text-sm font-sans font-bold cursor-pointer shadow-md uppercase"
          >
            <span>{t.hero.projectsCta}</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </motion.a>

          {/* Secondary Action Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sound.playClick()}
            data-cursor-label="Contact"
            className="cursor-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-neutral-950 border border-zinc-300 dark:bg-[#0e0f12] dark:hover:bg-zinc-900 dark:text-white dark:border-zinc-800 text-xs sm:text-sm font-sans font-bold cursor-pointer shadow-xs uppercase"
          >
            <span>{t.hero.contactCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Interactive Command Palette Trigger Chip */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenPalette}
            data-cursor-label="Palette"
            className="cursor-target inline-flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 dark:bg-[#0e0f12] dark:hover:bg-zinc-900 dark:border-zinc-800 text-neutral-900 dark:text-zinc-200 text-xs font-mono font-medium cursor-pointer shadow-2xs transition-colors"
            title={language === "fr" ? "Ouvrir la palette de commandes (⌘K)" : "Open command palette (⌘K)"}
          >
            <Search className="w-3.5 h-3.5 text-accent" />
            <span className="font-semibold">
              {language === "fr" ? "Palette de commandes" : "Command Palette"}
            </span>
            <kbd className="ml-0.5 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 border border-zinc-300 dark:border-zinc-700 font-semibold">
              ⌘K
            </kbd>
          </motion.button>
        </div>

        {/* HERO SHOWCASE: Main About Me ($ whoami terminal card) */}
        <div className="w-full mb-16 sm:mb-20">
          <HeroTerminalCard />
        </div>

        {/* 3 Architectural Pillars (Control, Governance, Value) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {activePillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx];
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 hover:border-accent/40 hover:shadow-[0_10px_30px_var(--accent-glow)] p-7 flex flex-col justify-between transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                    <span className="font-mono text-sm font-bold text-accent">
                      {pillar.number}.
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-900 dark:text-neutral-100 uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white mb-4 group-hover:text-accent transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-sans font-bold text-lg text-neutral-950 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 transition-colors">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                  {pillar.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
