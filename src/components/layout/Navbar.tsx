import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Menu, X, Volume2, VolumeX, Search, Clock, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import { useTheme } from '../../context/ThemeContext';
import { ScrambleText } from '../common/ScrambleText';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenRecruiterDossier?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted());
  const [moroccoTime, setMoroccoTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return sound.onMuteChange((muted) => setIsAudioMuted(muted));
  }, []);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Casablanca',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setMoroccoTime(timeStr);
      } catch {
        const d = new Date();
        setMoroccoTime(d.toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { num: '01.', label: 'About', href: '#about' },
    { num: '02.', label: 'Capabilities', href: '#skills' },
    { num: '03.', label: 'Experiences', href: '#experience' },
    { num: '04.', label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm py-2.5 sm:py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Terminal Identifier with ScrambleText */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group cursor-pointer rounded-full p-1 focus-visible:ring-2 focus-visible:ring-[#FF6B00] transition-transform duration-300 ease-out hover:scale-102"
          aria-label="Omar Torbi Portfolio Home"
        >
          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#FF6B00] group-hover:border-[#FF6B00]/70 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.3)] transition-all duration-300 ease-out">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="font-mono text-sm tracking-tight font-bold text-neutral-900 dark:text-white flex items-center">
            <ScrambleText text="omar" scrambleOnHover autoPlay={false} speed={25} />
            <span className="text-[#FF6B00]">.torbi</span>
            <span className="text-neutral-400 dark:text-neutral-500 font-normal text-xs ml-1.5 hidden sm:inline-block">/software-devops</span>
          </div>
        </a>

        {/* Real-time Telemetry: Morocco Local Clock + Availability */}
        <div className="hidden xl:flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          {/* Real time clock */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
            <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-300" />
            <span className="text-neutral-500 dark:text-neutral-400">RBT [GMT+1]:</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{moroccoTime || '16:00:00'}</span>
          </div>

          {/* Availability badge with smooth beacon */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-neutral-900 dark:text-white font-medium shadow-[0_0_12px_rgba(255,107,0,0.12)]">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] beacon-orange"></span>
            <span className="text-xs font-semibold">{PERSONAL_INFO.status}</span>
          </div>
        </div>

        {/* Desktop Navigation Links with Numbered Prefixes & Smooth Hover */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="group px-3 py-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-300 ease-out cursor-pointer"
            >
              <span className="text-[#FF6B00]/60 group-hover:text-[#FF6B00] font-bold mr-1.5 transition-colors duration-300">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Top Action Buttons Cluster (Unified Heights & Smooth Spring Physics) */}
        <div className="flex items-center gap-2.5">
          
          {/* Integrated Frosted Utility Dock (Theme, Search ⌘K, Audio) */}
          <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 backdrop-blur-md transition-all duration-300">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FF6B00]" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            {/* Command Palette Trigger Button */}
            {onOpenCommandPalette && (
              <>
                <div className="h-3.5 w-px bg-black/10 dark:bg-white/10 mx-0.5" />
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenCommandPalette();
                  }}
                  className="flex items-center gap-1.5 px-2.5 h-8 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 ease-out hover:scale-105 active:scale-95 font-mono text-xs cursor-pointer"
                  title="Open Command Palette (⌘K)"
                  aria-label="Open Command Palette"
                >
                  <Search className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    ⌘K
                  </kbd>
                </button>
              </>
            )}

            {/* Audio Synthesizer Toggle */}
            <div className="h-3.5 w-px bg-black/10 dark:bg-white/10 mx-0.5" />
            <button
              onClick={() => sound.toggleMute()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer ${
                isAudioMuted
                  ? 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10'
                  : 'text-[#FF6B00] bg-[#FF6B00]/15 shadow-[0_0_12px_rgba(255,107,0,0.25)]'
              }`}
              title={isAudioMuted ? "Unmute audio effects" : "Mute audio effects"}
              aria-label={isAudioMuted ? "Unmute audio effects" : "Mute audio effects"}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:text-[#FF6B00] rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer transition-all duration-200 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 px-5 pt-4 pb-6 space-y-4 font-mono text-xs animate-in slide-in-from-top-3 duration-300 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-neutral-500">
            <span>RBT GMT+1: {moroccoTime}</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] beacon-orange"></span>
              <span className="text-[#FF6B00] font-semibold">{PERSONAL_INFO.status}</span>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 active:scale-98"
              >
                <span className="text-[#FF6B00] font-bold">{link.num}</span>
                <span className="text-sm font-semibold">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-[#FF6B00] p-1.5 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-[#FF6B00] p-1.5 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              omar.torbi © 2026
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
