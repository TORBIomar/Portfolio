import React, { useState, useEffect } from 'react';
import { RetroIcon } from './RetroIcon';
import { retroSound } from '../../utils/retroSound';
import { RetroAppType, RetroTheme } from '../../types/retro';

interface RetroMenuBarProps {
  onOpenApp: (appType: RetroAppType, params?: Record<string, any>) => void;
  onRestart: () => void;
  onEmptyTrash: () => void;
  theme: RetroTheme;
  onThemeChange: (theme: RetroTheme) => void;
  showScanlines: boolean;
  onToggleScanlines: () => void;
}

export const RetroMenuBar: React.FC<RetroMenuBarProps> = ({
  onOpenApp,
  onRestart,
  onEmptyTrash,
  theme,
  onThemeChange,
  showScanlines,
  onToggleScanlines,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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

  // Close menus on outside click
  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleMenuClick = (e: React.MouseEvent, menuName: string) => {
    e.stopPropagation();
    retroSound.playClick();
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = retroSound.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-white border-b-2 border-black z-50 flex items-center justify-between px-3 font-screen text-xs select-none shadow-xs">
      
      {/* Left Menu Items */}
      <div className="flex items-center gap-3 h-full relative">
        
        {/* 1. Apple Logo Menu */}
        <div className="relative h-full flex items-center">
          <button
            onClick={(e) => handleMenuClick(e, 'apple')}
            className={`px-2.5 h-full flex items-center justify-center cursor-pointer ${
              activeMenu === 'apple' ? 'bg-black text-white' : 'hover:bg-black/10'
            }`}
          >
            <RetroIcon name="apple" size={18} />
          </button>

          {activeMenu === 'apple' && (
            <div className="absolute top-7 left-0 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_#000] py-1.5 z-50 text-xs">
              <div className="px-3 py-1 bg-yellow-300 border-b border-black font-mono font-bold text-[10px] text-black">
                ⭐ ESSENTIAL PORTFOLIO
              </div>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('about');
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-black hover:text-white flex items-center gap-2 font-bold cursor-pointer"
              >
                <RetroIcon name="mac" size={16} />
                <span>About Omar Torbi...</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('projects');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="folder" size={14} />
                <span>Projects &amp; Systems (6)</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('capabilities');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="cpu" size={14} />
                <span>Capabilities &amp; Stacks</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('experience');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="briefcase" size={14} />
                <span>Experience &amp; Certs</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('contact');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="mail" size={14} />
                <span>MacMail &amp; Fast Contact</span>
              </button>

              <div className="px-3 py-1 bg-cyan-200 border-t border-b border-black font-mono font-bold text-[10px] text-black mt-1">
                🕹️ RETRO ACCESSORIES
              </div>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('terminal');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="terminal" size={14} />
                <span>Terminal Shell</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('paint');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="paint" size={14} />
                <span>MacPaint 1.0</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('walkman');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="tape" size={14} />
                <span>Walkman 84</span>
              </button>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('settings');
                }}
                className="w-full text-left px-3 py-1 hover:bg-black hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RetroIcon name="settings" size={14} />
                <span>Wallpapers &amp; Control Panels</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. Portfolio Menu */}
        <div className="relative h-full flex items-center">
          <button
            onClick={(e) => handleMenuClick(e, 'portfolio')}
            className={`px-2.5 h-full font-bold cursor-pointer flex items-center gap-1 ${
              activeMenu === 'portfolio' ? 'bg-black text-white' : 'hover:bg-black/10'
            }`}
          >
            <span>Portfolio</span>
            <span className="text-[9px]">▾</span>
          </button>

          {activeMenu === 'portfolio' && (
            <div className="absolute top-7 left-0 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_#000] py-1.5 z-50 text-xs">
              <div className="px-3 py-1 font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                Essential Applications:
              </div>
              {[
                { id: 'about', label: '1. About Omar (Overview)', icon: 'mac' },
                { id: 'projects', label: '2. Projects (6 Apps)', icon: 'folder' },
                { id: 'capabilities', label: '3. Capabilities & Stacks', icon: 'cpu' },
                { id: 'experience', label: '4. Experience & Certs', icon: 'briefcase' },
                { id: 'contact', label: '5. Contact Me / Hire', icon: 'mail' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    retroSound.playClick();
                    onOpenApp(item.id as RetroAppType);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-black hover:text-white flex items-center gap-2.5 cursor-pointer font-bold"
                >
                  <RetroIcon name={item.icon as any} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. File Menu */}
        <div className="relative h-full flex items-center">
          <button
            onClick={(e) => handleMenuClick(e, 'file')}
            className={`px-2 h-full font-bold cursor-pointer ${
              activeMenu === 'file' ? 'bg-black text-white' : 'hover:bg-black/10'
            }`}
          >
            File
          </button>

          {activeMenu === 'file' && (
            <div className="absolute top-7 left-0 w-52 bg-white border-2 border-black shadow-[4px_4px_0px_#000] py-1.5 z-50 text-xs">
              <a
                href="/OMAR-TORBI-RESUME-EN.pdf"
                download="OMAR-TORBI-RESUME-EN.pdf"
                onClick={() => retroSound.playFloppySeek()}
                className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white block cursor-pointer"
              >
                Download Resume (EN)
              </a>
              <a
                href="/OMAR-TORBI-CV-FR.pdf"
                download="OMAR-TORBI-CV-FR.pdf"
                onClick={() => retroSound.playFloppySeek()}
                className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white block cursor-pointer"
              >
                Download CV (FR)
              </a>
              <div className="border-b border-black my-1" />
              <button
                onClick={() => {
                  retroSound.playClick();
                  onOpenApp('terminal');
                }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white cursor-pointer"
              >
                Open Terminal Shell
              </button>
            </div>
          )}
        </div>

        {/* 3. View / Themes Menu */}
        <div className="relative h-full flex items-center">
          <button
            onClick={(e) => handleMenuClick(e, 'view')}
            className={`px-2.5 h-full font-bold cursor-pointer ${
              activeMenu === 'view' ? 'bg-black text-white' : 'hover:bg-black/10'
            }`}
          >
            Wallpapers
          </button>

          {activeMenu === 'view' && (
            <div className="absolute top-7 left-0 w-60 bg-white border-2 border-black shadow-[4px_4px_0px_#000] py-1.5 z-50 text-xs">
              <div className="px-3.5 py-1 font-bold text-[10px] uppercase tracking-wider text-neutral-500">
                Colorful Wallpaper Palettes:
              </div>
              {[
                { id: 'vaporwave-sunset', label: '🌸 Vaporwave Sunset (Vibrant)' },
                { id: 'win95-teal', label: '🌲 Windows 95 Teal' },
                { id: 'candy-pastel', label: '🍬 Candy Pastel Pop' },
                { id: 'imac-bondi', label: '🌊 1998 iMac Bondi Blue' },
                { id: 'cyber-matrix', label: '⚡ Cyberpunk Matrix' },
                { id: 'classic-grey', label: '🕹️ Classic Mac Grey' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    retroSound.playClick();
                    onThemeChange(item.id as RetroTheme);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span>{item.label}</span>
                  {theme === item.id && <span className="font-bold text-emerald-600">✓</span>}
                </button>
              ))}

              <div className="border-b border-black my-1" />

              <button
                onClick={() => {
                  retroSound.playClick();
                  onToggleScanlines();
                }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-black hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>CRT Scanlines Effect</span>
                {showScanlines && <span className="font-bold text-emerald-600">✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* 4. Special Menu */}
        <div className="relative h-full flex items-center">
          <button
            onClick={(e) => handleMenuClick(e, 'special')}
            className={`px-2.5 h-full font-bold cursor-pointer ${
              activeMenu === 'special' ? 'bg-black text-white' : 'hover:bg-black/10'
            }`}
          >
            Special
          </button>

          {activeMenu === 'special' && (
            <div className="absolute top-7 left-0 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_#000] py-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  onEmptyTrash();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-black hover:text-white cursor-pointer"
              >
                Empty Trash...
              </button>
              <div className="border-b border-black my-1" />
              <button
                onClick={() => {
                  onRestart();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-black hover:text-white text-rose-700 font-bold cursor-pointer"
              >
                Restart OmarOS
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Right Controls: Sound Toggle + Clock */}
      <div className="flex items-center gap-2.5 h-full">
        {/* Speaker Mute/Unmute */}
        <button
          onClick={handleMuteToggle}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-1 hover:bg-black/10 cursor-pointer"
        >
          <RetroIcon name={isMuted ? 'speaker-muted' : 'speaker'} size={14} />
        </button>

        {/* Digital Clock */}
        <span className="font-bold text-xs font-mono tracking-wider">
          {timeStr}
        </span>
      </div>
    </div>
  );
};
