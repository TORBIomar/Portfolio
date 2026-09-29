import React from 'react';
import { GraduationCap, Server, Cpu, Cloud, ArrowUpRight } from 'lucide-react';
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
            badge="01. The Engineer & Philosophy"
            title="ABOUT ME"
            subtitle="Bridging high-performance backend architecture with intelligent vector retrieval and reproducible DevOps."
            className="mb-0"
          />
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
            <p className="text-lg sm:text-xl font-normal text-black dark:text-white leading-relaxed">
              I am <strong className="font-semibold text-black dark:text-white">{PERSONAL_INFO.name}</strong>, a Computer Engineering and Networks student at <strong className="font-semibold text-black dark:text-white">EMSI Rabat</strong> (2022 – Present).
            </p>
            
            <p>
              My engineering discipline focuses on architecting <span className="text-[#FF6B00] font-medium">modular, scalable backend microservices</span> and designing <span className="text-[#FF6B00] font-medium">context-grounded AI retrieval pipelines</span>. On the backend, I specialize in <strong className="font-medium text-black dark:text-white">Spring Boot</strong> and structured REST APIs, enforcing strict stateless JWT authentication, role-based access control, and ACID transactional guarantees.
            </p>

            <p>
              In the AI and data domain, I build vector-accelerated discovery engines utilizing <span className="text-[#FF6B00] font-medium">ChromaDB</span> (HNSW cosine similarity) coupled with the <span className="text-[#FF6B00] font-medium">Google Gemini API</span> to deliver low-latency semantic synthesis without hallucinations. I place immense priority on relational schema hygiene and index tuning across <strong className="font-medium text-black dark:text-white">Oracle Database (PL/SQL)</strong>, <strong className="font-medium text-black dark:text-white">PostgreSQL</strong>, and <strong className="font-medium text-black dark:text-white">MySQL</strong> to eliminate N+1 query overheads.
            </p>

            <p>
              On the delivery and systems layer, all my workloads are containerized via multi-stage <strong className="font-medium text-black dark:text-white">Docker</strong> builds, deployed on resilient <strong className="font-medium text-black dark:text-white">Linux</strong> environments, and managed with strict Git versioning.
            </p>

            {/* Quick action links */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer"
              >
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-semibold hover:border-[#FF6B00]/40 hover:text-[#FF6B00] transition-colors cursor-pointer"
              >
                <span>Initiate Dialogue →</span>
              </a>
            </div>
          </div>

          {/* Right: Technical Pillars Bento */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm space-y-2 hover:border-[#FF6B00]/40 transition-colors">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <GraduationCap className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  Academic Rigor
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-black dark:text-white">
                EMSI Rabat (2022 – Present)
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Computer Engineering & Networks student completing rigorous foundations in algorithms, data structures, enterprise Java, and distributed systems.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm space-y-2 hover:border-[#FF6B00]/40 transition-colors">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <Server className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  Backend Architecture
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-black dark:text-white">
                Spring Boot & Scalable APIs
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enterprise REST APIs, Spring Security filter chains with stateless JWT authentication, JPA Hibernate optimization, and decoupled microservices.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm space-y-2 hover:border-[#FF6B00]/40 transition-colors">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <Cpu className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  Applied AI & Vector RAG
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-black dark:text-white">
                ChromaDB + Gemini Ingestion
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                HNSW cosine vector similarity indexing with ChromaDB, asynchronous token chunking, and Google Gemini context synthesis with source attribution.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200/80 dark:border-white/10 shadow-sm space-y-2 hover:border-[#FF6B00]/40 transition-colors">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <Cloud className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  DevOps & Systems
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-black dark:text-white">
                Docker, Linux & Database Ops
              </h4>
              <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Multi-stage Alpine containerization, Linux command-line administration, Oracle PL/SQL packages, and PostgreSQL relational consistency.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
