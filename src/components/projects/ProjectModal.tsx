import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Cpu, Network, Layers } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'decisions' | 'metrics'>('architecture');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    if (project) {
      sound.playClick();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 dark:bg-[#0E1117]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => {
        sound.playClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white dark:bg-[#141820] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-900 dark:text-foreground flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hairline Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E58A3C] to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-muted-foreground hover:text-neutral-900 dark:hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#E58A3C]/10 text-neutral-900 dark:text-white font-mono text-xs font-semibold uppercase tracking-wider border border-[#E58A3C]/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-muted-foreground">
              ARCH_SPEC // v3.4
            </span>
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-foreground">
            {project.title}
          </h2>
          <p className="text-sm font-mono text-neutral-600 dark:text-slate-300">
            {project.subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/10 mt-6 pb-2">
          {[
            { id: 'architecture', label: 'System Overview', icon: <Network className="w-3.5 h-3.5" /> },
            { id: 'decisions', label: 'Engineering Decisions', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'metrics', label: 'Telemetry & Tech', icon: <Layers className="w-3.5 h-3.5" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playHover();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E58A3C]/15 text-[#E58A3C] border border-[#E58A3C]/40 font-semibold shadow-[0_0_12px_rgba(255,107,0,0.15)]'
                    : 'text-neutral-500 dark:text-muted-foreground hover:text-neutral-900 dark:hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-5 space-y-6 flex-1">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-muted-foreground font-semibold flex items-center gap-2">
                  <Network className="w-4 h-4 text-[#E58A3C]" />
                  <span>Architecture Overview</span>
                </h3>
                <p className="text-neutral-700 dark:text-slate-300 leading-relaxed font-sans bg-neutral-50 dark:bg-[#141820] p-4 rounded-xl border border-black/5 dark:border-white/5">
                  {project.architectureDetails.overview}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-800 dark:text-slate-300 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#E58A3C]" />
                  <span>Bottlenecks & Latency Resolutions</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-slate-300 leading-relaxed font-sans bg-neutral-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 p-4 rounded-xl">
                  {project.architectureDetails.performanceBottlenecksResolved}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-muted-foreground font-semibold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#E58A3C]" />
                <span>Critical Architectural Decisions</span>
              </h3>
              <div className="space-y-2.5">
                {project.architectureDetails.keyDecisions.map((decision, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#141820] border border-black/5 dark:border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#E58A3C] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-slate-300">{decision}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-5">
              {/* Verified Benchmarks */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-muted-foreground font-semibold">
                  Production Telemetry Benchmarks
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-neutral-50 dark:bg-[#141820] p-3 rounded-xl border border-black/5 dark:border-white/5 text-center">
                      <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono">{m.label}</div>
                      <div className="text-sm sm:text-base font-mono font-bold text-[#E58A3C] mt-1">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Utilized */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-muted-foreground font-semibold">
                  Technologies Utilized
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-[#181D26] text-neutral-800 dark:text-slate-200 font-mono text-xs border border-black/5 dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
              >
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  Open Live Platform
                </Button>
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
            >
              <Button variant="outline" size="sm" icon={<Github className="w-4 h-4 text-white" />}>
                Source Repository
              </Button>
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
          >
            Close Specification
          </Button>
        </div>
      </div>
    </div>
  );
};
