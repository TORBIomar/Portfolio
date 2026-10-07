"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Volume2,
  VolumeX,
  Menu,
  X,
  FileText,
  Download,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { BrandIcon } from "../common/BrandIcon";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/utils/sound";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenContactModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [dossierOpen, setDossierOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return sound.onMuteChange((muted) => setIsMuted(muted));
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Works", href: "#projects" },
    { label: "Architecture", href: "#architecture" },
    { label: "Stack", href: "#stack" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#fcfcfc]/90 backdrop-blur-md border-b border-zinc-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] py-3"
          : "bg-[#fcfcfc]/80 backdrop-blur-xs border-b border-zinc-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Left */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Omar Torbi Portfolio Home"
        >
          <div className="w-7 h-7 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            <BrandIcon className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-tight text-black flex items-center gap-1.5 uppercase">
              <span>OMAR TORBI</span>
              <span className="text-zinc-400 font-normal">/</span>
              <span className="text-[10px] text-zinc-500 font-normal hidden sm:inline-block">ENG</span>
            </span>
          </div>
        </a>

        {/* Center Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-sans text-zinc-600 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => sound.toggleMute()}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
            title={isMuted ? "Unmute audio effects" : "Mute audio effects"}
            aria-label={isMuted ? "Unmute audio effects" : "Mute audio effects"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Search / Command Palette Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white text-zinc-600 hover:text-black text-xs font-mono transition-colors cursor-pointer shadow-xs"
            title="Open command palette (⌘K)"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline-block text-[11px] text-zinc-400">⌘K</span>
          </button>

          {/* Resume / Dossier Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                sound.playClick();
                setDossierOpen(!dossierOpen);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white text-zinc-800 text-xs font-sans font-medium transition-colors cursor-pointer shadow-xs"
              aria-label="View Resume / CV"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>Resume</span>
              <span className="text-[10px] text-zinc-400 font-mono">▾</span>
            </button>

            {dossierOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-zinc-200 shadow-xl py-1 z-50 font-sans text-xs animate-in fade-in duration-100">
                <a
                  href={PERSONAL_INFO.resumeUrlEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    sound.playSuccess();
                    setDossierOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                >
                  <span className="font-medium">Resume (English PDF)</span>
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                </a>
                <a
                  href={PERSONAL_INFO.resumeUrlFr}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    sound.playSuccess();
                    setDossierOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors border-t border-zinc-100"
                >
                  <span className="font-medium">CV (Français PDF)</span>
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <a
            href="#contact"
            onClick={() => {
              sound.playClick();
              if (onOpenContactModal) onOpenContactModal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-sans font-medium transition-colors cursor-pointer shadow-xs"
          >
            <span>REACH OUT</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-800 rounded-md border border-zinc-200 bg-white cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcfcfc] border-b border-zinc-200 px-6 py-4 space-y-3 font-sans text-sm animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="py-1 text-zinc-700 hover:text-black font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.resumeUrlEn}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-mono text-zinc-700"
              >
                Resume (EN)
              </a>
              <a
                href={PERSONAL_INFO.resumeUrlFr}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-mono text-zinc-700"
              >
                CV (FR)
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1 rounded-full bg-black text-white text-xs font-medium"
            >
              Reach Out →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
