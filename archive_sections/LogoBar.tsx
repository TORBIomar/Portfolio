"use client";

import React from "react";

export const LogoBar: React.FC = () => {
  const logos = [
    { name: "EMSI RABAT", subtitle: "Engineering School" },
    { name: "ZAHIRI METAL", subtitle: "Industrial 3D CAD" },
    { name: "ONSSA", subtitle: "National Food Safety" },
    { name: "ORACLE CLOUD", subtitle: "OCI Certified Pro" },
    { name: "SPRING BOOT 3", subtitle: "Enterprise Backend" },
    { name: "DOCKER & LINUX", subtitle: "Containerization" },
    { name: "POSTGRESQL", subtitle: "ACID Database" },
    { name: "MYSQL 8.0", subtitle: "Relational Storage" },
    { name: "REACT & NEXT.JS", subtitle: "Modern Frontend" },
    { name: "THREE.JS & WASM", subtitle: "WebGL CAD Kernel" },
    { name: "PYTHON & N8N", subtitle: "Pipelines & Scraping" },
    { name: "CHROMADB & RAG", subtitle: "Vector Search" },
  ];

  return (
    <section className="py-12 border-b border-zinc-200/80 bg-[#f9f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-[11px] tracking-widest uppercase text-zinc-400 mb-8">
          PRODUCTION-TESTED ACROSS ENTERPRISE FRAMEWORKS &amp; INDUSTRIAL CLIENTS
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {logos.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-zinc-200/90 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-zinc-400 hover:shadow-xs group cursor-default"
            >
              <span className="font-mono text-xs font-bold tracking-tight text-zinc-800 group-hover:text-black">
                {item.name}
              </span>
              <span className="text-[10px] font-sans text-zinc-400 group-hover:text-zinc-500 mt-0.5">
                {item.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
