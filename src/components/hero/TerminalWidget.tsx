import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

type TerminalTab = 'specs' | 'spring_api' | 'ai_rag';

export const TerminalWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TerminalTab>('specs');
  const [copied, setCopied] = useState(false);

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl bg-card border border-border/80 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/70 border-b border-border/80 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
          <span className="ml-2 text-xs text-muted-foreground hidden sm:inline-block">
            omar@torbi-box:~$
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-primary text-accent font-semibold border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            specs.sh
          </button>
          <button
            onClick={() => setActiveTab('spring_api')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'spring_api'
                ? 'bg-primary text-accent font-semibold border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            spring_api.java
          </button>
          <button
            onClick={() => setActiveTab('ai_rag')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              activeTab === 'ai_rag'
                ? 'bg-primary text-accent font-semibold border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            ai_rag.java
          </button>
        </div>

        <button
          onClick={() => copyCommand("curl -s https://torbi.dev/api/profile.json")}
          className="p-1.5 rounded hover:bg-slate-700/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Copy cURL endpoint"
          aria-label="Copy cURL command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Viewport */}
      <div className="p-4 sm:p-5 text-slate-300 min-h-[230px] bg-[#0c1322] space-y-3 leading-relaxed overflow-x-auto">
        {activeTab === 'specs' && (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-accent">$</span>
              <span>sysctl --profile omar.torbi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-2 text-xs">
              <div><span className="text-muted-foreground">Candidate:</span> <span className="text-foreground font-semibold">Omar Torbi</span></div>
              <div><span className="text-muted-foreground">Role:</span> <span className="text-accent font-semibold">Full-Stack Developer</span></div>
              <div><span className="text-muted-foreground">Education:</span> <span className="text-emerald-400">EMSI Rabat (IIR, 2022–Present)</span></div>
              <div><span className="text-muted-foreground">Location:</span> <span className="text-foreground">Rabat / Béni Mellal, Morocco</span></div>
              <div><span className="text-muted-foreground">Languages:</span> <span className="text-foreground">Arabic, French, English</span></div>
              <div><span className="text-muted-foreground">Backend:</span> <span className="text-accent font-bold">Spring Boot, Laravel, Django, REST</span></div>
              <div><span className="text-muted-foreground">Frontend:</span> <span className="text-cyan-400">React, TypeScript, Tailwind, Three.js</span></div>
              <div><span className="text-muted-foreground">Databases & AI:</span> <span className="text-foreground">Oracle, MySQL, MongoDB, ChromaDB, Gemini</span></div>
            </div>
            <div className="pt-2 text-[11px] text-muted-foreground flex items-center gap-2 border-t border-slate-800/80 mt-3">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Status: Available for Full-Stack & Software Engineering roles.</span>
            </div>
          </div>
        )}

        {activeTab === 'spring_api' && (
          <div className="space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-accent">$</span>
              <span>cat /src/backend/RecruitmentPipelineController.java</span>
            </div>
            <pre className="text-slate-300 font-mono text-[11px] sm:text-xs overflow-x-auto leading-5 pt-1">
{`@RestController
@RequestMapping("/api/v1/pipeline")
@RequiredArgsConstructor
public class RecruitmentPipelineController {

  private final CandidatePipelineService pipelineService;

  @PreAuthorize("hasRole('RECRUITER')")
  @PostMapping("/candidates/{id}/transition")
  public ResponseEntity<CandidateDto> transitionStage(
      @PathVariable UUID id,
      @Valid @RequestBody StageTransitionRequest request) {
    CandidateDto updated = pipelineService.updateStage(id, request);
    return ResponseEntity.ok(updated);
  }
}`}
            </pre>
          </div>
        )}

        {activeTab === 'ai_rag' && (
          <div className="space-y-1.5 text-xs animate-fadeIn">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <span className="text-accent">$</span>
              <span>java -jar intelligent-library-core.jar --status</span>
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="text-slate-400"><span className="text-accent">[SPRING BOOT]</span> Initialized Spring Security JWT + ChromaDB client.</div>
              <div className="text-slate-400"><span className="text-cyan-400">[EMBEDDING]</span> Chunking PDF research documents: 512 tokens / chunk.</div>
              <div className="text-slate-400"><span className="text-accent">[VECTOR]</span> ChromaDB similarity query latency: 68ms (Cosine distance &lt; 0.18).</div>
              <div className="text-slate-400"><span className="text-emerald-400">[GEMINI RAG]</span> Contextual synthesized response returned to collaborative room.</div>
              <div className="text-emerald-400 font-semibold mt-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Intelligent Library: Semantic discovery services active.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
