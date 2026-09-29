import React, { useRef, useState } from 'react';
import { Github, ExternalLink, ArrowRight, Cpu, Sparkles } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { VectorRagVisualizer } from './VectorRagVisualizer';
import { sound } from '../../utils/sound';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle 3D perspective mouse tilt & specular spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });

    // Calculate rotation (-5 to 5 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -4;
    const rY = ((x - centerX) / centerX) * 4;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setSpotlightPos({ x: -500, y: -500 });
  };

  const isAiRagProject = project.id === 'intelligent-library';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 6 : 0}px)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
      }}
      data-cursor="view"
      className="project-card relative rounded-2xl bg-white dark:bg-[#0B0C10] border border-neutral-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#FF6B00]/40 shadow-sm dark:shadow-card-elevated hover:shadow-[0_0_30px_rgba(255,107,0,0.12)] transition-all duration-300"
    >
      {/* Specular Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 107, 0, 0.08), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Header & Categorization */}
      <div className="p-6 sm:p-7 space-y-4 relative z-20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-800 dark:text-slate-200 font-mono text-[11px] font-semibold uppercase tracking-wider border border-black/10 dark:border-white/20 group-hover:border-[#FF6B00]/30 transition-colors">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded bg-[#FF6B00]/10 text-neutral-900 dark:text-white font-mono text-[11px] font-medium border border-[#FF6B00]/30 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#FF6B00]" />
                Core Architecture
              </span>
            )}
          </div>
          <div className="text-[11px] font-mono text-neutral-500 dark:text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] beacon-orange" />
            <span>v3.4-prod</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl sm:text-2xl font-mono font-bold text-neutral-900 dark:text-foreground group-hover:text-[#FF6B00] dark:group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-muted-foreground mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* AI & Vector RAG Interactive Live Visualizer Embed */}
        {isAiRagProject && (
          <div className="py-2">
            <VectorRagVisualizer />
          </div>
        )}

        {/* Narrative Summary */}
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
          {project.summary}
        </p>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-black/10 dark:border-white/10">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="bg-neutral-100 dark:bg-[#0F1016] p-2.5 rounded-xl border border-black/5 dark:border-white/5">
              <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono truncate">{metric.label}</div>
              <div className="text-sm sm:text-base font-mono font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Highlights */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-mono font-semibold text-neutral-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Architecture Highlights</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-500 dark:text-muted-foreground font-sans">
            {project.architecturalHighlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#FF6B00] font-mono shrink-0 mt-0.5">›</span>
                <span className="line-clamp-2 text-neutral-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: Tech Stack Chips & Action Controls */}
      <div className="p-6 pt-0 sm:p-7 sm:pt-0 space-y-4 mt-auto relative z-20">
        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-[#0F1016] text-neutral-700 dark:text-slate-300 font-mono text-xs border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/40 hover:text-[#FF6B00] dark:hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-black/10 dark:border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              onOpenModal(project);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#FF6B00] hover:text-[#FFA05C] transition-colors cursor-pointer group/link"
          >
            <span>Inspect Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-[#0F1016] text-neutral-600 dark:text-slate-300 hover:text-[#FF6B00] hover:bg-neutral-200 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/30 transition-colors cursor-pointer"
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
              onClick={() => sound.playClick()}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-[#0F1016] text-neutral-600 dark:text-slate-300 hover:text-[#FF6B00] hover:bg-neutral-200 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/30 transition-colors cursor-pointer"
              title="View Repository"
              aria-label={`View ${project.title} repository on GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
