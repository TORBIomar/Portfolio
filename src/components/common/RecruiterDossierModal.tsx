import React, { useEffect } from 'react';
import { 
  X, Download, Mail, Phone, GraduationCap, 
  Check, Sparkles, Server, Cloud, Cpu, 
  Database, ShieldCheck, Languages, Briefcase, MessageSquare, ArrowUpRight
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
      aria-labelledby="recruiter-dossier-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => {
        sound.playClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0A0B0F] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-900 dark:text-foreground flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hairline Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF6B00] via-[#FFA05C] to-[#FF6B00]" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close recruiter dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Candidate Identity & Executive Badge */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recruiter Fast-Scan Dossier</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-mono text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>OCI DevOps &amp; Architect Pro Certified</span>
            </span>
          </div>

          <div>
            <h2 id="recruiter-dossier-title" className="text-2xl sm:text-3xl font-mono font-extrabold text-neutral-900 dark:text-white">
              {PERSONAL_INFO.name}
            </h2>
            <p className="font-mono text-sm text-[#FF6B00] font-semibold mt-0.5">
              Software &amp; DevOps Engineer • EMSI Rabat (DDSI)
            </p>
          </div>
        </div>

        {/* Action Buttons: Dual Resume Downloads & WhatsApp */}
        <div className="flex flex-wrap items-center gap-3 my-5 pt-1">
          <a
            href={PERSONAL_INFO.resumeUrlEn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSuccess()}
          >
            <Button
              variant="primary"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              Resume (English)
            </Button>
          </a>

          <a
            href={PERSONAL_INFO.resumeUrlFr}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSuccess()}
          >
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-4 h-4 text-[#FF6B00]" />}
            >
              CV (Français)
            </Button>
          </a>

          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
          >
            <Button
              variant="secondary"
              size="md"
              icon={<MessageSquare className="w-4 h-4 text-emerald-500" />}
            >
              WhatsApp
            </Button>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#FF6B00]/40 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium transition-all cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-[#FF6B00]" /> : <Mail className="w-4 h-4 text-[#FF6B00]" />}
            <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
          </button>

          <button
            onClick={handleCopyPhone}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#FF6B00]/40 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium transition-all cursor-pointer"
          >
            {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Phone className="w-4 h-4 text-[#FF6B00]" />}
            <span>{copiedPhone ? 'Copied!' : 'Copy Phone'}</span>
          </button>
        </div>

        {/* 4 Key Executive Fact Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Target Roles</span>
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
              Software &amp; DevOps Engineer
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs font-mono">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Education</span>
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
              EMSI Rabat (DDSI, 2022–Present)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Certifications</span>
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
              OCI DevOps &amp; Architect Pro
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs font-mono">
              <Languages className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Spoken Languages</span>
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
              English (Fluent) • French • Arabic
            </div>
          </div>
        </div>

        {/* Detailed Competency Matrix for Hiring Managers */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span>Verified Core Competencies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {/* Backend Architecture */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Server className="w-4 h-4 text-[#FF6B00]" />
                <span>Backend &amp; Microservices</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Spring Boot 3, RESTful APIs, Spring Security filter chains with stateless JWT authentication, JPA Hibernate query tuning, and decoupled services.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['Spring Boot 3', 'Java 17/21', 'REST APIs', 'Spring Security', 'JWT', 'JPA / Hibernate'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 text-[10px] border border-black/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud, DevOps & Linux */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Cloud className="w-4 h-4 text-[#FF6B00]" />
                <span>DevOps &amp; Cloud Infrastructure</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Multi-stage Alpine Docker builds, Linux shell automation, Oracle Cloud Infrastructure (OCI), Nginx reverse proxies, and n8n webhook pipelines.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['OCI Cloud', 'Docker', 'Linux', 'Docker Compose', 'CI/CD', 'Git', 'n8n'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 text-[10px] border border-black/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases & Integrity */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Database className="w-4 h-4 text-[#FF6B00]" />
                <span>Relational &amp; Vector Data Systems</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Oracle Database (PL/SQL packages), PostgreSQL, MySQL 8.0, and ChromaDB. Schema normalization, composite B-Tree indexes, and ACID transaction safety.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['PostgreSQL', 'Oracle DB', 'PL/SQL', 'MySQL', 'ChromaDB RAG', 'ACID'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 text-[10px] border border-black/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modern Web & Frontend */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0E1017] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                <Cpu className="w-4 h-4 text-[#FF6B00]" />
                <span>Modern Web &amp; 3D Graphics</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                TypeScript, React 18, Next.js, and Three.js WebGL rendering with OpenCascade.js WebAssembly for high-performance 3D CAD visualization.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['TypeScript', 'React 18', 'Next.js', 'Three.js', 'Web Workers', 'Tailwind CSS'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 text-[10px] border border-black/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Links & Footer Row */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>GitHub Repositories</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B00]" />
            </a>
            <span className="text-neutral-300 dark:text-white/20">•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B00]" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
            >
              Close Dossier
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
