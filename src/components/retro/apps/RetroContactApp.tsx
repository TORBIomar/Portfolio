import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../../data/portfolioData';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

export const RetroContactApp: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [subject, setSubject] = useState('Recruiter Inquiry / Opportunity for Omar Torbi');
  const [message, setMessage] = useState(
    `Hello Omar,\n\nI reviewed your portfolio and engineering credentials (OCI DevOps & Architect, EMSI Rabat). We are interested in discussing an opportunity with you regarding...\n\nBest regards,`
  );
  const [copied, setCopied] = useState(false);

  const handleApplyTemplate = (title: string, templateMsg: string) => {
    retroSound.playClick();
    setSubject(title);
    setMessage(templateMsg);
  };

  const handleCopyEmail = () => {
    retroSound.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    retroSound.playFloppySeek();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `From: ${senderName || 'Anonymous Visitor'} (${senderCompany || 'N/A'})\n\n${message}`
    )}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] text-black font-screen text-xs overflow-y-auto p-4">
      {/* Top Banner with Vibrant Coral / Pink Accent & Generous Space */}
      <div className="p-4 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 border-2 border-black shadow-[4px_4px_0px_#000] mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RetroIcon name="mail" size={32} />
          <div>
            <h1 className="font-bold text-base text-pink-950">MacMail: Electronic Mail Dispatcher</h1>
            <p className="text-xs text-pink-800 font-mono mt-0.5">
              Direct Recruiter Carrier Network &bull; Omar Torbi
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyEmail}
          className="px-4 py-2 my-1 bg-white hover:bg-neutral-100 border-2 border-black font-bold text-xs cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
        >
          <span>{copied ? '✓ Copied!' : 'Copy Email'}</span>
        </button>
      </div>

      {/* Main Mail Form & Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* Left 2 Cols: Form */}
        <form
          onSubmit={handleSendMail}
          className="lg:col-span-2 bg-white border-2 border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000]"
        >
          <div className="space-y-3.5">
            {/* Headers */}
            <div className="space-y-2.5 border-b-2 border-black pb-3">
              <div className="flex items-center gap-2.5">
                <label className="font-bold text-xs w-20 text-neutral-600">To:</label>
                <div className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 border border-blue-300 flex-1">
                  {PERSONAL_INFO.name} &lt;{PERSONAL_INFO.email}&gt;
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <label className="font-bold text-xs w-20 text-neutral-600">Your Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor / Tech Lead"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="font-mono text-xs px-2.5 py-1.5 border-2 border-black flex-1 focus:outline-none bg-[#FAFAFA]"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <label className="font-bold text-xs w-20 text-neutral-600">Company:</label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Matrix Corp"
                  value={senderCompany}
                  onChange={(e) => setSenderCompany(e.target.value)}
                  className="font-mono text-xs px-2.5 py-1.5 border-2 border-black flex-1 focus:outline-none bg-[#FAFAFA]"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <label className="font-bold text-xs w-20 text-neutral-600">Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="font-mono text-xs px-2.5 py-1.5 border-2 border-black flex-1 focus:outline-none bg-[#FAFAFA]"
                  required
                />
              </div>
            </div>

            {/* Quick Templates with More Room & Padding */}
            <div>
              <span className="font-bold text-[10px] uppercase tracking-wider block text-pink-900 mb-1.5">
                ⚡ Quick Insert Subject &amp; Body:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  {
                    label: 'PFE Internship (Feb 2027)',
                    subj: 'PFE Internship Opportunity (Feb 2027) — Software / DevOps',
                    msg: `Hello Omar,\n\nWe came across your profile and were impressed by your background in Spring Boot, Docker, and your dual OCI certifications.\n\nWe would like to discuss our End-of-Studies (PFE) Internship opportunity starting February 2027 with you.\n\nPlease let us know when you might be available for a brief conversation.`,
                  },
                  {
                    label: 'Full-Time Engineering Role',
                    subj: 'Full-Time Software & DevOps Role Discussion',
                    msg: `Hello Omar,\n\nWe are currently looking for a passionate Software & DevOps Engineer to join our team. We love your work on projects like Elevate and Zahiri Metal.\n\nWould you be open to an interview to explore mutual fit?`,
                  },
                  {
                    label: 'Engineering Chat',
                    subj: 'Engineering Networking & Coffee Chat',
                    msg: `Hi Omar,\n\nI really like your retro OS portfolio and your work on WebAssembly & DevOps pipelines. I would love to connect and exchange ideas!`,
                  },
                ].map((tpl) => (
                  <button
                    key={tpl.label}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.subj, tpl.msg)}
                    className="px-3.5 py-2 my-1 bg-pink-50 hover:bg-pink-100 border border-pink-400 text-pink-950 text-xs font-mono font-bold cursor-pointer transition-colors"
                  >
                    + {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="font-bold text-xs uppercase text-neutral-600 block mb-1.5">
                Message Body:
              </label>
              <textarea
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full font-mono text-xs p-3 border-2 border-black focus:outline-none bg-[#FAFAFA] resize-none shadow-inner leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-mono">
              Ready to transmit via SMTP / Local Mail
            </span>

            <button
              type="submit"
              className="px-6 py-2.5 my-1 bg-rose-500 text-white border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-rose-600 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
            >
              <span>Transmit Mail</span>
              <span>✉</span>
            </button>
          </div>
        </form>

        {/* Right Col: Instant Channels */}
        <div className="space-y-4">
          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5">
              Direct Channels
            </div>

            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => retroSound.playClick()}
              className="p-3 my-1 bg-emerald-50 border-2 border-emerald-500 flex items-center justify-between text-black hover:bg-emerald-100 transition-all cursor-pointer block shadow-xs"
            >
              <div>
                <div className="font-bold text-xs text-emerald-950">WhatsApp Direct</div>
                <div className="text-[11px] text-emerald-800 font-mono mt-0.5">{PERSONAL_INFO.phone}</div>
              </div>
              <span className="font-bold text-emerald-700 text-xs">Chat ↗</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => retroSound.playClick()}
              className="p-3 my-1 bg-blue-50 border-2 border-blue-500 flex items-center justify-between text-black hover:bg-blue-100 transition-all cursor-pointer block shadow-xs"
            >
              <div>
                <div className="font-bold text-xs text-blue-950">LinkedIn Connection</div>
                <div className="text-[11px] text-blue-800 font-mono mt-0.5">omar-torbi</div>
              </div>
              <span className="font-bold text-blue-700 text-xs">Visit ↗</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => retroSound.playClick()}
              className="p-3 my-1 bg-neutral-100 border-2 border-black flex items-center justify-between text-black hover:bg-neutral-200 transition-all cursor-pointer block shadow-xs"
            >
              <div>
                <div className="font-bold text-xs text-neutral-950">GitHub Repositories</div>
                <div className="text-[11px] text-neutral-700 font-mono mt-0.5">@TORBIomar</div>
              </div>
              <span className="font-bold text-black text-xs">Browse ↗</span>
            </a>
          </div>

          {/* Floppy Downloads */}
          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5">
              Resume Archives
            </div>

            <a
              href={PERSONAL_INFO.resumeUrlEn}
              download="OMAR-TORBI-RESUME-EN.pdf"
              onClick={() => retroSound.playFloppySeek()}
              className="p-2.5 my-1 border-2 border-blue-400 bg-blue-50 hover:bg-blue-100 flex items-center gap-3.5 cursor-pointer transition-colors block"
            >
              <div className="shrink-0">
                <RetroIcon name="floppy" size={26} />
              </div>
              <div>
                <div className="font-bold text-xs text-blue-950">English Resume (PDF)</div>
                <div className="text-[10px] text-blue-800 font-mono">Standard International Format</div>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.resumeUrlFr}
              download="OMAR-TORBI-CV-FR.pdf"
              onClick={() => retroSound.playFloppySeek()}
              className="p-2.5 my-1 border-2 border-purple-400 bg-purple-50 hover:bg-purple-100 flex items-center gap-3.5 cursor-pointer transition-colors block"
            >
              <div className="shrink-0">
                <RetroIcon name="floppy" size={26} />
              </div>
              <div>
                <div className="font-bold text-xs text-purple-950">Curriculum Vitae (FR)</div>
                <div className="text-[10px] text-purple-800 font-mono">Format Ingénieur DDSI</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
