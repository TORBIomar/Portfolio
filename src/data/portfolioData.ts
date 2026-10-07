export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "software" | "devops" | "ai-3d";
  categoryLabel: string;
  featured: boolean;
  summary: string;
  description: string;
  architecturalHighlights: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  architectureDetails: {
    overview: string;
    keyDecisions: string[];
    performanceBottlenecksResolved: string;
  };
  mockupType: "cad" | "recruitment" | "matrix" | "library";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export const PERSONAL_INFO = {
  name: "Omar Torbi",
  role: "Software & DevOps Engineer",
  titleDisplay: "Software & DevOps Engineer",
  institution: "EMSI Rabat",
  degree: "State Engineering Degree in Computer Science and Networks (DDSI)",
  tagline: "Final-year Computer Science & Networks (DDSI) student at EMSI Rabat. Certified OCI DevOps Professional & OCI Architect Professional. Building robust backend services with Spring Boot and containerized cloud systems with Docker, Linux, and OCI.",
  summary: "Software & DevOps Engineer and final-year engineering student at EMSI Rabat (DDSI). Certified Oracle Cloud Infrastructure (OCI) DevOps Professional and Architect Professional. Specializing in production-grade backend systems with Spring Boot, containerized cloud infrastructure with Docker and Linux, secure REST APIs, and automated workflow pipelines. Driven by modular architecture, clean code, and zero-defect delivery.",
  location: "Rabat / Casablanca, Morocco",
  coordinates: "34.02° N, 6.84° W",
  targetRoles: ["Software Engineer", "DevOps Engineer", "Backend & Cloud Engineer"],
  workAuthorization: "Moroccan Citizen — Available for End-of-Studies (PFE) Internship (Feb 2027) & Full-Time Software / DevOps Roles",
  email: "torbi.dev@outlook.com",
  phone: "+212 612892619",
  whatsappUrl: "https://wa.me/212612892619",
  github: "https://github.com/TORBIomar",
  linkedin: "https://www.linkedin.com/in/omar-torbi-b8340933a/",
  instagram: "https://www.instagram.com/omar.torbi",
  portfolioUrl: "https://www.omartorbi.engineer",
  resumeUrlEn: "/OMAR-TORBI-RESUME-EN.pdf",
  resumeUrlFr: "/OMAR-TORBI-CV-FR.pdf",
  education: "State Engineering Degree in Computer Science and Networks (DDSI) — EMSI Rabat (2022 – Present)",
  certifications: [
    {
      name: "OCI DevOps Professional",
      code: "1Z0-1109-26",
      issuer: "Oracle Cloud Infrastructure",
      badge: "Professional Certified",
    },
    {
      name: "OCI Architect Professional",
      code: "1Z0-997-26",
      issuer: "Oracle Cloud Infrastructure",
      badge: "Architect Certified",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Professional" },
    { name: "English", level: "Fluent" },
  ],
  cliCommand: "curl -fsSL https://omartorbi.engineer/cli | sh",
  npmCommand: "npx omar-torbi",
};

export const FOUNDATION_PILLARS = [
  {
    number: "01",
    tag: "CONTROL",
    title: "Enterprise Backend Architecture",
    headline: "Modular, High-Cohesion Systems",
    description: "Spring Boot 3, modular RESTful APIs, strict role-based access control (RBAC), stateless JWT authentication, and clean code principles with zero architectural leaks.",
    bullets: ["Spring Boot 3 & Java 17/21", "Stateless JWT & Granular RBAC", "Clean Architecture & DTO Projections"],
  },
  {
    number: "02",
    tag: "GOVERNANCE",
    title: "Reproducible DevOps & Cloud",
    headline: "Hardened, Certified Infrastructure",
    description: "Certified Oracle Cloud Infrastructure (OCI DevOps & Architect Professional). Multi-stage Alpine Docker containers, hardened Linux server administration, and event-driven n8n webhook automation.",
    bullets: ["Multi-Stage Alpine Dockerfiles", "Linux Daemon & Systemd Ops", "OCI Cloud Networking & Compute"],
  },
  {
    number: "03",
    tag: "VALUE",
    title: "Persistence & Browser 3D",
    headline: "Sub-10ms Queries & 60 FPS WebGL",
    description: "ACID relational schema design with MySQL, PostgreSQL, and Oracle PL/SQL. High-performance browser CAD with WebAssembly, Three.js, and Gemini RAG vector search.",
    bullets: ["PostgreSQL, MySQL 8 & Oracle PL/SQL", "Three.js & OpenCascade.js Wasm", "ChromaDB & Gemini Vector RAG"],
  },
];

export const STACK_MODELS = [
  { name: "Spring Boot 3", type: "Backend Framework", badge: "Enterprise" },
  { name: "Docker", type: "Containerization", badge: "Multi-Stage" },
  { name: "Linux", type: "OS & Server Admin", badge: "Hardened" },
  { name: "Oracle Cloud (OCI)", type: "Cloud Infrastructure", badge: "Dual Certified" },
  { name: "React 19 & Next.js", type: "Frontend Engineering", badge: "App Router" },
  { name: "TypeScript", type: "Strict Type Safety", badge: "v5.x" },
  { name: "PostgreSQL", type: "Relational ACID DB", badge: "Indexed" },
  { name: "MySQL 8.0", type: "Enterprise Persistence", badge: "Normalized" },
  { name: "ChromaDB & RAG", type: "Vector Embeddings", badge: "HNSW Cosine" },
  { name: "Google Gemini API", type: "Generative AI", badge: "Grounded" },
  { name: "Three.js & Wasm", type: "3D CAD Graphics", badge: "60 FPS" },
  { name: "Python 3", type: "Scraping & Automation", badge: "Playwright" },
  { name: "n8n Engine", type: "Event Pipelines", badge: "Webhooks" },
  { name: "Git & GitFlow", type: "Version Control", badge: "Branch CI" },
];

// Curated to the 4 most important flagship projects
export const PROJECTS_DATA: Project[] = [
  {
    id: "zahiri-metal-cad",
    title: "Zahiri Metal — Web CAD Studio",
    subtitle: "Parametric 3D Industrial Tube Design & CNC Laser Preparation",
    category: "ai-3d",
    categoryLabel: "3D & WebAssembly",
    featured: true,
    summary: "Production-focused web CAD platform for industrial metal tube modeling, CSG Boolean operations, and Trumpf/Bystronic CNC fiber laser cutting preparation using Three.js and OpenCascade.js WebAssembly.",
    description: "Architected for industrial metal manufacturing operations. Enables operators to interactively model parametric metal tubes and sheet profiles in 3D, inspect cutting geometry, perform model validation, and export compliant STEP/G-Code files for CNC laser cutting machines.",
    architecturalHighlights: [
      "Engineered an industrial parametric 3D CAD engine using React, Three.js, and OpenCascade.js WebAssembly",
      "Implemented real-time CSG Boolean solid subtractions for round, square, and rectangular tube profiles",
      "Offloaded heavy BREP geometry calculations to Web Workers to ensure an uninterruptible 60 FPS UI thread",
      "Developed ISO-6983 4-axis G-code generation with rotary A-axis interpolation and DIN 6935 unroll calculations"
    ],
    metrics: [
      { label: "CAD Kernel", value: "OpenCascade.js Wasm" },
      { label: "Framerate", value: "60 FPS WebGL" },
      { label: "Toolpath", value: "ISO-6983 G-code" },
      { label: "Concurrency", value: "Web Workers" },
    ],
    techStack: ["React", "Three.js", "OpenCascade.js", "WebAssembly", "TypeScript", "Tailwind CSS", "Spring Boot"],
    githubUrl: "https://github.com/TORBIomar/3D-CAD-LASER-CUTTING",
    liveUrl: "https://zahiri-metal-3d-cad.vercel.app/",
    architectureDetails: {
      overview: "Combines an OpenCascade.js WebAssembly geometry engine with Three.js rendering. Heavy boundary representation (BREP) calculations and STEP exports run in background Web Workers to maintain interactive framerates.",
      keyDecisions: [
        "Utilized OpenCascade.js compiled to Wasm for true industrial BREP geometry manipulation in the browser.",
        "Engineered direct STEP & G-code export pipeline formatted specifically for CNC laser machines.",
        "Built modular UI layers decoupling CAD canvas controls from parameter input panels."
      ],
      performanceBottlenecksResolved: "Avoided main thread rendering lockups by offloading complex geometric validation checks and unrolling calculations to background Web Workers."
    },
    mockupType: "cad",
  },
  {
    id: "elevate-recruitment",
    title: "Elevate — Enterprise Recruitment",
    subtitle: "Enterprise Recruitment Ecosystem & RBAC Workflow System",
    category: "software",
    categoryLabel: "Enterprise Backend",
    featured: true,
    summary: "Full-stack recruitment ecosystem connecting recruiters, candidates, job listings, and application pipelines with granular role-based access control and high-performance JPA queries.",
    description: "Architected for corporate hiring workflows. Provides dedicated portals for recruiters and candidates, dynamic requisition creation, multi-stage applicant evaluation pipelines, and real-time application tracking with strict role segregation and transactional consistency.",
    architecturalHighlights: [
      "Engineered an enterprise recruitment ecosystem connecting recruiters, candidates, and job lifecycles",
      "Implemented secure role-based access control (RBAC), stateless JWT authentication, and application tracking",
      "Designed modular REST APIs and relational data models for maintainable backend evolution",
      "Optimized database schema with targeted indexes and JPA fetch joins to eliminate N+1 queries"
    ],
    metrics: [
      { label: "Backend Core", value: "Spring Boot 3" },
      { label: "Security", value: "RBAC + Stateless JWT" },
      { label: "Database", value: "MySQL 8.0" },
      { label: "Frontend", value: "React + TS" },
    ],
    techStack: ["Spring Boot 3", "Spring Security", "React", "TypeScript", "MySQL", "JPA/Hibernate", "REST APIs"],
    githubUrl: "https://github.com/TORBIomar/Elevate",
    architectureDetails: {
      overview: "Built upon SOLID principles and clean architecture. Spring Boot domain services govern candidate lifecycle transitions with strict transactional boundaries and audit logs.",
      keyDecisions: [
        "Implemented Role-Based Access Control (RBAC) guaranteeing strict data segregation between recruiters and applicants.",
        "Designed normalized relational schema with indexes optimized for multi-criteria candidate filtering.",
        "Employed DTO projections to prevent over-fetching and minimize payload size across clients."
      ],
      performanceBottlenecksResolved: "Eliminated N+1 query overhead in recruiter dashboard queries using optimized JPA fetch joins."
    },
    mockupType: "recruitment",
  },
  {
    id: "sofia-library",
    title: "Sofia — Intelligent Library Platform",
    subtitle: "AI-Powered Document Platform with Semantic Search & Summarization",
    category: "ai-3d",
    categoryLabel: "AI Vector RAG",
    featured: true,
    summary: "Full-stack AI digital library supporting document management, contextual semantic search, and AI-powered summarization using Spring Boot, React, ChromaDB, and Google Gemini API.",
    description: "Transforms traditional document archives into an intelligent discovery system. Features collaborative virtual study spaces, dense high-dimensional vector embeddings with ChromaDB, and Google Gemini API integration for contextual document query answering, chunking, and source-grounded summarization.",
    architecturalHighlights: [
      "Built a digital library supporting document management, semantic search, and AI-powered summarization",
      "Integrated Gemini API and ChromaDB to improve contextual retrieval and user-facing knowledge discovery",
      "Structured frontend and backend modules for clear separation of search, storage, and AI services",
      "Engineered secure token-based authentication and modular REST API endpoints in Spring Boot"
    ],
    metrics: [
      { label: "Backend Core", value: "Spring Boot" },
      { label: "Vector Search", value: "ChromaDB RAG" },
      { label: "AI Integration", value: "Gemini API" },
      { label: "Database", value: "MySQL" },
    ],
    techStack: ["Spring Boot", "React", "Gemini API", "ChromaDB", "MySQL", "REST APIs", "Tailwind CSS"],
    githubUrl: "https://github.com/TORBIomar/Virtual-Library",
    architectureDetails: {
      overview: "Layered backend architecture separating relational document metadata (MySQL) from high-dimensional vector embeddings (ChromaDB), coordinated with Google Gemini API for generative context synthesis and dense semantic retrieval.",
      keyDecisions: [
        "Integrated ChromaDB for sub-100ms semantic similarity search across ingested document chunks using cosine distance.",
        "Used Gemini API to synthesize grounded summaries with source attribution, eliminating hallucinations.",
        "Applied Spring Boot dependency injection and modular service interfaces for easy AI model interchangeability."
      ],
      performanceBottlenecksResolved: "Asynchronous background document chunking and vector ingestion ensures zero upload latency for end users."
    },
    mockupType: "library",
  },
  {
    id: "creator-outreach-matrix",
    title: "Creator Outreach Matrix",
    subtitle: "Autonomous Evasive Scraper, n8n Orchestration & Cold Outreach Engine",
    category: "devops",
    categoryLabel: "DevOps & Automation",
    featured: true,
    summary: "End-to-end influencer acquisition pipeline featuring anti-bot Playwright scraping with media route abortion, n8n workflow automations, Zoho Mail API dispatch, and local LLM intent analysis.",
    description: "Engineered to automate lead generation and outreach at scale. Extracts verified micro-creators, bypasses bot detection with stealth browser contexts, pushes verified leads into n8n webhooks, sends automated branded emails via Zoho Mail API, and routes replies through local LLMs to alert Telegram in real time.",
    architecturalHighlights: [
      "Built an evasive Playwright scraper running headless Chrome with disabled automation flags and jitter sleep",
      "Implemented instant media route abortion (dropping video/image streams) achieving a 4x throughput boost",
      "Orchestrated event-driven outreach pipelines connecting webhooks, Zoho Mail API, and Telegram bot alerts via n8n",
      "Integrated local LLM intent classification (Qwen/Hermes) to evaluate replies and draft contextual responses"
    ],
    metrics: [
      { label: "Automation", value: "n8n Engine" },
      { label: "Scraping", value: "Playwright Evasive" },
      { label: "Throughput Boost", value: "4x Route Abortion" },
      { label: "Integration", value: "Zoho Mail + Telegram" },
    ],
    techStack: ["Python", "Playwright", "n8n", "Zoho Mail API", "Telegram Bot API", "Local LLM", "Docker"],
    githubUrl: "https://github.com/TORBIomar/creator-outreach-matrix",
    architectureDetails: {
      overview: "Decoupled three-tier architecture: Ingestion & anti-bot extraction layer (Playwright), workflow orchestration layer (n8n), and inbound intelligence loop (Zoho API + Local LLM + Telegram).",
      keyDecisions: [
        "Implemented fail-safe local JSONL persistence before external network dispatch to ensure zero lead loss.",
        "Employed route blocking on non-essential media assets for dramatic memory and CPU reduction.",
        "Structured modular webhook payloads for decoupled workflow maintenance."
      ],
      performanceBottlenecksResolved: "Overcame rate limits and bot challenges using persistent evasive profiles and exponential backoff retry policies."
    },
    mockupType: "matrix",
  },
];

export const EXPERIENCES_DATA = [
  {
    id: "zahiri",
    company: "ZAHIRI METAL",
    role: "Full-Stack & 3D Software Developer Intern",
    period: "Summer 2026 — 2 Months",
    location: "Morocco",
    highlights: [
      "Designed an industrial production-oriented web CAD platform for parametric metal tube modeling and fiber laser cutting preparation.",
      "Developed responsive interfaces and interactive 3D visualization modules using React, Three.js, and OpenCascade.js WebAssembly.",
      "Implemented geometry processing, model validation, and STEP export workflows to ensure direct compatibility with Tube Pro CNC software.",
      "Offloaded heavy BREP geometry calculations to background Web Workers, guaranteeing an uninterrupted 60 FPS UI experience."
    ],
    metrics: [
      { label: "Framerate", value: "60 FPS WebGL" },
      { label: "CAD Engine", value: "OpenCascade.js Wasm" },
      { label: "Toolpath", value: "ISO-6983 G-code" },
    ],
    tech: ["React", "Three.js", "OpenCascade.js", "WebAssembly", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "onssa",
    company: "National Office for Food Safety (ONSSA)",
    role: "Software Engineering Intern",
    period: "Summer 2025 — 1 Month",
    location: "Morocco",
    highlights: [
      "Analyzed internal information systems and identified structural improvements to digitalize administrative workflows.",
      "Collaborated with technical teams to translate operational requirements into actionable software specifications.",
      "Documented functional requirements, data flows, and implementation priorities for maintainable internal tools.",
      "Structured relational data schemas and audit trails to track logistical movements and asset allocation with ACID consistency."
    ],
    metrics: [
      { label: "Agency", value: "ONSSA Public Org" },
      { label: "Integrity", value: "ACID Transactions" },
      { label: "Domain", value: "Logistics Automation" },
    ],
    tech: ["Software Architecture", "MySQL", "PHP / Spring Boot", "Relational Modeling", "Agile Specs"],
  },
  {
    id: "emsi",
    company: "EMSI Rabat (DDSI)",
    role: "State Engineering Degree in Computer Science and Networks",
    period: "2022 — Present (Final Year)",
    location: "Rabat, Morocco",
    highlights: [
      "Rigorous engineering coursework covering software design principles: OOP, MVC, SOLID, modular architectures, and enterprise patterns.",
      "Comprehensive coursework across enterprise Java (Spring Boot), web engineering (React, TypeScript), C/C++, and database management (Oracle, PostgreSQL, MySQL).",
      "Achieved dual professional certifications: OCI DevOps Professional (1Z0-1109-26) and OCI Architect Professional (1Z0-997-26)."
    ],
    metrics: [
      { label: "Curriculum", value: "5-Year State Degree" },
      { label: "Credentials", value: "Dual OCI Certified" },
      { label: "Timeline", value: "Class of 2027" },
    ],
    tech: ["Java", "Spring Boot", "Docker", "Linux", "OCI Cloud", "PostgreSQL", "React", "TypeScript"],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    tag: "AVAILABILITY",
    question: "When are you available for internships or software engineering positions?",
    answer: "I am available for an End-of-Studies (PFE) Internship starting in February 2027, as well as full-time Software and DevOps Engineering roles. I am open to positions in Rabat, Casablanca, hybrid configurations, or remote collaborations across Morocco and internationally.",
  },
  {
    id: "faq-2",
    tag: "BACKEND & DATA",
    question: "What is your core backend and database engineering architecture?",
    answer: "My primary backend ecosystem is Java 17/21 with Spring Boot 3, complemented by Python (Playwright/FastAPI) and PHP (Laravel). I design stateless RESTful microservices, enforce strict JWT authentication and Spring Security RBAC, and maintain data integrity across PostgreSQL, MySQL 8.0, and Oracle DB (PL/SQL), using JPA fetch joins and indexing to eliminate N+1 bottlenecks.",
  },
  {
    id: "faq-3",
    tag: "AI & VECTOR RAG",
    question: "How do you build and optimize AI Vector RAG retrieval pipelines?",
    answer: "I engineer contextual RAG pipelines by chunking ingested documents asynchronously, calculating dense mathematical vector embeddings, and indexing them in ChromaDB using the Hierarchical Navigable Small World (HNSW) cosine metric for sub-100ms similarity lookups. Top-K retrieved passages are synthesized with the Google Gemini API with direct citation attribution, eliminating hallucinations.",
  },
  {
    id: "faq-4",
    tag: "DEVOPS & CLOUD",
    question: "How do you handle containerization, systems deployment, and quality?",
    answer: "All services are packaged using multi-stage Docker builds isolating minimal Alpine JRE/Python runtimes to minimize attack surfaces and image footprints. As a certified OCI DevOps and Architect Professional (1Z0-1109-26 & 1Z0-997-26), I architect resilient cloud workloads, automated GitFlow pipelines, and event-driven webhook routines with n8n.",
  },
  {
    id: "faq-5",
    tag: "3D CAD & WASM",
    question: "What was your architectural approach for the Zahiri Metal 3D CAD engine?",
    answer: "I combined OpenCascade.js compiled to WebAssembly with Three.js WebGL rendering. To prevent the UI thread from freezing during complex solid CSG Boolean operations (tube holes, mitre cuts, and perimeter unroll calculations), heavy boundary representation calculations were offloaded to background Web Workers, maintaining an uninterrupted 60 FPS interactive framerate.",
  },
];
