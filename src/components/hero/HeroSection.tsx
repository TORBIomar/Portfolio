"use client";

import React, { useState } from "react";
import { ArrowRight, Copy, Check, Server, Cloud, Database, Sparkles } from "lucide-react";
import { HeroTerminalCard } from "./HeroTerminalCard";
import { PERSONAL_INFO, FOUNDATION_PILLARS } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenContactModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContactModal }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const pillarIcons = [Server, Cloud, Database];

  const handleCopyCli = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.npmCommand);
    setCopied(true);
    sound.playSuccess();
    showToast(`Copied "${PERSONAL_INFO.npmCommand}" to clipboard!`);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-zinc-200/90 dark:border-white/10 bg-[#fcfcfc] dark:bg-[#000000] scroll-mt-20 transition-colors duration-300">
      {/* Subtle fine grid background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-35 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Section 01 Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold mb-6 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
          <span>01 // PROFILE &amp; PHILOSOPHY</span>
        </motion.div>

        {/* Center Official Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="mb-6 cursor-pointer flex items-center justify-center"
        >
          <img
            src="/logo/logo-white.png"
            alt="Omar Torbi"
            className="h-14 sm:h-16 w-auto object-contain hidden dark:block"
          />
          <img
            src="/logo/logo-black.png"
            alt="Omar Torbi"
            className="h-14 sm:h-16 w-auto object-contain block dark:hidden"
          />
        </motion.div>

        {/* Monumental, Ultra-Clear Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight text-neutral-950 dark:text-white uppercase max-w-5xl leading-[1.04] mb-5 transition-colors"
        >
          BUILDING HIGH-PERFORMANCE <br className="hidden sm:inline" />
          DIGITAL EXPERIENCES
          <span className="block text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 mt-2">
            / BY {PERSONAL_INFO.name.toUpperCase()}
          </span>
        </motion.h1>

        {/* Crisp Subheader */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono text-xs sm:text-sm tracking-wider uppercase text-neutral-700 dark:text-neutral-300 max-w-3xl mb-8 leading-relaxed font-semibold transition-colors"
        >
          FULL-STACK ARCHITECTURE • OCI CLOUD &amp; DEVOPS • 3D WEB ENGINEERING <br className="hidden sm:inline" />
          <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-normal">
            STATE ENGINEERING DEGREE (DDSI) — EMSI RABAT • MOROCCO
          </span>
        </motion.p>

        {/* 3-Button Action Tray */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14 sm:mb-18"
        >
          {/* Main Action Button */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer shadow-md"
          >
            <span>EXPLORE SYSTEMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Secondary Action Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              if (onOpenContactModal) onOpenContactModal();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-neutral-950 border border-zinc-300 dark:bg-[#0e0f12] dark:hover:bg-zinc-900 dark:text-white dark:border-zinc-800 text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer shadow-xs"
          >
            <span>REACH OUT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Interactive Copyable CLI Chip */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyCli}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 dark:bg-[#0e0f12] dark:hover:bg-zinc-900 dark:border-zinc-800 text-neutral-900 dark:text-zinc-200 text-xs font-mono font-medium transition-all cursor-pointer shadow-2xs"
            title="Click to copy terminal command"
          >
            <span className="text-neutral-400 dark:text-neutral-500">&gt;</span>
            <span className="font-bold">{PERSONAL_INFO.npmCommand}</span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-black dark:text-white font-bold" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            )}
          </motion.button>
        </motion.div>

        {/* HERO SHOWCASE: terminal-card.svg in unified monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full mb-16"
        >
          <HeroTerminalCard />
        </motion.div>

        {/* About Engineering Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-white/10 rounded-3xl p-7 sm:p-10 text-left shadow-xs mb-14 transition-colors"
        >
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>ABOUT OMAR TORBI</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-sans font-black text-neutral-950 dark:text-white mb-4 leading-snug transition-colors">
            Final-year Computer Science &amp; Networks student at EMSI Rabat. Dual-certified in Oracle Cloud Infrastructure (OCI DevOps &amp; Architect Professional).
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5 transition-colors">
            Specializing in production-grade backend systems with <strong>Spring Boot 3</strong>, containerized cloud infrastructure with <strong>Docker &amp; Linux</strong>, secure REST APIs, and automated workflow pipelines. Driven by modular architecture, clean code, and zero-defect delivery.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-neutral-800 dark:text-zinc-300">
              # OCI DevOps Professional (1Z0-1109-26)
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-neutral-800 dark:text-zinc-300">
              # OCI Architect Professional (1Z0-997-26)
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-neutral-800 dark:text-zinc-300">
              # EMSI State Engineering Degree (DDSI)
            </span>
          </div>
        </motion.div>

        {/* 3 Architectural Pillars (Control, Governance, Value) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {FOUNDATION_PILLARS.map((pillar, idx) => {
            const Icon = pillarIcons[idx];
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 p-7 flex flex-col justify-between hover:border-neutral-950 dark:hover:border-white/40 transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                    <span className="font-mono text-sm font-bold text-neutral-400 dark:text-neutral-500">
                      {pillar.number}
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-900 dark:text-neutral-100 uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white mb-4 group-hover:bg-neutral-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-sans font-bold text-lg text-neutral-950 dark:text-white mb-2 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 transition-colors">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                  {pillar.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-white" />
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
