import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Instagram, Menu, X, Volume2, VolumeX, Search, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
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
    // Sound engine subscription
    return sound.onMuteChange((muted) => setIsAudioMuted(muted));
  }, []);

  useEffect(() => {
    // Real-time Morocco time (Africa/Casablanca, GMT+1)
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
    { label: "Projects", href: "#projects" },
    { label: "Skills Matrix", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  const toggleSound = () => {
    sound.toggleMute();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090e]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Terminal Identifier */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group cursor-pointer rounded-md p-1 focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Omar Torbi Portfolio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0e1422] border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/60 group-hover:shadow-[0_0_12px_rgba(0,255,157,0.3)] transition-all">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="font-mono text-sm tracking-tight font-bold text-foreground">
            <span>omar</span>
            <span className="text-accent">.torbi</span>
            <span className="text-muted-foreground font-normal text-xs ml-1.5 hidden sm:inline-block">/sys</span>
          </div>
        </a>

        {/* Real-time Telemetry: Morocco Local Clock + Availability */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-muted-foreground">
          {/* Real time clock */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e1422]/80 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span className="text-slate-300">RBT [GMT+1]:</span>
            <span className="text-foreground font-semibold">{moroccoTime || '14:00:00'}</span>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-foreground hover:bg-white/5 rounded-md transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions Bar (Search, Audio, Socials) */}
        <div className="flex items-center gap-2">
          
          {/* Command Palette Trigger Button */}
          {onOpenCommandPalette && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenCommandPalette();
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0e1422] border border-white/10 text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors font-mono text-xs cursor-pointer"
              title="Open Command Palette (⌘K)"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5 text-accent" />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isAudioMuted
                ? 'bg-transparent border-white/10 text-muted-foreground hover:text-foreground'
                : 'bg-accent/10 border-accent/30 text-accent shadow-[0_0_10px_rgba(0,255,157,0.2)]'
            }`}
            title={isAudioMuted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label={isAudioMuted ? "Unmute audio effects" : "Mute audio effects"}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* GitHub link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn link */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d16] border-b border-white/10 px-4 pt-3 pb-5 space-y-3 font-mono text-xs animate-in slide-in-from-top-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-muted-foreground">
            <span>RBT GMT+1: {moroccoTime}</span>
            <span className="text-accent">{PERSONAL_INFO.status}</span>
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
                className="block px-3 py-2 rounded-lg text-slate-300 hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent">
                <Github className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent">
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => {
                toggleSound();
                setMobileMenuOpen(false);
              }}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
              <span>{isAudioMuted ? 'Muted' : 'Audio On'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
