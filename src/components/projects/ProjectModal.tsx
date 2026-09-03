import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Cpu, Network } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { Button } from '../common/Button';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-slate-700 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-muted text-accent font-mono text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Deep-Dive Specification
            </span>
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
            {project.title}
          </h2>
          <p className="text-sm font-mono text-accent">
            {project.subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-6 text-sm">
          {/* Architecture Overview */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <Network className="w-4 h-4 text-accent" />
              <span>Architectural Overview</span>
            </h3>
            <p className="text-slate-300 leading-relaxed font-sans bg-[#121927] p-4 rounded-xl border border-border">
              {project.architectureDetails.overview}
            </p>
          </div>

          {/* Key Engineering Decisions */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent" />
              <span>Critical Engineering Decisions</span>
            </h3>
            <div className="space-y-2">
              {project.architectureDetails.keyDecisions.map((decision, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/40 border border-border/70">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 font-sans">{decision}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Bottlenecks Resolved */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Bottlenecks & Tail Latency Mitigations</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-amber-950/20 border border-amber-800/40 p-3.5 rounded-lg">
              {project.architectureDetails.performanceBottlenecksResolved}
            </p>
          </div>

          {/* Metrics Summary */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Verified Production Benchmarks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-[#121927] p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-xs text-muted-foreground font-mono">{m.label}</div>
                  <div className="text-base font-mono font-bold text-accent mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Technologies Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-muted text-slate-200 font-mono text-xs border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="mt-8 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  Open Live Sandbox
                </Button>
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" icon={<Github className="w-4 h-4" />}>
                Source Repository
              </Button>
            </a>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Specification
          </Button>
        </div>
      </div>
    </div>
  );
};
