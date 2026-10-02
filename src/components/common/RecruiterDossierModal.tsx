import React, { useEffect } from 'react';
import { 
  Download, Mail, Phone, Check, Server, Cloud, Cpu, 
  Database, ShieldCheck, MessageSquare, ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from './Button';
import { sound } from '../../utils/sound';

interface RecruiterDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterDossierModal: React.FC<RecruiterDossierModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    if (isOpen) {
      sound.playClick();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    sound.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    sound.playSuccess();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => {
        sound.playClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#07080B] border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-2xl p-5 sm:p-7 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Header Bar: Document Reference & Status */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-5 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B00] font-bold">SYS//DOC-SPEC</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span>REF: OT-ENG-2026</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden sm:inline">STATUS: VERIFIED CANDIDATE</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close dossier"
          >
            <span>[ESC / ✕]</span>
          </button>
        </div>

        {/* Candidate Identity Block */}
        <div className="space-y-1.5 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 id="dossier-title" className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-neutral-900 dark:text-white">
                {PERSONAL_INFO.name}
              </h2>
              <div className="font-mono text-xs sm:text-sm text-[#FF6B00] font-semibold mt-0.5">
                SOFTWARE &amp; DEVOPS ENGINEER
              </div>
            </div>

            <div className="text-right font-mono text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
              <div>Rabat, Morocco [GMT+1]</div>
              <div className="text-neutral-800 dark:text-neutral-200 font-medium">EMSI Rabat (DDSI)</div>
            </div>
          </div>
        </div>

        {/* Tactile Action Row: Resumes, WhatsApp & Quick-Copy */}
        <div className="flex flex-wrap items-center gap-2.5 my-4">
          <a
            href={PERSONAL_INFO.resumeUrlEn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSuccess()}
          >
            <Button
              variant="primary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Resume (EN .pdf)
            </Button>
          </a>

          <a
            href={PERSONAL_INFO.resumeUrlFr}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSuccess()}
          >
            <Button
              variant="secondary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5 text-[#FF6B00]" />}
            >
              CV (FR .pdf)
            </Button>
          </a>

          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
          >
            <Button
              variant="outline"
              size="sm"
              icon={<MessageSquare className="w-3.5 h-3.5 text-emerald-500" />}
            >
              WhatsApp
            </Button>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-[#111218] border border-neutral-300 dark:border-white/10 hover:border-[#FF6B00] text-neutral-800 dark:text-neutral-200 text-xs font-mono transition-colors cursor-pointer"
            title="Copy candidate email to clipboard"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />}
            <span>{copiedEmail ? 'Copied' : 'omartorbi18@gmail.com'}</span>
          </button>

          <button
            onClick={handleCopyPhone}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-[#111218] border border-neutral-300 dark:border-white/10 hover:border-[#FF6B00] text-neutral-800 dark:text-neutral-200 text-xs font-mono transition-colors cursor-pointer"
            title="Copy phone number to clipboard"
          >
            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />}
            <span>{copiedPhone ? 'Copied' : '+212 602 12 79 38'}</span>
          </button>
        </div>

        {/* Official Accreditations Panel */}
        <div className="mb-5 p-3.5 rounded-md bg-neutral-50 dark:bg-[#0C0D12] border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span>Official Cloud Accreditations (Oracle Cloud Infrastructure)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded bg-white dark:bg-[#111218] border border-neutral-200 dark:border-white/5 space-y-0.5">
              <div className="flex items-center justify-between text-[#FF6B00] font-bold text-[11px]">
                <span>OCI DEVOPS PROFESSIONAL</span>
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">1Z0-1109-26</span>
              </div>
              <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans">
                Automated CI/CD pipelines, container orchestration, IaC, and secure delivery.
              </div>
            </div>

            <div className="p-2.5 rounded bg-white dark:bg-[#111218] border border-neutral-200 dark:border-white/5 space-y-0.5">
              <div className="flex items-center justify-between text-[#FF6B00] font-bold text-[11px]">
                <span>OCI ARCHITECT PROFESSIONAL</span>
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">1Z0-997-26</span>
              </div>
              <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-sans">
                High-availability cloud architecture, network security, and scalable microservices.
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Systems Architectural Specification Grid */}
        <div className="space-y-2 mb-5">
          <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            [ TECHNICAL ARCHITECTURE &amp; PRODUCTION DOMAINS ]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
            {/* Backend Architecture */}
            <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#0C0D12] border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Server className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>01 // Backend Architecture</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Spring Boot 3, RESTful APIs, stateless JWT filter chains, role-based access control (RBAC), and JPA/Hibernate performance query tuning.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['Spring Boot 3', 'Java 17/21', 'REST APIs', 'Spring Security', 'JWT', 'JPA / Hibernate'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-white/5 text-neutral-800 dark:text-neutral-300 text-[10px] border border-neutral-300 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#0C0D12] border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Cloud className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>02 // DevOps &amp; Cloud Runtimes</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Multi-stage Alpine Docker builds, Linux shell automation, Oracle Cloud Infrastructure (OCI), Nginx reverse proxy, and n8n webhook automation.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['Docker', 'Alpine', 'Linux', 'OCI Cloud', 'n8n', 'CI/CD Pipelines'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-white/5 text-neutral-800 dark:text-neutral-300 text-[10px] border border-neutral-300 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Persistence */}
            <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#0C0D12] border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Database className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>03 // Relational &amp; Vector Data</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                PostgreSQL, Oracle Database (PL/SQL packages), MySQL 8.0, and ChromaDB. Normalized schemas (3NF), composite indexing, and ACID transaction safety.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['PostgreSQL', 'Oracle DB', 'PL/SQL', 'MySQL', 'ChromaDB', 'ACID Safety'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-white/5 text-neutral-800 dark:text-neutral-300 text-[10px] border border-neutral-300 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modern Web & 3D CAD */}
            <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#0C0D12] border border-neutral-200 dark:border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>04 // CAD &amp; Web Systems</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                TypeScript, React 18, Next.js, and Three.js WebGL with OpenCascade.js WebAssembly for high-performance 3D CAD tube laser cutting visualization.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['TypeScript', 'React 18', 'Next.js', 'Three.js', 'OpenCascade.js', 'Web Workers'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-white/5 text-neutral-800 dark:text-neutral-300 text-[10px] border border-neutral-300 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Links & Footer Row */}
        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#FF6B00]" />
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#FF6B00]" />
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="text-neutral-500 dark:text-neutral-400">
              Languages: English (Fluent), French, Arabic
            </span>
          </div>

          <div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-3 py-1 rounded bg-neutral-100 dark:bg-[#111218] border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 text-neutral-700 dark:text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
            >
              Close Spec Sheet
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
