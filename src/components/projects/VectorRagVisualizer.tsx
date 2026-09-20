import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Search, Database, Bot, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface DocumentChunk {
  id: string;
  topic: string;
  source: string;
  content: string;
  x: number;
  y: number;
  similarity: number;
}

const SAMPLE_CHUNKS: DocumentChunk[] = [
  {
    id: 'chunk-1',
    topic: 'Spring Boot',
    source: 'Securing-REST-APIs.pdf (p.14)',
    content: 'Configured Spring Security filter chain with Stateless SessionCreationPolicy and JWT claims validation for zero-trust microservice ingress.',
    x: 65,
    y: 40,
    similarity: 0.96,
  },
  {
    id: 'chunk-2',
    topic: 'ChromaDB RAG',
    source: 'Vector-Architecture-v2.md (p.3)',
    content: 'ChromaDB collections indexed using HNSW cosine distance metric. Sub-100ms similarity retrieval across 1536-dimensional embeddings.',
    x: 180,
    y: 80,
    similarity: 0.94,
  },
  {
    id: 'chunk-3',
    topic: 'Database Optimization',
    source: 'MySQL-Performance-Guide.pdf (p.28)',
    content: 'Eliminated full-table scans via composite B-Tree indexes on (tenant_id, created_at). Read queries resolved in under 4ms.',
    x: 290,
    y: 55,
    similarity: 0.88,
  },
  {
    id: 'chunk-4',
    topic: 'DevOps & Docker',
    source: 'Docker-Cluster-Spec.yaml (p.1)',
    content: 'Multi-stage Docker builds isolating JRE 21 runtime in Alpine containers, reducing container attack surface and image size by 68%.',
    x: 370,
    y: 110,
    similarity: 0.84,
  },
];

const PRESET_QUERIES = [
  { label: 'ChromaDB RAG', query: 'How does vector search with ChromaDB work in this architecture?' },
  { label: 'Spring Boot Security', query: 'How is token-based authentication and RBAC enforced in Spring Boot?' },
  { label: 'Database Indexing', query: 'What query optimization and indexing strategies were applied in MySQL/PostgreSQL?' },
];

export const VectorRagVisualizer: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState(PRESET_QUERIES[0].query);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<DocumentChunk>(SAMPLE_CHUNKS[1]);
  const [generatedText, setGeneratedText] = useState<string>(
    'Grounded Response: The system chunks ingested documents asynchronously, computes dense vector embeddings, and stores them in ChromaDB using HNSW cosine similarity. Google Gemini API synthesizes the top-k chunks with direct document attribution.'
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render 2D Vector Embedding Map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw faint vector coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Query vector origin
      const qx = width / 2;
      const qy = height / 2 + Math.sin(t) * 4;

      // Draw connection vectors between Query and Chunks
      SAMPLE_CHUNKS.forEach((chunk) => {
        const isMatch = chunk.id === selectedChunk.id;
        const cx = (chunk.x / 460) * width;
        const cy = (chunk.y / 160) * height;

        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(cx, cy);

        if (isMatch) {
          ctx.strokeStyle = 'rgba(0, 255, 157, 0.7)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.lineDashOffset = -t * 15;
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Chunk node dot
        ctx.beginPath();
        ctx.arc(cx, cy, isMatch ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isMatch ? '#00FF9D' : '#00E5FF';
        ctx.shadowColor = isMatch ? '#00FF9D' : '#00E5FF';
        ctx.shadowBlur = isMatch ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = isMatch ? '#FFFFFF' : '#8E9BB0';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(`${chunk.topic} (${(chunk.similarity * 100).toFixed(0)}%)`, cx + 8, cy + 3);
      });

      // Central query vector point
      ctx.beginPath();
      ctx.arc(qx, qy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#FFB800';
      ctx.shadowColor = '#FFB800';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText('Query Vector (Dense Embedding)', qx - 70, qy - 12);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [selectedChunk]);

  const handleSelectQuery = (queryText: string, index: number) => {
    sound.playClick();
    setActiveQuery(queryText);
    setIsSearching(true);

    const targetChunk = index === 0 ? SAMPLE_CHUNKS[1] : index === 1 ? SAMPLE_CHUNKS[0] : SAMPLE_CHUNKS[2];

    setTimeout(() => {
      sound.playSuccess();
      setSelectedChunk(targetChunk);
      setIsSearching(false);

      if (index === 0) {
        setGeneratedText(
          'Gemini Synthesis: ChromaDB calculates cosine distances across document embeddings in sub-100ms. Ingested chunks are indexed with high-dimensional metadata, enabling precise contextual search without hallucinations.'
        );
      } else if (index === 1) {
        setGeneratedText(
          'Gemini Synthesis: Spring Boot enforces stateless JWT authentication via custom once-per-request filters and Spring Security RBAC annotations (@PreAuthorize), safeguarding backend REST endpoints.'
        );
      } else {
        setGeneratedText(
          'Gemini Synthesis: Database access is optimized using normalized schema design, JPA fetch joins to eliminate N+1 queries, and composite B-Tree indexes yielding sub-5ms query response times.'
        );
      }
    }, 450);
  };

  return (
    <div className="rounded-xl bg-[#090d16] border border-white/10 overflow-hidden font-mono text-xs">
      {/* Header telemetry */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0d121e] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="font-bold text-foreground">AI VECTOR RAG ENGINE</span>
          <span className="text-[10px] text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
            ChromaDB + Gemini API
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground hidden sm:flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-accent" />
          <span>COSINE SIMILARITY: 0.94</span>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="p-3 bg-[#0a0e18] border-b border-white/10 flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-[11px] flex items-center gap-1 mr-1">
          <Search className="w-3 h-3 text-accent" />
          <span>Test Query:</span>
        </span>
        {PRESET_QUERIES.map((preset, idx) => {
          const isCurrent = activeQuery === preset.query;
          return (
            <button
              key={preset.label}
              onClick={() => handleSelectQuery(preset.query, idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-accent/15 text-accent border border-accent/40 font-semibold'
                  : 'bg-white/5 text-slate-400 hover:text-foreground hover:bg-white/10 border border-white/5'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Visual Vector Embedding Projection (Canvas) */}
      <div className="relative h-40 bg-[#060910]">
        <canvas
          ref={canvasRef}
          width={460}
          height={160}
          className="w-full h-full block"
        />

        {/* Vector Space HUD Watermark */}
        <div className="absolute bottom-2 left-3 text-[10px] text-muted-foreground/80 flex items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3 h-3 text-cyan" />
          <span>2D Embedding Projection (HNSW Cosine Vector Space)</span>
        </div>
      </div>

      {/* Retrieved Chunk Inspection & Gemini Output */}
      <div className="p-3.5 bg-[#0d121e] border-t border-white/10 space-y-2.5">
        {/* Top-K Retrieved Document Chunk */}
        <div className="p-2.5 rounded-lg bg-[#080c14] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-accent font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Retrieved Context: {selectedChunk.source}
            </span>
            <span className="text-cyan font-bold">
              Similarity: {(selectedChunk.similarity * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
            "{selectedChunk.content}"
          </p>
        </div>

        {/* Generative Synthesis */}
        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-accent/30 space-y-1">
          <div className="flex items-center gap-1.5 text-accent text-[11px] font-semibold">
            <Bot className="w-3.5 h-3.5" />
            <span>Google Gemini API Contextual Answer:</span>
          </div>
          <p className="text-[11px] text-slate-200 font-sans leading-relaxed">
            {isSearching ? 'Computing vector similarity & streaming response...' : generatedText}
          </p>
        </div>
      </div>
    </div>
  );
};
