import React, { useState, useRef } from 'react';
import { RetroDesktopIcon as IRetroDesktopIcon } from '../../types/retro';
import { RetroIcon } from './RetroIcon';
import { retroSound } from '../../utils/retroSound';

interface RetroDesktopIconProps {
  item: IRetroDesktopIcon;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
}

export const RetroDesktopIcon: React.FC<RetroDesktopIconProps> = ({
  item,
  isSelected,
  onSelect,
  onOpen,
  onPositionChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: item.position.x,
    posY: item.position.y,
  });

  const lastClickTimeRef = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: item.position.x,
      posY: item.position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;
    const maxW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const maxH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const newX = Math.max(10, Math.min(maxW - 115, dragStartRef.current.posX + deltaX));
    const newY = Math.max(30, Math.min(maxH - 120, dragStartRef.current.posY + deltaY));
    onPositionChange({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Click & Tap Handling
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const isDoubleClick = now - lastClickTimeRef.current < 380;
    lastClickTimeRef.current = now;

    retroSound.playClick();

    if (isDoubleClick || isSelected) {
      onOpen();
    } else {
      onSelect();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${item.position.y}px`,
        left: `${item.position.x}px`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      className={`w-[124px] p-1 flex flex-col items-center justify-start cursor-pointer select-none group z-10 transition-transform ${
        isDragging ? 'scale-105 z-30 opacity-90' : 'hover:-translate-y-0.5'
      }`}
    >
      {/* Icon Graphic Container */}
      <div
        className={`relative p-2 rounded-md border-2 transition-all ${
          isSelected
            ? 'bg-yellow-300 border-black shadow-[3px_3px_0px_#000000] scale-105 ring-2 ring-white'
            : 'bg-white/95 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.85)] hover:bg-white hover:shadow-[3px_3px_0px_#000]'
        }`}
      >
        <RetroIcon name={item.iconName} size={38} />

        {/* Optional colorful badge */}
        {item.badge && (
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-mono text-[8px] font-bold px-1 py-0.2 rounded-xs border border-black shadow-[1px_1px_0px_#000]">
            {item.badge}
          </span>
        )}
      </div>

      {/* Label with safe width so title never overlaps another icon */}
      <div className="mt-2 flex flex-col items-center max-w-[120px]">
        <span
          className={`font-screen text-[11px] font-bold leading-tight text-center px-2 py-0.5 border-2 tracking-wide whitespace-nowrap shadow-xs flex items-center justify-center gap-1 ${
            isSelected
              ? 'bg-black text-yellow-300 border-black ring-1 ring-yellow-400'
              : 'text-black bg-white/95 border-black font-semibold'
          }`}
        >
          <span>{item.title}</span>
          {isSelected && (
            <span className="text-[9px] font-mono bg-yellow-400 text-black px-1 py-0.2 border border-black font-bold">
              ↵
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
