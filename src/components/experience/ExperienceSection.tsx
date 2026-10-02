import React from 'react';
import { Calendar, MapPin, TrendingUp, Building2, GraduationCap, ShieldCheck } from 'lucide-react';
import { EXPERIENCES_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { sound } from '../../utils/sound';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="04. Career Track"
          title="EXPERIENCE & CERTIFICATIONS"
          subtitle="Professional software development internships, official Oracle Cloud certifications, and engineering degree track."
        />

        {/* Official Cloud Certifications Banner */}
        <div className="mb-12 p-5 sm:p-6 rounded-md bg-white dark:bg-[#09090B] border border-neutral-300 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Official Cloud Accreditations
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Oracle University Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#121215] border border-neutral-200 dark:border-white/10 space-y-1 hover:border-neutral-900 dark:hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">OCI DEVOPS PRO</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-white/5 text-neutral-600 dark:text-neutral-400">
                  1Z0-1109-26
                </span>
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                Oracle Cloud Infrastructure DevOps Professional
              </h4>
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                CI/CD pipelines, container orchestration, infrastructure as code, automated testing, and secure delivery.
              </p>
            </div>

            <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-[#121215] border border-neutral-200 dark:border-white/10 space-y-1 hover:border-neutral-900 dark:hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">OCI ARCHITECT PRO</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-white/5 text-neutral-600 dark:text-neutral-400">
                  1Z0-997-26
                </span>
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                Oracle Cloud Infrastructure Architect Professional
              </h4>
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                High-availability cloud architecture, network security, disaster recovery, and scalable microservices.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Container with Laser Guide Line */}
        <div className="relative border-l border-neutral-300 dark:border-neutral-800 ml-4 sm:ml-6 pl-6 sm:pl-9 space-y-8">
          {EXPERIENCES_DATA.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => sound.playHover()}
              className="relative group"
            >
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[43px] top-2 w-3 h-3 rounded-none bg-white dark:bg-[#09090B] border-2 border-neutral-900 dark:border-white group-hover:bg-neutral-900 dark:group-hover:bg-white transition-colors" />

              {/* Experience Card */}
              <div className="bg-white dark:bg-[#09090B] rounded-md border border-neutral-300 dark:border-neutral-800 p-5 sm:p-6 space-y-3.5 hover:border-neutral-900 dark:hover:border-white/40 transition-colors">
                
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-sans font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans text-neutral-500 dark:text-neutral-400 mt-1">
                      <span className="text-neutral-900 dark:text-white font-semibold flex items-center gap-1">
                        {item.type === 'Engineering Degree' ? <GraduationCap className="w-3.5 h-3.5 text-neutral-900 dark:text-white" /> : <Building2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />}
                        {item.company}
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                      <span>|</span>
                      <span className="px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 font-medium border border-neutral-200 dark:border-white/10 font-mono text-[10px]">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-sans text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-[#121215] px-2.5 py-1 rounded-md border border-neutral-200 dark:border-white/10 shrink-0 self-start sm:self-auto font-medium">
                    <Calendar className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Role Narrative Summary */}
                <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                  {item.summary}
                </p>

                {/* Quantifiable Impact Metrics Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
                  {item.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="bg-neutral-50 dark:bg-[#121215] p-2.5 rounded-sm border border-neutral-200 dark:border-white/5">
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans truncate">{metric.label}</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Responsibilities & Engineering Accomplishments */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-sans font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>Key Engineering Deliverables</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 font-sans">
                    {item.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-neutral-900 dark:text-white font-mono shrink-0 mt-0.5 font-bold">+</span>
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
                      className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 font-sans text-xs font-medium border border-black/5 dark:border-white/5 hover:border-neutral-400 dark:hover:border-white/30 hover:text-black dark:hover:text-white transition-colors"
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
