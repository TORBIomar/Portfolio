import React from 'react';
import { RetroTheme } from '../../../types/retro';
import { RetroIcon } from '../RetroIcon';
import { retroSound } from '../../../utils/retroSound';

interface RetroSettingsAppProps {
  theme: RetroTheme;
  onThemeChange: (theme: RetroTheme) => void;
  showScanlines: boolean;
  onToggleScanlines: () => void;
}

export const RetroSettingsApp: React.FC<RetroSettingsAppProps> = ({
  theme,
  onThemeChange,
  showScanlines,
  onToggleScanlines,
}) => {
  const isMuted = retroSound.isMuted();

  const THEMES: { id: RetroTheme; name: string; desc: string; preview: string }[] = [
    {
      id: 'vaporwave-sunset',
      name: 'Vaporwave Sunset (Default)',
      desc: 'Vibrant neon pink, purple & cyan sunset horizon',
      preview: 'from-pink-500 via-purple-500 to-indigo-600',
    },
    {
      id: 'win95-teal',
      name: 'Windows 95 Nostalgia Teal',
      desc: 'Iconic cheerful teal desktop with colorful candy windows',
      preview: 'from-teal-600 to-teal-800',
    },
    {
      id: 'candy-pastel',
      name: 'Candy Pastel Pop (Memphis 90s)',
      desc: 'Playful warm peach, yellow, and pastel confetti dots',
      preview: 'from-pink-200 via-yellow-200 to-blue-200 text-black',
    },
    {
      id: 'imac-bondi',
      name: '1998 iMac Bondi Blue',
      desc: 'Vibrant translucent Bondi blue oceanic gradient',
      preview: 'from-cyan-400 via-teal-500 to-cyan-700',
    },
    {
      id: 'cyber-matrix',
      name: 'Cyberpunk Matrix Green',
      desc: 'Dark obsidian with neon glowing phosphor grid lines',
      preview: 'from-emerald-950 to-black border-emerald-500',
    },
    {
      id: 'classic-grey',
      name: 'Classic Macintosh Platinum Grey',
      desc: 'Monochrome 1984 System 7 dither pattern',
      preview: 'from-neutral-400 to-neutral-600',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] text-black font-screen text-xs p-4 overflow-y-auto select-none space-y-4">
      {/* Top Banner with Generous Space */}
      <div className="p-4 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RetroIcon name="settings" size={32} />
          <div>
            <h1 className="font-bold text-base text-cyan-950">Control Panels: Desktop &amp; Hardware</h1>
            <p className="text-xs text-cyan-800 font-mono mt-0.5">
              Vibrant Wallpapers, CRT Display &amp; Audio Synthesis
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* 1. Theme & Wallpaper Selector */}
        <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
          <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5 text-black">
            Desktop Theme &amp; Color Scheme
          </div>
          <p className="text-xs text-neutral-600">
            Pick your favorite colorful retro wallpaper:
          </p>

          <div className="space-y-2 pt-1">
            {THEMES.map((th) => {
              const isSelected = theme === th.id;
              return (
                <div
                  key={th.id}
                  onClick={() => {
                    retroSound.playClick();
                    onThemeChange(th.id);
                  }}
                  className={`p-3 border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-100 border-amber-600 shadow-[3px_3px_0px_#D97706] scale-101'
                      : 'bg-white border-neutral-300 hover:border-black hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-sm bg-gradient-to-br ${th.preview} border-2 border-black shrink-0 shadow-xs`} />
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm truncate text-neutral-900">{th.name}</div>
                      <div className="text-[11px] text-neutral-600 truncate mt-0.5">{th.desc}</div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono px-3.5 py-1.5 my-1 border-2 font-bold uppercase shrink-0 ${
                      isSelected ? 'bg-amber-500 text-black border-black shadow-xs' : 'bg-neutral-100 border-neutral-400 text-neutral-700'
                    }`}
                  >
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CRT & Audio Controls */}
        <div className="space-y-4">
          {/* CRT Scanlines */}
          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5 text-black">
              CRT Monitor Simulation
            </div>
            <p className="text-xs text-neutral-600">
              Raster electron-beam scanlines of glass CRT monitors:
            </p>

            <div className="p-3 border-2 border-black bg-neutral-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">CRT Scanline Raster Overlay</div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {showScanlines ? 'Scanlines are ACTIVE' : 'Scanlines are DISABLED'}
                </div>
              </div>
              <button
                onClick={() => {
                  retroSound.playClick();
                  onToggleScanlines();
                }}
                className={`px-4.5 py-2.5 my-1 font-bold text-xs border-2 border-black cursor-pointer shadow-xs ${
                  showScanlines ? 'bg-emerald-400 text-black' : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {showScanlines ? 'DISABLE' : 'ENABLE'}
              </button>
            </div>
          </div>

          {/* Audio Engine */}
          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider border-b-2 border-black pb-1.5 text-black">
              Web Audio Synthesizer
            </div>

            <div className="flex items-center justify-between p-3 border-2 border-black bg-neutral-50">
              <span className="font-bold text-sm">System Sound Effects:</span>
              <button
                onClick={() => {
                  retroSound.toggleMute();
                  retroSound.playClick();
                  onThemeChange(theme);
                }}
                className={`px-4.5 py-2.5 my-1 border-2 border-black font-bold text-xs cursor-pointer shadow-xs ${
                  isMuted ? 'bg-rose-400 text-black' : 'bg-emerald-400 text-black'
                }`}
              >
                {isMuted ? 'MUTED' : 'ENABLED'}
              </button>
            </div>

            {/* Test Sound Buttons with Roomy Margins & Padding */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => retroSound.playMacStartup()}
                className="px-3.5 py-2 my-1 bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-mono font-bold cursor-pointer shadow-xs"
              >
                Startup Chime
              </button>
              <button
                onClick={() => retroSound.playFloppySeek()}
                className="px-3.5 py-2 my-1 bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-mono font-bold cursor-pointer shadow-xs"
              >
                Floppy Motor
              </button>
              <button
                onClick={() => retroSound.playSosumi()}
                className="px-3.5 py-2 my-1 bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-xs font-mono font-bold cursor-pointer shadow-xs"
              >
                Sosumi Beep
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
