import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../../utils/sound';

interface RadarPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const pulsesRef = useRef<RadarPulse[]>([]);
  const [hudCoords, setHudCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

    const gridSize = 56;
    let timeOffset = 0;

    const render = () => {
      timeOffset += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains('dark');
      const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.04)';
      const crossColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.09)';
      const accentColor = isDarkMode ? '#FFFFFF' : '#000000';

      // 1. Draw Architectural Grid Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Subtle Crosshair Ticks (+) at Grid Intersections
      ctx.lineWidth = 1;
      const crossSize = 3;
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          // If close to cursor, highlight tick
          let currentCrossColor = crossColor;
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              const proximityAlpha = Math.max(0, 1 - dist / 140);
              currentCrossColor = isDarkMode
                ? `rgba(255, 255, 255, ${proximityAlpha * 0.85})`
                : `rgba(0, 0, 0, ${proximityAlpha * 0.7})`;
            }
          }

          ctx.strokeStyle = currentCrossColor;
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
      }

      // 3. Interactive CAD Cursor Orthogonal Projections
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Subtle projection hairline guides
        ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
        ctx.setLineDash([3, 3]);
        
        // Vertical projection guide
        ctx.beginPath();
        ctx.moveTo(mx, 0);
        ctx.lineTo(mx, height);
        ctx.stroke();

        // Horizontal projection guide
        ctx.beginPath();
        ctx.moveTo(0, my);
        ctx.lineTo(width, my);
        ctx.stroke();

        ctx.setLineDash([]);

        // Small target crosshair
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Render Precision Shockwave Radar Pulses
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const p = pulsesRef.current[i];
        p.radius += 4;
        p.alpha *= 0.94;

        if (p.alpha < 0.02 || p.radius >= p.maxRadius) {
          pulsesRef.current.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = isDarkMode
          ? `rgba(255, 255, 255, ${p.alpha * 0.7})`
          : `rgba(0, 0, 0, ${p.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary inner echo ring
        if (p.radius > 20) {
          ctx.strokeStyle = isDarkMode
            ? `rgba(255, 255, 255, ${p.alpha * 0.3})`
            : `rgba(0, 0, 0, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      mouseRef.current = { x, y, active: true };
      setHudCoords({ x, y });
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pulsesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 6,
        maxRadius: 280,
        alpha: 0.9,
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
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair block"
      />

      {/* Architectural Telemetry HUD Badge */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2.5 px-3 py-1 rounded-sm bg-white/90 dark:bg-black/90 border border-neutral-300 dark:border-white/10 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 select-none backdrop-blur-xs">
        <span className="text-neutral-900 dark:text-white font-bold">CAD//GRID: 56PX</span>
        <span className="text-neutral-300 dark:text-neutral-700">|</span>
        <span>X: {hudCoords.x.toString().padStart(4, '0')}</span>
        <span>Y: {hudCoords.y.toString().padStart(4, '0')}</span>
      </div>
    </div>
  );
};
