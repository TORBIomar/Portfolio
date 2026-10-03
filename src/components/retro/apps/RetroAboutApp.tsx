import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../../data/portfolioData';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

import { RetroAppType } from '../../../types/retro';

interface RetroAboutAppProps {
  onOpenApp?: (appType: RetroAppType) => void;
}

export const RetroAboutApp: React.FC<RetroAboutAppProps> = ({ onOpenApp }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'certs' | 'strengths' | 'contact'>('system');

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] text-black font-screen text-xs p-4 overflow-y-auto">
      {/* 1. Cheerful Colorful Hero Header with Generous Padding */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-100 via-rose-100 to-purple-100 border-2 border-black shadow-[4px_4px_0px_#000000] mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-2.5 border-2 border-black bg-white shadow-xs rounded-sm shrink-0">
            <RetroIcon name="mac" size={44} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-screen text-base sm:text-lg font-bold text-black tracking-wide">{PERSONAL_INFO.name}</h1>
              <span className="text-[9px] sm:text-[10px] bg-purple-700 text-white px-1.5 sm:px-2 py-0.5 font-mono font-bold rounded-sm border border-black shadow-xs">
                PRO v7.5
              </span>
            </div>
            <p className="font-bold text-xs sm:text-sm text-purple-900 mt-0.5">{PERSONAL_INFO.titleDisplay}</p>
            <p className="text-[11px] sm:text-xs text-neutral-600 font-mono mt-0.5">{PERSONAL_INFO.location}</p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-neutral-400">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-100 border-2 border-emerald-800 text-emerald-950 font-bold text-[11px] sm:text-xs shadow-xs">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Open for PFE Internship (Feb 2027)</span>
          </span>
          <span className="text-[9px] sm:text-[10px] text-neutral-600 font-mono mt-0.5">&amp; Full-Time Software / DevOps</span>
        </div>
      </div>

      {/* Prominent Quick Launch Bar for Essential Apps */}
      <div className="bg-amber-200 border-2 border-black p-3 mb-3.5 flex flex-wrap items-center justify-between gap-2.5 shadow-[2px_2px_0px_#000]">
        <div className="flex items-center gap-1.5 py-1">
          <span className="text-sm">⭐</span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            ESSENTIAL APPS:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenApp?.('projects')}
            className="px-3.5 py-2 my-1 bg-white hover:bg-black hover:text-white border-2 border-black font-bold text-xs flex items-center gap-2.5 cursor-pointer transition-colors shadow-xs active:translate-y-0.5"
          >
            <span>📁</span>
            <span>6 Projects</span>
          </button>
          <button
            onClick={() => onOpenApp?.('capabilities')}
            className="px-3.5 py-2 my-1 bg-white hover:bg-black hover:text-white border-2 border-black font-bold text-xs flex items-center gap-2.5 cursor-pointer transition-colors shadow-xs active:translate-y-0.5"
          >
            <span>⚡</span>
            <span>Tech Stacks</span>
          </button>
          <button
            onClick={() => onOpenApp?.('experience')}
            className="px-3.5 py-2 my-1 bg-white hover:bg-black hover:text-white border-2 border-black font-bold text-xs flex items-center gap-2.5 cursor-pointer transition-colors shadow-xs active:translate-y-0.5"
          >
            <span>💼</span>
            <span>Experience</span>
          </button>
          <button
            onClick={() => onOpenApp?.('contact')}
            className="px-3.5 py-2 my-1 bg-emerald-400 hover:bg-emerald-500 text-black border-2 border-black font-bold text-xs flex items-center gap-2.5 cursor-pointer transition-colors shadow-xs active:translate-y-0.5"
          >
            <span>📬</span>
            <span>Hire &amp; Contact</span>
          </button>
          <a
            href={PERSONAL_INFO.resumeUrlEn}
            download="OMAR-TORBI-RESUME-EN.pdf"
            onClick={() => retroSound.playFloppySeek()}
            className="px-3.5 py-2 my-1 bg-purple-200 hover:bg-purple-300 text-purple-950 border-2 border-black font-bold text-xs flex items-center gap-2.5 cursor-pointer transition-colors shadow-xs active:translate-y-0.5"
          >
            <span>💾</span>
            <span>Resume (PDF)</span>
          </a>
        </div>
      </div>

      {/* 2. Roomier Navigation Tabs with Margins */}
      <div className="flex flex-wrap gap-2 border-b-2 border-black mb-4">
        {[
          { id: 'system', label: 'Overview' },
          { id: 'certs', label: 'Degree & OCI Certs' },
          { id: 'strengths', label: 'Strengths & Stacks' },
          { id: 'contact', label: 'Fast Action & CV' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                retroSound.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 my-0.5 text-xs font-bold border-t-2 border-l-2 border-r-2 border-black transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white text-black -mb-[2px] pb-3 z-10'
                  : 'bg-[#E5E7EB] text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Client Area with Easy-to-Read Text & Generous Padding */}
      <div className="flex-1 bg-white border-2 border-black p-5 overflow-y-auto shadow-[3px_3px_0px_#000]">
        {activeTab === 'system' && (
          <div className="space-y-5">
            {/* Tagline Box with Warm Pastel Accent */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 border-dashed rounded-xs">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-800 block mb-1.5">
                // System Specification &amp; Engineering Focus
              </span>
              <p className="text-sm leading-relaxed text-black font-semibold">
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            {/* Architecture Telemetry Table */}
            <div className="border-2 border-black bg-[#F8FAFC] p-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-1.5 flex items-center justify-between text-neutral-800">
                <span>Hardware Architecture &amp; Credentials</span>
                <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5 font-bold">VERIFIED SPEC</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border-2 border-neutral-300 shadow-xs">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">State Engineering Degree:</span>
                  <span className="font-bold text-neutral-900 text-sm">EMSI Rabat — DDSI (2022–Present)</span>
                </div>
                <div className="p-3 bg-white border-2 border-neutral-300 shadow-xs">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Cloud Accreditations:</span>
                  <span className="font-bold text-purple-900 text-sm">OCI DevOps &amp; Architect Professional</span>
                </div>
                <div className="p-3 bg-white border-2 border-neutral-300 shadow-xs">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Core Frameworks:</span>
                  <span className="font-bold text-emerald-800 text-sm">Spring Boot 3, Docker, Linux, React</span>
                </div>
                <div className="p-3 bg-white border-2 border-neutral-300 shadow-xs">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Primary Database Engines:</span>
                  <span className="font-bold text-blue-900 text-sm">MySQL, PostgreSQL, Oracle DB, ChromaDB</span>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider mb-2 text-neutral-800">
                Executive Profile Summary:
              </h2>
              <p className="text-xs leading-relaxed text-neutral-800 bg-[#F1F5F9] p-3.5 border-2 border-neutral-300">
                {PERSONAL_INFO.summary}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="space-y-5">
            {/* OCI Certifications in Vibrant Oracle Cloud Blue / Gold */}
            <div>
              <div className="flex items-center gap-2.5 mb-3 pb-1.5 border-b-2 border-black">
                <RetroIcon name="cpu" size={20} />
                <h2 className="font-bold text-xs uppercase tracking-wider text-black">
                  Oracle Cloud Infrastructure (OCI) Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PERSONAL_INFO.certifications.map((cert) => (
                  <div
                    key={cert.code}
                    className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-black shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-xs font-mono bg-blue-900 text-white font-bold px-2 py-0.5">
                          {cert.code}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 border border-emerald-400">
                          VERIFIED BADGE
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-neutral-950 leading-tight">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-blue-900 font-bold mt-1.5">{cert.issuer}</p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-blue-200 flex items-center justify-between text-xs">
                      <span className="text-neutral-600">Engineering Credential</span>
                      <span className="font-bold text-blue-800 font-mono">Professional Tier</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* University & Degree in Rich Purple */}
            <div>
              <div className="flex items-center gap-2.5 mb-3 pb-1.5 border-b-2 border-black">
                <RetroIcon name="folder" size={20} />
                <h2 className="font-bold text-xs uppercase tracking-wider text-black">
                  Academic Engineering Degree
                </h2>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-base text-purple-950">
                    State Engineering Degree in Computer Science and Networks (DDSI)
                  </h3>
                  <span className="text-xs font-mono bg-purple-900 text-white px-2 py-0.5 font-bold">
                    2022 — Present
                  </span>
                </div>
                <p className="text-xs font-bold text-purple-900 mt-1">
                  École Marocaine des Sciences de l'Ingénieur (EMSI Rabat)
                </p>
                <p className="text-xs mt-2.5 leading-relaxed text-neutral-800">
                  Comprehensive 5-year engineering curriculum covering distributed backend architectures, advanced OOP (Java, C++), network engineering, enterprise security, and containerized cloud systems.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strengths' && (
          <div className="space-y-5">
            {/* Core Strengths */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider mb-3 border-b-2 border-black pb-1.5">
                Core Engineering Strengths
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERSONAL_INFO.coreStrengths.map((str, idx) => (
                  <div key={idx} className="p-3 border-2 border-black bg-amber-50 flex items-center gap-3 shadow-xs">
                    <span className="w-6 h-6 bg-amber-500 text-black font-mono text-xs font-bold flex items-center justify-center shrink-0 border-2 border-black">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-900">{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spoken Languages in Cheerful Cards */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider mb-3 border-b-2 border-black pb-1.5">
                Languages &amp; Fluency
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {PERSONAL_INFO.spokenLanguages.map((lang) => (
                  <div key={lang.name} className="p-3.5 border-2 border-black bg-emerald-50 text-center shadow-xs">
                    <div className="font-bold text-sm text-emerald-950">{lang.name}</div>
                    <div className="text-xs text-emerald-800 font-bold mt-1">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Roles in Vibrant Pill Badges */}
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider mb-3 border-b-2 border-black pb-1.5">
                Target Positions &amp; Roles
              </h2>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 bg-black text-yellow-300 text-xs font-mono font-bold tracking-wide border-2 border-black shadow-xs"
                  >
                    ★ {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-5">
            <div className="p-3.5 bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-black">
              <span className="font-bold text-xs text-amber-950 block mb-1">Instant Recruiter Fast Actions:</span>
              <p className="text-xs text-neutral-800 leading-relaxed">
                Download verified PDF resumes or open a direct encrypted communication channel below:
              </p>
            </div>

            {/* Resume Download Buttons with Bigger Floppies & Margins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.resumeUrlEn}
                download="OMAR-TORBI-RESUME-EN.pdf"
                onClick={() => retroSound.playFloppySeek()}
                className="p-4 bg-blue-50 border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-blue-100 flex items-center gap-4 cursor-pointer group active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              >
                <RetroIcon name="floppy" size={36} />
                <div>
                  <div className="font-bold text-sm text-blue-950 group-hover:underline">Download Resume (EN)</div>
                  <div className="text-xs text-blue-800 font-mono mt-0.5">PDF Document • English</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrlFr}
                download="OMAR-TORBI-CV-FR.pdf"
                onClick={() => retroSound.playFloppySeek()}
                className="p-4 bg-purple-50 border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-purple-100 flex items-center gap-4 cursor-pointer group active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              >
                <RetroIcon name="floppy" size={36} />
                <div>
                  <div className="font-bold text-sm text-purple-950 group-hover:underline">Download CV (FR)</div>
                  <div className="text-xs text-purple-800 font-mono mt-0.5">PDF Document • Français</div>
                </div>
              </a>
            </div>

            {/* Direct Connect Buttons with Generous Margins & Padding */}
            <div className="border-t-2 border-black pt-4 flex flex-wrap gap-3">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => retroSound.playClick()}
                className="px-4 py-2.5 my-1 bg-[#25D366] text-black border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:brightness-105 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Chat on WhatsApp ({PERSONAL_INFO.phone})</span>
                <span>↗</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => retroSound.playClick()}
                className="px-4 py-2.5 my-1 bg-rose-500 text-white border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-rose-600 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Email: {PERSONAL_INFO.email}</span>
                <span>✉</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => retroSound.playClick()}
                className="px-4 py-2.5 my-1 bg-[#0A66C2] text-white border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:brightness-105 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>LinkedIn Profile</span>
                <span>↗</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => retroSound.playClick()}
                className="px-4 py-2.5 my-1 bg-black text-white border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-neutral-800 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>GitHub Repositories</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs text-neutral-600 font-mono flex justify-between">
        <span>RAM: 32,768K Loaded • Hardware Acceleration</span>
        <span>Morocco Standard Time (UTC+1)</span>
      </div>
    </div>
  );
};
