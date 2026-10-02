import React, { useState, useEffect, useRef } from 'react';
import { Search, Code2, Cpu, User, Mail, Download, ExternalLink, Volume2, VolumeX, X, CornerDownLeft, ShieldCheck } from 'lucide-react';
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
    // Engineering Candidate Dossier
    {
      id: 'action-recruiter-dossier',
      title: 'Open Engineering Candidate Dossier (Spec Sheet & Accreditations)',
      category: 'Engineering Dossier',
      icon: <ShieldCheck className="w-4 h-4 text-[#E58A3C]" />,
      action: () => {
        onClose();
        if (onOpenRecruiterDossier) {
          onOpenRecruiterDossier();
        }
      },
      shortcut: 'R',
      meta: 'Software & DevOps Engineer • EMSI Rabat • OCI Certified',
    },

    // Navigation
    {
      id: 'nav-about',
      title: '01. About Me & Engineering Focus',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-[#E58A3C]" />,
      action: () => scrollToSection('about'),
      shortcut: 'A',
    },
    {
      id: 'nav-projects',
      title: '02. Engineered Systems & Projects',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-[#E58A3C]" />,
      action: () => scrollToSection('projects'),
      shortcut: 'P',
    },
    {
      id: 'nav-skills',
      title: '03. Core Capabilities Matrix',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-[#E58A3C]" />,
      action: () => scrollToSection('skills'),
      shortcut: 'M',
    },
    {
      id: 'nav-experience',
      title: '04. Experience & OCI Certifications',
      category: 'Navigation',
      icon: <ShieldCheck className="w-4 h-4 text-[#E58A3C]" />,
      action: () => scrollToSection('experience'),
      shortcut: 'E',
    },
    {
      id: 'nav-contact',
      title: '05. Get In Touch & Direct Channels',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-[#E58A3C]" />,
      action: () => scrollToSection('contact'),
      shortcut: 'C',
    },

    // Actions
    {
      id: 'action-download-cv-en',
      title: 'Download English Resume (PDF)',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-[#E58A3C]" />,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrlEn, '_blank');
        onClose();
      },
      shortcut: 'D',
    },
    {
      id: 'action-download-cv-fr',
      title: 'Download French CV (PDF)',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-[#E58A3C]" />,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrlFr, '_blank');
        onClose();
      },
      shortcut: 'F',
    },
    {
      id: 'action-copy-email',
      title: `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-[#E58A3C]" />,
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
      icon: isAudioMuted ? <Volume2 className="w-4 h-4 text-[#E58A3C]" /> : <VolumeX className="w-4 h-4 text-neutral-400" />,
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
      icon: <ExternalLink className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      title: 'Connect on LinkedIn',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />,
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
      icon: <Code2 className="w-4 h-4 text-[#E58A3C]" />,
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-[#0E1117]/85 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0E1117] border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col font-mono text-xs sm:text-sm animate-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#141820]">
          <Search className="w-4 h-4 text-[#E58A3C] shrink-0" />
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
            className="flex-1 bg-transparent border-none text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none text-xs sm:text-sm font-mono"
            aria-label="Command palette input"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/10 border border-neutral-300 dark:border-neutral-700 text-[10px] text-neutral-500 dark:text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[340px] overflow-y-auto p-2 space-y-1"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 dark:text-neutral-500">
              No matching actions or commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    sound.playClick();
                    cmd.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-[#15161E] text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="truncate font-medium">{cmd.title}</span>
                    {cmd.meta && (
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:inline truncate">
                        • {cmd.meta}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#E58A3C]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer HUD */}
        <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#141820] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to dismiss</span>
          </div>
          <span className="text-neutral-400">SYS//COMMAND-PALETTE</span>
        </div>
      </div>
    </div>
  );
};
