import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCw, Zap, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export const CadVisualizerPreview: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [diameter, setDiameter] = useState<number>(45); // mm
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.2);
  const [laserActive, setLaserActive] = useState<boolean>(true);

  const angleRef = useRef<number>(0);
  const sparksRef = useRef<Spark[]>([]);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Rotate angle if playing
      if (isPlaying && !isDraggingRef.current) {
        angleRef.current += 0.015 * rotationSpeed;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = (diameter / 60) * (height * 0.28);
      const tubeLength = width * 0.65;
      const angle = angleRef.current;

      // Draw 3D Tube Wireframe & Shading
      ctx.save();
      ctx.translate(cx, cy);

      // Draw background grid lines on tube
      const numSegments = 16;
      const xStart = -tubeLength / 2;
      const xEnd = tubeLength / 2;

      // Draw cylinder body gradients
      const bodyGrad = ctx.createLinearGradient(0, -radius, 0, radius);
      bodyGrad.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
      bodyGrad.addColorStop(0.3, 'rgba(51, 65, 85, 0.8)');
      bodyGrad.addColorStop(0.5, 'rgba(148, 163, 184, 0.9)');
      bodyGrad.addColorStop(0.7, 'rgba(30, 41, 59, 0.8)');
      bodyGrad.addColorStop(1, 'rgba(10, 15, 26, 0.9)');

      // Cylinder fill
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(xStart, -radius, tubeLength, radius * 2);

      // Wireframe contour lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';

      for (let i = 0; i < numSegments; i++) {
        const segAngle = angle + (i / numSegments) * Math.PI * 2;
        const y = Math.sin(segAngle) * radius;
        const z = Math.cos(segAngle);

        if (z > -0.2) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0.1, (z + 1) * 0.25)})`;
          ctx.moveTo(xStart, y);
          ctx.lineTo(xEnd, y);
          ctx.stroke();
        }
      }

      // Draw Tube ends (ellipses)
      const drawCap = (x: number, isFront: boolean) => {
        ctx.beginPath();
        ctx.ellipse(x, 0, radius * 0.35, radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isFront ? '#00FF9D' : 'rgba(0, 255, 157, 0.4)';
        ctx.lineWidth = isFront ? 2 : 1;
        ctx.stroke();
        if (isFront) {
          ctx.fillStyle = 'rgba(0, 255, 157, 0.08)';
          ctx.fill();
        }
      };

      drawCap(xStart, false);
      drawCap(xEnd, true);

      // Laser Cutting Tool Head & Cut Slot
      const cutX = xStart + tubeLength * 0.6;

      // Laser beam path (slot cut)
      ctx.beginPath();
      ctx.ellipse(cutX, 0, radius * 0.3, radius * 0.75, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Laser Nozzle from top
      if (laserActive) {
        const nozzleX = cutX;
        const nozzleY = -radius - 35;
        const targetY = -radius + 2;

        // Laser beam line
        ctx.beginPath();
        ctx.moveTo(nozzleX, nozzleY);
        ctx.lineTo(nozzleX, targetY);
        ctx.strokeStyle = '#00FF9D';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00FF9D';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Nozzle graphic
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(nozzleX - 8, nozzleY - 15);
        ctx.lineTo(nozzleX + 8, nozzleY - 15);
        ctx.lineTo(nozzleX + 3, nozzleY);
        ctx.lineTo(nozzleX - 3, nozzleY);
        ctx.closePath();
        ctx.fill();

        // Emit cutting sparks
        if (isPlaying && Math.random() < 0.85) {
          for (let s = 0; s < 3; s++) {
            sparksRef.current.push({
              x: nozzleX,
              y: targetY,
              vx: (Math.random() - 0.5) * 5 + 1,
              vy: Math.random() * 4 + 1,
              life: 1,
              maxLife: Math.random() * 20 + 15,
              color: Math.random() > 0.4 ? '#00FF9D' : '#FFB800',
            });
          }
        }
      }

      // Update and draw sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const spark = sparksRef.current[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.18; // gravity
        spark.life += 1;

        const alpha = Math.max(0, 1 - spark.life / spark.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        if (spark.life >= spark.maxLife) {
          sparksRef.current.splice(i, 1);
        }
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Mouse drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;
      angleRef.current += dx * 0.02;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPlaying, diameter, rotationSpeed, laserActive]);

  const togglePlay = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  const toggleLaser = () => {
    sound.playLaser();
    setLaserActive(!laserActive);
  };

  return (
    <div className="rounded-xl bg-[#090d16] border border-white/10 overflow-hidden font-mono text-xs">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d121e] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="font-bold text-slate-200">WEB CAD SIMULATOR</span>
          <span className="text-[10px] text-cyan px-1.5 py-0.2 rounded bg-cyan/10 border border-cyan/20">
            OpenCascade.js / Wasm
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>KERF: 0.15mm</span>
          <span className="text-accent flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> STEP Validated
          </span>
        </div>
      </div>

      {/* Interactive 3D Canvas Viewport */}
      <div className="relative h-48 sm:h-56 bg-[#060910] cursor-grab active:cursor-grabbing flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={460}
          height={220}
          className="w-full h-full block"
        />

        {/* Drag Hint Watermark */}
        <div className="absolute bottom-2 left-3 text-[10px] text-muted-foreground pointer-events-none flex items-center gap-1">
          <RotateCw className="w-3 h-3 text-cyan" />
          <span>Drag to inspect 3D tube geometry</span>
        </div>

        {/* Status Chip */}
        <div className="absolute top-2 right-3 text-[10px] px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-300">
          Laser: {laserActive ? 'ENGAGED 1.5kW' : 'OFF'}
        </div>
      </div>

      {/* Bottom Interactive Controls */}
      <div className="p-3 bg-[#0d121e] border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        {/* Play / Laser toggle buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-amber" /> : <Play className="w-3 h-3 text-accent" />}
            <span>{isPlaying ? 'Freeze' : 'Rotate'}</span>
          </button>

          <button
            onClick={toggleLaser}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-colors ${
              laserActive
                ? 'bg-accent/10 border-accent/40 text-accent'
                : 'bg-white/5 border-white/10 text-muted-foreground'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Laser</span>
          </button>
        </div>

        {/* Diameter slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Diameter</span>
            <span className="text-cyan font-bold">{diameter} mm</span>
          </div>
          <input
            type="range"
            min={25}
            max={65}
            value={diameter}
            onChange={(e) => {
              sound.playHover();
              setDiameter(Number(e.target.value));
            }}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FF9D]"
            aria-label="Adjust tube diameter"
          />
        </div>

        {/* Speed slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Speed (RPM)</span>
            <span className="text-accent font-bold">{rotationSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={3.0}
            step={0.1}
            value={rotationSpeed}
            onChange={(e) => {
              sound.playHover();
              setRotationSpeed(Number(e.target.value));
            }}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            aria-label="Adjust rotation speed"
          />
        </div>
      </div>
    </div>
  );
};
