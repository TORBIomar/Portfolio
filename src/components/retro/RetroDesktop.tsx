import React, { useState, useCallback } from 'react';
import { RetroAppType, RetroWindowState, RetroDesktopIcon as IRetroDesktopIcon, RetroTheme } from '../../types/retro';
import { RetroMenuBar } from './RetroMenuBar';
import { RetroDesktopIcon } from './RetroDesktopIcon';
import { RetroWindow } from './RetroWindow';
import { RetroBootScreen } from './RetroBootScreen';
import { RetroTaskbar } from './RetroTaskbar';

// Applications
import { RetroAboutApp } from './apps/RetroAboutApp';
import { RetroProjectsApp } from './apps/RetroProjectsApp';
import { RetroCapabilitiesApp } from './apps/RetroCapabilitiesApp';
import { RetroExperienceApp } from './apps/RetroExperienceApp';
import { RetroContactApp } from './apps/RetroContactApp';
import { RetroTerminalApp } from './apps/RetroTerminalApp';
import { RetroPaintApp } from './apps/RetroPaintApp';
import { RetroWalkmanApp } from './apps/RetroWalkmanApp';
import { RetroTrashApp } from './apps/RetroTrashApp';
import { RetroSettingsApp } from './apps/RetroSettingsApp';

import { retroSound } from '../../utils/retroSound';
import { useIsMobile } from '../../utils/useIsMobile';

const INITIAL_DESKTOP_ICONS: IRetroDesktopIcon[] = [
  // ⭐ ESSENTIAL PORTFOLIO APPS (AT THE TOP - ROWS 1 to 3)
  { id: 'icon-about', title: 'About Omar', appType: 'about', iconName: 'mac', position: { x: 18, y: 68 }, badge: '★ ME' },
  { id: 'icon-projects', title: 'Projects', appType: 'projects', iconName: 'folder', position: { x: 154, y: 68 }, badge: '6 APPS' },
  { id: 'icon-capabilities', title: 'Capabilities', appType: 'capabilities', iconName: 'cpu', position: { x: 18, y: 172 }, badge: 'STACKS' },
  { id: 'icon-experience', title: 'Experience', appType: 'experience', iconName: 'briefcase', position: { x: 154, y: 172 }, badge: 'CAREER' },
  { id: 'icon-contact', title: 'MacMail', appType: 'contact', iconName: 'mail', position: { x: 18, y: 276 }, badge: 'HIRE' },
  { id: 'icon-resume', title: 'Resume & CV', appType: 'about', iconName: 'floppy', position: { x: 154, y: 276 }, badge: 'PDF', params: { downloadResume: true } },

  // 🕹️ RETRO ACCESSORIES & EXTRAS (BELOW - ROWS 4 to 6)
  { id: 'icon-terminal', title: 'Terminal', appType: 'terminal', iconName: 'terminal', position: { x: 18, y: 418 }, badge: 'CLI' },
  { id: 'icon-paint', title: 'MacPaint', appType: 'paint', iconName: 'paint', position: { x: 154, y: 418 }, badge: 'DRAW' },
  { id: 'icon-walkman', title: 'Walkman 84', appType: 'walkman', iconName: 'tape', position: { x: 18, y: 522 }, badge: 'MUSIC' },
  { id: 'icon-settings', title: 'Wallpapers', appType: 'settings', iconName: 'settings', position: { x: 154, y: 522 }, badge: 'THEME' },
  { id: 'icon-trash', title: 'Trash', appType: 'trash', iconName: 'trash', position: { x: 154, y: 626 }, badge: 'EMPTY' },
];

const APP_CONFIG: Record<
  RetroAppType,
  {
    title: string;
    defaultSize: { width: number; height: number };
    defaultPos: { x: number; y: number };
    themeColor: string;
  }
> = {
  about: {
    title: 'About Omar Torbi — Software & DevOps Engineer',
    defaultSize: { width: 1140, height: 760 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'purple',
  },
  projects: {
    title: 'Finder: Projects & Architectures',
    defaultSize: { width: 1240, height: 780 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'blue',
  },
  capabilities: {
    title: 'System Profiler: Stacks & Capabilities',
    defaultSize: { width: 1160, height: 760 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'emerald',
  },
  experience: {
    title: 'Event Journal: Career History & Credentials',
    defaultSize: { width: 1140, height: 760 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'amber',
  },
  contact: {
    title: 'MacMail: Electronic Mail Dispatcher',
    defaultSize: { width: 1140, height: 770 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'pink',
  },
  terminal: {
    title: 'Phosphor CRT Terminal (ttyS0)',
    defaultSize: { width: 980, height: 660 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'cyan',
  },
  paint: {
    title: 'MacPaint 1.0 — 1-Bit Drawing Studio',
    defaultSize: { width: 1140, height: 770 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'purple',
  },
  walkman: {
    title: 'Walkman 84: Tape Deck Player',
    defaultSize: { width: 780, height: 600 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'amber',
  },
  trash: {
    title: 'System Trash Can',
    defaultSize: { width: 780, height: 560 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'pink',
  },
  settings: {
    title: 'Control Panels: Preferences & Wallpapers',
    defaultSize: { width: 1040, height: 720 },
    defaultPos: { x: 310, y: 40 },
    themeColor: 'cyan',
  },
};

const THEME_CYCLE: RetroTheme[] = [
  'vaporwave-sunset',
  'win95-teal',
  'candy-pastel',
  'imac-bondi',
  'cyber-matrix',
  'classic-grey',
];

export const RetroDesktop: React.FC = () => {
  const [booting, setBooting] = useState(true);
  // Default to vibrant vaporwave sunset instead of dull grey!
  const [theme, setTheme] = useState<RetroTheme>('vaporwave-sunset');
  const [showScanlines, setShowScanlines] = useState(false); // Clean & vibrant by default
  const [desktopIcons, setDesktopIcons] = useState<IRetroDesktopIcon[]>(INITIAL_DESKTOP_ICONS);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Windows
  const [windows, setWindows] = useState<RetroWindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZ, setHighestZ] = useState<number>(10);

  // Initial windows after boot
  const handleBootComplete = useCallback(() => {
    setBooting(false);

    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 768;
    const isMobileScreen = screenW < 768;

    const sidebarW = screenW >= 1260 ? 290 : 16;
    const availW = Math.max(320, screenW - sidebarW - 24);
    const availH = Math.max(320, screenH - 28 - 40);

    const cfg = APP_CONFIG.about;
    const aboutWidth = isMobileScreen
      ? screenW
      : Math.min(cfg.defaultSize.width, Math.max(760, Math.floor(availW * 0.94)));
    const slackX = Math.max(0, availW - aboutWidth);
    const aboutX = isMobileScreen ? 0 : sidebarW + Math.floor(slackX / 2);

    const aboutHeight = isMobileScreen
      ? screenH - 64
      : Math.min(cfg.defaultSize.height, Math.max(540, Math.floor(availH * 0.92)));
    const slackY = Math.max(0, availH - aboutHeight);
    const aboutY = isMobileScreen ? 28 : 28 + Math.max(8, Math.floor(slackY / 2));

    const initialAboutWindow: RetroWindowState = {
      id: 'win-about',
      title: APP_CONFIG.about.title,
      appType: 'about',
      isMinimized: false,
      isZoomed: false,
      isCollapsed: false,
      position: { x: aboutX, y: aboutY },
      size: { width: aboutWidth, height: aboutHeight },
      zIndex: 11,
      themeColor: APP_CONFIG.about.themeColor,
    };

    setWindows([initialAboutWindow]);
    setActiveWindowId('win-about');
    setHighestZ(12);
  }, []);

  // Open or focus an app
  const openApp = useCallback(
    (appType: RetroAppType, params?: Record<string, any>) => {
      // Special action for resume download
      if (params?.downloadResume) {
        retroSound.playFloppySeek();
        const a = document.createElement('a');
        a.href = '/OMAR-TORBI-RESUME-EN.pdf';
        a.download = 'OMAR-TORBI-RESUME-EN.pdf';
        a.click();
        return;
      }

      retroSound.playWindowOpen();

      // Screen & sizing geometry
      const cfg = APP_CONFIG[appType];
      const screenW = typeof window !== 'undefined' ? window.innerWidth : 1024;
      const screenH = typeof window !== 'undefined' ? window.innerHeight : 768;
      const isMobileScreen = screenW < 768;
      const nextZ = highestZ + 1;
      setHighestZ(nextZ);

      const sidebarW = screenW >= 1260 ? 290 : 16;
      const availW = Math.max(320, screenW - sidebarW - 24);
      const availH = Math.max(320, screenH - 28 - 40);

      const winWidth = isMobileScreen
        ? screenW
        : Math.min(cfg.defaultSize.width, Math.max(760, Math.floor(availW * 0.94)));
      const slackX = Math.max(0, availW - winWidth);
      const winX = isMobileScreen
        ? 0
        : sidebarW + Math.floor(slackX / 2);

      const winHeight = isMobileScreen
        ? screenH - 64
        : Math.min(cfg.defaultSize.height, Math.max(540, Math.floor(availH * 0.92)));
      const slackY = Math.max(0, availH - winHeight);
      const winY = isMobileScreen
        ? 28
        : 28 + Math.max(8, Math.floor(slackY / 2));

      // Check if window already exists
      const existing = windows.find((w) => w.appType === appType);
      if (existing) {
        setActiveWindowId(existing.id);
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existing.id
              ? {
                  ...w,
                  isMinimized: false,
                  isCollapsed: false,
                  position: isMobileScreen ? { x: 0, y: 28 } : w.position,
                  size: isMobileScreen
                    ? { width: screenW, height: screenH - 64 }
                    : {
                        width: Math.max(w.size.width, winWidth),
                        height: Math.max(w.size.height, winHeight),
                      },
                  zIndex: nextZ,
                  params: params || w.params,
                }
              : w
          )
        );
        return;
      }

      const newWindow: RetroWindowState = {
        id: `win-${appType}-${Date.now()}`,
        title: cfg.title,
        appType,
        isMinimized: false,
        isZoomed: false,
        isCollapsed: false,
        position: { x: winX, y: winY },
        size: { width: winWidth, height: winHeight },
        zIndex: nextZ,
        params,
        themeColor: cfg.themeColor,
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(newWindow.id);
    },
    [windows, highestZ]
  );

  const focusWindow = (id: string) => {
    if (activeWindowId === id) return;
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const top = remaining.reduce((prev, curr) => (curr.zIndex > prev.zIndex ? curr : prev));
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const top = remaining.reduce((prev, curr) => (curr.zIndex > prev.zIndex ? curr : prev));
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const restoreOrMinimizeWindow = (id: string) => {
    const target = windows.find((w) => w.id === id);
    if (!target) return;

    if (target.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const toggleZoom = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (!w.isZoomed) {
          return {
            ...w,
            isZoomed: true,
            prevPosition: { ...w.position },
            prevSize: { ...w.size },
          };
        } else {
          return {
            ...w,
            isZoomed: false,
            position: w.prevPosition || w.position,
            size: w.prevSize || w.size,
          };
        }
      })
    );
  };

  const toggleCollapse = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isCollapsed: !w.isCollapsed } : w))
    );
  };

  const updateWindowPos = (id: string, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos } : w))
    );
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  };

  const handleRestart = () => {
    retroSound.playMacStartup();
    setWindows([]);
    setBooting(true);
  };

  const handleEmptyTrash = () => {
    retroSound.playPaperCrumple();
    openApp('trash');
  };

  const handleThemeCycle = () => {
    const currentIndex = THEME_CYCLE.indexOf(theme);
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];
    setTheme(nextTheme);
  };

  // Render App Contents
  const renderAppContent = (appType: RetroAppType) => {
    switch (appType) {
      case 'about':
        return <RetroAboutApp onOpenApp={openApp} />;
      case 'projects':
        return <RetroProjectsApp />;
      case 'capabilities':
        return <RetroCapabilitiesApp />;
      case 'experience':
        return <RetroExperienceApp />;
      case 'contact':
        return <RetroContactApp />;
      case 'terminal':
        return <RetroTerminalApp />;
      case 'paint':
        return <RetroPaintApp />;
      case 'walkman':
        return <RetroWalkmanApp />;
      case 'trash':
        return <RetroTrashApp />;
      case 'settings':
        return (
          <RetroSettingsApp
            theme={theme}
            onThemeChange={setTheme}
            showScanlines={showScanlines}
            onToggleScanlines={() => setShowScanlines(!showScanlines)}
          />
        );
      default:
        return null;
    }
  };

  // Wallpaper Class
  const getWallpaperClass = () => {
    switch (theme) {
      case 'vaporwave-sunset':
        return 'bg-theme-vaporwave-sunset';
      case 'win95-teal':
        return 'bg-theme-win95-teal';
      case 'candy-pastel':
        return 'bg-theme-candy-pastel';
      case 'imac-bondi':
        return 'bg-theme-imac-bondi';
      case 'cyber-matrix':
        return 'bg-theme-cyber-matrix text-emerald-400';
      default:
        return 'bg-theme-classic-grey';
    }
  };

  return (
    <div
      onClick={() => setSelectedIconId(null)}
      className={`relative w-screen h-screen overflow-hidden select-none font-screen ${getWallpaperClass()}`}
    >
      {/* CRT Scanlines Overlay */}
      {showScanlines && <div className="crt-overlay" />}

      {/* Boot Screen */}
      {booting && <RetroBootScreen onComplete={handleBootComplete} />}

      {/* Top Classic Menu Bar */}
      <RetroMenuBar
        onOpenApp={openApp}
        onRestart={handleRestart}
        onEmptyTrash={handleEmptyTrash}
        theme={theme}
        onThemeChange={setTheme}
        showScanlines={showScanlines}
        onToggleScanlines={() => setShowScanlines(!showScanlines)}
      />

      {/* Desktop Workspace */}
      <div className={`absolute inset-0 pt-7 pb-9 ${isMobile ? 'overflow-y-auto no-scrollbar' : 'overflow-hidden'}`}>
        {isMobile ? (
          <div className="p-3 pb-16 space-y-4 max-w-sm mx-auto">
            {/* Category 1: Essential Portfolio */}
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 bg-yellow-300 border-2 border-black font-screen text-[11px] font-bold tracking-wider shadow-[2px_2px_0px_#000] mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">⭐</span>
                  <span>ESSENTIAL PORTFOLIO</span>
                </div>
                <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 font-bold">6 APPS</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {desktopIcons.slice(0, 6).map((icon) => (
                  <RetroDesktopIcon
                    key={icon.id}
                    item={icon}
                    isSelected={selectedIconId === icon.id}
                    onSelect={() => setSelectedIconId(icon.id)}
                    onOpen={() => openApp(icon.appType, icon.params)}
                    onPositionChange={(pos) =>
                      setDesktopIcons((prev) =>
                        prev.map((i) => (i.id === icon.id ? { ...i, position: pos } : i))
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Category 2: Retro Accessories & Extras */}
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 bg-cyan-300 border-2 border-black font-screen text-[11px] font-bold tracking-wider shadow-[2px_2px_0px_#000] mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🕹️</span>
                  <span>ACCESSORIES &amp; EXTRAS</span>
                </div>
                <span className="text-[9px] font-mono bg-neutral-800 text-white px-1.5 py-0.5 font-bold">TOYS</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {desktopIcons.slice(6).map((icon) => (
                  <RetroDesktopIcon
                    key={icon.id}
                    item={icon}
                    isSelected={selectedIconId === icon.id}
                    onSelect={() => setSelectedIconId(icon.id)}
                    onOpen={() => openApp(icon.appType, icon.params)}
                    onPositionChange={(pos) =>
                      setDesktopIcons((prev) =>
                        prev.map((i) => (i.id === icon.id ? { ...i, position: pos } : i))
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Category Header 1: Essential Portfolio (At the Top) */}
            <div className="hidden sm:flex absolute left-[18px] top-8 w-[260px] z-0 items-center justify-between px-3 py-1 bg-yellow-300 border-2 border-black font-screen text-[10px] font-bold tracking-wider shadow-[2px_2px_0px_#000] select-none pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">⭐</span>
                <span>ESSENTIAL PORTFOLIO</span>
              </div>
              <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.2">6 APPS</span>
            </div>

            {/* Category Header 2: Retro Accessories & Extras (Below) */}
            <div className="hidden sm:flex absolute left-[18px] top-[382px] w-[260px] z-0 items-center justify-between px-3 py-1 bg-cyan-300 border-2 border-black font-screen text-[10px] font-bold tracking-wider shadow-[2px_2px_0px_#000] select-none pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🕹️</span>
                <span>ACCESSORIES &amp; EXTRAS</span>
              </div>
              <span className="text-[9px] font-mono bg-neutral-800 text-white px-1.5 py-0.2">TOYS</span>
            </div>

            {/* Desktop Icons */}
            {desktopIcons.map((icon) => (
              <RetroDesktopIcon
                key={icon.id}
                item={icon}
                isSelected={selectedIconId === icon.id}
                onSelect={() => setSelectedIconId(icon.id)}
                onOpen={() => openApp(icon.appType, icon.params)}
                onPositionChange={(pos) =>
                  setDesktopIcons((prev) =>
                    prev.map((i) => (i.id === icon.id ? { ...i, position: pos } : i))
                  )
                }
              />
            ))}
          </>
        )}

        {/* Floating Windows */}
        {windows.map((win) => (
          <RetroWindow
            key={win.id}
            windowState={win}
            isActive={activeWindowId === win.id}
            theme={theme}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onZoomToggle={() => toggleZoom(win.id)}
            onCollapseToggle={() => toggleCollapse(win.id)}
            onUpdatePosition={(pos) => updateWindowPos(win.id, pos)}
            onUpdateSize={(size) => updateWindowSize(win.id, size)}
          >
            {renderAppContent(win.appType)}
          </RetroWindow>
        ))}
      </div>

      {/* Bottom Retro Taskbar */}
      <RetroTaskbar
        windows={windows}
        activeWindowId={activeWindowId}
        theme={theme}
        showScanlines={showScanlines}
        onRestoreOrMinimizeWindow={restoreOrMinimizeWindow}
        onCloseWindow={closeWindow}
        onOpenApp={openApp}
        onThemeCycle={handleThemeCycle}
        onToggleScanlines={() => setShowScanlines(!showScanlines)}
        onRestart={handleRestart}
      />
    </div>
  );
};
