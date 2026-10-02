import React from 'react';
import { ShieldCheck, Server, Cloud, Database, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <SectionHeading
            badge="01. Profile & Philosophy"
            title="ENGINEERING FOCUS"
            subtitle="Bridging high-performance backend architecture with automated cloud infrastructure and reproducible DevOps."
            className="mb-0"
          />
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
            <p className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-white leading-relaxed">
              I am <strong className="font-semibold text-neutral-900 dark:text-white">{PERSONAL_INFO.name}</strong>, a final-year Computer Science &amp; Networks engineering student at <strong className="font-semibold text-neutral-900 dark:text-white">EMSI Rabat</strong> and an <span className="text-[#E58A3C] font-medium">OCI Certified DevOps &amp; Architect Professional</span>.
            </p>
            
            <p>
              My engineering discipline centers on two symbiotic pillars: <strong className="font-medium text-neutral-900 dark:text-white">Software Engineering</strong> and <strong className="font-medium text-neutral-900 dark:text-white">DevOps &amp; Cloud Infrastructure</strong>. On the software side, I architect enterprise applications with <strong className="font-medium text-neutral-900 dark:text-white">Spring Boot</strong> and modular REST APIs, enforcing strict stateless JWT authentication, role-based access control (RBAC), and clean architecture principles.
            </p>

            <p>
              On the infrastructure side, I design reproducible, containerized deployments using multi-stage <strong className="font-medium text-neutral-900 dark:text-white">Docker</strong> builds, minimal Alpine runtimes, and hardened <strong className="font-medium text-neutral-900 dark:text-white">Linux</strong> environments. Certified in <strong className="font-medium text-neutral-900 dark:text-white">Oracle Cloud Infrastructure (OCI)</strong> across both DevOps and Architecture tracks, I build with fault-tolerance, network isolation, and automated pipelines in mind.
            </p>

            <p>
              At the data layer, I prioritize transactional consistency (ACID) and schema hygiene across <strong className="font-medium text-neutral-900 dark:text-white">PostgreSQL</strong>, <strong className="font-medium text-neutral-900 dark:text-white">Oracle DB (PL/SQL)</strong>, and <strong className="font-medium text-neutral-900 dark:text-white">MySQL 8.0</strong>, tuning query execution plans and indexes to prevent performance bottlenecks.
            </p>

            {/* Quick action links */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
              <a
                href={PERSONAL_INFO.resumeUrlEn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer"
              >
                <span>English Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrlFr}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-neutral-100 dark:bg-white/[0.05] border border-neutral-300 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-semibold hover:border-[#E58A3C] hover:text-[#E58A3C] transition-colors cursor-pointer"
              >
                <span>CV Français (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Technical Pillars Bento */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            
            {/* Pillar 1: Certifications & Cloud */}
            <div className="p-4 rounded-md bg-white dark:bg-[#141820] border border-neutral-300 dark:border-neutral-800 space-y-1.5 hover:border-[#E58A3C] transition-colors">
              <div className="flex items-center gap-2 text-[#E58A3C]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Cloud Certifications
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                OCI DevOps &amp; Architect Pro
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Certified in Oracle Cloud Infrastructure across both professional tracks (1Z0-1109-26 &amp; 1Z0-997-26).
              </p>
            </div>

            {/* Pillar 2: Backend Software Architecture */}
            <div className="p-4 rounded-md bg-white dark:bg-[#141820] border border-neutral-300 dark:border-neutral-800 space-y-1.5 hover:border-[#E58A3C] transition-colors">
              <div className="flex items-center gap-2 text-[#E58A3C]">
                <Server className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Backend Architecture
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                Spring Boot 3 &amp; Modular REST
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprise RESTful microservices, Spring Security with stateless JWT, JPA/Hibernate query tuning, and SOLID principles.
              </p>
            </div>

            {/* Pillar 3: DevOps & Containerization */}
            <div className="p-4 rounded-md bg-white dark:bg-[#141820] border border-neutral-300 dark:border-neutral-800 space-y-1.5 hover:border-[#E58A3C] transition-colors">
              <div className="flex items-center gap-2 text-[#E58A3C]">
                <Cloud className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  DevOps &amp; Infrastructure
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                Docker, Linux &amp; CI/CD Pipelines
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Multi-stage Alpine containerization, Linux server operations, GitFlow automation, and n8n webhook pipelines.
              </p>
            </div>

            {/* Pillar 4: Persistence & Data Systems */}
            <div className="p-4 rounded-md bg-white dark:bg-[#141820] border border-neutral-300 dark:border-neutral-800 space-y-1.5 hover:border-[#E58A3C] transition-colors">
              <div className="flex items-center gap-2 text-[#E58A3C]">
                <Database className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Data Persistence &amp; ACID
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                PostgreSQL, Oracle DB &amp; MySQL
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Normalized relational schemas, PL/SQL packages, foreign key constraints, B-Tree indexing, and sub-10ms query resolution.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
