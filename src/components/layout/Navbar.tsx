"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  FileText,
  Download,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/utils/sound";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.experiences, href: "#experiences" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="absolute top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div
        className="relative w-full max-w-5xl rounded-full bg-[#fcfcfc]/95 dark:bg-[#09090b]/95 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] py-2.5 px-4 sm:px-6 flex items-center justify-between gap-4 pointer-events-auto"
      >
        {/* Brand Left with official Logo image & Live Emerald Telemetry Dot */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 group cursor-pointer shrink-0 z-10"
          aria-label="Omar Torbi Portfolio Home"
        >
          <div className="h-7 sm:h-8 flex items-center justify-center">
            {/* Dark mode logo (white) */}
            <img
              src="/logo/logo-white.png"
              alt="Omar Torbi Logo"
              className="h-6 sm:h-7 w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
            />
            {/* Light mode logo (black) */}
            <img
              src="/logo/logo-black.png"
              alt="Omar Torbi Logo"
              className="h-6 sm:h-7 w-auto object-contain block dark:hidden transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="relative flex h-1.5 w-1.5" title="Omar Torbi • Online">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
        </a>

        {/* Center Minimal Navigation - Mathematically centered in the navbar */}
        <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-7 text-[13px] font-sans text-zinc-600 dark:text-zinc-400 font-medium md:absolute md:left-1/2 md:-translate-x-1/2 z-10 pointer-events-auto">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="group hover:text-accent transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="text-accent/40 group-hover:text-accent font-mono text-[11px] font-bold mr-1.5 transition-colors">0{idx + 1}.</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle, Language Switcher, Resume, and Mobile Menu */}
        <div className="flex items-center gap-2 shrink-0 z-10">
          {/* Theme Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors cursor-pointer"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-zinc-200 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-800 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Single-Button Smooth Language Switcher (EN or FR) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors cursor-pointer select-none overflow-hidden"
            title={language === "en" ? "Passer en Français (FR)" : "Switch to English (EN)"}
            aria-label={`Language: ${language.toUpperCase()}. Click to switch to ${language === "en" ? "French" : "English"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={language}
                initial={{ y: 7, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -7, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="text-[11px] font-mono font-bold leading-none select-none uppercase tracking-tight"
              >
                {language}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Resume / Dossier Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setDossierOpen(!dossierOpen);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-sans font-medium transition-colors cursor-pointer shadow-2xs"
              aria-label="View Resume / CV"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>{t.nav.resume}</span>
              <span className="text-[10px] text-zinc-400 font-mono">▾</span>
            </button>

            {dossierOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#0e0f12] border border-zinc-200 dark:border-zinc-800 shadow-xl py-1 z-50 font-sans text-xs animate-in fade-in duration-100">
                <a
                  href={PERSONAL_INFO.resumeUrlEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    sound.playSuccess();
                    setDossierOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors"
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
                  className="flex items-center justify-between px-3.5 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors border-t border-zinc-100 dark:border-zinc-850"
                >
                  <span className="font-medium">CV (Français PDF)</span>
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-800 dark:text-zinc-200 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-white dark:bg-[#0e0f12] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 space-y-3 font-sans text-sm animate-in slide-in-from-top-2 duration-150 pointer-events-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="py-1.5 text-zinc-700 dark:text-zinc-300 hover:text-accent font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleTheme}
                className="h-8 px-2.5 rounded-full flex items-center gap-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 cursor-pointer"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{theme === "dark" ? "Light" : "Dark"}</span>
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 cursor-pointer select-none overflow-hidden"
                title={language === "en" ? "Passer en Français (FR)" : "Switch to English (EN)"}
                aria-label={`Language: ${language.toUpperCase()}. Click to switch to ${language === "en" ? "French" : "English"}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={language}
                    initial={{ y: 7, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -7, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="text-xs font-mono font-bold leading-none select-none uppercase tracking-tight"
                  >
                    {language}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={PERSONAL_INFO.resumeUrlEn}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300"
              >
                Resume
              </a>
              <a
                href={PERSONAL_INFO.resumeUrlFr}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300"
              >
                CV (FR)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
