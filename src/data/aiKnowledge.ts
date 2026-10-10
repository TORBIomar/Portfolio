import { PERSONAL_INFO, PROJECTS_DATA } from "./portfolioData";

export interface ChatAction {
  label: string;
  type: "link" | "project" | "contact" | "download" | "prompt";
  payload?: string;
  icon?: "external" | "download" | "mail" | "project" | "chat" | "github" | "linkedin" | "whatsapp";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export const INITIAL_SUGGESTIONS: string[] = [
  "💼 Are you available for hire / internship?",
  "🚀 Tell me about your flagship projects",
  "☁️ What OCI certifications do you hold?",
  "🛠️ What is your backend & DevOps tech stack?",
  "📄 Can I download your CV / Resume?",
  "📞 How can I contact or hire Omar?",
];

// Rich grounded system prompt for LLM integrations (Gemini, etc.)
export const SYSTEM_PORTFOLIO_PROMPT = `
You are the interactive AI Twin and Assistant of Omar Torbi.
Your role is to represent Omar Torbi to recruiters, engineering managers, clients, and fellow developers visiting his engineering portfolio.
Be confident, articulate, engineering-focused, warm, and concise.

ABOUT OMAR TORBI:
- Full Name: Omar Torbi
- Roles: Software & DevOps Engineer | Final-Year Computer Science & Networks (DDSI) Student at EMSI Rabat, Morocco.
- Key Value: Building production-grade, modular backend systems with Spring Boot 3, and reproducible containerized cloud systems with Docker, Linux, and Oracle Cloud Infrastructure (OCI).
- Certifications:
  1. OCI DevOps Professional (1Z0-1109-26) - Oracle Cloud Infrastructure
  2. OCI Architect Professional (1Z0-997-26) - Oracle Cloud Infrastructure
  3. Java SE 17 Developer (1Z0-829) - Oracle Certified Professional
- Availability: Available for End-of-Studies (PFE) Internship starting February 2027, as well as Full-Time Software / DevOps roles. Open to Rabat, Casablanca, hybrid configurations, or remote internationally.
- Contact:
  - Email: torbi.dev@outlook.com
  - WhatsApp: +212 612892619 (https://wa.me/212612892619)
  - GitHub: https://github.com/TORBIomar
  - LinkedIn: https://www.linkedin.com/in/omar-torbi-b8340933a/
  - English Resume: /OMAR-TORBI-RESUME-EN.pdf
  - French CV: /OMAR-TORBI-CV-FR.pdf
- Education: State Engineering Degree in Computer Science and Networks (DDSI), EMSI Rabat (2022 - Present, Class of 2027).

PROJECTS:
1. Zahiri Metal — Web CAD Studio:
   - 3D parametric CAD for industrial metal tubes and fiber laser cutting.
   - Built with React, Three.js, OpenCascade.js WebAssembly, Web Workers for 60 FPS, ISO-6983 G-code generator.
   - Live URL: https://zahiri-metal-3d-cad.vercel.app/ | GitHub: https://github.com/TORBIomar/3D-CAD-LASER-CUTTING
2. Elevate — Enterprise Recruitment:
   - Full-stack recruitment platform with strict RBAC, stateless JWT, Spring Boot 3, MySQL 8.0, eliminating N+1 queries.
   - GitHub: https://github.com/TORBIomar/Elevate
3. Sofia — Intelligent Library Platform:
   - AI document platform with semantic search and summarization using ChromaDB (vector cosine similarity) + Google Gemini API + Spring Boot.
   - GitHub: https://github.com/TORBIomar/Virtual-Library
4. Creator Outreach Matrix:
   - Autonomous lead generation and cold outreach pipeline with anti-bot Playwright scraping (4x speedup by aborting media assets), n8n workflow engine, Zoho Mail API, and local LLM reply classification.
   - GitHub: https://github.com/TORBIomar/creator-outreach-matrix

EXPERIENCES:
- Zahiri Metal (Summer 2026, 2 months): Full-Stack & 3D Software Developer Intern (React, Three.js, OpenCascade.js Wasm).
- ONSSA - National Office for Food Safety (Summer 2025, 1 month): Software Engineering Intern (ACID schema design, logistics workflows, specifications).
- EMSI Rabat (2022 - Present): 5-year engineering curriculum.

CORE TECH STACK:
- Java 17/21, Spring Boot 3, Spring Security, JPA/Hibernate, REST APIs
- Docker (multi-stage Alpine builds), Linux (server administration, systemd), Oracle Cloud (OCI)
- TypeScript, React 19, Next.js, Three.js, WebAssembly
- MySQL 8.0, PostgreSQL, Oracle DB (PL/SQL), ChromaDB Vector RAG
- Python 3 (Playwright), n8n event automation, Google Gemini API

GUIDELINES:
- Keep answers concise, high-signal, and easy to read. Use bullet points when listing details.
- Always offer helpful next steps (e.g. inviting them to download his resume, explore a specific project, or reach out via email/WhatsApp).
- If asked in French or Arabic, respond politely in that language.
`;

export interface QueryResult {
  text: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

// Local deterministic & semantic response generator (always available offline/without API key)
export function getLocalAiResponse(query: string): QueryResult {
  const q = query.toLowerCase().trim();

  // 1. Greetings
  if (
    /^(hi|hello|hey|salut|bonjour|salam|coucou|hola|greetings|good\s*(morning|afternoon|evening)|yo)/i.test(
      q
    )
  ) {
    return {
      text: `Hello! 👋 I'm **Omar Torbi's AI Assistant**.

I can answer any questions about Omar's:
• **Backend & DevOps Engineering expertise** (Spring Boot 3, Docker, Linux, OCI)
• **Dual Oracle Cloud Certifications** (DevOps & Architect Professional)
• **Flagship Projects** (Zahiri 3D CAD, Elevate RBAC, Sofia AI RAG, Outreach Matrix)
• **Availability** for PFE internships (Feb 2027) & full-time engineering roles.

How can I help you today?`,
      suggestions: [
        "💼 Are you available for hire / internship?",
        "🚀 Tell me about your flagship projects",
        "☁️ What OCI certifications do you hold?",
        "📄 Download Resume / CV",
      ],
      actions: [
        {
          label: "View Projects",
          type: "link",
          payload: "#projects",
          icon: "project",
        },
        {
          label: "Download English Resume",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
      ],
    };
  }

  // 2. Availability / Hiring / Jobs / Internships
  if (
    q.includes("availab") ||
    q.includes("hire") ||
    q.includes("hiring") ||
    q.includes("internship") ||
    q.includes("pfe") ||
    q.includes("stage") ||
    q.includes("job") ||
    q.includes("work with") ||
    q.includes("opportunity") ||
    q.includes("relocat")
  ) {
    return {
      text: `🎯 **Hiring & Availability Status**:

• **End-of-Studies (PFE) Internship**: Available starting **February 2027** (minimum 4 to 6 months).
• **Full-Time Roles**: Open to **Software Engineer**, **DevOps Engineer**, and **Backend/Cloud Systems Engineer** positions.
• **Location Flexibility**:
  - Based in **Rabat / Casablanca, Morocco**.
  - Open to on-site, hybrid, and full remote opportunities internationally.
• **Status**: Moroccan citizen with immediate work authorization.

Would you like to schedule a call or review his complete credentials?`,
      suggestions: [
        "📄 Download English Resume",
        "📄 Download French CV",
        "📞 How can I contact Omar directly?",
        "🛠️ What is your core tech stack?",
      ],
      actions: [
        {
          label: "Email Omar",
          type: "contact",
          payload: `mailto:${PERSONAL_INFO.email}`,
          icon: "mail",
        },
        {
          label: "WhatsApp Chat",
          type: "link",
          payload: PERSONAL_INFO.whatsappUrl,
          icon: "whatsapp",
        },
        {
          label: "Download English Resume (PDF)",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
      ],
    };
  }

  // 3. Certifications / OCI / Oracle
  if (
    q.includes("certif") ||
    q.includes("oci") ||
    q.includes("oracle") ||
    q.includes("badge") ||
    q.includes("1z0") ||
    q.includes("architect") ||
    q.includes("credentials")
  ) {
    return {
      text: `🏆 **Omar holds 3 verified Oracle Professional Certifications**:

1. **OCI DevOps Professional** (\`1Z0-1109-26\`)
   • Oracle Cloud Infrastructure CI/CD pipelines, container instances, Artifact Registry, OKE Kubernetes, and automated deployment architectures.

2. **OCI Architect Professional** (\`1Z0-997-26\`)
   • Enterprise cloud architecture, high availability (HA), fault domains, VCN peering, IAM policies, and disaster recovery design.

3. **Java SE 17 Developer** (\`1Z0-829\`)
   • Oracle Certified Professional covering modern Java features, concurrency, streams, JVM memory model, and object-oriented architecture.`,
      suggestions: [
        "🛠️ Tell me about your backend stack",
        "🚀 What projects demonstrate your DevOps skills?",
        "📄 Download Resume with Credentials",
      ],
      actions: [
        {
          label: "LinkedIn Certification Proof",
          type: "link",
          payload: PERSONAL_INFO.linkedin,
          icon: "linkedin",
        },
        {
          label: "Download Resume (PDF)",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
      ],
    };
  }

  // 4. Specific Projects: Zahiri Metal CAD
  if (
    q.includes("zahiri") ||
    q.includes("cad") ||
    q.includes("laser") ||
    q.includes("opencascade") ||
    q.includes("three.js") ||
    q.includes("3d") ||
    q.includes("g-code") ||
    q.includes("wasm") ||
    q.includes("webassembly")
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === "zahiri-metal-cad");
    return {
      text: `📐 **Zahiri Metal — Web CAD Studio**:

An industrial production platform for parametric 3D metal tube modeling and fiber laser cutting preparation.

**Key Technical Highlights**:
• **CAD Engine**: OpenCascade.js compiled to **WebAssembly** for true BREP geometry manipulation.
• **High Performance**: Offloaded solid CSG Boolean subtractions and tube unrolling to background **Web Workers**, sustaining an uninterrupted **60 FPS WebGL** viewport.
• **CNC Automation**: Generates ISO-6983 4-axis **G-code** with rotary A-axis interpolation and STEP export directly compatible with Tube Pro CNC machines.
• **Tech Stack**: React, Three.js, OpenCascade.js, WebAssembly, TypeScript, Tailwind CSS, Spring Boot.`,
      suggestions: [
        "🚀 Tell me about Elevate recruitment project",
        "🔍 Tell me about Sofia AI library platform",
        "🛠️ What is your backend architecture?",
      ],
      actions: [
        {
          label: "Launch 3D CAD Live Demo",
          type: "link",
          payload: proj?.liveUrl || "https://zahiri-metal-3d-cad.vercel.app/",
          icon: "external",
        },
        {
          label: "View CAD GitHub Repo",
          type: "link",
          payload: proj?.githubUrl || "https://github.com/TORBIomar/3D-CAD-LASER-CUTTING",
          icon: "github",
        },
      ],
    };
  }

  // 5. Elevate Project
  if (
    q.includes("elevate") ||
    q.includes("recruit") ||
    q.includes("rbac") ||
    q.includes("jwt") ||
    q.includes("spring security")
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === "elevate-recruitment");
    return {
      text: `💼 **Elevate — Enterprise Recruitment Ecosystem**:

A full-stack hiring pipeline platform connecting recruiters, candidates, and job lifecycles with strict governance.

**Key Technical Highlights**:
• **Security & RBAC**: Stateless JWT authentication with granular Spring Security Role-Based Access Control isolating recruiter workflows from candidate submissions.
• **Database Optimization**: Engineered relational schemas on MySQL 8.0 with JPA fetch joins and composite indexes, completely eliminating N+1 query bottlenecks.
• **Architecture**: SOLID domain services with clean DTO projections to prevent data leakage and minimize over-the-wire payloads.
• **Tech Stack**: Spring Boot 3, Spring Security, React, TypeScript, MySQL, JPA/Hibernate.`,
      suggestions: [
        "🔍 Tell me about the Sofia AI RAG platform",
        "🤖 Tell me about Creator Outreach Matrix",
        "📄 Download Resume",
      ],
      actions: [
        {
          label: "View Elevate on GitHub",
          type: "link",
          payload: proj?.githubUrl || "https://github.com/TORBIomar/Elevate",
          icon: "github",
        },
      ],
    };
  }

  // 6. Sofia Library / AI RAG
  if (
    q.includes("sofia") ||
    q.includes("library") ||
    q.includes("rag") ||
    q.includes("chromadb") ||
    q.includes("gemini") ||
    q.includes("vector") ||
    q.includes("embeddings")
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === "sofia-library");
    return {
      text: `📚 **Sofia — Intelligent AI Library Platform**:

A full-stack digital knowledge platform featuring dense vector retrieval and grounded generative summarization.

**Key Technical Highlights**:
• **Vector RAG Pipeline**: Ingests and chunks documents asynchronously, calculates high-dimensional embeddings, and indexes them in **ChromaDB** using HNSW cosine distance for sub-100ms similarity lookups.
• **Grounded AI**: Synthesizes top-K retrieved document excerpts with the **Google Gemini API** to generate grounded summaries with direct source citation, preventing hallucinations.
• **Tech Stack**: Spring Boot, React, ChromaDB, Google Gemini API, MySQL, REST APIs, Tailwind CSS.`,
      suggestions: [
        "🤖 Tell me about Creator Outreach Matrix",
        "📐 Tell me about Zahiri Metal CAD",
        "🛠️ What other AI tools do you work with?",
      ],
      actions: [
        {
          label: "View Sofia on GitHub",
          type: "link",
          payload: proj?.githubUrl || "https://github.com/TORBIomar/Virtual-Library",
          icon: "github",
        },
      ],
    };
  }

  // 7. Creator Outreach Matrix / Automation
  if (
    q.includes("creator") ||
    q.includes("outreach") ||
    q.includes("scrap") ||
    q.includes("playwright") ||
    q.includes("n8n") ||
    q.includes("bot") ||
    q.includes("matrix")
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === "creator-outreach-matrix");
    return {
      text: `🤖 **Creator Outreach Matrix — Autonomous Scraping & Outreach Engine**:

An end-to-end influencer acquisition pipeline engineered for high-throughput, evasive data extraction and event-driven dispatch.

**Key Technical Highlights**:
• **Evasive Scraping**: Built with Python & Playwright running stealth browser contexts with disabled automation flags and jitter sleep routines.
• **4x Speedup**: Implemented network route abortion to intercept and drop heavy video/image streams, drastically reducing CPU and RAM footprint.
• **Event Orchestration**: n8n workflow engine connected to verified webhooks, Zoho Mail API automated delivery, and real-time Telegram bot alerts.
• **Inbound AI**: Integrates local LLM intent classification (Qwen/Hermes) to evaluate replies and draft contextual responses.`,
      suggestions: [
        "🚀 Tell me about other flagship projects",
        "☁️ What are your DevOps credentials?",
        "📞 Contact Omar",
      ],
      actions: [
        {
          label: "View Matrix on GitHub",
          type: "link",
          payload: proj?.githubUrl || "https://github.com/TORBIomar/creator-outreach-matrix",
          icon: "github",
        },
      ],
    };
  }

  // 8. General Projects Query
  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("portfolio items")
  ) {
    return {
      text: `🚀 **Omar's 4 Flagship Engineering Projects**:

1. **Zahiri Metal — Web CAD Studio**
   • Industrial 3D tube modeling & CNC laser G-code preparation using Three.js & OpenCascade.js WebAssembly (60 FPS WebGL).
2. **Elevate — Enterprise Recruitment**
   • Full-stack corporate recruitment with granular Spring Security RBAC, stateless JWT, and MySQL 8.0.
3. **Sofia — Intelligent Library Platform**
   • Vector RAG discovery system combining Spring Boot, ChromaDB embeddings, and Google Gemini API.
4. **Creator Outreach Matrix**
   • Anti-bot Playwright scraping (4x speedup with route abortion), n8n workflow automations & local LLM classification.

Which project would you like to explore deeper?`,
      suggestions: [
        "📐 Zahiri Metal 3D CAD details",
        "💼 Elevate Recruitment details",
        "📚 Sofia AI Library details",
        "🤖 Creator Outreach Matrix details",
      ],
      actions: [
        {
          label: "Explore Projects Section",
          type: "link",
          payload: "#projects",
          icon: "project",
        },
        {
          label: "View GitHub Profile",
          type: "link",
          payload: PERSONAL_INFO.github,
          icon: "github",
        },
      ],
    };
  }

  // 9. Tech Stack / Skills
  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("skill") ||
    q.includes("java") ||
    q.includes("spring") ||
    q.includes("docker") ||
    q.includes("linux") ||
    q.includes("react") ||
    q.includes("database") ||
    q.includes("sql")
  ) {
    return {
      text: `🛠️ **Omar Torbi's Technical Stack**:

• **Backend Core**: Java 17/21, Spring Boot 3, Spring Security, JPA/Hibernate, RESTful APIs, Clean Architecture.
• **Cloud & Infrastructure**: Oracle Cloud (OCI Certified DevOps & Architect), Docker (multi-stage Alpine builds), Linux server administration (systemd, bash).
• **Databases & Vector**: PostgreSQL, MySQL 8.0, Oracle PL/SQL (ACID modeling, indexes, fetch joins), ChromaDB (Vector RAG).
• **Frontend & Graphics**: React 19, Next.js (App Router), TypeScript, Three.js, WebAssembly (OpenCascade.js), Tailwind CSS.
• **Automation & AI**: Python 3 (Playwright), n8n workflow engine, Google Gemini API, Local LLMs (Ollama).`,
      suggestions: [
        "☁️ Tell me about your OCI certifications",
        "💼 Are you available for hire / internship?",
        "📄 Download Resume (PDF)",
      ],
      actions: [
        {
          label: "View Architecture Pillars",
          type: "link",
          payload: "#about",
          icon: "project",
        },
        {
          label: "Download English Resume",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
      ],
    };
  }

  // 10. Education / School / EMSI
  if (
    q.includes("education") ||
    q.includes("school") ||
    q.includes("university") ||
    q.includes("emsi") ||
    q.includes("degree") ||
    q.includes("diploma") ||
    q.includes("student")
  ) {
    return {
      text: `🎓 **Academic Background**:

• **Degree**: State Engineering Degree in Computer Science and Networks (*Diplôme d'Ingénieur d'État en Ingénierie Informatique et Réseaux - DDSI*).
• **Institution**: **EMSI Rabat** (École Marocaine des Sciences de l'Ingénieur), Morocco.
• **Period**: 2022 — Present (**Final Year Student**, Class of 2027).
• **Key Focus**: Software architecture, enterprise Java, distributed systems, network security, cloud infrastructures, and algorithm design.`,
      suggestions: [
        "💼 Availability for End-of-Studies PFE Internship",
        "☁️ Oracle Certifications held",
        "📄 Download Resume / CV",
      ],
      actions: [
        {
          label: "Download English Resume",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
        {
          label: "Download French CV",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlFr,
          icon: "download",
        },
      ],
    };
  }

  // 11. Experiences / Internships
  if (
    q.includes("experience") ||
    q.includes("background") ||
    q.includes("onssa") ||
    q.includes("past work") ||
    q.includes("career")
  ) {
    return {
      text: `💼 **Professional Engineering Experience**:

1. **Zahiri Metal** (Summer 2026 — 2 Months)
   • *Full-Stack & 3D Software Developer Intern*
   • Architected industrial web CAD using React, Three.js, and OpenCascade.js Wasm.
   • Offloaded BREP geometry calculation to background Web Workers to maintain 60 FPS WebGL.
   • Built ISO-6983 G-code export routines for Tube Pro fiber laser CNC machines.

2. **National Office for Food Safety (ONSSA)** (Summer 2025 — 1 Month)
   • *Software Engineering Intern*
   • Analyzed operational workflows and structured relational database schemas with ACID consistency for public administrative digitization.`,
      suggestions: [
        "📐 More about Zahiri CAD project",
        "💼 Availability for 2027 PFE / Full-Time",
        "📄 Download Resume (PDF)",
      ],
      actions: [
        {
          label: "View Experiences Section",
          type: "link",
          payload: "#experiences",
          icon: "project",
        },
        {
          label: "Download Resume (PDF)",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
      ],
    };
  }

  // 12. Resume / CV Download
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("download") ||
    q.includes("pdf")
  ) {
    return {
      text: `📄 **Omar Torbi's Resumes & Credentials**:

You can download Omar's latest verified resumes directly below:

• **English Resume**: Updated with OCI DevOps & Architect certifications, flagship projects, and technical metrics.
• **French CV**: Formatted for European & Moroccan engineering requisitions.`,
      suggestions: [
        "💼 Are you available for hire / internship?",
        "📞 Contact Omar directly",
        "🚀 Explore flagship projects",
      ],
      actions: [
        {
          label: "Download English Resume (PDF)",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlEn,
          icon: "download",
        },
        {
          label: "Download French CV (PDF)",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlFr,
          icon: "download",
        },
      ],
    };
  }

  // 13. Contact / Socials / Reach Out
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("whatsapp") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("reach") ||
    q.includes("talk") ||
    q.includes("call")
  ) {
    return {
      text: `📬 **How to Connect with Omar Torbi**:

• **Direct Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
• **WhatsApp / Mobile**: [${PERSONAL_INFO.phone}](${PERSONAL_INFO.whatsappUrl})
• **LinkedIn**: [Omar Torbi on LinkedIn](${PERSONAL_INFO.linkedin})
• **GitHub**: [github.com/TORBIomar](${PERSONAL_INFO.github})
• **Location**: Rabat / Casablanca, Morocco (34.02° N, 6.84° W)

Feel free to reach out directly via WhatsApp or email, or drop a message via the portfolio contact form!`,
      suggestions: [
        "📄 Download English Resume",
        "💼 Availability for internships & jobs",
        "🚀 Tell me about your flagship projects",
      ],
      actions: [
        {
          label: "Send Email",
          type: "contact",
          payload: `mailto:${PERSONAL_INFO.email}`,
          icon: "mail",
        },
        {
          label: "WhatsApp Message",
          type: "link",
          payload: PERSONAL_INFO.whatsappUrl,
          icon: "whatsapp",
        },
        {
          label: "View LinkedIn Profile",
          type: "link",
          payload: PERSONAL_INFO.linkedin,
          icon: "linkedin",
        },
        {
          label: "Go to Contact Form",
          type: "link",
          payload: "#contact",
          icon: "chat",
        },
      ],
    };
  }

  // 14. French queries fallback
  if (
    q.includes("qui") ||
    q.includes("stage") ||
    q.includes("projet") ||
    q.includes("competence") ||
    q.includes("disponib")
  ) {
    return {
      text: `Bonjour ! 👋 Je suis l'assistant IA d'**Omar Torbi**.

Omar est élève ingénieur en dernière année à l'**EMSI Rabat (DDSI)** et certifié **Oracle Cloud (OCI DevOps & Architect Professional)**.

• **Disponibilité PFE** : Dès Février 2027 (stage de fin d'études de 4 à 6 mois).
• **Postes ciblés** : Ingénieur Logiciel / DevOps / Backend Java Spring Boot.
• **Projets phares** : Studio CAO 3D Zahiri (Three.js & Wasm), Elevate (Recrutement & RBAC), Sofia (Bibliothèque IA RAG), Creator Outreach Matrix.

Comment puis-je vous aider ?`,
      suggestions: [
        "📄 Télécharger le CV en Français",
        "💼 Disponibilité pour stage PFE 2027",
        "📞 Contacter Omar",
      ],
      actions: [
        {
          label: "Télécharger CV Français (PDF)",
          type: "download",
          payload: PERSONAL_INFO.resumeUrlFr,
          icon: "download",
        },
        {
          label: "Envoyer un Email",
          type: "contact",
          payload: `mailto:${PERSONAL_INFO.email}`,
          icon: "mail",
        },
      ],
    };
  }

  // 15. Smart fallback
  return {
    text: `I'm **Omar's AI Assistant**! While I specialize in discussing Omar's software engineering background, DevOps certifications, flagship projects, and hiring availability, here is what you might find most helpful:

• **Certified Cloud Architect & DevOps**: OCI DevOps Professional & OCI Architect Professional.
• **Enterprise Backend**: Production Spring Boot 3, secure RBAC microservices & relational optimization.
• **Availability**: Open for **End-of-Studies (PFE) Internship starting Feb 2027** and full-time Software / DevOps roles.

What would you like to explore?`,
    suggestions: [
      "💼 Are you available for hire / internship?",
      "🚀 Tell me about your flagship projects",
      "☁️ What OCI certifications do you hold?",
      "📄 Download English Resume",
      "📞 How can I contact Omar?",
    ],
    actions: [
      {
        label: "Download English Resume",
        type: "download",
        payload: PERSONAL_INFO.resumeUrlEn,
        icon: "download",
      },
      {
        label: "Contact Omar via Email",
        type: "contact",
        payload: `mailto:${PERSONAL_INFO.email}`,
        icon: "mail",
      },
    ],
  };
}
