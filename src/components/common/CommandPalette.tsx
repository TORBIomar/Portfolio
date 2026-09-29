import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Code2, Cpu, User, Mail, Download, ExternalLink, Volume2, VolumeX, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRecruiterDossier?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  meta?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenRecruiterDossier }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted());
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return sound.onMuteChange((muted) => setIsAudioMuted(muted));
  }, []);

  useEffect(() => {
    if (isOpen) {
      sound.playClick();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build command catalogue
  const commands: CommandItem[] = [
    // Recruiter Fast-Scan Dossier
    {
      id: 'action-recruiter-dossier',
      title: '⚡ Open Recruiter Fast-Scan Dossier (Key Facts & Contact)',
      category: 'Recruiter Fast-Scan',
      icon: <Sparkles className="w-4 h-4 text-[#FF6B00]" />,
      action: () => {
        onClose();
        if (onOpenRecruiterDossier) {
          onOpenRecruiterDossier();
        }
      },
      shortcut: 'R',
      meta: 'Target: Software & DevOps • EMSI Rabat • PFE 2026/2027',
    },

    // Navigation
    {
      id: 'nav-about',
      title: '01. About Me & Engineering Philosophy',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-[#FF6B00]" />,
      action: () => scrollToSection('about'),
      shortcut: 'A',
    },
    {
      id: 'nav-projects',
      title: '02. Engineered Systems & Projects',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-[#FF6B00]" />,
      action: () => scrollToSection('projects'),
      shortcut: 'P',
    },
    {
      id: 'nav-skills',
      title: '03. Core Capabilities & Skills Matrix',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-[#FF6B00]" />,
      action: () => scrollToSection('skills'),
      shortcut: 'M',
    },
    {
      id: 'nav-experience',
      title: '04. Career Milestones & Experience',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-[#FF6B00]" />,
      action: () => scrollToSection('experience'),
      shortcut: 'E',
    },
    {
      id: 'nav-faq',
      title: '05. System Specs & FAQ',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#FF6B00]" />,
      action: () => scrollToSection('faq'),
      shortcut: 'F',
    },
    {
      id: 'nav-contact',
      title: '06. Get In Touch & Transmission',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-[#FF6B00]" />,
      action: () => scrollToSection('contact'),
      shortcut: 'C',
    },

    // Actions
    {
      id: 'action-download-cv',
      title: 'Download CV / Resume (PDF)',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-white" />,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrl, '_blank');
        onClose();
      },
      shortcut: 'D',
    },
    {
      id: 'action-copy-email',
      title: `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-[#FF6B00]" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        sound.playSuccess();
        onClose();
      },
    },
    {
      id: 'action-toggle-audio',
      title: isAudioMuted ? 'Enable Audio Haptics & Synth' : 'Mute Audio Haptics & Synth',
      category: 'Preferences',
      icon: isAudioMuted ? <Volume2 className="w-4 h-4 text-[#FF6B00]" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />,
      action: () => {
        sound.toggleMute();
      },
      meta: isAudioMuted ? 'MUTED' : 'ENABLED',
    },

    // External
    {
      id: 'ext-github',
      title: 'View GitHub Profile (@TORBIomar)',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-foreground" />,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      title: 'Connect on LinkedIn',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-foreground" />,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      },
    },

    // Projects Quick Links
    ...PROJECTS_DATA.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      category: 'Projects',
      icon: <Code2 className="w-4 h-4 text-[#FF6B00]" />,
      action: () => {
        scrollToSection('projects');
      },
      meta: p.techStack.slice(0, 3).join(', '),
    })),
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.meta && cmd.meta.toLowerCase().includes(q))
    );
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        sound.playClick();
        current.action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Dark / Light Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-[#050507]/85 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0A0B0F] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/40 dark:shadow-black/90 overflow-hidden z-10 flex flex-col font-mono text-xs sm:text-sm animate-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-[#0F1016]">
          <Search className="w-4 h-4 text-[#FF6B00] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              sound.playKey();
            }}
            placeholder="Search commands, projects, skills, or actions..."
            className="flex-1 bg-transparent border-none text-neutral-900 dark:text-foreground placeholder-neutral-400 dark:placeholder-muted-foreground outline-none text-sm font-mono"
            aria-label="Command palette input"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] text-neutral-500 dark:text-muted-foreground">
            ESC to close
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-500 dark:text-muted-foreground hover:text-neutral-900 dark:hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 dark:text-muted-foreground">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#FF6B00]" />
              <p>No matching commands for "{query}"</p>
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    sound.playClick();
                    cmd.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#FF6B00]/15 text-neutral-900 dark:text-foreground border border-[#FF6B00]/40 shadow-[0_0_12px_rgba(255,107,0,0.12)]'
                      : 'text-neutral-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-md bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 shrink-0">
                      {cmd.icon}
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-neutral-900 dark:text-foreground truncate flex items-center gap-2">
                        <span>{cmd.title}</span>
                        {cmd.category === 'Projects' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/25">
                            PROJECT
                          </span>
                        )}
                      </div>
                      {cmd.meta && (
                        <div className="text-[11px] text-neutral-500 dark:text-muted-foreground truncate">
                          {cmd.meta}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-neutral-500 dark:text-muted-foreground text-[11px]">
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-[10px]">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#FF6B00] transition-transform duration-200" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hotkeys Bar */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-[#07080B] border-t border-black/10 dark:border-white/5 flex items-center justify-between text-[11px] text-neutral-500 dark:text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px]">↵</kbd> Select
            </span>
          </div>
          <div className="text-[10px] text-[#FF6B00]/90 font-mono">
            SYS_CMD_PROMPT v2.4
          </div>
        </div>
      </div>
    </div>
  );
};
