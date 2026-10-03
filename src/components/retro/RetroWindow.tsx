import React, { useState, useRef, useEffect } from 'react';
import { RetroWindowState, RetroTheme } from '../../types/retro';
import { RetroIcon } from './RetroIcon';
import { retroSound } from '../../utils/retroSound';
import { useIsMobile } from '../../utils/useIsMobile';

interface RetroWindowProps {
  windowState: RetroWindowState;
  isActive: boolean;
  theme: RetroTheme;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onZoomToggle: () => void;
  onCollapseToggle: () => void;
  onUpdatePosition: (pos: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

const getAppIconName = (appType: string) => {
  switch (appType) {
    case 'about':
      return 'mac';
    case 'projects':
      return 'folder';
    case 'capabilities':
      return 'cpu';
    case 'experience':
      return 'briefcase';
    case 'contact':
      return 'mail';
    case 'terminal':
      return 'terminal';
    case 'paint':
      return 'paint';
    case 'walkman':
      return 'tape';
    case 'trash':
      return 'trash';
    case 'settings':
      return 'settings';
    default:
      return 'folder';
  }
};

export const RetroWindow: React.FC<RetroWindowProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onZoomToggle,
  onCollapseToggle,
  onUpdatePosition,
  onUpdateSize,
  children,
}) => {
  const { isMinimized, isZoomed, isCollapsed, position, size, zIndex, title, themeColor = 'blue' } = windowState;

  // Keyboard shortcut: Escape key closes the active window
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        retroSound.playWindowClose();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onClose]);

  // Dragging state with pointer capture
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: position.x,
    posY: position.y,
  });

  // Resizing state with pointer capture
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ startX: number; startY: number; width: number; height: number }>({
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
  });

  const isMobile = useIsMobile();

  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (isZoomed || isMobile) return;
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handlePointerMoveHeader = (e: React.PointerEvent) => {
    if (!isDragging || isZoomed || isMobile) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;
    const maxW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const maxH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const newX = Math.max(0, Math.min(maxW - 80, dragStartRef.current.posX + deltaX));
    const newY = Math.max(26, Math.min(maxH - 80, dragStartRef.current.posY + deltaY));
    onUpdatePosition({ x: newX, y: newY });
  };

  const handlePointerUpHeader = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerDownResize = (e: React.PointerEvent) => {
    if (isMobile) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  const handlePointerMoveResize = (e: React.PointerEvent) => {
    if (!isResizing || isZoomed || isCollapsed || isMobile) return;
    const deltaX = e.clientX - resizeStartRef.current.startX;
    const deltaY = e.clientY - resizeStartRef.current.startY;
    const maxW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const maxH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const newW = Math.max(300, Math.min(maxW - 20, resizeStartRef.current.width + deltaX));
    const newH = Math.max(200, Math.min(maxH - 80, resizeStartRef.current.height + deltaY));
    onUpdateSize({ width: newW, height: newH });
  };

  const handlePointerUpResize = (e: React.PointerEvent) => {
    if (isResizing) {
      setIsResizing(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  if (isMinimized) return null;

  const windowStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        top: '28px',
        left: '0px',
        right: '0px',
        bottom: '36px',
        width: '100vw',
        height: 'calc(100dvh - 64px)',
        zIndex,
      }
    : isZoomed
    ? {
        position: 'fixed',
        top: 26,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 66px)',
        zIndex,
      }
    : {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: isCollapsed ? 'auto' : `${size.height}px`,
        zIndex,
        maxWidth: 'calc(100vw - 12px)',
        maxHeight: 'calc(100vh - 75px)',
      };

  // Colorful Retro Header Pinstripes
  const getHeaderPinstripe = () => {
    if (!isActive) return 'bg-[#D1D5DB]';
    switch (themeColor) {
      case 'purple':
        return 'pinstripes-purple';
      case 'emerald':
        return 'pinstripes-emerald';
      case 'amber':
        return 'pinstripes-amber';
      case 'pink':
        return 'pinstripes-pink';
      case 'cyan':
        return 'pinstripes-cyan';
      default:
        return 'pinstripes-blue';
    }
  };

  const getWindowBoxStyle = () => {
    if (isActive) {
      return 'border-3 border-black shadow-[5px_5px_0px_#000000] ring-1 ring-black/40';
    }
    return 'border-2 border-neutral-700 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] opacity-95';
  };

  const getPlaqueColor = () => {
    if (!isActive) return 'bg-neutral-200 text-neutral-700';
    switch (themeColor) {
      case 'purple':
        return 'bg-purple-100 text-purple-950 border-purple-900';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-950 border-emerald-900';
      case 'amber':
        return 'bg-amber-100 text-amber-950 border-amber-900';
      case 'pink':
        return 'bg-pink-100 text-pink-950 border-pink-900';
      case 'cyan':
        return 'bg-cyan-100 text-cyan-950 border-cyan-900';
      default:
        return 'bg-blue-100 text-blue-950 border-blue-900';
    }
  };

  return (
    <div
      style={windowStyle}
      onMouseDown={onFocus}
      className={`flex flex-col select-none transition-all duration-75 overflow-hidden bg-white text-black ${getWindowBoxStyle()}`}
    >
      {/* 1. Classic Pinstripe Title Bar with True Center Plaque and Balanced Controls */}
      <div
        className={`h-8 min-h-[32px] px-2.5 flex items-center justify-between cursor-move relative border-b-2 border-black ${getHeaderPinstripe()}`}
        onPointerDown={handlePointerDownHeader}
        onPointerMove={handlePointerMoveHeader}
        onPointerUp={handlePointerUpHeader}
        onDoubleClick={onCollapseToggle}
      >
        {/* Left: Classic Square Close Box */}
        <div className="flex items-center gap-2 z-10 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              retroSound.playWindowClose();
              onClose();
            }}
            title="Close Window (Esc)"
            className="w-6 h-6 sm:w-5 sm:h-5 bg-white border-2 border-black flex items-center justify-center cursor-pointer hover:bg-red-600 hover:text-white active:bg-black transition-colors shadow-xs group"
          >
            <span className="text-[11px] font-bold font-mono leading-none group-hover:scale-110">✕</span>
          </button>
        </div>

        {/* Center: Title Plaque - True Mathematical Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-10 sm:px-28">
          <div
            className={`px-3 py-0.5 border-2 border-black flex items-center justify-center gap-2 shadow-xs max-w-full truncate pointer-events-auto ${getPlaqueColor()}`}
          >
            <RetroIcon name={getAppIconName(windowState.appType) as any} size={15} className="shrink-0" />
            <span className="font-screen text-xs font-bold truncate tracking-wider max-w-[150px] xs:max-w-[220px] sm:max-w-none">
              {title}
            </span>
          </div>
        </div>

        {/* Right Controls: Classic Windows Trio (Minimize, Windowshade, Maximize, and Close) */}
        <div className="flex items-center gap-1.5 z-10 shrink-0">
          {/* Minimize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              retroSound.playClick();
              onMinimize();
            }}
            title="Minimize to Taskbar"
            className="w-6 h-6 sm:w-5 sm:h-5 bg-white border-2 border-black flex items-center justify-center cursor-pointer hover:bg-yellow-300 shadow-xs transition-colors"
          >
            <div className="w-2.5 h-0.5 bg-black" />
          </button>

          {/* Windowshade (Collapse) button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              retroSound.playClick();
              onCollapseToggle();
            }}
            title={isCollapsed ? 'Unroll Window' : 'Roll up Window'}
            className="hidden sm:flex w-5 h-5 bg-white border-2 border-black flex-col justify-center items-center gap-[1.5px] cursor-pointer hover:bg-blue-300 shadow-xs transition-colors"
          >
            <div className="w-2.5 h-[1.5px] bg-black" />
            <div className="w-2.5 h-[1.5px] bg-black" />
          </button>

          {/* Zoom / Maximize Box button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              retroSound.playClick();
              onZoomToggle();
            }}
            title={isZoomed ? 'Restore Window' : 'Zoom Window'}
            className="hidden sm:flex w-5 h-5 bg-white border-2 border-black items-center justify-center cursor-pointer hover:bg-emerald-300 shadow-xs transition-colors"
          >
            <div className="w-2.5 h-2.5 border-2 border-black" />
          </button>

          {/* Classic Windows Close Button [ ✕ ] */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              retroSound.playWindowClose();
              onClose();
            }}
            title="Close Window (Esc)"
            className="hidden sm:flex w-5 h-5 ml-1 bg-white hover:bg-red-600 hover:text-white text-black border-2 border-black items-center justify-center cursor-pointer font-mono text-[11px] font-black transition-colors shadow-xs group"
          >
            <span className="leading-none group-hover:scale-110">✕</span>
          </button>
        </div>
      </div>

      {/* 2. Window Client Body */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col relative select-text bg-[#FAFAFA]">
          {children}
        </div>
      )}

      {/* 3. Classic Window Status Bar with Clean Margins */}
      {!isCollapsed && (
        <div className="h-7 min-h-[28px] bg-[#E5E7EB] border-t-2 border-black px-3 flex items-center justify-between text-[11px] font-mono text-neutral-800 select-none shrink-0 relative">
          <div className="flex items-center gap-2 truncate my-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-screen text-[10px] font-bold text-neutral-700 truncate">
              {windowState.title.split('—')[0].trim()} • Ready
            </span>
          </div>

          <div className="flex items-center gap-2 pr-2 sm:pr-6 my-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                retroSound.playWindowClose();
                onClose();
              }}
              title="Close this window (Esc)"
              className="px-3 py-1 my-auto bg-white hover:bg-red-600 hover:text-white active:bg-red-800 text-black border border-black font-mono text-[10px] font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
            >
              <span className="text-[9px]">✕</span>
              <span>Close</span>
            </button>
          </div>

          {/* Resize Corner Grip on far right */}
          {!isZoomed && !isMobile && (
            <div
              onPointerDown={handlePointerDownResize}
              onPointerMove={handlePointerMoveResize}
              onPointerUp={handlePointerUpResize}
              title="Drag to resize window"
              className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-50 flex items-end justify-end p-0.5"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="1" y1="9" x2="9" y2="1" stroke="#000000" strokeWidth="1.5" />
                <line x1="5" y1="9" x2="9" y2="5" stroke="#000000" strokeWidth="1.5" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

