import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { RecruiterDossierModal } from './components/common/RecruiterDossierModal';

export const AppContent: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black relative transition-colors duration-300">
      {/* Recruiter Fast-Scan Dossier Modal */}
      <RecruiterDossierModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenRecruiterDossier={() => setIsRecruiterModalOpen(true)}
      />

      {/* Streamlined Top Navbar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenRecruiterDossier={() => setIsRecruiterModalOpen(true)}
      />

      {/* Main Content Sections: 01 About -> 02 Systems -> 03 Capabilities -> 04 Experience -> 05 Contact */}
      <main className="flex-1">
        <HeroSection onOpenRecruiterDossier={() => setIsRecruiterModalOpen(true)} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Bottom Technical Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
