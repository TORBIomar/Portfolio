import React from 'react';
import { Calendar, MapPin, TrendingUp, Building2, GraduationCap } from 'lucide-react';
import { EXPERIENCES_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Career Progression"
          title="Engineering Milestones & Internships"
          subtitle="Practical experience gained through two software development internships and academic software engineering capstones."
        />

        {/* Timeline Container with Laser Guide Line */}
        <div className="relative border-l-2 border-accent/30 ml-4 sm:ml-6 pl-6 sm:pl-9 space-y-10">
          {EXPERIENCES_DATA.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => sound.playHover()}
              className="relative group"
            >
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[33px] sm:-left-[45px] top-1.5 w-4 h-4 rounded-full bg-[#08090E] border-2 border-accent group-hover:bg-accent group-hover:shadow-[0_0_12px_#00FF9D] group-hover:scale-125 transition-all duration-200" />

              {/* Experience Card */}
              <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 sm:p-7 space-y-4 hover:border-accent/40 transition-all duration-200 shadow-xl group-hover:shadow-[0_0_25px_rgba(0,255,157,0.1)]">
                
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-foreground group-hover:text-accent transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-muted-foreground mt-1.5">
                      <span className="text-accent font-semibold flex items-center gap-1">
                        {item.type === 'Leadership' ? <GraduationCap className="w-3.5 h-3.5 text-cyan" /> : <Building2 className="w-3.5 h-3.5 text-accent" />}
                        {item.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-semibold border border-white/5">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground bg-[#0e1422] px-3 py-1.5 rounded-xl border border-white/10 shrink-0 self-start sm:self-auto">
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
                    <div key={mIdx} className="bg-[#0e1422] p-3 rounded-xl border border-white/5">
                      <div className="text-[11px] text-muted-foreground font-mono truncate">{metric.label}</div>
                      <div className="text-sm sm:text-base font-mono font-bold text-accent mt-0.5 truncate">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Responsibilities & Engineering Accomplishments */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan" />
                    <span>Key Engineering Deliverables</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                    {item.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <span className="text-accent font-mono shrink-0 mt-0.5">✔</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#101626] text-slate-300 font-mono text-xs border border-white/5"
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
