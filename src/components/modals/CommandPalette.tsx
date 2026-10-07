"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";
import { PERSONAL_INFO, PROJECTS_DATA } from "@/data/portfolioData";
import {
  Search,
  X,
  FileText,
  Mail,
  Phone,
  Sparkles,
  Box,
  Server,
  Cloud,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../common/SocialIcons";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "resume-en",
      label: "Download English Resume (PDF)",
      category: "Documents",
      icon: FileText,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrlEn, "_blank");
        showToast("Opening English Resume PDF");
      },
    },
    {
      id: "resume-fr",
      label: "Download French CV (PDF)",
      category: "Documents",
      icon: FileText,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrlFr, "_blank");
        showToast("Opening French CV PDF");
      },
    },
    {
      id: "email",
      label: `Copy Email (${PERSONAL_INFO.email})`,
      category: "Contact",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        showToast("Email address copied to clipboard!");
      },
    },
    {
      id: "phone",
      label: `Copy Phone (${PERSONAL_INFO.phone})`,
      category: "Contact",
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.phone);
        showToast("Phone number copied to clipboard!");
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile (@TORBIomar)",
      category: "Social",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.github, "_blank");
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile (/in/omar-torbi)",
      category: "Social",
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, "_blank");
      },
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PROJECTS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#09090b] rounded-2xl border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden font-sans text-xs animate-in zoom-in-95 duration-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              sound.playKey();
              setQuery(e.target.value);
            }}
            placeholder="Search systems, commands, documents, or skills..."
            className="w-full bg-transparent border-none text-sm font-sans text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-3">
          
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Actions &amp; Documents
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playClick();
                        item.action();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                        {item.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Systems & Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Engineered Systems ({filteredProjects.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(p.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors text-left cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-black dark:text-white">{p.title}</div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-md">
                        {p.subtitle}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-transparent dark:border-zinc-800">
                      {p.categoryLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredActions.length === 0 && filteredProjects.length === 0 && (
            <div className="py-8 text-center text-zinc-400 dark:text-zinc-500 font-sans">
              No results found for "{query}".
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-[#0c0d11] border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
