"use client";

import React from "react";
import { sound } from "@/utils/sound";
import { Server, Cloud, Database, Box, ArrowRight } from "lucide-react";

export const QuickServicesGrid: React.FC = () => {
  const serviceCategories = [
    {
      num: "01",
      title: "Systems & Backend",
      category: "ENTERPRISE CORE",
      description: "Robust Spring Boot 3 microservices, idempotent REST APIs, strict RBAC authorization, and stateless JWT token workflows.",
      skills: ["Spring Boot 3", "Java 17/21", "Spring Security", "JPA / Hibernate", "DTO Projections"],
      icon: Server,
    },
    {
      num: "02",
      title: "DevOps & Cloud",
      category: "HARDENED INFRA",
      description: "Certified Oracle Cloud Infrastructure (OCI DevOps & Architect), multi-stage Alpine Docker builds, and hardened Linux server administration.",
      skills: ["OCI Cloud Compute", "Docker Multi-Stage", "Linux Daemons", "GitFlow & CI/CD", "n8n Webhooks"],
      icon: Cloud,
    },
    {
      num: "03",
      title: "Databases & RAG",
      category: "DATA PERSISTENCE",
      description: "Relational ACID integrity across PostgreSQL, MySQL, and Oracle PL/SQL, paired with ChromaDB vector search and Gemini API.",
      skills: ["PostgreSQL", "MySQL 8.0", "Oracle DB & PL/SQL", "ChromaDB HNSW", "Gemini RAG"],
      icon: Database,
    },
    {
      num: "04",
      title: "Frontend & 3D Web",
      category: "REACTIVE CLIENT",
      description: "High-performance reactive interfaces with React 19, Next.js App Router, and browser-native 3D CAD modeling with Three.js and WebAssembly.",
      skills: ["Next.js App Router", "React 19 + TypeScript", "Three.js WebGL", "OpenCascade.js Wasm", "Tailwind CSS"],
      icon: Box,
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-zinc-200/80 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-200/80">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-1">
              CORE DISCIPLINES
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-black uppercase">
              Quick-Links &amp; Primary Services
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            4 Core Engineering Competencies
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((serv) => {
            const Icon = serv.icon;
            return (
              <div
                key={serv.num}
                onMouseEnter={() => sound.playHover()}
                className="p-6 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-between transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group cursor-default"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-5">
                    <span className="font-mono text-xs font-bold text-zinc-400 group-hover:text-black transition-colors">
                      {serv.num}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                      {serv.category}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-serif font-bold text-base text-black mb-2">
                    {serv.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-600 leading-relaxed mb-6">
                    {serv.description}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="pt-4 border-t border-zinc-100 space-y-1.5 font-mono text-[11px] text-zinc-500">
                  {serv.skills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-zinc-400" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
