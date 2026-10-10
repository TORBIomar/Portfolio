"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/common/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { ReachOutSection } from "@/components/sections/ReachOutSection";
import { RichFooter } from "@/components/layout/RichFooter";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { CommandPalette } from "@/components/modals/CommandPalette";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleOpenProjectById = (projectId: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === projectId);
    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#000000] text-[#1a1a1a] dark:text-[#fafafa] flex flex-col font-sans transition-colors duration-300">
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

          {/* Interactive Modals */}
          <ProjectDetailModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />

          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onSelectProject={(id) => handleOpenProjectById(id)}
          />

          {/* Floating Interactive AI Avatar & Chat Widget */}
          <FloatingChatWidget
            onSelectProject={(id) => handleOpenProjectById(id)}
          />
        </main>
      </ToastProvider>
    </ThemeProvider>
  );
}
