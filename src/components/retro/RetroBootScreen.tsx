import React, { useEffect, useState } from 'react';
import { retroSound } from '../../utils/retroSound';
import { RetroIcon } from './RetroIcon';

interface RetroBootScreenProps {
  onComplete: () => void;
}

export const RetroBootScreen: React.FC<RetroBootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Attempt sound playback gracefully
    try {
      retroSound.playMacStartup();
      setTimeout(() => {
        try {
          retroSound.playFloppySeek();
        } catch {}
      }, 1000);
    } catch {}

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 250);
          return 100;
        }
        return p + Math.floor(Math.random() * 20) + 12;
      });
    }, 150);

    const handleKeyOrClick = () => {
      onComplete();
    };

    window.addEventListener('keydown', handleKeyOrClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyOrClick);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white flex flex-col items-center justify-center font-screen select-none cursor-pointer overflow-hidden p-4"
    >
      {/* Retro Horizon Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      {/* Main Boot Dialog Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex flex-col items-center max-w-md w-full border-4 border-black bg-gradient-to-b from-yellow-50 to-amber-100 text-black p-6 shadow-[8px_8px_0px_#000000]"
      >
        {/* Happy Mac in Colors */}
        <div className="mb-3 p-2 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
          <RetroIcon name="mac" size={54} />
        </div>

        {/* System Title */}
        <h1 className="font-screen text-base font-bold tracking-widest text-center uppercase mb-1 text-black">
          Welcome to OmarOS 7.5
        </h1>
        <p className="font-mono text-xs text-purple-900 font-bold text-center mb-4">
          Software &amp; DevOps Engineering • EMSI Rabat
        </p>

        {/* Vibrant Segmented Progress Bar */}
        <div className="w-full h-6 border-2 border-black bg-white p-1 mb-3 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 transition-all duration-100"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        {/* System Specs */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] text-neutral-800 font-bold pt-2 border-t-2 border-black">
          <span>MEM: 32 MB ECC</span>
          <span className="text-emerald-700">OCI DEVOPS CERTIFIED</span>
        </div>

        {/* Skip / Enter Button */}
        <button
          onClick={onComplete}
          className="mt-4 px-4 py-1.5 bg-black text-yellow-300 border-2 border-black font-bold text-xs shadow-[3px_3px_0px_#000] hover:bg-neutral-800 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
        >
          <span>ENTER OMAROS</span>
          <span>↵</span>
        </button>
      </div>
    </div>
  );
};
