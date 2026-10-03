import React, { useState, useEffect, useRef } from 'react';
import { retroSound } from '../../../utils/retroSound';

interface Track {
  id: string;
  title: string;
  artist: string;
  notes: number[];
  speed: number;
}

const TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Silicon Valley 1984 (Chiptune)',
    artist: 'OmarOS Synth Ensemble',
    notes: [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 349.23, 440.0, 587.33, 440.0, 349.23],
    speed: 160,
  },
  {
    id: 'track-2',
    title: 'Cyber Casablanca (Bassline)',
    artist: 'Omar Torbi Beats',
    notes: [130.81, 130.81, 164.81, 174.61, 196.0, 196.0, 220.0, 196.0, 174.61, 164.81],
    speed: 220,
  },
  {
    id: 'track-3',
    title: 'System 7 Boot Hymn',
    artist: 'Apple Classic FM',
    notes: [329.63, 392.0, 493.88, 659.25, 493.88, 392.0, 440.0, 523.25, 659.25, 523.25],
    speed: 200,
  },
];

export const RetroWalkmanApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [spoolAngle, setSpoolAngle] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef<number>(0);

  const currentTrack = TRACKS[currentTrackIndex];

  // Animation loop for tape spools
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const updateSpool = () => {
        setSpoolAngle((prev) => (prev + 3) % 360);
        animId = requestAnimationFrame(updateSpool);
      };
      animId = requestAnimationFrame(updateSpool);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Tape counter loop
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Synthesizer playback engine using Web Audio API
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      timerRef.current = window.setInterval(() => {
        if (!ctx || ctx.state === 'suspended' || retroSound.isMuted()) return;

        const noteFreq = currentTrack.notes[noteIndexRef.current % currentTrack.notes.length];
        noteIndexRef.current += 1;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 8-bit pulse square wave
        osc.type = 'square';
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }, currentTrack.speed);
    } catch (e) {
      console.warn('Audio synthesis unavailable:', e);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrackIndex, currentTrack]);

  const togglePlay = () => {
    retroSound.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    retroSound.playClick();
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    noteIndexRef.current = 0;
  };

  const handlePrev = () => {
    retroSound.playClick();
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    noteIndexRef.current = 0;
  };

  const handleStop = () => {
    retroSound.playClick();
    setIsPlaying(false);
    noteIndexRef.current = 0;
  };

  const formatCounter = (val: number) => {
    return String(val % 1000).padStart(3, '0');
  };

  return (
    <div className="flex flex-col h-full bg-[#D0D0D0] text-black font-screen text-xs p-4 select-none justify-between">
      {/* Walkman Plastic Chassis */}
      <div className="bg-[#383838] p-4 border-4 border-black shadow-[4px_4px_0px_#000] text-white">
        {/* Brand label & counter */}
        <div className="flex justify-between items-center mb-3 px-1 border-b border-neutral-600 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-screen text-sm font-bold text-[#E0E0E0] tracking-widest uppercase">
              WALKMAN-84
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-red-600 text-white font-mono font-bold">
              {isPlaying ? 'PLAY' : 'STOP'}
            </span>
          </div>
          {/* Mechanical Tape Counter */}
          <div className="flex items-center gap-1.5 bg-black px-2.5 py-1 border border-neutral-500 font-mono text-xs text-green-400">
            <span>INDEX:</span>
            <span className="font-bold tracking-widest text-sm">{formatCounter(counter)}</span>
          </div>
        </div>

        {/* Cassette Tape Window */}
        <div className="bg-[#1C1C1C] border-2 border-black p-2 sm:p-4 relative flex items-center justify-between rounded-sm overflow-hidden shadow-inner h-28 sm:h-32">
          {/* Tape Label Sticker */}
          <div className="absolute top-1.5 left-2 right-2 sm:left-3 sm:right-3 bg-[#EBE0C5] text-black px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono border border-black flex justify-between">
            <span className="font-bold truncate">{currentTrack.title}</span>
            <span className="shrink-0 font-bold ml-2">SIDE A</span>
          </div>

          {/* Left Spool */}
          <div className="relative z-10 ml-1 sm:ml-6 flex flex-col items-center">
            <div
              style={{ transform: `rotate(${spoolAngle}deg)` }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white bg-black flex items-center justify-center relative shadow-sm"
            >
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-neutral-700 border border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white" />
              </div>
              <div className="absolute w-full h-0.5 sm:h-1 bg-white/40" />
              <div className="absolute h-full w-0.5 sm:w-1 bg-white/40" />
            </div>
            <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-neutral-900 border border-neutral-600 mt-1" />
          </div>

          {/* Center Magnetic Tape Bridge */}
          <div className="flex-1 px-1 sm:px-3 flex flex-col items-center justify-center z-10">
            <div className="w-full h-2.5 sm:h-3.5 bg-[#422B19] border border-neutral-800 shadow-inner" />
            <span className="text-[8px] sm:text-[10px] font-mono text-neutral-400 mt-1">NORMAL BIAS • 120µs</span>
          </div>

          {/* Right Spool */}
          <div className="relative z-10 mr-1 sm:mr-6 flex flex-col items-center">
            <div
              style={{ transform: `rotate(${spoolAngle}deg)` }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white bg-black flex items-center justify-center relative shadow-sm"
            >
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-neutral-700 border border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white" />
              </div>
              <div className="absolute w-full h-0.5 sm:h-1 bg-white/40" />
              <div className="absolute h-full w-0.5 sm:w-1 bg-white/40" />
            </div>
            <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-neutral-900 border border-neutral-600 mt-1" />
          </div>
        </div>

        {/* Track Title Info */}
        <div className="mt-3 px-1 text-center font-mono text-xs text-neutral-300 truncate">
          ▶ Track {currentTrackIndex + 1}/{TRACKS.length}: {currentTrack.title} ({currentTrack.artist})
        </div>
      </div>

      {/* Heavy Mechanical Physical Push Buttons with Generous Padding */}
      <div className="bg-[#B0B0B0] border-2 border-black p-3 shadow-[3px_3px_0px_#000] flex flex-wrap justify-between items-center mt-3 gap-2">
        <div className="flex items-center flex-wrap gap-2">
          {/* Rewind */}
          <button
            onClick={handlePrev}
            title="Previous Track"
            className="px-4.5 py-2.5 my-1 bg-[#DCDCDC] active:bg-[#999] border-2 border-black font-bold text-xs shadow-[2px_2px_0px_#000] active:translate-y-0.5 cursor-pointer"
          >
            ◄◄ PREV
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            className={`px-5.5 py-2.5 my-1 border-2 border-black font-bold text-xs shadow-[2px_2px_0px_#000] active:translate-y-0.5 cursor-pointer ${
              isPlaying ? 'bg-red-500 text-white' : 'bg-[#E5FFE5] text-black hover:bg-emerald-200'
            }`}
          >
            {isPlaying ? '❚❚ PAUSE' : '► PLAY'}
          </button>

          {/* Stop */}
          <button
            onClick={handleStop}
            title="Stop Tape"
            className="px-4.5 py-2.5 my-1 bg-[#DCDCDC] active:bg-[#999] border-2 border-black font-bold text-xs shadow-[2px_2px_0px_#000] active:translate-y-0.5 cursor-pointer"
          >
            ■ STOP
          </button>

          {/* Fast Forward */}
          <button
            onClick={handleNext}
            title="Next Track"
            className="px-4.5 py-2.5 my-1 bg-[#DCDCDC] active:bg-[#999] border-2 border-black font-bold text-xs shadow-[2px_2px_0px_#000] active:translate-y-0.5 cursor-pointer"
          >
            NEXT ►►
          </button>
        </div>

        {/* Status indicator */}
        <div className="text-xs font-mono text-neutral-800 pr-2">
          STEREO AUTO-REVERSE
        </div>
      </div>
    </div>
  );
};
