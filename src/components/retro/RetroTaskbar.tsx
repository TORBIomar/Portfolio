import React, { useState, useEffect } from 'react';
import { RetroAppType, RetroWindowState, RetroTheme } from '../../types/retro';
import { RetroIcon } from './RetroIcon';
import { retroSound } from '../../utils/retroSound';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface RetroTaskbarProps {
  windows: RetroWindowState[];
  activeWindowId: string | null;
  theme: RetroTheme;
  showScanlines: boolean;
  onRestoreOrMinimizeWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onOpenApp: (appType: RetroAppType) => void;
  onThemeCycle: () => void;
  onToggleScanlines: () => void;
  onRestart: () => void;
}

export const RetroTaskbar: React.FC<RetroTaskbarProps> = ({
  windows,
  activeWindowId,
  theme,
  showScanlines,
  onRestoreOrMinimizeWindow,
  onCloseWindow,
  onOpenApp,
  onThemeCycle,
  onToggleScanlines,
  onRestart,
}) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(retroSound.isMuted());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setStartMenuOpen(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = retroSound.toggleMute();
    setIsMuted(muted);
  };

  const getThemeDisplayName = () => {
    switch (theme) {
      case 'vaporwave-sunset':
        return '🌸 Sunset';
      case 'win95-teal':
        return '🌲 Teal 95';
      case 'candy-pastel':
        return '🍬 Pastel';
      case 'cyber-matrix':
        return '⚡ Matrix';
      case 'imac-bondi':
        return '🌊 Bondi';
      default:
        return '🕹️ Classic';
    }
  };

  const getAppIcon = (appType: RetroAppType) => {
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

  const getCleanTitle = (title: string) => {
    return title
      .replace(/^About /i, '')
      .replace(/^Finder: /i, '')
      .replace(/^System Profiler: /i, '')
      .replace(/^Event Journal: /i, '')
      .replace(/^MacMail: /i, '')
      .replace(/^Phosphor CRT /i, '')
      .replace(/^Control Panels: /i, '');
  };

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-11 left-1.5 w-72 bg-[#EDEDED] border-3 border-black shadow-[5px_5px_0px_#000] z-50 text-xs font-screen select-none animate-in fade-in slide-in-from-bottom-2 duration-100"
        >
          {/* Top Banner with Vibrant Gradient */}
          <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 p-2.5 text-white border-b-2 border-black flex items-center gap-2.5">
            <RetroIcon name="mac" size={28} />
            <div>
              <div className="font-bold text-sm tracking-wider">{PERSONAL_INFO.name}</div>
              <div className="text-[10px] opacity-95 font-mono">OmarOS 7.5.3 Pro &bull; EMSI Rabat</div>
            </div>
          </div>

          {/* Quick Apps Menu */}
          <div className="p-2 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* 1. Essential Portfolio Section */}
            <div className="px-2.5 py-1 text-[10px] font-mono font-bold bg-yellow-300 text-black border border-black flex items-center justify-between shadow-2xs">
              <span className="flex items-center gap-1.5">
                <span>⭐</span>
                <span>ESSENTIAL PORTFOLIO</span>
              </span>
              <span className="text-[9px] bg-black text-white px-1 py-0.2">PRIMARY</span>
            </div>

            {[
              { id: 'about', label: 'About Omar Torbi...', desc: 'Bio, EMSI Degree & Dual OCI Certs', icon: 'mac', badge: '★ ME' },
              { id: 'projects', label: 'Projects & Systems (6)', desc: 'Full-Stack, Cloud & DevOps Deployments', icon: 'folder', badge: '6 APPS' },
              { id: 'capabilities', label: 'Capabilities & Stacks', desc: 'React, Spring Boot 3, Docker, CI/CD', icon: 'cpu', badge: 'TECH' },
              { id: 'experience', label: 'Experience & Career', desc: 'Career History & Oracle Certifications', icon: 'briefcase', badge: 'EXP' },
              { id: 'contact', label: 'MacMail & Fast Hire', desc: 'Contact & PFE Internship (Feb 2027)', icon: 'mail', badge: 'HIRE' },
            ].map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  retroSound.playClick();
                  setStartMenuOpen(false);
                  onOpenApp(app.id as RetroAppType);
                }}
                className="w-full text-left px-2.5 py-2 my-0.5 hover:bg-black hover:text-white flex items-center justify-between transition-colors cursor-pointer group rounded-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-white border border-black group-hover:border-white shrink-0">
                    <RetroIcon name={app.icon as any} size={18} />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs">{app.label}</div>
                    <div className="text-[10px] text-neutral-600 group-hover:text-yellow-300 font-mono truncate">
                      {app.desc}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 border border-neutral-400 group-hover:border-white text-neutral-700 group-hover:text-yellow-300 font-bold shrink-0 ml-1.5">
                  {app.badge}
                </span>
              </button>
            ))}

            {/* 2. Retro Accessories & Toys Section */}
            <div className="px-2.5 py-1 text-[10px] font-mono font-bold bg-cyan-200 text-black border border-black flex items-center justify-between shadow-2xs mt-2">
              <span className="flex items-center gap-1.5">
                <span>🕹️</span>
                <span>RETRO ACCESSORIES &amp; EXTRAS</span>
              </span>
              <span className="text-[9px] bg-neutral-800 text-white px-1 py-0.2">TOYS</span>
            </div>

            {[
              { id: 'terminal', label: 'Terminal CRT Console', desc: 'Interactive Phosphor Shell', icon: 'terminal', badge: 'CLI' },
              { id: 'paint', label: 'MacPaint Drawing Studio', desc: '1984 1-bit Canvas & Artwork', icon: 'paint', badge: 'DRAW' },
              { id: 'walkman', label: 'Walkman 84 Tape Player', desc: 'Lo-Fi Synthwave Cassette Deck', icon: 'tape', badge: 'MUSIC' },
              { id: 'settings', label: 'Wallpapers & Control Panels', desc: 'Themes (Vaporwave, Teal 95, Bondi)', icon: 'settings', badge: 'THEME' },
            ].map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  retroSound.playClick();
                  setStartMenuOpen(false);
                  onOpenApp(app.id as RetroAppType);
                }}
                className="w-full text-left px-2.5 py-2 my-0.5 hover:bg-black hover:text-white flex items-center justify-between transition-colors cursor-pointer group rounded-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-white border border-black group-hover:border-white shrink-0">
                    <RetroIcon name={app.icon as any} size={18} />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs">{app.label}</div>
                    <div className="text-[10px] text-neutral-600 group-hover:text-cyan-300 font-mono truncate">
                      {app.desc}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 border border-neutral-400 group-hover:border-white text-neutral-700 group-hover:text-cyan-300 font-bold shrink-0 ml-1.5">
                  {app.badge}
                </span>
              </button>
            ))}

            <div className="border-b-2 border-black/40 my-2" />

            {/* 3. Quick CV Downloads */}
            <div className="space-y-1">
              <a
                href={PERSONAL_INFO.resumeUrlEn}
                download="OMAR-TORBI-RESUME-EN.pdf"
                onClick={() => {
                  retroSound.playFloppySeek();
                  setStartMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 my-1 bg-purple-50 hover:bg-purple-900 hover:text-white border border-purple-800 flex items-center gap-3 cursor-pointer transition-colors block text-purple-950"
              >
                <RetroIcon name="floppy" size={16} />
                <span className="font-bold text-xs">Download English Resume (PDF)</span>
              </a>
              <a
                href="/OMAR-TORBI-CV-FR.pdf"
                download="OMAR-TORBI-CV-FR.pdf"
                onClick={() => {
                  retroSound.playFloppySeek();
                  setStartMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 my-1 bg-neutral-50 hover:bg-black hover:text-white border border-black flex items-center gap-3 cursor-pointer transition-colors block text-black"
              >
                <RetroIcon name="floppy" size={16} />
                <span className="font-bold text-xs">Download French CV (PDF)</span>
              </a>
            </div>

            <div className="border-b-2 border-black/40 my-2" />

            {/* Restart OS */}
            <button
              onClick={() => {
                setStartMenuOpen(false);
                onRestart();
              }}
              className="w-full text-left px-3 py-2 my-1 hover:bg-rose-600 hover:text-white flex items-center gap-2 text-rose-800 font-bold transition-colors cursor-pointer"
            >
              <span>⚡</span>
              <span>Restart OmarOS</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Bottom Taskbar (Bigger height: h-10, roomier tabs) */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#DCDCDC] border-t-2 border-black z-40 flex items-center justify-between px-2 font-screen select-none shadow-md">
        
        {/* Left: Start / OmarOS Button */}
        <div className="flex items-center gap-2 my-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              retroSound.playClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`px-3.5 py-1.5 my-auto flex items-center gap-2.5 font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 ${
              startMenuOpen
                ? 'bg-black text-yellow-300'
                : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black hover:brightness-105'
            }`}
          >
            <RetroIcon name="apple" size={16} />
            <span className="font-bold tracking-wider text-xs">OmarOS</span>
          </button>

          {/* Quick Launch Icons */}
          <div className="hidden sm:flex items-center gap-1.5 pl-1.5 border-l-2 border-neutral-400 my-auto">
            <button
              onClick={() => onOpenApp('projects')}
              title="Open Projects"
              className="p-1.5 my-auto hover:bg-black/10 rounded cursor-pointer"
            >
              <RetroIcon name="folder" size={18} />
            </button>
            <button
              onClick={() => onOpenApp('terminal')}
              title="Open Terminal"
              className="p-1.5 my-auto hover:bg-black/10 rounded cursor-pointer"
            >
              <RetroIcon name="terminal" size={18} />
            </button>
            <button
              onClick={() => onOpenApp('contact')}
              title="MacMail Dispatcher"
              className="p-1.5 my-auto hover:bg-black/10 rounded cursor-pointer"
            >
              <RetroIcon name="mail" size={18} />
            </button>
          </div>
        </div>

        {/* Center: Open Window Tabs with Close Button */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto px-1 sm:px-2 mx-1 max-w-[calc(100%-90px)] sm:max-w-[calc(100%-250px)] no-scrollbar my-auto">
          {windows.map((win) => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <div
                key={win.id}
                onClick={() => {
                  retroSound.playClick();
                  onRestoreOrMinimizeWindow(win.id);
                }}
                className={`group h-8 pl-2 sm:pl-2.5 pr-1.5 sm:pr-2 my-auto flex items-center gap-1.5 border-2 border-black text-xs font-bold cursor-pointer transition-all shrink-0 max-w-[150px] sm:max-w-[210px] min-w-[90px] sm:min-w-[120px] shadow-xs ${
                  isActive
                    ? 'bg-black text-white shadow-inner scale-102 ring-1 ring-yellow-400'
                    : win.isMinimized
                    ? 'bg-neutral-200 text-neutral-600 border-dashed line-through opacity-80 hover:opacity-100'
                    : 'bg-white text-black hover:bg-neutral-100 shadow-[1px_1px_0px_#000]'
                }`}
                title={win.title}
              >
                <div className="shrink-0">
                  <RetroIcon name={getAppIcon(win.appType) as any} size={15} />
                </div>
                
                {/* Active Indicator Light */}
                <span
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
                    isActive
                      ? 'bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse'
                      : win.isMinimized
                      ? 'bg-amber-400'
                      : 'bg-neutral-400'
                  }`}
                />

                {/* Window Name */}
                <span className="truncate flex-1 font-screen text-[10px] sm:text-[11px] tracking-wide">
                  {getCleanTitle(win.title)}
                </span>

                {/* Close Tab Button [✕] */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    retroSound.playWindowClose();
                    onCloseWindow(win.id);
                  }}
                  title="Close Tab"
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 my-auto ml-0.5 sm:ml-1 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                    isActive
                      ? 'border-neutral-600 hover:bg-rose-600 hover:text-white hover:border-black'
                      : 'border-neutral-300 hover:bg-rose-500 hover:text-white hover:border-black'
                  }`}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Controls & Clock (Compact on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs my-auto">
          {/* Quick Theme Cycle Button */}
          <button
            onClick={() => {
              retroSound.playClick();
              onThemeCycle();
            }}
            title="Cycle Retro Wallpaper Palette"
            className="px-2 sm:px-3 py-1 sm:py-1.5 my-auto bg-white border-2 border-black font-bold text-[10px] hover:bg-yellow-200 cursor-pointer shadow-[1px_1px_0px_#000] active:translate-y-0.5"
          >
            <span className="sm:hidden text-xs">
              {theme === 'vaporwave-sunset' ? '🌸' : theme === 'win95-teal' ? '🌲' : theme === 'candy-pastel' ? '🍬' : theme === 'cyber-matrix' ? '⚡' : theme === 'imac-bondi' ? '🌊' : '🕹️'}
            </span>
            <span className="hidden sm:inline">{getThemeDisplayName()}</span>
          </button>

          {/* CRT Scanline Toggle (Desktop only) */}
          <button
            onClick={() => {
              retroSound.playClick();
              onToggleScanlines();
            }}
            title={showScanlines ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`hidden sm:block px-2.5 py-1.5 my-auto border-2 border-black font-bold text-[10px] cursor-pointer shadow-[1px_1px_0px_#000] ${
              showScanlines ? 'bg-emerald-300 text-black' : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            CRT
          </button>

          {/* Sound Toggle (Desktop only - mobile has it in top bar) */}
          <button
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="hidden sm:block p-1.5 my-auto bg-white border-2 border-black cursor-pointer hover:bg-neutral-100 shadow-[1px_1px_0px_#000]"
          >
            <RetroIcon name={isMuted ? 'speaker-muted' : 'speaker'} size={14} />
          </button>

          {/* Digital Clock (Desktop only - mobile has it in top bar) */}
          <div className="hidden sm:block bg-white border-2 border-black px-2.5 py-1.5 my-auto font-mono text-[11px] font-bold min-w-[66px] text-center shadow-[1px_1px_0px_#000]">
            {timeStr}
          </div>
        </div>

      </div>
    </>
  );
};
