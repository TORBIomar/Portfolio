import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'sysctl --profile omar.torbi',
      output: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
          <div><span className="text-neutral-500 dark:text-neutral-400">Engineer:</span> <span className="text-neutral-900 dark:text-white font-semibold">Omar Torbi</span></div>
          <div><span className="text-neutral-500 dark:text-neutral-400">Discipline:</span> <span className="text-[#FF6B00] font-semibold">Software &amp; DevOps Engineer</span></div>
          <div><span className="text-neutral-500 dark:text-neutral-400">Backend:</span> <span className="text-neutral-900 dark:text-white font-medium">Spring Boot 3, REST APIs, Java</span></div>
          <div><span className="text-neutral-500 dark:text-neutral-400">Cloud &amp; DevOps:</span> <span className="text-neutral-900 dark:text-white font-medium">Docker, Linux, OCI Cloud, Git</span></div>
          <div><span className="text-neutral-500 dark:text-neutral-400">Certifications:</span> <span className="text-[#FF6B00] font-medium">OCI DevOps &amp; Architect Pro</span></div>
          <div><span className="text-neutral-500 dark:text-neutral-400">Databases:</span> <span className="text-neutral-900 dark:text-white">PostgreSQL, Oracle DB, MySQL</span></div>
        </div>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    sound.playClick();
    const parts = trimmed.toLowerCase().split(' ');
    const cmd = parts[0];

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="text-neutral-900 dark:text-white font-semibold">Available Shell Commands:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
              <div><span className="text-[#FF6B00] font-semibold">devops</span> - Cloud &amp; Docker status</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">backend</span> - Spring Boot &amp; APIs</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">certifs</span> - OCI Certifications</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">recruiter</span> - Fast dossier</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">projects</span> - Production systems</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">skills</span> - Full competencies</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">contact</span> - Direct channels</div>
              <div><span className="text-neutral-900 dark:text-white font-semibold">clear</span> - Clear terminal</div>
            </div>
          </div>
        );
        break;

      case 'devops':
      case 'docker':
        output = (
          <div className="space-y-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <div className="text-neutral-500 dark:text-neutral-400">CONTAINER ID   IMAGE                 STATUS         PORTS</div>
            <div><span className="text-neutral-600 dark:text-neutral-400">7f8a91b2c3d4</span>   spring-boot-api:v3   Up 72 hours    0.0.0.0:8080-&gt;8080/tcp</div>
            <div><span className="text-neutral-600 dark:text-neutral-400">3e4f5a6b7c8d</span>   postgres:16-alpine   Up 72 hours    0.0.0.0:5432-&gt;5432/tcp</div>
            <div><span className="text-neutral-600 dark:text-neutral-400">9a1b2c3d4e5f</span>   n8n-automation:prod  Up 72 hours    0.0.0.0:5678-&gt;5678/tcp</div>
            <div className="text-[#FF6B00] pt-1">• Infrastructure: OCI Compute, Multi-Stage Alpine Builds, Linux systemd</div>
          </div>
        );
        break;

      case 'backend':
      case 'software':
        output = (
          <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="text-neutral-900 dark:text-white font-semibold">[Backend Engineering Stack]:</div>
            <div>• Core Framework: <span className="text-neutral-900 dark:text-white font-semibold">Spring Boot 3 (Java 17/21)</span></div>
            <div>• Security: <span className="text-neutral-900 dark:text-white">Spring Security, Stateless JWT, Granular RBAC</span></div>
            <div>• Persistence: <span className="text-neutral-900 dark:text-white">Spring Data JPA, Hibernate, Query Plan Optimization</span></div>
            <div>• API Architecture: <span className="text-neutral-900 dark:text-white">Idempotent REST, DTO Projections, OpenAPI 3.0</span></div>
          </div>
        );
        break;

      case 'certifs':
      case 'certifications':
        output = (
          <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="text-[#FF6B00] font-semibold">[Oracle Cloud Infrastructure Certifications]:</div>
            <div>• <strong className="text-neutral-900 dark:text-white">OCI DevOps Professional</strong> (1Z0-1109-26)</div>
            <div>• <strong className="text-neutral-900 dark:text-white">OCI Architect Professional</strong> (1Z0-997-26)</div>
            <div className="text-neutral-500 text-[11px]">Issued by Oracle University — Certified Cloud Architect &amp; DevOps Engineer</div>
          </div>
        );
        break;

      case 'recruiter':
        output = (
          <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="text-[#FF6B00] font-semibold">[Candidate Fast Dossier]:</div>
            <div>• Target Roles: <span className="text-neutral-900 dark:text-white font-semibold">Software Engineer &amp; DevOps Engineer</span></div>
            <div>• Education: <span className="text-neutral-900 dark:text-white">EMSI Rabat (DDSI Engineering Degree, 2022–Present)</span></div>
            <div>• Certifications: <span className="text-[#FF6B00]">OCI DevOps Pro &amp; OCI Architect Pro</span></div>
            <div>• Direct Contact: <span className="text-neutral-900 dark:text-white">{PERSONAL_INFO.email}</span> | <span>{PERSONAL_INFO.phone}</span></div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs">
            <div className="text-neutral-900 dark:text-white font-semibold">Core Competencies:</div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Spring Boot 3', 'Docker', 'Linux', 'OCI Cloud', 'Java', 'Python', 'PostgreSQL', 'Oracle DB', 'MySQL', 'REST APIs', 'RBAC Security', 'Git', 'n8n', 'TypeScript', 'React'].map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 text-[11px] font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            {PROJECTS_DATA.slice(0, 3).map((p) => (
              <div key={p.id} className="border-l-2 border-[#FF6B00] pl-2.5">
                <div className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>{p.title}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">({p.techStack.slice(0, 2).join(', ')})</span>
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 text-[11px] line-clamp-1">{p.summary}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#FF6B00] hover:underline font-semibold">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-neutral-900 dark:text-white">{PERSONAL_INFO.phone}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-neutral-900 dark:text-white hover:underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-neutral-900 dark:text-white hover:underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div className="text-xs text-rose-500">
            Command not recognized: "{trimmed}". Type <span className="underline cursor-pointer font-bold text-neutral-900 dark:text-white" onClick={() => handleExecute('help')}>help</span> for list.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKey();
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute(input);
    }
  };

  return (
    <div
      data-cursor="terminal"
      data-terminal-widget="true"
      className="w-full rounded-2xl bg-white dark:bg-[#0B0C10] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm backdrop-blur-md"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-100 dark:bg-[#0A0A0A] border-b border-black/10 dark:border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-neutral-700 dark:text-neutral-300 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>torbi-cli ~ software &amp; devops</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            data-cursor="copy"
            onClick={() => copyCommand("curl -s https://www.omartorbi.engineer/profile.json")}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Copy cURL endpoint"
            aria-label="Copy cURL endpoint"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#FF6B00]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 text-neutral-800 dark:text-neutral-200 bg-neutral-50/90 dark:bg-[#050507]/90 space-y-3.5 max-h-[300px] overflow-y-auto leading-relaxed cursor-text"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs">
              <span className="text-[#FF6B00] font-bold">omar@devops:~$</span>
              <span className="text-neutral-900 dark:text-white font-medium">{entry.command}</span>
            </div>
            <div className="pl-4">{entry.output}</div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-[#FF6B00] font-bold shrink-0">omar@devops:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-neutral-900 dark:text-white outline-none font-mono text-xs p-0 m-0"
            placeholder="Type 'devops', 'backend', 'certifs', or 'help'..."
            aria-label="Terminal command input"
          />
          {input.trim() && (
            <button
              onClick={() => handleExecute(input)}
              className="text-[#FF6B00] hover:text-[#FFA05C] p-0.5 cursor-pointer"
              title="Execute command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Command Suggester Bar */}
      <div className="px-4 py-2 bg-neutral-100 dark:bg-[#07080B] border-t border-black/5 dark:border-white/5 flex items-center justify-between overflow-x-auto gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 shrink-0 text-neutral-500 dark:text-neutral-400">
          <Sparkles className="w-3 h-3 text-[#FF6B00]" />
          <span>Quick:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['devops', 'backend', 'certifs', 'projects', 'skills', 'help'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleExecute(cmd)}
              className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] border border-black/10 dark:border-white/10 hover:border-[#FF6B00]/40 font-mono text-[10px] transition-all cursor-pointer shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
