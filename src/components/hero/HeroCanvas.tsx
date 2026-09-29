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

    // Create Data/Vector Nodes (optimized count for smooth performance)
    const nodeCount = Math.min(36, Math.max(20, Math.floor(width / 38)));
    const nodes: DataNode[] = [];
    const types: DataNode['type'][] = ['vector', 'db', 'service', 'ai'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: i % 5 === 0 ? 3 : Math.random() * 1.5 + 1.8,
        type: types[i % types.length],
        clusterId: i % 4,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Packets streaming between nodes
    const packets: DataPacket[] = [];
    for (let p = 0; p < 12; p++) {
      const from = Math.floor(Math.random() * nodeCount);
      const to = (from + 1 + Math.floor(Math.random() * 4)) % nodeCount;
      packets.push({
        fromNode: from,
        toNode: to,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.007,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Update Node Positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * 60 * dt;
        n.y += n.vy * 60 * dt;
        n.pulse += dt * 2.2;

        // Wrap boundaries
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Mouse interaction (fast squared distance check)
        if (mouseRef.current.active) {
          const dx = n.x - mouseRef.current.x;
          const dy = n.y - mouseRef.current.y;
          const distSq = dx * dx + dy * dy;
          const threshold = 170;
          if (distSq < threshold * threshold && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (threshold - dist) / threshold;
            n.x += (dx / dist) * force * 7;
            n.y += (dy / dist) * force * 7;
          }
        }
      }

      // Draw Connections (Cosine Vectors / Data Bus) - Optimized distSq
      const maxDist = networkMode === 'vector' ? 140 : networkMode === 'pipeline' ? 120 : 160;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            if (networkMode === 'vector') {
              ctx.strokeStyle = a.clusterId === b.clusterId 
                ? `rgba(255, 107, 0, ${alpha * 1.6})` 
                : `rgba(203, 213, 225, ${alpha * 0.8})`;
              ctx.lineWidth = a.clusterId === b.clusterId ? 1 : 0.6;
            } else if (networkMode === 'pipeline') {
              ctx.strokeStyle = `rgba(226, 232, 240, ${alpha * 1.1})`;
              ctx.lineWidth = 0.75;
            } else {
              ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 1.0})`;
              ctx.lineWidth = 0.65;
            }
            ctx.stroke();
          }
        }
      }

      // Draw Streaming Data Packets (High-energy Orange)
      for (let p = 0; p < packets.length; p++) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromNode = Math.floor(Math.random() * nodes.length);
          pkt.toNode = (pkt.fromNode + 1 + Math.floor(Math.random() * 4)) % nodes.length;
        }

        const a = nodes[pkt.fromNode];
        const b = nodes[pkt.toNode];
        const px = a.x + (b.x - a.x) * pkt.progress;
        const py = a.y + (b.y - a.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B00';
        ctx.shadowColor = '#FF6B00';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Pulse Waves on Click (Orange radiant ripple)
      for (let i = pulseWavesRef.current.length - 1; i >= 0; i--) {
        const wave = pulseWavesRef.current[i];
        wave.radius += 180 * dt;
        wave.alpha = Math.max(0, 1 - wave.radius / wave.maxRadius);

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 107, 0, ${wave.alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (wave.radius >= wave.maxRadius) {
          pulseWavesRef.current.splice(i, 1);
        }
      }

      // Draw Nodes (Silver, White, & Orange focal nodes)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulse) * 0.2 + 0.8;
        const r = n.radius * pulse;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

        if (n.type === 'ai') {
          ctx.fillStyle = '#FF6B00';
          ctx.shadowColor = 'rgba(255, 107, 0, 0.7)';
        } else if (n.type === 'db') {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        } else if (n.type === 'service') {
          ctx.fillStyle = '#CBD5E1';
          ctx.shadowColor = 'rgba(203, 213, 225, 0.4)';
        } else {
          ctx.fillStyle = '#94A3B8';
          ctx.shadowColor = 'rgba(148, 163, 184, 0.4)';
        }

        ctx.shadowBlur = 6;
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
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0B0F]/90 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-[#FF6B00] beacon-orange" />
        <span className="text-slate-400">Topology:</span>
        <button
          onClick={cycleMode}
          className="text-white hover:text-[#FF6B00] font-semibold transition-colors uppercase tracking-wider cursor-pointer"
          title="Click to cycle interactive data network topology"
        >
          [{networkMode === 'vector' ? 'Vector RAG Space' : networkMode === 'pipeline' ? 'Data Pipeline' : 'Cloud Cluster'}]
        </button>
      </div>
    </div>
  );
};
