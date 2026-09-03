import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const TerminalWidget: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl bg-card border border-border/80 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/70 border-b border-border/80 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
          <span className="ml-2 text-xs text-muted-foreground font-semibold">
            specs.sh
          </span>
        </div>

        <button
          onClick={() => copyCommand("curl -s https://torbiomar.vercel.app/profile.json")}
          className="p-1 rounded hover:bg-slate-700/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Copy cURL endpoint"
          aria-label="Copy cURL command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Viewport */}
      <div className="p-4 sm:p-5 text-slate-300 bg-[#0c1322] space-y-2.5 leading-relaxed overflow-x-auto">
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <span className="text-accent">$</span>
          <span>sysctl --profile omar.torbi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 pt-1 text-xs">
          <div><span className="text-muted-foreground">Candidate:</span> <span className="text-foreground font-semibold">Omar Torbi</span></div>
          <div><span className="text-muted-foreground">Role:</span> <span className="text-accent font-semibold">Full-Stack Developer</span></div>
          <div><span className="text-muted-foreground">Education:</span> <span className="text-emerald-400">EMSI Rabat (IIR, 2022–Present)</span></div>
          <div><span className="text-muted-foreground">Location:</span> <span className="text-foreground">Rabat / Béni Mellal, Morocco</span></div>
          <div><span className="text-muted-foreground">Languages:</span> <span className="text-foreground">Arabic, French, English</span></div>
          <div><span className="text-muted-foreground">Backend:</span> <span className="text-accent font-bold">Spring Boot, Laravel, Django, REST</span></div>
          <div><span className="text-muted-foreground">Frontend:</span> <span className="text-cyan-400">React, TypeScript, Tailwind, Three.js</span></div>
          <div><span className="text-muted-foreground">Databases & AI:</span> <span className="text-foreground">Oracle, MySQL, MongoDB, ChromaDB, Gemini</span></div>
        </div>

        <div className="pt-2 text-[11px] text-muted-foreground flex items-center gap-2 border-t border-slate-800/80 mt-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Status: Available for Full-Stack & Software Engineering roles.</span>
        </div>
      </div>
    </div>
  );
};
