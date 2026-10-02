import React, { useRef, useState } from 'react';
import { Github, ExternalLink, ArrowRight, Cpu } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { VectorRagVisualizer } from './VectorRagVisualizer';
import { CadVisualizerPreview } from './CadVisualizerPreview';
import { sound } from '../../utils/sound';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Handle subtle 3D perspective mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -2.5;
    const rY = ((x - centerX) / centerX) * 2.5;

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
  };

  const isAiRagProject = project.id === 'intelligent-library';
  const isCadProject = project.id === 'web-cad-laser-cutting';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 4 : 0}px)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
      }}
      data-cursor="view"
      className="project-card relative rounded-md bg-white dark:bg-[#141820] border border-neutral-300 dark:border-neutral-800 overflow-hidden flex flex-col justify-between group hover:border-[#E58A3C] transition-colors"
    >
      {/* Top Header & Categorization */}
      <div className="p-6 sm:p-7 space-y-4 relative z-20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 font-mono text-[11px] font-semibold uppercase tracking-wider border border-neutral-300 dark:border-white/10">
              {project.category.replace('-', ' ')}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-sm bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 font-mono text-[10px] font-semibold border border-neutral-300 dark:border-white/10 flex items-center gap-1">
                <span className="text-[#E58A3C] font-bold">#</span>
                <span>VERIFIED SYSTEM</span>
              </span>
            )}
          </div>
          {project.liveUrl && (
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Demo
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl sm:text-2xl font-mono font-bold text-neutral-900 dark:text-white group-hover:text-[#E58A3C] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Interactive Visualizer Embeds */}
        {isAiRagProject && (
          <div className="py-1">
            <VectorRagVisualizer />
          </div>
        )}

        {isCadProject && (
          <div className="py-1">
            <CadVisualizerPreview />
          </div>
        )}

        {/* Narrative Summary */}
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans line-clamp-3">
          {project.summary}
        </p>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 border-y border-neutral-200 dark:border-neutral-800">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="bg-neutral-50 dark:bg-[#111218] p-2 rounded-sm border border-neutral-200 dark:border-white/5">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate">{metric.label}</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Highlights */}
        <div className="space-y-1.5 pt-1">
          <div className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#E58A3C]" />
            <span>Architecture Highlights</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
            {project.architecturalHighlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#E58A3C] font-mono shrink-0 mt-0.5">›</span>
                <span className="line-clamp-2 text-neutral-700 dark:text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: Tech Stack Chips & Action Controls */}
      <div className="p-6 pt-0 sm:p-7 sm:pt-0 space-y-3 mt-auto relative z-20">
        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-sm bg-neutral-100 dark:bg-[#111218] text-neutral-700 dark:text-neutral-300 font-mono text-[11px] border border-neutral-200 dark:border-white/5 hover:border-[#E58A3C] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => {
              sound.playClick();
              onOpenModal(project);
            }}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#E58A3C] hover:text-[#F09A4E] transition-colors cursor-pointer group/link"
          >
            <span>[ INSPECT BLUEPRINT ]</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-1.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-1.5 rounded-md bg-neutral-100 dark:bg-[#111218] text-neutral-600 dark:text-neutral-300 hover:text-[#E58A3C] border border-neutral-200 dark:border-white/10 hover:border-[#E58A3C] transition-colors cursor-pointer"
                title="View Live Platform"
                aria-label={`View ${project.title} live platform`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-1.5 rounded-md bg-neutral-100 dark:bg-[#111218] text-neutral-600 dark:text-neutral-300 hover:text-[#E58A3C] border border-neutral-200 dark:border-white/10 hover:border-[#E58A3C] transition-colors cursor-pointer"
              title="View Repository"
              aria-label={`View ${project.title} repository on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
