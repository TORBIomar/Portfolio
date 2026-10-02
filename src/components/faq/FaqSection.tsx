import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'When are you available for internships or software engineering positions?',
    answer: (
      <span>
        I am available for an <strong className="text-black dark:text-white font-semibold">End-of-Studies (PFE) internship</strong> or <strong className="text-black dark:text-white font-semibold">software engineering opportunities</strong> starting in 2026/2027. I am open to positions in <strong className="text-[#E58A3C]">Rabat, Casablanca</strong>, hybrid setups, or remote collaborations across Morocco and internationally.
      </span>
    ),
  },
  {
    id: 'faq-2',
    question: 'What is your core backend and database engineering architecture?',
    answer: (
      <span>
        My primary server-side ecosystem is <strong className="text-black dark:text-white font-semibold">Java 17/21 with Spring Boot 3</strong>, augmented with <strong className="text-black dark:text-white font-semibold">Python (FastAPI)</strong> and <strong className="text-black dark:text-white font-semibold">PHP (Laravel)</strong>. I design stateless RESTful microservices, enforce strict <span className="text-[#E58A3C]">JWT authentication and Spring Security RBAC</span>, and manage data integrity with <strong className="text-black dark:text-white font-semibold">Oracle DB (PL/SQL)</strong>, <strong className="text-black dark:text-white font-semibold">PostgreSQL</strong>, and <strong className="text-black dark:text-white font-semibold">MySQL 8.0</strong>, tuning B-Tree indexes to guarantee sub-10ms query resolution.
      </span>
    ),
  },
  {
    id: 'faq-3',
    question: 'How do you build and optimize AI Vector RAG retrieval pipelines?',
    answer: (
      <span>
        I engineer contextual RAG pipelines by chunking ingested documents asynchronously, calculating dense mathematical vector embeddings, and indexing them in <strong className="text-black dark:text-white font-semibold">ChromaDB</strong> using the <span className="text-[#E58A3C]">Hierarchical Navigable Small World (HNSW) cosine metric</span> for sub-100ms similarity lookups. Top-K retrieved passages are synthesized with the <strong className="text-black dark:text-white font-semibold">Google Gemini API</strong> with direct citation attribution, eliminating hallucinations.
      </span>
    ),
  },
  {
    id: 'faq-4',
    question: 'How do you handle containerization, systems deployment, and quality?',
    answer: (
      <span>
        All services are packaged using <strong className="text-black dark:text-white font-semibold">multi-stage Docker builds</strong> isolating minimal Alpine JRE/Python runtimes to minimize attack surfaces and image footprints. Workloads are orchestrated with Docker Compose, reverse-proxied via Nginx, and deployed on resilient <span className="text-[#E58A3C]">Linux environments</span> with continuous Git versioning and health probes.
      </span>
    ),
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    sound.playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionHeading
            badge="05. Deep Dive Inquiries"
            title="SYSTEM SPECS & FAQ"
            subtitle="Transparent technical answers on availability, architectural standards, vector RAG design, and systems engineering."
            align="center"
            className="mb-0"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-[#111111] border-[#E58A3C]/40 shadow-md dark:shadow-[0_0_20px_rgba(255,107,0,0.08)]'
                    : 'bg-white/60 dark:bg-[#0c0d12]/80 border-neutral-200/80 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#E58A3C] shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                      isOpen ? 'text-[#E58A3C]' : 'text-neutral-900 dark:text-neutral-100'
                    }`}>
                      {item.question}
                    </span>
                  </div>

                  <div className={`p-1 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#E58A3C]' : 'text-neutral-400'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-600 dark:text-neutral-300 font-sans font-light leading-relaxed border-t border-black/5 dark:border-white/5 animate-in slide-in-from-top-1 duration-200">
                    <div className="pl-6 sm:pl-7">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
