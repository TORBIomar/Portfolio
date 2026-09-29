import React from 'react';
import { Calendar, MapPin, TrendingUp, Building2, GraduationCap } from 'lucide-react';
import { EXPERIENCES_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="04. Career Milestones"
          title="TRACK RECORD"
          subtitle="Practical experience gained through two software development internships and academic software engineering capstones."
        />

        {/* Timeline Container with Laser Guide Line */}
        <div className="relative border-l-2 border-neutral-300 dark:border-white/20 ml-4 sm:ml-6 pl-6 sm:pl-9 space-y-10">
          {EXPERIENCES_DATA.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => sound.playHover()}
              className="relative group"
            >
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[33px] sm:-left-[45px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#050507] border-2 border-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:shadow-[0_0_16px_#FF6B00] group-hover:scale-125 transition-all duration-200" />

              {/* Experience Card */}
              <div className="bg-white dark:bg-[#0B0C10] rounded-2xl border border-neutral-200/80 dark:border-white/10 p-6 sm:p-7 space-y-4 hover:border-[#FF6B00]/40 transition-all duration-200 shadow-sm dark:shadow-xl group-hover:shadow-[0_0_25px_rgba(255,107,0,0.1)]">
                
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
                  <div>
                    <h3 className="text-xl font-mono font-bold text-neutral-900 dark:text-foreground group-hover:text-[#FF6B00] transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-neutral-500 dark:text-muted-foreground mt-1.5">
                      <span className="text-neutral-900 dark:text-white font-semibold flex items-center gap-1">
                        {item.type === 'Leadership' ? <GraduationCap className="w-3.5 h-3.5 text-[#FF6B00]" /> : <Building2 className="w-3.5 h-3.5 text-[#FF6B00]" />}
                        {item.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-neutral-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-slate-300 font-semibold border border-black/5 dark:border-white/5">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-600 dark:text-muted-foreground bg-neutral-100 dark:bg-[#0F1016] px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/10 shrink-0 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Role Narrative Summary */}
                <p className="text-sm text-neutral-600 dark:text-slate-300 font-sans leading-relaxed">
                  {item.summary}
                </p>

                {/* Quantifiable Impact Metrics Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                  {item.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="bg-neutral-100 dark:bg-[#0F1016] p-3 rounded-xl border border-black/5 dark:border-white/5">
                      <div className="text-[11px] text-neutral-500 dark:text-muted-foreground font-mono truncate">{metric.label}</div>
                      <div className="text-sm sm:text-base font-mono font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Responsibilities & Engineering Accomplishments */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono font-semibold text-neutral-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Key Engineering Deliverables</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-slate-300 font-sans">
                    {item.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <span className="text-[#FF6B00] font-mono shrink-0 mt-0.5 font-bold">✔</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/10 dark:border-white/10">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-[#0F1016] text-neutral-700 dark:text-slate-300 font-mono text-xs border border-black/5 dark:border-white/5 hover:border-[#FF6B00]/30 hover:text-[#FF6B00] dark:hover:text-white transition-colors"
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
