"use client";

import React, { useState } from "react";
import { ArrowRight, Copy, Check, Terminal, Server, Cloud, Database, ShieldCheck } from "lucide-react";
import { BrandIcon } from "../common/BrandIcon";
import { HeroMockup } from "./HeroMockup";
import { PERSONAL_INFO, FOUNDATION_PILLARS, STACK_MODELS } from "@/data/portfolioData";
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
    <section id="about" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-zinc-200/90 bg-[#fcfcfc] scroll-mt-16">
      {/* Subtle fine grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Section 01 Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/80 border border-zinc-300 text-neutral-800 text-xs font-mono font-semibold mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>01 // PROFILE &amp; PHILOSOPHY</span>
        </motion.div>

        {/* Center Geometric Brand Icon with interactive rotational micro-animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ rotate: 90, scale: 1.05 }}
          className="mb-6 cursor-pointer"
        >
          <BrandIcon className="w-14 h-14 sm:w-16 sm:h-16 text-black" />
        </motion.div>

        {/* Monumental, Ultra-Clear Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight text-neutral-950 uppercase max-w-5xl leading-[1.04] mb-5"
        >
          BUILDING HIGH-PERFORMANCE <br className="hidden sm:inline" />
          DIGITAL EXPERIENCES
          <span className="block text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-wider text-neutral-500 mt-2">
            / BY {PERSONAL_INFO.name.toUpperCase()}
          </span>
        </motion.h1>

        {/* Crisp Subheader */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-mono text-xs sm:text-sm tracking-wider uppercase text-neutral-700 max-w-3xl mb-8 leading-relaxed font-semibold"
        >
          FULL-STACK ARCHITECTURE • OCI CLOUD &amp; DEVOPS • 3D WEB ENGINEERING <br className="hidden sm:inline" />
          <span className="text-neutral-500 text-[11px] font-normal">
            STATE ENGINEERING DEGREE (DDSI) — EMSI RABAT • MOROCCO
          </span>
        </motion.p>

        {/* 3-Button Action Tray */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16 sm:mb-20"
        >
          {/* Black Pill Button */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer shadow-md"
          >
            <span>EXPLORE SYSTEMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* White Pill Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playClick();
              if (onOpenContactModal) onOpenContactModal();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-neutral-950 border border-zinc-300 text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer shadow-xs"
          >
            <span>REACH OUT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Interactive Copyable CLI Chip */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyCli}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-neutral-900 text-xs font-mono font-medium transition-all cursor-pointer"
            title="Click to copy terminal command"
          >
            <span className="text-neutral-400">&gt;</span>
            <span className="font-bold">{PERSONAL_INFO.npmCommand}</span>
            <span className="text-zinc-300">|</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
            )}
          </motion.button>
        </motion.div>

        {/* Hero Interactive Showcase Window with subtle floating ambient animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full mb-16"
        >
          <HeroMockup />
        </motion.div>

        {/* About Engineering Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white border border-zinc-200 rounded-3xl p-7 sm:p-10 text-left shadow-xs mb-14"
        >
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
            <span>ABOUT OMAR TORBI</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-sans font-black text-neutral-950 mb-4 leading-snug">
            Final-year Computer Science &amp; Networks student at EMSI Rabat. Dual-certified in Oracle Cloud Infrastructure (OCI DevOps &amp; Architect Professional).
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
            Specializing in production-grade backend systems with <strong>Spring Boot 3</strong>, containerized cloud infrastructure with <strong>Docker &amp; Linux</strong>, secure REST APIs, and automated workflow pipelines. Driven by modular architecture, clean code, and zero-defect delivery.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium text-neutral-800">
              # OCI DevOps Professional (1Z0-1109-26)
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium text-neutral-800">
              # OCI Architect Professional (1Z0-997-26)
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium text-neutral-800">
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
                className="rounded-3xl bg-white border border-zinc-200/90 p-7 flex flex-col justify-between hover:border-neutral-950 transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-zinc-100 mb-5">
                    <span className="font-mono text-sm font-bold text-neutral-400">
                      {pillar.number}
                    </span>
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-900 uppercase px-2.5 py-0.5 rounded-full bg-zinc-100">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-black mb-4 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-sans font-bold text-lg text-neutral-950 mb-2">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 space-y-1.5 font-mono text-[11px] text-neutral-600 font-medium">
                  {pillar.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
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
