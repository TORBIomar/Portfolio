import React from 'react';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';
import { EXPERIENCES_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-14 sm:py-16 border-b border-border/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Career Milestones"
          title="Internships & Engineering Progression"
          subtitle="Practical experience gained through two software development internships and academic software engineering capstones."
        />

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-700/60 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
          {EXPERIENCES_DATA.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-card border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-200" />

              {/* Experience Card */}
              <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-3.5 hover:border-slate-500/80 transition-all duration-200 hover:shadow-card-elevated">
                
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-border/60">
                  <div>
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-foreground">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-muted-foreground mt-1">
                      <span className="text-accent font-semibold">{item.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-muted text-foreground font-semibold">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground bg-[#121927] px-3 py-1.5 rounded-lg border border-slate-800 shrink-0 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Role Narrative Summary */}
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {item.summary}
                </p>

                {/* Quantifiable Impact Metrics Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                  {item.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="bg-[#121927] p-3 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-muted-foreground font-mono">{metric.label}</div>
                      <div className="text-sm sm:text-base font-mono font-bold text-accent mt-0.5">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Responsibilities & Engineering Accomplishments */}
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    <span>Key Engineering Deliverables</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans">
                    {item.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <span className="text-accent font-mono shrink-0 mt-0.5">✔</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-muted text-slate-300 font-mono text-xs border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
