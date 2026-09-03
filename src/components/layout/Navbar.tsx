import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Instagram, Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Skills Matrix", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/80 shadow-md py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Terminal Identifier */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
          aria-label="Omar Torbi Portfolio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="font-mono text-sm tracking-tight font-bold text-foreground">
            <span>omar</span>
            <span className="text-accent">.torbi</span>
            <span className="text-muted-foreground font-normal text-xs ml-1.5 hidden sm:inline-block">/dev</span>
          </div>
        </a>

        {/* Live Availability Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-accent-border text-xs font-mono text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span>{PERSONAL_INFO.status}</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-md transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded-lg transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded-lg transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded-lg transition-all cursor-pointer"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-xs font-semibold hover:border-accent hover:text-accent transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent text-background font-mono text-xs font-bold hover:bg-accent-hover shadow-glow-sm transition-all cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted/50 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent-subtle border border-accent-border text-xs font-mono text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span>{PERSONAL_INFO.status}</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-mono text-foreground hover:bg-muted rounded-md cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-accent font-bold"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
