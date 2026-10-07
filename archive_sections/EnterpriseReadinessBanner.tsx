"use client";

import React from "react";
import { ShieldCheck, Lock, Award, Server } from "lucide-react";
import { sound } from "@/utils/sound";

export const EnterpriseReadinessBanner: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: "OCI DEVOPS PRO",
      code: "1Z0-1109-26",
      desc: "Oracle Cloud Infrastructure",
    },
    {
      icon: Award,
      title: "OCI ARCHITECT PRO",
      code: "1Z0-997-26",
      desc: "Oracle Cloud Infrastructure",
    },
    {
      icon: Server,
      title: "STATE DEGREE (DDSI)",
      code: "EMSI RABAT",
      desc: "Computer Science & Networks",
    },
    {
      icon: Lock,
      title: "ACID INTEGRITY",
      code: "ZERO DISCREPANCY",
      desc: "Relational Persistence",
    },
  ];

  const pills = [
    "STATELESS JWT AUTH",
    "GRANULAR RBAC",
    "MULTI-STAGE ALPINE DOCKER",
    "DTO PROJECTIONS",
    "ZERO N+1 QUERIES",
    "SUB-100MS VECTOR RETRIEVAL",
    "60 FPS WEBGL CAD",
    "EVENT-DRIVEN N8N WEBHOOKS",
  ];

  return (
    <section className="py-20 sm:py-24 border-b border-zinc-200/80 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-black uppercase mb-3">
          Build for the enterprise from day one
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-600 max-w-2xl mx-auto mb-12">
          Security, compliance, and control aren't afterthoughts. Every system is engineered with modular design, stateless auth, and containerized reproducibility.
        </p>

        {/* 4 Center Credential Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-2xl bg-white border border-zinc-200/90 flex flex-col items-center text-center transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-black mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-black tracking-tight">
                  {b.title}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 mt-0.5">
                  {b.code}
                </span>
                <span className="font-sans text-[11px] text-zinc-400 mt-1">
                  {b.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {pills.map((pill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] font-mono font-medium"
            >
              {pill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
