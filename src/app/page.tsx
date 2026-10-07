"use client";

import React, { useState } from "react";
import { ToastProvider } from "@/components/common/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { LogoBar } from "@/components/sections/LogoBar";
import { QuickServicesGrid } from "@/components/sections/QuickServicesGrid";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { StackModelsBox } from "@/components/sections/StackModelsBox";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ConnectorsGrid } from "@/components/sections/ConnectorsGrid";
import { FeaturedHighlightBanner } from "@/components/sections/FeaturedHighlightBanner";
import { TestimonialsRow } from "@/components/sections/TestimonialsRow";
import { InvertedDarkSection } from "@/components/sections/InvertedDarkSection";
import { EnterpriseReadinessBanner } from "@/components/sections/EnterpriseReadinessBanner";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { DetailedInfoCards } from "@/components/sections/DetailedInfoCards";
import { CtaCard } from "@/components/sections/CtaCard";
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
      <main className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] selection:bg-black selection:text-white flex flex-col">
        {/* Navigation Bar */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenContactModal={() => setContactModalOpen(true)}
        />

        {/* Hero Section with Center Logo, Punchy Headline, 3-Button Tray, and Mockup Window */}
        <HeroSection onOpenContactModal={() => setContactModalOpen(true)} />

        {/* Monochrome Client & Tech Logos Ticker */}
        <LogoBar />

        {/* 4-Column Quick-Links & Services Breakdown */}
        <QuickServicesGrid />

        {/* 3-Pillar Foundation Grid (01 Control, 02 Governance, 03 Value) */}
        <div id="about">
          <FeaturesGrid />
        </div>

        {/* Adaptive Stack & Supported Models Card */}
        <StackModelsBox />

        {/* Engineered Systems: 2x4 Grid with 8 Projects */}
        <ProjectsGrid onSelectProject={(p) => setActiveProject(p)} />

        {/* Plugs into the stack you already run (4x4 Connectors Grid) */}
        <ConnectorsGrid />

        {/* Featured Case Study Highlight Banner with Mission Quote */}
        <FeaturedHighlightBanner onOpenProject={handleOpenProjectById} />

        {/* Verified Track Record & Principles Testimonials Row */}
        <TestimonialsRow />

        {/* High-Contrast Inverted Dark Section (6 Specialized Domains) */}
        <InvertedDarkSection />

        {/* Enterprise Readiness & Credentials Banner */}
        <EnterpriseReadinessBanner />

        {/* Practical Experience & Internships */}
        <ExperienceSection />

        {/* 4-Column Engineering Workflow & Principles (01 Process, 02 Performance, 03 Scalability, 04 Aesthetics) */}
        <DetailedInfoCards />

        {/* Atmospheric Visual CTA Card with Geometric Flower */}
        <CtaCard onOpenContactModal={() => setContactModalOpen(true)} />

        {/* Three-Layered Rich Contrast Footer */}
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
