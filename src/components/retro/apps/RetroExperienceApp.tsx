import React, { useState } from 'react';
import { EXPERIENCES_DATA } from '../../../data/portfolioData';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

export const RetroExperienceApp: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES_DATA[0].id);

  const selectedExp =
    EXPERIENCES_DATA.find((e) => e.id === selectedExpId) || EXPERIENCES_DATA[0];

  const getBadgeColor = (type: string) => {
    if (type.includes('Degree')) return 'bg-purple-100 text-purple-900 border-purple-400';
    return 'bg-amber-100 text-amber-900 border-amber-400';
  };

  return (
    <div className="flex flex-col h-full bg-[#F3F4F6] text-black font-screen text-xs overflow-hidden">
      {/* Top Banner with Generous Space */}
      <div className="p-3.5 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-b-2 border-black flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <RetroIcon name="briefcase" size={28} />
          <div>
            <span className="font-bold text-sm text-black">Event Journal: Career History &amp; Credentials</span>
            <span className="text-xs text-amber-800 font-mono block mt-0.5">
              Chronological Audit Trail &bull; Omar Torbi
            </span>
          </div>
        </div>

        <div className="text-xs font-mono bg-white px-3 py-1 border-2 border-black shadow-xs font-bold">
          3 Log Entries Recorded
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Timeline List */}
        <div className="w-full md:w-5/12 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white overflow-y-auto p-3 space-y-2.5">
          {EXPERIENCES_DATA.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <div
                key={exp.id}
                onClick={() => {
                  retroSound.playClick();
                  setSelectedExpId(exp.id);
                }}
                className={`p-3.5 border-2 cursor-pointer transition-all select-none ${
                  isSelected
                    ? 'bg-amber-50 border-amber-600 shadow-[4px_4px_0px_#D97706]'
                    : 'bg-white border-neutral-300 hover:border-black hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${getBadgeColor(exp.type)}`}>
                    {exp.type}
                  </span>
                  <span className="text-xs font-mono text-neutral-600 font-semibold">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm truncate leading-snug text-neutral-950">{exp.role}</h3>
                <p className="text-xs font-bold text-amber-900 mt-1 truncate">
                  {exp.company} &bull; {exp.location}
                </p>
                <p className="text-xs truncate mt-1 text-neutral-500 font-medium">
                  {exp.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Event Inspector */}
        <div className="flex-1 bg-[#FAFAFA] overflow-y-auto p-4 space-y-4">
          {/* Header Card */}
          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2.5 mb-2.5">
              <div>
                <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 border ${getBadgeColor(selectedExp.type)}`}>
                  {selectedExp.type}
                </span>
                <h2 className="font-bold text-base text-black mt-1.5">{selectedExp.role}</h2>
                <div className="text-xs font-bold text-amber-900 mt-0.5">
                  {selectedExp.company} &bull; {selectedExp.location}
                </div>
              </div>
              <div className="text-xs font-mono font-bold bg-amber-50 px-3 py-1.5 border border-amber-400 text-amber-950">
                {selectedExp.period}
              </div>
            </div>

            <p className="text-xs text-neutral-800 leading-relaxed bg-neutral-50 p-3 border border-neutral-300">
              {selectedExp.summary}
            </p>
          </div>

          {/* Metrics Grid */}
          {selectedExp.metrics && selectedExp.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {selectedExp.metrics.map((m, i) => (
                <div key={i} className="p-2.5 bg-gradient-to-b from-amber-50 to-yellow-50 border-2 border-black text-center shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-amber-800">{m.label}</div>
                  <div className="font-bold text-sm font-mono text-black truncate mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Achievements */}
          <div className="p-4 bg-white border-2 border-black space-y-2.5 shadow-xs">
            <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5 text-black">
              Key Engineering Deliverables &amp; Architectural Work
            </div>
            <ul className="space-y-2 text-xs text-neutral-800">
              {selectedExp.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 text-sm shrink-0">›</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Chips */}
          <div>
            <span className="font-bold text-xs uppercase tracking-wider block mb-1.5 text-neutral-700">
              Environment &amp; Stack Used:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedExp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-amber-50 border-2 border-amber-300 text-xs font-mono text-amber-950 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-1.5 bg-white border-t-2 border-black flex justify-between items-center text-xs text-neutral-600 font-mono select-none">
        <span>Log Integrity: Verified • System 7.5 Journal</span>
        <span>All Historical Records Loaded Successfully</span>
      </div>
    </div>
  );
};
