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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300">
          <div><span className="text-muted-foreground">Candidate:</span> <span className="text-foreground font-semibold">Omar Torbi</span></div>
          <div><span className="text-muted-foreground">Role:</span> <span className="text-accent font-semibold">Software Engineer</span></div>
          <div><span className="text-muted-foreground">Backend:</span> <span className="text-accent font-bold">Spring Boot, REST APIs, Laravel</span></div>
          <div><span className="text-muted-foreground">AI & Vector:</span> <span className="text-cyan font-medium">ChromaDB, Gemini API, RAG</span></div>
          <div><span className="text-muted-foreground">Data & DB:</span> <span className="text-amber">Oracle, PostgreSQL, MySQL, MongoDB</span></div>
          <div><span className="text-muted-foreground">DevOps:</span> <span className="text-slate-200">Docker, Linux, Git, Cloud Concepts</span></div>
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
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-accent font-semibold">Engineering Shell Commands:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[11px] text-muted-foreground">
              <div><span className="text-cyan">ai</span> - Vector RAG pipeline</div>
              <div><span className="text-cyan">docker</span> - Container cluster status</div>
              <div><span className="text-cyan">data</span> - Database schemas & ACID</div>
              <div><span className="text-cyan">skills</span> - Complete tech stack</div>
              <div><span className="text-cyan">projects</span> - Production projects</div>
              <div><span className="text-cyan">contact</span> - Direct channels</div>
              <div><span className="text-cyan">clear</span> - Clear terminal viewport</div>
            </div>
          </div>
        );
        break;

      case 'ai':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-accent font-semibold">[AI RAG Discovery Stack]:</div>
            <div>• Vector Database: <span className="text-cyan font-mono">ChromaDB (HNSW Cosine Distance, Sub-100ms)</span></div>
            <div>• LLM Integration: <span className="text-foreground font-mono">Google Gemini API (Context-grounded synthesis)</span></div>
            <div>• Ingestion Pipeline: <span className="text-slate-300">Asynchronous token chunking & vector indexing</span></div>
          </div>
        );
        break;

      case 'docker':
        output = (
          <div className="space-y-1 text-[11px] font-mono text-slate-300">
            <div className="text-muted-foreground">CONTAINER ID   IMAGE                 STATUS         PORTS</div>
            <div><span className="text-cyan">7f8a91b2c3d4</span>   spring-boot-api:v3   Up 48 hours    0.0.0.0:8080-&gt;8080/tcp</div>
            <div><span className="text-accent">3e4f5a6b7c8d</span>   chromadb-vector:v1   Up 48 hours    0.0.0.0:8000-&gt;8000/tcp</div>
            <div><span className="text-amber">9a1b2c3d4e5f</span>   mysql:8.0-enterprise Up 48 hours    0.0.0.0:3306-&gt;3306/tcp</div>
          </div>
        );
        break;

      case 'data':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-amber font-semibold">[Data Systems & Relational Engineering]:</div>
            <div>• Relational: <span className="text-foreground">Oracle DB (PL/SQL packages), PostgreSQL, MySQL 8.0</span></div>
            <div>• NoSQL & Vector: <span className="text-cyan">MongoDB (BSON aggregations), ChromaDB (High-dim vectors)</span></div>
            <div>• Integrity: <span className="text-accent">ACID transactions, B-Tree indexes, N+1 query elimination</span></div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs">
            <div className="text-accent font-semibold">Core Competencies (CV Verified):</div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Java', 'Spring Boot', 'Python', 'SQL & PL/SQL', 'Docker', 'Linux', 'Gemini API', 'ChromaDB', 'PostgreSQL', 'Oracle DB', 'MySQL', 'MongoDB', 'REST APIs', 'React', 'TypeScript', 'Git'].map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-surface-subtle text-accent border border-accent/20 text-[11px]">
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
              <div key={p.id} className="border-l-2 border-accent/50 pl-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <span>{p.title}</span>
                  <span className="text-[10px] text-cyan">({p.techStack.slice(0, 2).join(', ')})</span>
                </div>
                <div className="text-muted-foreground text-[11px] line-clamp-1">{p.summary}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs space-y-1 text-slate-300">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-accent hover:underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-cyan">{PERSONAL_INFO.phone}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan hover:underline">{PERSONAL_INFO.github}</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div className="text-xs text-rose-400">
            Command not recognized: "{trimmed}". Type <span className="text-accent underline cursor-pointer" onClick={() => handleExecute('help')}>help</span> for list.
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
    <div className="w-full rounded-2xl bg-[#0b0f19]/90 border border-white/10 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm backdrop-blur-md">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1422] border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
          <span className="ml-2 text-xs text-muted-foreground font-semibold flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>torbi-cli ~ backend / devops</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyCommand("curl -s https://torbiomar.vercel.app/profile.json")}
            className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Copy cURL endpoint"
            aria-label="Copy cURL endpoint"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 text-slate-300 bg-[#080c14]/90 space-y-3.5 max-h-[300px] overflow-y-auto leading-relaxed cursor-text"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span className="text-accent font-bold">omar@backend:~$</span>
              <span className="text-foreground">{entry.command}</span>
            </div>
            <div className="pl-4">{entry.output}</div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-accent font-bold shrink-0">omar@backend:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none text-foreground outline-none font-mono text-xs p-0 m-0"
            placeholder="Type 'ai', 'docker', or 'help'..."
            aria-label="Terminal command input"
          />
          {input.trim() && (
            <button
              onClick={() => handleExecute(input)}
              className="text-accent hover:text-cyan p-0.5 cursor-pointer"
              title="Execute command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Command Suggester Bar */}
      <div className="px-4 py-2 bg-[#0a0e18] border-t border-white/5 flex items-center justify-between overflow-x-auto gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 shrink-0 text-muted-foreground">
          <Sparkles className="w-3 h-3 text-accent" />
          <span>Quick:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['help', 'ai', 'docker', 'data', 'skills', 'projects'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleExecute(cmd)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-accent/15 text-slate-300 hover:text-accent border border-white/10 hover:border-accent/30 font-mono text-[10px] transition-colors cursor-pointer shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
