import { Github, ExternalLink, ArrowRight, Cpu } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <article className="group rounded-xl bg-card border border-border hover:border-slate-500/80 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-card-elevated">
      {/* Card Header & Category Bar */}
      <div className="p-5 sm:p-6 space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-muted text-accent font-mono text-[11px] font-semibold uppercase tracking-wider border border-border">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded bg-accent/10 text-emerald-400 font-mono text-[11px] font-medium border border-accent/20">
                ★ Core Architecture
              </span>
            )}
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            v3.2-prod
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-lg sm:text-xl font-mono font-bold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-0.5">
            {project.subtitle}
          </p>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
          {project.summary}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-border/70">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="bg-[#121927] p-2.5 rounded-lg border border-slate-800">
              <div className="text-xs text-muted-foreground font-mono">{metric.label}</div>
              <div className="text-sm sm:text-base font-mono font-bold text-accent mt-0.5">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Highlights List */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span>Engineering Highlights</span>
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground font-sans">
            {project.architecturalHighlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent font-mono shrink-0 mt-0.5">›</span>
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Tech Stack & Actions */}
      <div className="p-5 pt-0 sm:p-6 sm:pt-0 space-y-3.5 mt-auto">
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-muted text-slate-300 font-mono text-xs border border-border/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/60">
          <button
            onClick={() => onOpenModal(project)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:text-emerald-300 transition-colors cursor-pointer group/link"
          >
            <span>Architecture Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted text-slate-300 hover:text-foreground hover:bg-slate-700 transition-colors cursor-pointer"
                title="View Live Demo"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted text-slate-300 hover:text-foreground hover:bg-slate-700 transition-colors cursor-pointer"
              title="View Repository"
              aria-label={`View ${project.title} repository on GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
