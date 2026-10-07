"use client";

import React, { useState } from "react";
import { BrandIcon } from "../common/BrandIcon";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";
import {
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUp,
  Download,
  ExternalLink,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../common/SocialIcons";

export const RichFooter: React.FC = () => {
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    sound.playSuccess();
    showToast(`Copied ${PERSONAL_INFO.email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    sound.playSuccess();
    showToast(`Copied ${PERSONAL_INFO.phone} to clipboard!`);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full">
      {/* ========================================================= */}
      {/* LAYER 1 (Dark Block): Grid containing Links & Navigation */}
      {/* ========================================================= */}
      <div className="bg-[#090b10] text-zinc-300 py-16 sm:py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <BrandIcon className="w-8 h-8 text-white" />
                <span className="font-mono text-sm font-bold text-white tracking-tight">
                  OMAR TORBI // ENGINEER
                </span>
              </div>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-sm">
                Software &amp; DevOps Engineer and final-year student at EMSI Rabat (DDSI). Dual certified in Oracle Cloud Infrastructure (OCI DevOps &amp; Architect Professional). Architecting modular enterprise systems and automated cloud pipelines.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Available for PFE Internship (Feb 2027)</span>
              </div>
            </div>

            {/* Col 2: Engineered Systems */}
            <div className="space-y-3 font-sans text-xs">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-1">
                Engineered Systems
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#projects" className="hover:text-white transition-colors">Zahiri Metal 3D CAD</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Elevate Recruitment RBAC</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Sofia Intelligent Library</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Creator Outreach Matrix</a></li>
              </ul>
            </div>

            {/* Col 3: Capabilities */}
            <div className="space-y-3 font-sans text-xs">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-1">
                Technical Stack
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li><span>Spring Boot 3 &amp; Java 17/21</span></li>
                <li><span>Docker &amp; Linux Hardening</span></li>
                <li><span>Oracle Cloud (OCI) DevOps</span></li>
                <li><span>PostgreSQL, MySQL &amp; PL/SQL</span></li>
                <li><span>Three.js &amp; Wasm OpenCascade</span></li>
                <li><span>n8n Webhook Automations</span></li>
              </ul>
            </div>

            {/* Col 4: Documents & Credentials */}
            <div className="space-y-3 font-sans text-xs">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-1">
                Documents &amp; CVs
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a
                    href={PERSONAL_INFO.resumeUrlEn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Download className="w-3 h-3 text-zinc-500" />
                    <span>English Resume (PDF)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.resumeUrlFr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Download className="w-3 h-3 text-zinc-500" />
                    <span>CV Français (PDF)</span>
                  </a>
                </li>
                <li>
                  <span className="text-zinc-500 font-mono text-[11px]">OCI DevOps Pro (1Z0-1109-26)</span>
                </li>
                <li>
                  <span className="text-zinc-500 font-mono text-[11px]">OCI Architect Pro (1Z0-997-26)</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 2 (Contrast Block): Massive "LET'S WORK TOGETHER" */}
      {/* ========================================================= */}
      <div className="bg-[#fcfcfc] dark:bg-[#000000] text-black dark:text-white py-16 sm:py-24 border-t border-b border-zinc-200/90 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            {/* Monumental Headline */}
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-3">
                OPEN FOR COLLABORATION
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-black dark:text-white uppercase leading-none transition-colors">
                LET'S WORK TOGETHER <br />
                <span className="text-zinc-400 dark:text-zinc-600">/ REACH OUT</span>
              </h2>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors self-start lg:self-auto cursor-pointer"
              title="Return to top of page"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Contact Channels Tray */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 sm:mt-16">
            
            {/* Email Pill */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">Direct Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono text-xs font-bold text-black dark:text-white hover:underline truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer shrink-0 ml-2"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone / WhatsApp Pill */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">Phone &amp; WhatsApp</div>
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-black dark:text-white hover:underline truncate block"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer shrink-0 ml-2"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* GitHub Pill */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-4 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors flex items-center justify-center text-black dark:text-white shrink-0">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">GitHub Profile</div>
                  <span className="font-mono text-xs font-bold text-black dark:text-white">
                    @TORBIomar
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn Pill */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-4 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200/90 dark:border-white/10 flex items-center justify-between shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors flex items-center justify-center text-black dark:text-white shrink-0">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">LinkedIn</div>
                  <span className="font-mono text-xs font-bold text-black dark:text-white">
                    Omar Torbi
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
            </a>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 3 (Bottom Minimal Bar): Copyright & Telemetry */}
      {/* ========================================================= */}
      <div className="bg-[#050608] text-zinc-500 py-6 text-xs font-mono border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}.</span>
            <span className="text-zinc-700">•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="text-zinc-400">All systems operational</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400">{PERSONAL_INFO.coordinates}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500">
            <span>Next.js App Router</span>
            <span className="text-zinc-700">•</span>
            <span>Tailwind CSS</span>
            <span className="text-zinc-700">•</span>
            <span>Framer Motion</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
