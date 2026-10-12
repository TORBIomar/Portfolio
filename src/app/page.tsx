"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/components/common/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { ReachOutSection } from "@/components/sections/ReachOutSection";
import { RichFooter } from "@/components/layout/RichFooter";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";

const ProjectDetailModal = dynamic(
  () => import("@/components/modals/ProjectDetailModal").then((m) => m.ProjectDetailModal),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import("@/components/modals/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

const FloatingChatWidget = dynamic(
  () => import("@/components/chat/FloatingChatWidget").then((m) => m.FloatingChatWidget),
  { ssr: false }
);

const TargetCursor = dynamic(
  () => import("@/components/common/TargetCursor"),
  { ssr: false }
);

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);

  useEffect(() => {
    // Defer heavy 3D chat widget until after first user interaction or idle period
    const mountChat = () => {
      setShowChatWidget(true);
      window.removeEventListener("scroll", mountChat);
      window.removeEventListener("mousemove", mountChat);
      window.removeEventListener("touchstart", mountChat);
      window.removeEventListener("keydown", mountChat);
      window.removeEventListener("open-ai-chat", mountChat);
    };

    window.addEventListener("scroll", mountChat, { once: true, passive: true });
    window.addEventListener("mousemove", mountChat, { once: true, passive: true });
    window.addEventListener("touchstart", mountChat, { once: true, passive: true });
    window.addEventListener("keydown", mountChat, { once: true, passive: true });
    window.addEventListener("open-ai-chat", mountChat, { once: true });

    const timer = setTimeout(mountChat, 4500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", mountChat);
      window.removeEventListener("mousemove", mountChat);
      window.removeEventListener("touchstart", mountChat);
      window.removeEventListener("keydown", mountChat);
      window.removeEventListener("open-ai-chat", mountChat);
    };
  }, []);

  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("open-command-palette", handleOpenPalette);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-command-palette", handleOpenPalette);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenProjectById = (projectId: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === projectId);
    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
        <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#000000] text-[#1a1a1a] dark:text-[#fafafa] flex flex-col font-sans">
          {/* Centered Floating Navigation Bar with Logo & Theme Toggles */}
          <Navbar
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          {/* SECTION 1: ABOUT (Hero with card.svg Showcase, Narrative & Architecture Pillars) */}
          <HeroSection />

          {/* SECTION 2: EXPERIENCES (Zahiri Metal, ONSSA, EMSI Degree Switcher) */}
          <ExperienceSection />

          {/* SECTION 3: PROJECTS (4 Flagship Systems: Zahiri CAD, Elevate, Sofia Library, Creator Matrix) */}
          <ProjectsGrid onSelectProject={(p) => setActiveProject(p)} />

          {/* SECTION 4: FAQ (Technical Specifications & Availability Accordion) */}
          <FaqSection />

          {/* SECTION 5: REACH OUT (Dedicated Interactive Contact & Dispatch Section) */}
          <ReachOutSection />

          {/* Clean Contrast Footer */}
          <RichFooter />

          {/* Interactive Modals (Loaded strictly on demand) */}
          {activeProject && (
            <ProjectDetailModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}

          {commandPaletteOpen && (
            <CommandPalette
              isOpen={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
              onSelectProject={(id) => handleOpenProjectById(id)}
            />
          )}

          {/* Floating Interactive AI Avatar & Chat Widget (Deferred mount) */}
          {showChatWidget && (
            <FloatingChatWidget
              onSelectProject={(id) => handleOpenProjectById(id)}
            />
          )}

          {/* Futuristic Target Reticle Cursor from React Bits */}
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor
            parallaxOn
            size={32}
            cornerSize={10}
            thickness={2}
            padding={8}
            blendMode="normal"
          />
        </main>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
