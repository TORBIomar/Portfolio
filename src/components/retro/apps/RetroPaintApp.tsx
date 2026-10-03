import React, { useState, useRef, useEffect } from 'react';
import { retroSound } from '../../../utils/retroSound';

type ToolType = 'pencil' | 'brush' | 'eraser';

export const RetroPaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTool, setCurrentTool] = useState<ToolType>('pencil');
  const [brushSize, setBrushSize] = useState<number>(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    ctx.font = '16px monospace';
    ctx.fillText('MacPaint 1.0 — 1-Bit Pixel Drawing Studio', 25, 40);
    ctx.font = '12px monospace';
    ctx.fillText('Dedicated to Omar Torbi • Software & DevOps Engineer', 25, 65);

    ctx.strokeRect(18, 18, canvas.width - 36, 60);
  }, []);

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const coords = getCanvasCoords(e.clientX, e.clientY);
    lastPosRef.current = coords;
    draw(coords.x, coords.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e.clientX, e.clientY);
    if (lastPosRef.current) {
      drawLine(lastPosRef.current.x, lastPosRef.current.y, coords.x, coords.y);
    }
    lastPosRef.current = coords;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    lastPosRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = currentTool === 'eraser' ? brushSize * 4 : brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : '#000000';

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };

  const draw = (x: number, y: number) => {
    drawLine(x, y, x, y);
  };

  const handleClear = () => {
    retroSound.playPaperCrumple();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleExport = () => {
    retroSound.playFloppySeek();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `macpaint-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#EDEDED] text-black font-screen text-xs overflow-hidden select-none">
      {/* Top Toolbar with Generous Space */}
      <div className="p-3 bg-white border-b-2 border-black flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Tool selectors with Roomy Padding */}
        <div className="flex items-center flex-wrap gap-2">
          {[
            { id: 'pencil', label: 'Pencil', size: 1 },
            { id: 'brush', label: 'Brush (Med)', size: 3 },
            { id: 'brush-large', label: 'Brush (Lg)', size: 8, tool: 'brush' },
            { id: 'eraser', label: 'Eraser', size: 6, tool: 'eraser' },
          ].map((item) => {
            const isSelected =
              item.tool ? currentTool === item.tool && brushSize === item.size : currentTool === item.id;
            return (
              <button
                key={item.label}
                onClick={() => {
                  retroSound.playClick();
                  setCurrentTool((item.tool || item.id) as ToolType);
                  setBrushSize(item.size);
                }}
                className={`px-4 py-2 my-1 text-xs font-bold border-2 border-black cursor-pointer shadow-xs transition-all ${
                  isSelected ? 'bg-black text-white scale-102' : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Clear & Save with Margins */}
        <div className="flex items-center gap-2.5 my-auto">
          <button
            onClick={handleClear}
            className="px-4 py-2 my-1 bg-white hover:bg-neutral-100 border-2 border-black font-bold text-xs cursor-pointer shadow-xs"
          >
            Clear Sheet
          </button>
          <button
            onClick={handleExport}
            className="px-4.5 py-2 my-1 bg-black text-white hover:bg-neutral-800 border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            Save Artwork (.png)
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-[#737373] p-2 sm:p-5 flex items-center justify-center overflow-auto">
        <canvas
          ref={canvasRef}
          width={760}
          height={480}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="border-3 border-black shadow-[6px_6px_0px_#000000] bg-white cursor-crosshair touch-none max-w-full h-auto"
        />
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 bg-white border-t-2 border-black flex justify-between items-center text-xs text-neutral-600 font-mono">
        <span>Tool: {currentTool.toUpperCase()} • Brush: {brushSize}px</span>
        <span>760 x 480 • 1-Bit Monochrome Canvas</span>
      </div>
    </div>
  );
};
