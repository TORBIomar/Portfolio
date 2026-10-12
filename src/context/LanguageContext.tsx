"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { sound } from "@/utils/sound";

export type Language = "en" | "fr";

export interface Translations {
  nav: {
    about: string;
    experiences: string;
    projects: string;
    faq: string;
    contact: string;
    resume: string;
    resumeEn: string;
    resumeFr: string;
  };
  hero: {
    tag: string;
    title: string;
    tagline: string;
    contactCta: string;
    projectsCta: string;
    terminalTabArchitecture: string;
    terminalTabCertifications: string;
    terminalTabPfe: string;
    copyCli: string;
    copiedCli: string;
    availabilityBadge: string;
  };
  experiences: {
    tag: string;
    title: string;
    subtitle: string;
  };
  projects: {
    tag: string;
    title: string;
    subtitle: string;
    all: string;
    software: string;
    devops: string;
    ai3d: string;
    viewDetails: string;
    liveDemo: string;
    githubRepo: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
  };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    sendMessage: string;
    sentSuccess: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  chat: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    reset: string;
    close: string;
    inquiryTopics: string;
    welcomeMsg: string;
    resetMsg: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      experiences: "Experiences",
      projects: "Projects",
      faq: "FAQ",
      contact: "Reach Out",
      resume: "Resume",
      resumeEn: "Resume (English PDF)",
      resumeFr: "CV (Français PDF)",
    },
    hero: {
      tag: "ABOUT ME & PHILOSOPHY",
      title: "Software & DevOps Engineer",
      tagline:
        "Final-year Computer Science & Networks (DDSI) student at EMSI Rabat. Certified OCI DevOps Professional & OCI Architect Professional. Building robust backend services with Spring Boot and containerized cloud systems with Docker, Linux, and OCI.",
      contactCta: "Contact Omar",
      projectsCta: "Explore Projects",
      terminalTabArchitecture: "01 Architecture",
      terminalTabCertifications: "02 OCI Credentials",
      terminalTabPfe: "03 2027 PFE Availability",
      copyCli: "Copy CLI Command",
      copiedCli: "Copied to Clipboard",
      availabilityBadge: "Open to PFE Internship (Feb 2027) & Full-Time Roles",
    },
    experiences: {
      tag: "TRACK RECORD",
      title: "Engineering Experience",
      subtitle:
        "Industrial software engineering internships and rigorous academic milestones in distributed systems.",
    },
    projects: {
      tag: "SYSTEMS ARCHITECTURE",
      title: "Flagship Engineering Projects",
      subtitle:
        "Modular backend architectures, 3D parametric CAD engines, and event-driven automation pipelines.",
      all: "All Systems",
      software: "Backend & Systems",
      devops: "Cloud & DevOps",
      ai3d: "3D Graphics & AI",
      viewDetails: "Architectural Deep Dive",
      liveDemo: "Launch Live Demo",
      githubRepo: "View Source Code",
    },
    faq: {
      tag: "SPECIFICATIONS",
      title: "Technical Inquiries & FAQ",
      subtitle:
        "Direct architectural answers regarding backend engineering, OCI certifications, and internship availability.",
    },
    contact: {
      tag: "DIRECT CHANNEL",
      title: "Get in Touch",
      subtitle:
        "Available for End-of-Studies (PFE) Internship starting February 2027 and Full-Time Software / DevOps roles.",
      sendMessage: "Transmit Message",
      sentSuccess: "Message transmitted successfully.",
      namePlaceholder: "Your full name or organization",
      emailPlaceholder: "your.email@domain.com",
      messagePlaceholder: "Describe your project or engineering opportunity...",
    },
    chat: {
      title: "Maro",
      subtitle: "Omar Torbi • Technical Copilot",
      placeholder: "Ask about Omar's backend, OCI cloud, or projects...",
      send: "Send",
      reset: "Reset conversation",
      close: "Close assistant (Esc)",
      inquiryTopics: "Inquiry Topics",
      welcomeMsg:
        "Hello! I'm **Maro**, Omar's personal AI assistant and engineering copilot.\n\nAsk me anything about Omar's backend engineering (Spring Boot 3, REST APIs), DevOps & OCI Cloud infrastructure, 3D Web CAD (Three.js/Wasm), or his availability for internships and engineering roles.",
      resetMsg:
        "Conversation reset. What would you like to explore about Omar's engineering work?",
    },
  },
  fr: {
    nav: {
      about: "À Propos",
      experiences: "Expériences",
      projects: "Projets",
      faq: "FAQ",
      contact: "Contact",
      resume: "Curriculum Vitae",
      resumeEn: "Resume (Anglais PDF)",
      resumeFr: "CV (Français PDF)",
    },
    hero: {
      tag: "À PROPOS & PHILOSOPHIE",
      title: "Ingénieur Logiciel & DevOps",
      tagline:
        "Élève-Ingénieur en dernière année à l'EMSI Rabat (DDSI). Doublement certifié Oracle Cloud (OCI DevOps & Architect Professional). Conception d'architectures backend modulaires avec Spring Boot et d'infrastructures cloud conteneurisées avec Docker, Linux et OCI.",
      contactCta: "Contacter Omar",
      projectsCta: "Explorer les Projets",
      terminalTabArchitecture: "01 Architecture",
      terminalTabCertifications: "02 Certifications OCI",
      terminalTabPfe: "03 Disponibilité PFE 2027",
      copyCli: "Copier la Commande CLI",
      copiedCli: "Copié dans le presse-papier",
      availabilityBadge: "Disponible pour Stage PFE (Fév 2027) & Postes CDI",
    },
    experiences: {
      tag: "PARCOURS TECHNIQUE",
      title: "Expériences en Ingénierie",
      subtitle:
        "Stages en ingénierie logicielle et cursus académique d'excellence en systèmes distribués.",
    },
    projects: {
      tag: "ARCHITECTURE SYSTÈMES",
      title: "Projets d'Ingénierie Phares",
      subtitle:
        "Architectures backend modulaires, moteurs de CAO 3D paramétrique et pipelines d'automatisation.",
      all: "Tous les Systèmes",
      software: "Backend & Systèmes",
      devops: "Cloud & DevOps",
      ai3d: "Graphismes 3D & IA",
      viewDetails: "Analyse Architecturale",
      liveDemo: "Lancer la Démo Live",
      githubRepo: "Consulter le Code Source",
    },
    faq: {
      tag: "SPÉCIFICATIONS",
      title: "Questions Techniques & FAQ",
      subtitle:
        "Réponses directes concernant l'architecture backend, les certifications OCI et la disponibilité de stage.",
    },
    contact: {
      tag: "CANAL DIRECT",
      title: "Entrer en Contact",
      subtitle:
        "Disponible pour un stage de fin d'études (PFE) dès Février 2027 et pour des opportunités en CDI.",
      sendMessage: "Envoyer le Message",
      sentSuccess: "Message transmis avec succès.",
      namePlaceholder: "Votre nom ou organisation",
      emailPlaceholder: "votre.email@domaine.com",
      messagePlaceholder: "Décrivez votre projet ou opportunité technique...",
    },
    chat: {
      title: "Maro",
      subtitle: "Omar Torbi • Copilote Technique",
      placeholder: "Posez vos questions sur le backend, le cloud OCI ou les projets...",
      send: "Envoyer",
      reset: "Réinitialiser la conversation",
      close: "Fermer l'assistant (Échap)",
      inquiryTopics: "Sujets d'Échange",
      welcomeMsg:
        "Bonjour ! Je suis **Maro**, l'assistant IA et copilote technique d'Omar Torbi.\n\nPosez-moi vos questions sur l'architecture backend d'Omar (Spring Boot 3, APIs REST), son infrastructure Cloud OCI & DevOps, sa CAO 3D Web (Three.js/Wasm), ou sa disponibilité pour les stages PFE et postes d'ingénieur.",
      resetMsg:
        "Conversation réinitialisée. Que souhaitez-vous découvrir sur le parcours d'Omar ?",
    },
  },
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t: TRANSLATIONS.en,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("omartorbi-lang") as Language | null;
    if (saved === "en" || saved === "fr") {
      setLanguageState(saved);
    } else {
      // Check browser language
      const browserLang =
        typeof window !== "undefined" && navigator.language
          ? navigator.language.toLowerCase()
          : "en";
      if (browserLang.startsWith("fr")) {
        setLanguageState("fr");
      } else {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    sound.playClick();
    setLanguageState(lang);
    localStorage.setItem("omartorbi-lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "fr" : "en";
    setLanguage(nextLang);
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        t,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
