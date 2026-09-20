import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../../utils/sound';

interface DataNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'vector' | 'db' | 'service' | 'ai';
  clusterId: number;
  pulse: number;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [networkMode, setNetworkMode] = useState<'vector' | 'pipeline' | 'cluster'>('vector');
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const pulseWavesRef = useRef<PulseWave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create Data/Vector Nodes
    const nodeCount = Math.min(70, Math.floor(width / 26));
    const nodes: DataNode[] = [];
    const types: DataNode['type'][] = ['vector', 'db', 'service', 'ai'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 2,
        type: types[i % types.length],
        clusterId: i % 4,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Packets streaming between nodes
    const packets: DataPacket[] = [];
    for (let p = 0; p < 18; p++) {
      const from = Math.floor(Math.random() * nodeCount);
      const to = (from + 1 + Math.floor(Math.random() * 4)) % nodeCount;
      packets.push({
        fromNode: from,
        toNode: to,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Update Node Positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * 60 * dt;
        n.y += n.vy * 60 * dt;
        n.pulse += dt * 2.5;

        // Wrap boundaries
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Mouse gravity / repulsion
        if (mouseRef.current.active) {
          const dx = n.x - mouseRef.current.x;
          const dy = n.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180;
            n.x += (dx / dist) * force * 10;
            n.y += (dy / dist) * force * 10;
          }
        }
      }

      // Draw Connections (Cosine Vectors / Data Bus)
      const maxDist = networkMode === 'vector' ? 140 : networkMode === 'pipeline' ? 120 : 160;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            if (networkMode === 'vector') {
              // Cosine vector styling
              ctx.strokeStyle = a.clusterId === b.clusterId ? `rgba(0, 255, 157, ${alpha * 1.5})` : `rgba(0, 229, 255, ${alpha * 0.8})`;
              ctx.lineWidth = a.clusterId === b.clusterId ? 1 : 0.6;
            } else if (networkMode === 'pipeline') {
              // Data pipeline stream
              ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 1.2})`;
              ctx.lineWidth = 0.8;
            } else {
              // Cloud cluster network
              ctx.strokeStyle = `rgba(255, 184, 0, ${alpha * 1.2})`;
              ctx.lineWidth = 0.75;
            }
            ctx.stroke();
          }
        }
      }

      // Draw Streaming Data Packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromNode = Math.floor(Math.random() * nodes.length);
          p.toNode = (p.fromNode + 1 + Math.floor(Math.random() * 5)) % nodes.length;
        }

        const a = nodes[p.fromNode];
        const b = nodes[p.toNode];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = networkMode === 'vector' ? '#00FF9D' : networkMode === 'pipeline' ? '#00E5FF' : '#FFB800';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Pulse Waves on Click
      for (let i = pulseWavesRef.current.length - 1; i >= 0; i--) {
        const wave = pulseWavesRef.current[i];
        wave.radius += 180 * dt;
        wave.alpha = Math.max(0, 1 - wave.radius / wave.maxRadius);

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = networkMode === 'vector' ? `rgba(0, 255, 157, ${wave.alpha * 0.6})` : `rgba(0, 229, 255, ${wave.alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (wave.radius >= wave.maxRadius) {
          pulseWavesRef.current.splice(i, 1);
        }
      }

      // Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulse) * 0.25 + 0.75;
        const r = n.radius * pulse;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

        if (n.type === 'ai') {
          ctx.fillStyle = '#00FF9D';
          ctx.shadowColor = 'rgba(0, 255, 157, 0.7)';
        } else if (n.type === 'db') {
          ctx.fillStyle = '#00E5FF';
          ctx.shadowColor = 'rgba(0, 229, 255, 0.7)';
        } else if (n.type === 'service') {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        } else {
          ctx.fillStyle = '#FFB800';
          ctx.shadowColor = 'rgba(255, 184, 0, 0.7)';
        }

        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pulseWavesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 5,
        maxRadius: 260,
        alpha: 0.85,
      });
      sound.playLaser();
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [networkMode]);

  const cycleMode = () => {
    sound.playClick();
    if (networkMode === 'vector') setNetworkMode('pipeline');
    else if (networkMode === 'pipeline') setNetworkMode('cluster');
    else setNetworkMode('vector');
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair block opacity-85"
      />

      {/* Mode Switcher HUD */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d111a]/85 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-muted-foreground">Topology:</span>
        <button
          onClick={cycleMode}
          className="text-accent hover:text-cyan font-semibold transition-colors uppercase tracking-wider cursor-pointer"
          title="Click to cycle interactive data network topology"
        >
          [{networkMode === 'vector' ? 'Vector RAG Space' : networkMode === 'pipeline' ? 'Data Pipeline' : 'Cloud Cluster'}]
        </button>
      </div>
    </div>
  );
};
