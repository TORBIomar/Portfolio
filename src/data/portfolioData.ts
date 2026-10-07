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
  mockupType: "cad" | "recruitment" | "matrix" | "library" | "spotify" | "inventory" | "desktop" | "checkers";
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
    headline: "Modular, Model-Independent Intelligence",
    description: "Spring Boot 3, modular RESTful APIs, strict role-based access control (RBAC), stateless JWT authentication, and clean code principles with zero architectural leaks.",
    bullets: ["Spring Boot 3 & Java 17/21", "Stateless JWT & Granular RBAC", "Clean Architecture & DTO Projections"],
  },
  {
    number: "02",
    tag: "GOVERNANCE",
    title: "Reproducible DevOps & Cloud",
    headline: "Certified, Hardened Infrastructure",
    description: "Certified Oracle Cloud Infrastructure (OCI DevOps & Architect Professional). Multi-stage Alpine Docker containers, hardened Linux server administration, and n8n webhook automation.",
    bullets: ["Multi-Stage Alpine Dockerfiles", "Linux Daemon & Systemd Ops", "OCI Cloud Networking & Compute"],
  },
  {
    number: "03",
    tag: "VALUE",
    title: "Persistence & Browser 3D",
    headline: "Deterministic Performance & Sub-10ms Queries",
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
  { name: "Oracle DB / PL-SQL", type: "Stored Procedures", badge: "Enterprise" },
  { name: "ChromaDB & RAG", type: "Vector Embeddings", badge: "HNSW Cosine" },
  { name: "Google Gemini API", type: "Generative AI", badge: "Grounded" },
  { name: "Three.js & Wasm", type: "3D CAD Graphics", badge: "60 FPS" },
  { name: "Python 3", type: "Scraping & Automation", badge: "Playwright" },
  { name: "n8n Engine", type: "Event Pipelines", badge: "Webhooks" },
  { name: "Git & GitFlow", type: "Version Control", badge: "Branch CI" },
  { name: "Tailwind CSS", type: "Design System", badge: "Responsive" },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "zahiri-metal-cad",
    title: "Zahiri Metal — Web CAD Studio",
    subtitle: "Parametric 3D Industrial Tube Design & CNC Laser Preparation",
    category: "ai-3d",
    categoryLabel: "3D & WebAssembly",
    featured: true,
    summary: "Production-focused web CAD platform for industrial metal tube modeling, CSG Boolean operations, and Trumpf/Bystronic CNC fiber laser cutting preparation.",
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
    summary: "Full-stack recruitment ecosystem connecting recruiters, candidates, job listings, and application pipelines with granular role-based access control.",
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
  {
    id: "true-shuffler",
    title: "True Shuffler — Algorithmic Spotify Client",
    subtitle: "Spotify API Integration with Fair Randomization Algorithms",
    category: "software",
    categoryLabel: "Algorithms & Web API",
    featured: false,
    summary: "Algorithmic music utility interacting directly with Spotify Web APIs, featuring fair Fisher-Yates randomization algorithms and rate-limited batch pagination for large playlists.",
    description: "Developed to solve the non-random bias in standard streaming shuffle algorithms. Connects to Spotify Web API via OAuth 2.0 PKCE, ingests extensive music libraries, and applies true Fisher-Yates randomization with chunked pagination for seamless playback queue generation.",
    architecturalHighlights: [
      "Developed a music playback utility interacting directly with Spotify APIs and user library data",
      "Programmed fair randomization algorithms and pagination logic for large playlists and music libraries",
      "Engineered secure OAuth 2.0 PKCE token refresh workflows and client-side caching",
      "Optimized asynchronous pagination to handle playlists exceeding 10,000+ tracks seamlessly"
    ],
    metrics: [
      { label: "API Ingress", value: "Spotify Web API" },
      { label: "Algorithm", value: "Fisher-Yates" },
      { label: "Auth Flow", value: "OAuth 2.0 PKCE" },
      { label: "Capacity", value: "10,000+ Tracks" },
    ],
    techStack: ["JavaScript", "Spotify Web API", "OAuth 2.0 PKCE", "REST APIs", "Algorithms"],
    githubUrl: "https://github.com/TORBIomar",
    architectureDetails: {
      overview: "Client-side data synchronization engine utilizing asynchronous chunked fetch requests against Spotify endpoints with in-memory cache eviction.",
      keyDecisions: [
        "Implemented Fisher-Yates unbiased randomization guaranteeing true uniform distribution across songs.",
        "Built chunked batch pagination with exponential backoff handling Spotify API rate limits.",
        "Cached authorization tokens with automated silent refresh loops."
      ],
      performanceBottlenecksResolved: "Handled Spotify rate limits (HTTP 429) using an adaptive jitter-based retry queue."
    },
    mockupType: "spotify",
  },
  {
    id: "onssa-stock-management",
    title: "ONSSA — Stock & Logistics Platform",
    subtitle: "Administrative Workflow Automation & Relational Inventory System",
    category: "software",
    categoryLabel: "Enterprise Logistics",
    featured: false,
    summary: "Enterprise inventory and asset management platform developed during internship at ONSSA. Streamlines internal stock tracking, supplies allocation, and administrative approval workflows.",
    description: "Engineered for the National Office for Food Safety (ONSSA) to digitalize and modernize regional administrative workflows. Centralizes asset allocations, office equipment tracking, inventory restock alerts, and automated requisition reporting with transactional consistency.",
    architecturalHighlights: [
      "Architected an internal inventory and supply management system to streamline ONSSA logistical operations",
      "Designed normalized relational schemas and database procedures for audit tracking and inventory movements",
      "Implemented automated stock threshold alerts, entry/exit logs, and administrative reporting dashboards",
      "Structured modular MVC architecture ensuring maintainability and reliable role-based operational permissions"
    ],
    metrics: [
      { label: "Organization", value: "ONSSA Division" },
      { label: "Architecture", value: "Modular MVC" },
      { label: "Database", value: "Relational SQL" },
      { label: "Integrity", value: "ACID Transactions" },
    ],
    techStack: ["PHP", "Spring Boot", "MySQL", "JavaScript", "Bootstrap", "REST APIs"],
    githubUrl: "https://github.com/TORBIomar/ONSSA-Stock-Management",
    architectureDetails: {
      overview: "Modular MVC backend architecture with relational persistence layer handling asset categorization, stock movements, and approval lifecycles.",
      keyDecisions: [
        "Implemented ACID-compliant transactions across inventory dispatches to eliminate stock count discrepancies.",
        "Designed normalized relational schema with foreign key constraints tracking historical entry and exit events.",
        "Built customizable report generation for administrative auditing and inventory reorder planning."
      ],
      performanceBottlenecksResolved: "Indexed inventory lookup tables to ensure immediate search response across multi-category asset catalogs."
    },
    mockupType: "inventory",
  },
  {
    id: "carpool-swing",
    title: "Carpool Swing — Desktop Transit System",
    subtitle: "Multithreaded Java Desktop App & Relational Fleet Reservation",
    category: "software",
    categoryLabel: "Java Systems",
    featured: false,
    summary: "Desktop vehicle dispatch and reservation application featuring concurrency controls, relational database integrity, and structured MVC architecture.",
    description: "Architected as a robust Java desktop platform for transit coordination. Features multi-user role segregation, concurrency locks on seat reservations, database persistence via JDBC, and a responsive Swing user interface.",
    architecturalHighlights: [
      "Implemented multithreaded reservation synchronization preventing double-booking race conditions",
      "Structured clean MVC separation between UI components, domain entities, and data access layers",
      "Designed normalized SQL tables with constraint enforcement and automated invoice generation",
      "Engineered desktop session management with role-based feature gating"
    ],
    metrics: [
      { label: "Platform", value: "Java Desktop" },
      { label: "GUI Toolkit", value: "Java Swing" },
      { label: "Persistence", value: "JDBC / MySQL" },
      { label: "Architecture", value: "Multithreaded MVC" },
    ],
    techStack: ["Java", "Swing", "JDBC", "MySQL", "Multithreading", "OOP"],
    githubUrl: "https://github.com/TORBIomar/Carpool-Swing",
    architectureDetails: {
      overview: "Desktop MVC application utilizing synchronized thread locks on transit capacity mutations to ensure race condition immunity.",
      keyDecisions: [
        "Used synchronized blocks on reservation controllers to guarantee thread-safe seat deductions.",
        "Normalized relational data schema with relational foreign keys enforcing vehicle availability.",
      ],
      performanceBottlenecksResolved: "Pre-compiled prepared statements for frequent seat lookup queries."
    },
    mockupType: "desktop",
  },
  {
    id: "javafx-checkers-ai",
    title: "JavaFX Checkers & Minimax AI",
    subtitle: "Game Theory Engine with Alpha-Beta Pruning & Interactive GUI",
    category: "ai-3d",
    categoryLabel: "Algorithms & AI",
    featured: false,
    summary: "Interactive checkers platform featuring an algorithmic AI player powered by Minimax game tree search with Alpha-Beta pruning, state evaluation heuristics, and JavaFX graphics.",
    description: "Designed to explore game theory and tree search optimization. Evaluates multi-depth board states in real-time, employs Alpha-Beta pruning to trim millions of redundant branches, and renders smooth board animations with JavaFX.",
    architecturalHighlights: [
      "Implemented Minimax game decision algorithm with recursive Alpha-Beta branch pruning",
      "Engineered board state evaluation heuristics scoring king balance, center control, and defensive edges",
      "Constructed custom event-driven JavaFX board UI with piece selection, valid move highlights, and capture validation",
      "Maintained sub-200ms AI turn computation times across deep search plies"
    ],
    metrics: [
      { label: "Algorithm", value: "Minimax + Alpha-Beta" },
      { label: "UI Framework", value: "JavaFX Graphics" },
      { label: "Move Time", value: "<200ms Search" },
      { label: "Language", value: "Java 17 OOP" },
    ],
    techStack: ["Java", "JavaFX", "Minimax Algorithm", "Alpha-Beta Pruning", "Game Theory"],
    githubUrl: "https://github.com/TORBIomar/JavaFX-Checkers",
    architectureDetails: {
      overview: "Recursive adversarial tree search algorithm running state valuations against positional weight matrices.",
      keyDecisions: [
        "Integrated Alpha-Beta pruning to cut game tree exploration by up to 70% without sacrificing optimality.",
        "Built positional weight matrices prioritizing board center domination and king promotion protection."
      ],
      performanceBottlenecksResolved: "Bitboard-inspired representation for ultra-fast valid move generation."
    },
    mockupType: "checkers",
  },
];

export const CONNECTORS_DATA = [
  { name: "GitHub", category: "Version Control", icon: "github" },
  { name: "Docker", category: "Containers", icon: "docker" },
  { name: "Linux", category: "Operating System", icon: "linux" },
  { name: "Oracle Cloud", category: "Cloud & OCI", icon: "cloud" },
  { name: "Spring Boot", category: "Backend Microservices", icon: "server" },
  { name: "React 19", category: "Component Framework", icon: "react" },
  { name: "Next.js", category: "App Router Web", icon: "next" },
  { name: "PostgreSQL", category: "ACID Database", icon: "database" },
  { name: "MySQL 8", category: "Relational DB", icon: "mysql" },
  { name: "Python", category: "Scripting & Automation", icon: "python" },
  { name: "n8n", category: "Workflow Automation", icon: "workflow" },
  { name: "Three.js", category: "3D WebGL", icon: "three" },
  { name: "Wasm", category: "WebAssembly", icon: "wasm" },
  { name: "TypeScript", category: "Strict Types", icon: "typescript" },
  { name: "Tailwind CSS", category: "Design System", icon: "tailwind" },
  { name: "Vercel", category: "Edge Deployment", icon: "vercel" },
];

export const ENDORSEMENTS_DATA = [
  {
    organization: "ZAHIRI METAL",
    role: "Industrial Engineering & CAD Lead",
    quote: "Architected the 3D tube CAD platform from scratch, resolving heavy boundary representation geometry in Web Workers to keep our laser cutting pipeline at a smooth 60 FPS.",
    author: "Technical Direction",
    badge: "Industrial Internship",
  },
  {
    organization: "EMSI RABAT",
    role: "Computer Science & Networks (DDSI)",
    quote: "Demonstrated exceptional mastery across enterprise Java architectures and cloud DevOps tracks, earning professional Oracle Cloud certifications concurrently.",
    author: "Academic Faculty",
    badge: "State Engineering Degree",
  },
  {
    organization: "ONSSA LOGISTICS",
    role: "Information Systems Division",
    quote: "Transformed internal administrative supply flows into structured relational models with strict ACID consistency and zero inventory count discrepancies.",
    author: "Logistics Systems Lead",
    badge: "Public Agency Internship",
  },
  {
    organization: "ORACLE UNIVERSITY",
    role: "Cloud Certification Registry",
    quote: "Certified OCI DevOps Professional & OCI Architect Professional with validated expertise in cloud-native deployment, containerization, virtual networking, and security governance.",
    author: "OCI Credential Verification",
    badge: "1Z0-1109-26 & 1Z0-997-26",
  },
];

export const INDUSTRIES_DATA = [
  {
    title: "Industrial CAD & Manufacturing",
    description: "Parametric 3D tube modeling, STEP / G-code generation, and Trumpf/Bystronic CNC fiber laser toolpath validation.",
  },
  {
    title: "Enterprise HR & Recruitment",
    description: "Strict role-based access control (RBAC), applicant lifecycle tracking, and query-optimized relational persistence.",
  },
  {
    title: "Regulatory & Logistics Compliance",
    description: "ACID transactional inventory dispatches, audit trails, and administrative approval workflows for public agencies.",
  },
  {
    title: "Autonomous Data Extraction",
    description: "Anti-bot evasion, media route abortion for 4x throughput, and event-driven webhook orchestration via n8n.",
  },
  {
    title: "AI Knowledge Retrieval & RAG",
    description: "ChromaDB dense vector embeddings, grounded generative summarization with Gemini, and sub-100ms similarity lookups.",
  },
  {
    title: "Cloud Infrastructure & DevOps",
    description: "Hardened Linux environments, multi-stage Alpine Docker containers, and certified Oracle Cloud Infrastructure design.",
  },
];

export const PROCESS_INFO_CARDS = [
  {
    number: "01",
    title: "My Process",
    subtitle: "Domain-Driven & Iterative",
    description: "Starting with rigorous functional specifications, normalized data schemas, and SOLID interfaces before writing production code. Every module is built for decoupled testability.",
  },
  {
    number: "02",
    title: "Performance",
    subtitle: "Zero-Defect & Sub-10ms Queries",
    description: "Database indexing, query execution plan analysis, and elimination of N+1 overhead with JPA fetch joins. Offloading heavy CAD math to background Web Workers.",
  },
  {
    number: "03",
    title: "Scalability",
    subtitle: "Containerized & Resilient",
    description: "Multi-stage Alpine Docker containers, stateless JWT authentication, idempotent REST semantics, and hardened Linux daemon management.",
  },
  {
    number: "04",
    title: "Aesthetics & UX",
    subtitle: "Editorial Polish & Precision",
    description: "Clean typography, structured grid rhythm, tactile micro-interactions, responsive adaptability, and thoughtful user-centric telemetry.",
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
      "Designed a production-oriented web CAD platform for industrial tube design and fiber laser cutting preparation.",
      "Developed responsive interfaces and interactive 3D visualization modules using React, Three.js, and OpenCascade.js.",
      "Implemented geometry processing, model validation, and STEP export workflows to ensure direct compatibility with Tube Pro CNC software.",
      "Offloaded heavy BREP geometry calculations to Web Workers, guaranteeing an uninterrupted 60 FPS UI experience."
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
      "Analyzed internal information systems and identified concrete improvements to optimize administrative workflows.",
      "Collaborated with technical teams to translate operational requirements into actionable software specifications.",
      "Documented functional requirements, data flows, and implementation priorities for maintainable internal tools.",
      "Structured relational data schemas and audit trails to track logistical movements and asset allocation."
    ],
    tech: ["Software Architecture", "MySQL", "PHP / Spring Boot", "Relational Modeling", "Agile Specs"],
  },
  {
    id: "emsi",
    company: "EMSI Rabat (DDSI)",
    role: "State Engineering Degree in Computer Science and Networks",
    period: "2022 — Present",
    location: "Rabat, Morocco",
    highlights: [
      "Mastery of software design principles: OOP, MVC, SOLID, modular architectures, and enterprise design patterns.",
      "Comprehensive coursework across enterprise Java (Spring Boot), web engineering (React, TypeScript), C/C++, and database management (Oracle, PostgreSQL, MySQL).",
      "Achieved dual professional certifications: OCI DevOps Professional (1Z0-1109-26) and OCI Architect Professional (1Z0-997-26)."
    ],
    tech: ["Java", "Spring Boot", "Docker", "Linux", "OCI Cloud", "PostgreSQL", "React", "TypeScript"],
  },
];
