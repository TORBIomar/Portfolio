"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import {
  ArrowUp,
  Download,
  ExternalLink,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../common/SocialIcons";

export const RichFooter: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full">
      {/* ========================================================= */}
      {/* MAIN FOOTER LAYER: Grid containing Links, Stack & Credentials */}
      {/* ========================================================= */}
      <div className="bg-[#090b10] text-zinc-300 py-16 sm:py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Bio with official white logo */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo/logo-white.png"
                  alt="Omar Torbi Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-mono text-sm font-bold text-white tracking-tight">
                  OMAR TORBI // ENGINEER
                </span>
              </div>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-sm">
                Software &amp; DevOps Engineer and final-year student at EMSI Rabat (DDSI). Triple-certified in Java SE 17 Developer and Oracle Cloud Infrastructure (OCI DevOps &amp; Architect Professional).
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-white" />
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
                <li><span>Java 17/21 &amp; Spring Boot 3</span></li>
                <li><span>Docker &amp; Linux Hardening</span></li>
                <li><span>Oracle Cloud (OCI) DevOps</span></li>
                <li><span>PostgreSQL, MySQL &amp; PL/SQL</span></li>
                <li><span>Three.js &amp; Wasm OpenCascade</span></li>
                <li><span>REST APIs &amp; Microservices</span></li>
              </ul>
            </div>

            {/* Col 4: Documents & Official Certifications */}
            <div className="space-y-3 font-sans text-xs">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-1">
                Credentials &amp; CVs
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
                <li className="pt-1.5">
                  <span className="text-zinc-300 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    <span>Java SE 17 Professional (1Z0-829)</span>
                  </span>
                </li>
                <li>
                  <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block" />
                    <span>OCI DevOps Pro (1Z0-1109-26)</span>
                  </span>
                </li>
                <li>
                  <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block" />
                    <span>OCI Architect Pro (1Z0-997-26)</span>
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Social Profiles & Back to Top Strip */}
          <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-6">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub (@TORBIomar)</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn (/in/omar-torbi)</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM TELEMETRY BAR: Copyright & Stack */}
      {/* ========================================================= */}
      <div className="bg-[#050608] text-zinc-500 py-6 text-xs font-mono border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}.</span>
            <span className="text-zinc-700">•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            <span className="text-zinc-300">All systems operational</span>
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
