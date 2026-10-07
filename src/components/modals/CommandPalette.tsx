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
  ArrowRight,
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
        else {
          // Open
        }
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
        showToast("Opening English Resume...");
      },
    },
    {
      id: "resume-fr",
      label: "Download French CV (PDF)",
      category: "Documents",
      icon: FileText,
      action: () => {
        window.open(PERSONAL_INFO.resumeUrlFr, "_blank");
        showToast("Opening French CV...");
      },
    },
    {
      id: "copy-email",
      label: `Copy Email (${PERSONAL_INFO.email})`,
      category: "Contact",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        showToast("Email copied to clipboard!");
      },
    },
    {
      id: "copy-phone",
      label: `Copy Phone (${PERSONAL_INFO.phone})`,
      category: "Contact",
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.phone);
        showToast("Phone copied to clipboard!");
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile (@TORBIomar)",
      category: "Links",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.github, "_blank");
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile (Omar Torbi)",
      category: "Links",
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, "_blank");
      },
    },
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden font-sans text-xs animate-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              sound.playKey();
              setQuery(e.target.value);
            }}
            placeholder="Search systems, commands, documents, or skills..."
            className="w-full bg-transparent border-none text-sm font-sans text-black placeholder-zinc-400 outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-black hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-3">
          
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
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
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100 hover:text-black transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-500" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">
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
              <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
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
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100 hover:text-black transition-colors text-left cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-black">{p.title}</div>
                      <div className="text-[11px] text-zinc-500 truncate max-w-md">
                        {p.subtitle}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                      {p.categoryLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredActions.length === 0 && filteredProjects.length === 0 && (
            <div className="py-8 text-center text-zinc-400 font-sans">
              No results found for "{query}".
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between font-mono text-[10px] text-zinc-400">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
