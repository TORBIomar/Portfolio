"use client";

import React, { useState } from "react";
import { ToastProvider } from "@/components/common/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { RichFooter } from "@/components/layout/RichFooter";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { CommandPalette } from "@/components/modals/CommandPalette";
import { ContactModal } from "@/components/modals/ContactModal";
import { PROJECTS_DATA, Project } from "@/data/portfolioData";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleOpenProjectById = (projectId: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === projectId);
    if (found) {
      setActiveProject(found);
    }
  };

  return (
    <ToastProvider>
      <main className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] selection:bg-black selection:text-white flex flex-col font-sans">
        {/* Navigation Bar */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenContactModal={() => setContactModalOpen(true)}
        />

        {/* SECTION 1: ABOUT (Hero, Interactive Window Showcase, Profile & Foundation Pillars) */}
        <HeroSection onOpenContactModal={() => setContactModalOpen(true)} />

        {/* SECTION 2: EXPERIENCES (Zahiri Metal, ONSSA, EMSI Degree) */}
        <ExperienceSection />

        {/* SECTION 3: PROJECTS (4 Flagship Systems: Zahiri CAD, Elevate, Sofia Library, Creator Matrix) */}
        <ProjectsGrid onSelectProject={(p) => setActiveProject(p)} />

        {/* SECTION 4: FAQ (Technical Specifications & Availability Accordion) */}
        <FaqSection />

        {/* Three-Layered Rich Contrast Footer with "LET'S WORK TOGETHER / REACH OUT" */}
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

        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </main>
    </ToastProvider>
  );
}
