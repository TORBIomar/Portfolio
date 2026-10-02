import { Project, SkillCategory, ExperienceItem } from '../types/portfolio';

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  badgeUrl?: string;
  verificationUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Omar Torbi",
  role: "Software & DevOps Engineer",
  titleDisplay: "Software & DevOps Engineer",
  tagline: "Final-year Computer Science & Networks (DDSI) student at EMSI Rabat. Certified OCI DevOps Professional & OCI Architect Professional. Building robust backend services with Spring Boot and containerized cloud systems with Docker, Linux, and OCI.",
  summary: "Software & DevOps Engineer and final-year engineering student at EMSI Rabat (DDSI). Certified Oracle Cloud Infrastructure (OCI) DevOps Professional and Architect Professional. Specializing in production-grade backend systems with Spring Boot, containerized cloud infrastructure with Docker and Linux, secure REST APIs, and automated workflow pipelines. Driven by modular architecture, clean code, and zero-defect delivery.",
  location: "Rabat / Casablanca, Morocco",
  targetRoles: ["Software Engineer", "DevOps Engineer", "Backend & Cloud Engineer"],
  workAuthorization: "Moroccan Citizen — Available for End-of-Studies (PFE) Internship (Feb 2027) & Full-Time Software / DevOps Roles",
  email: "torbi.dev@outlook.com",
  phone: "+212 612892619",
  whatsappUrl: "https://wa.me/212612892619",
  github: "https://github.com/TORBIomar",
  linkedin: "https://www.linkedin.com/in/omar-torbi-b8340933a/",
  instagram: "https://www.instagram.com/omar.torbi",
  portfolioUrl: "https://www.omartorbi.engineer",
  resumeUrl: "/OMAR-TORBI-RESUME-EN.pdf",
  resumeUrlEn: "/OMAR-TORBI-RESUME-EN.pdf",
  resumeUrlFr: "/OMAR-TORBI-CV-FR.pdf",
  education: "State Engineering Degree in Computer Science and Networks (DDSI) — EMSI Rabat (2022 – Present)",
  spokenLanguages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Professional" },
    { name: "English", level: "Fluent" }
  ],
  certifications: [
    {
      name: "OCI DevOps Professional",
      code: "1Z0-1109-26",
      issuer: "Oracle Cloud Infrastructure"
    },
    {
      name: "OCI Architect Professional",
      code: "1Z0-997-26",
      issuer: "Oracle Cloud Infrastructure"
    }
  ],
  interests: ["DevOps & Cloud Systems", "Spring Boot & Microservices", "Containerization & Linux", "System Design & Architecture"],
  coreStrengths: ["System Architecture Design", "Containerization & Linux Ops", "API Security & RBAC", "Clean Code & Refactoring", "Rapid Technical Adaptability"]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "elevate-recruitment",
    title: "Elevate — Recruitment Platform",
    subtitle: "Enterprise Recruitment Ecosystem & RBAC Workflow System",
    category: "software-engineering",
    featured: true,
    summary: "Full-stack recruitment ecosystem connecting recruiters, candidates, job listings, and application pipelines with granular role-based access control, built with Spring Boot, React, and MySQL.",
    description: "Architected for corporate hiring workflows. Provides dedicated portals for recruiters and candidates, dynamic requisition creation, multi-stage applicant evaluation pipelines, and real-time application tracking with strict role segregation and transactional consistency.",
    architecturalHighlights: [
      "Engineered an enterprise recruitment ecosystem connecting recruiters, candidates, and job lifecycles",
      "Implemented secure role-based access control (RBAC), stateless JWT authentication, and application tracking",
      "Designed modular REST APIs and relational data models for maintainable backend evolution",
      "Optimized database schema with targeted indexes and JPA fetch joins to eliminate N+1 queries"
    ],
    metrics: [
      { label: "Backend Core", value: "Spring Boot 3" },
      { label: "Security", value: "RBAC + JWT" },
      { label: "Database", value: "MySQL 8.0" },
      { label: "Frontend", value: "React + TS" }
    ],
    techStack: ["Spring Boot 3", "Spring Security", "React", "TypeScript", "MySQL", "JPA/Hibernate", "REST APIs", "Tailwind CSS"],
    githubUrl: "https://github.com/TORBIomar/Elevate",
    architectureDetails: {
      overview: "Built upon SOLID principles and clean architecture. Spring Boot domain services govern candidate lifecycle transitions with strict transactional boundaries and audit logs.",
      keyDecisions: [
        "Implemented Role-Based Access Control (RBAC) guaranteeing strict data segregation between recruiters and applicants.",
        "Designed normalized relational schema with indexes optimized for multi-criteria candidate filtering.",
        "Employed DTO projections to prevent over-fetching and minimize payload size across clients."
      ],
      performanceBottlenecksResolved: "Eliminated N+1 query overhead in recruiter dashboard queries using optimized JPA fetch joins."
    }
  },
  {
    id: "creator-outreach-matrix",
    title: "Creator Outreach Matrix",
    subtitle: "Autonomous Evasive Scraper, n8n Orchestration & Cold Outreach Engine",
    category: "devops-automation",
    featured: true,
    summary: "End-to-end influencer acquisition pipeline. Features anti-bot Playwright scraping with media route abortion, n8n workflow automations, Zoho Mail API dispatch, and local LLM intent analysis.",
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
      { label: "Integration", value: "Zoho Mail + Telegram" }
    ],
    techStack: ["Python", "Playwright", "n8n", "Zoho Mail API", "Telegram Bot API", "Local LLM", "Docker", "JSONL"],
    githubUrl: "https://github.com/TORBIomar/creator-outreach-matrix",
    architectureDetails: {
      overview: "Decoupled three-tier architecture: Ingestion & anti-bot extraction layer (Playwright), workflow orchestration layer (n8n), and inbound intelligence loop (Zoho API + Local LLM + Telegram).",
      keyDecisions: [
        "Implemented fail-safe local JSONL persistence before external network dispatch to ensure zero lead loss.",
        "Employed route blocking on non-essential media assets for dramatic memory and CPU reduction.",
        "Structured modular webhook payloads for decoupled workflow maintenance."
      ],
      performanceBottlenecksResolved: "Overcame rate limits and bot challenges using persistent evasive profiles and exponential backoff retry policies."
    }
  },
  {
    id: "intelligent-library",
    title: "Sofia — Intelligent Library Platform",
    subtitle: "AI-Powered Document Platform with Semantic Search & Summarization",
    category: "software-engineering",
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
      { label: "Database", value: "MySQL" }
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
    }
  },
  {
    id: "web-cad-laser-cutting",
    title: "Zahiri Metal — Web CAD Platform",
    subtitle: "Parametric 3D Industrial Tube Design & CNC Laser Preparation",
    category: "software-engineering",
    featured: true,
    summary: "Production-focused web CAD platform for industrial metal tube design and fiber laser cutting preparation. Combines React, Three.js, and OpenCascade.js WebAssembly for 3D model validation and Tube Pro STEP CNC export.",
    description: "Architected for industrial metal manufacturing operations. Enables operators to interactively model parametric metal tubes and sheet profiles in 3D, inspect cutting geometry, perform model validation, and export compliant STEP files for CNC laser cutting machine compatibility.",
    architecturalHighlights: [
      "Architected a production-oriented web CAD platform for industrial tube design and manufacturing preparation",
      "Developed responsive interfaces and interactive 3D visualization modules with React, Three.js, and OpenCascade.js",
      "Implemented geometry processing, model validation, and STEP export workflows for CNC manufacturing compatibility",
      "Offloaded heavy BREP geometry calculations to Web Workers to ensure an uninterruptible 60 FPS UI thread"
    ],
    metrics: [
      { label: "CAD Kernel", value: "OpenCascade.js Wasm" },
      { label: "Framerate", value: "60 FPS WebGL" },
      { label: "Export Format", value: "STEP 3D CNC" },
      { label: "Concurrency", value: "Web Workers" }
    ],
    techStack: ["React", "Three.js", "OpenCascade.js", "WebAssembly", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/TORBIomar/3D-CAD-LASER-CUTTING",
    liveUrl: "https://zahiri-metal-3d-cad.vercel.app/",
    architectureDetails: {
      overview: "Combines an OpenCascade.js WebAssembly geometry engine with Three.js rendering. Heavy boundary representation (BREP) calculations and STEP exports run in background Web Workers to maintain interactive framerates.",
      keyDecisions: [
        "Utilized OpenCascade.js compiled to Wasm for true industrial BREP geometry manipulation in the browser.",
        "Engineered direct STEP export pipeline formatted specifically for CNC laser machines.",
        "Built modular UI layers decoupling CAD canvas controls from parameter input panels."
      ],
      performanceBottlenecksResolved: "Avoided main thread rendering lockups by offloading complex geometric validation checks to Web Workers."
    }
  },
  {
    id: "true-shuffler",
    title: "True Shuffler — Algorithmic Spotify Client",
    subtitle: "Spotify API Integration with Fair Randomization Algorithms",
    category: "software-engineering",
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
      { label: "Capacity", value: "10,000+ Tracks" }
    ],
    techStack: ["JavaScript", "Spotify Web API", "OAuth 2.0", "REST APIs", "Algorithms"],
    githubUrl: "https://github.com/TORBIomar",
    architectureDetails: {
      overview: "Client-side data synchronization engine utilizing asynchronous chunked fetch requests against Spotify endpoints with in-memory cache eviction.",
      keyDecisions: [
        "Implemented Fisher-Yates unbiased randomization guaranteeing true uniform distribution across songs.",
        "Built chunked batch pagination with exponential backoff handling Spotify API rate limits.",
        "Cached authorization tokens with automated silent refresh loops."
      ],
      performanceBottlenecksResolved: "Handled Spotify rate limits (HTTP 429) using an adaptive jitter-based retry queue."
    }
  },
  {
    id: "onssa-stock-management",
    title: "ONSSA — Stock & Logistics Management Platform",
    subtitle: "Administrative Workflow Automation & Relational Inventory System",
    category: "software-engineering",
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
      { label: "Integrity", value: "ACID Transactions" }
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
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Systems",
    description: "Containerization, cloud infrastructure, Unix operating systems, and automated delivery pipelines.",
    iconName: "Cloud",
    skills: [
      { name: "Oracle Cloud (OCI)", proficiency: "Expert", experienceYears: 2, productionContext: "Certified OCI DevOps Professional & OCI Architect Professional; compute, networking, security", tags: ["OCI", "Cloud Architecture", "DevOps Certified", "Infrastructure"] },
      { name: "Docker", proficiency: "Expert", experienceYears: 2, productionContext: "Multi-stage Dockerfiles, minimal Alpine runtimes, containerized full-stack services, Docker Compose", tags: ["Docker", "Containers", "Docker Compose", "Multi-stage"] },
      { name: "Linux", proficiency: "Expert", experienceYears: 3, productionContext: "Unix server administration, shell scripting, process supervision, networking, security fundamentals", tags: ["Linux", "Bash", "CLI", "Server Admin"] },
      { name: "Git & GitHub", proficiency: "Expert", experienceYears: 4, productionContext: "Version control, GitFlow, branch protection, collaborative reviews, GitHub Actions", tags: ["Git", "GitHub", "Branching", "CI/CD"] },
      { name: "Automation & n8n", proficiency: "Expert", experienceYears: 2, productionContext: "Event-driven webhook pipelines, API integrations, automated email delivery, alert bots", tags: ["n8n", "Automation", "Webhooks", "Pipelines"] }
    ]
  },
  {
    id: "backend-systems",
    title: "Backend & Systems Engineering",
    description: "Enterprise backend frameworks, microservices, stateless security, and high-performance REST APIs.",
    iconName: "Cpu",
    skills: [
      { name: "Spring Boot", proficiency: "Expert", experienceYears: 3, productionContext: "Enterprise backend services, Spring Security, Spring Data JPA, Hibernate, dependency injection", tags: ["Spring Boot 3", "Spring Security", "JPA/Hibernate", "REST"] },
      { name: "REST API Design", proficiency: "Expert", experienceYears: 3, productionContext: "Idempotent HTTP semantics, DTO projections, JWT stateless authentication, OpenAPI specifications", tags: ["RESTful", "JWT Auth", "DTOs", "OpenAPI"] },
      { name: "Java", proficiency: "Expert", experienceYears: 3, productionContext: "Enterprise backend systems, multithreading, Streams API, OOP and clean architecture", tags: ["Java 17/21", "OOP", "Streams", "Concurrency"] },
      { name: "Python", proficiency: "Advanced", experienceYears: 2, productionContext: "Backend routines, automation, Playwright web scraping, data pipelines, Django & FastAPI", tags: ["Python 3", "Automation", "Playwright", "FastAPI"] },
      { name: "C / C++", proficiency: "Advanced", experienceYears: 2, productionContext: "Systems programming, memory management, pointers, algorithmic problem solving", tags: ["C++", "C", "Memory", "Algorithms"] },
      { name: "Laravel", proficiency: "Advanced", experienceYears: 2, productionContext: "PHP enterprise applications, Eloquent ORM, MVC routing, auth middleware", tags: ["Laravel", "PHP", "MVC", "Backend"] }
    ]
  },
  {
    id: "architecture-security",
    title: "Software Architecture & Security",
    description: "Design paradigms, clean architecture principles, and access control models.",
    iconName: "Box",
    skills: [
      { name: "OOP & SOLID", proficiency: "Expert", experienceYears: 3, productionContext: "Object-oriented design patterns, separation of concerns, SOLID principles, high cohesion", tags: ["OOP", "Design Patterns", "SOLID", "Clean Code"] },
      { name: "Modular Architecture", proficiency: "Expert", experienceYears: 3, productionContext: "Decoupled component boundaries, layered service tiers, maintainable evolution", tags: ["Modular", "Clean Code", "Decoupling"] },
      { name: "RBAC Security", proficiency: "Expert", experienceYears: 3, productionContext: "Role-based access control, permission hierarchies, token signing, secure routing", tags: ["Security", "Authorization", "Roles", "Permissions"] },
      { name: "System Design", proficiency: "Advanced", experienceYears: 2, productionContext: "Idempotent pipelines, rate limiting, caching strategies, audit logging, fault tolerance", tags: ["System Design", "Scalability", "Caching", "Reliability"] }
    ]
  },
  {
    id: "databases-data",
    title: "Databases & Vector Retrieval",
    description: "Relational persistence, enterprise schema design, SQL/PL-SQL optimization, and vector search.",
    iconName: "Layers",
    skills: [
      { name: "PostgreSQL", proficiency: "Advanced", experienceYears: 2, productionContext: "Relational persistence, ACID compliance, complex joins, indexing, query optimization", tags: ["PostgreSQL", "SQL", "Indexing", "ACID"] },
      { name: "Oracle DB & PL/SQL", proficiency: "Advanced", experienceYears: 2, productionContext: "Enterprise relational database modeling, stored procedures, packages, triggers", tags: ["Oracle DB", "PL/SQL", "Enterprise", "ACID"] },
      { name: "MySQL", proficiency: "Expert", experienceYears: 3, productionContext: "Normalized schema design, query plan analysis, B-Tree indexes, foreign key constraints", tags: ["MySQL 8", "Indexing", "Query Plan", "Transactions"] },
      { name: "MongoDB", proficiency: "Advanced", experienceYears: 2, productionContext: "NoSQL document collections, aggregation pipelines, schema flexibility", tags: ["MongoDB", "NoSQL", "BSON", "Aggregation"] },
      { name: "ChromaDB & RAG", proficiency: "Expert", experienceYears: 2, productionContext: "Dense vector database, HNSW cosine similarity, asynchronous document chunking, Gemini API", tags: ["ChromaDB", "Vector Search", "Gemini API", "RAG"] }
    ]
  },
  {
    id: "frontend-web",
    title: "Frontend & 3D Engineering",
    description: "Component-driven web applications, modern TypeScript, and browser-native 3D graphics.",
    iconName: "Layout",
    skills: [
      { name: "TypeScript", proficiency: "Expert", experienceYears: 3, productionContext: "Strict type safety, interfaces, generics, scalable frontend architecture", tags: ["TypeScript", "Type Safety", "Generics"] },
      { name: "React & Next.js", proficiency: "Expert", experienceYears: 3, productionContext: "Production SPAs, custom hooks, context management, component architecture", tags: ["React 18", "Next.js", "Hooks", "State"] },
      { name: "Three.js & Wasm", proficiency: "Advanced", experienceYears: 2, productionContext: "Interactive 3D WebGL rendering, OpenCascade.js CAD kernel, Web Workers geometry calculations", tags: ["Three.js", "WebGL", "Wasm", "OpenCascade"] },
      { name: "Tailwind CSS", proficiency: "Expert", experienceYears: 3, productionContext: "Custom design systems, dark/light token architecture, responsive utility styling", tags: ["Tailwind CSS", "Design Tokens", "Responsive"] }
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "exp-zahiri-metal",
    role: "Full-Stack & 3D Software Developer Intern",
    company: "ZAHIRI METAL",
    location: "Morocco",
    period: "Summer 2026 — 2 months",
    type: "Internship",
    summary: "Architected a production-oriented web CAD platform for industrial tube design and CNC fiber laser cutting preparation.",
    achievements: [
      "Designed a production-oriented web CAD platform for industrial tube design and fiber laser cutting preparation.",
      "Developed responsive interfaces and interactive 3D visualization modules using React, Three.js, and OpenCascade.js.",
      "Implemented geometry processing, model validation, and STEP export workflows to ensure direct compatibility with Tube Pro CNC software.",
      "Offloaded heavy BREP geometry calculations to Web Workers, guaranteeing an uninterrupted 60 FPS UI experience."
    ],
    metrics: [
      { label: "Wasm Engine", value: "C++ / OpenCascade" },
      { label: "Performance", value: "60 FPS WebGL" },
      { label: "Output Format", value: "STEP 3D CNC" },
      { label: "Machine Tool", value: "Tube Pro Compatible" }
    ],
    technologies: ["React", "TypeScript", "Three.js", "OpenCascade.js", "WebAssembly", "Web Workers", "Tailwind CSS"]
  },
  {
    id: "exp-onssa",
    role: "Software Engineering Intern",
    company: "National Office for Food Safety (ONSSA)",
    location: "Morocco",
    period: "Summer 2025 — 1 month",
    type: "Internship",
    summary: "Analyzed internal information systems and optimized administrative workflows and software specifications.",
    achievements: [
      "Analyzed internal information systems and identified concrete improvements to optimize administrative workflows.",
      "Collaborated with technical teams to translate operational requirements into actionable software specifications.",
      "Documented functional requirements, data flows, and implementation priorities for maintainable internal tools.",
      "Structured relational data schemas and audit trails to track logistical movements and asset allocation."
    ],
    metrics: [
      { label: "Agency", value: "ONSSA" },
      { label: "Focus", value: "Workflow Automation" },
      { label: "Deliverable", value: "Software Specs" },
      { label: "Architecture", value: "Information Systems" }
    ],
    technologies: ["Software Architecture", "Information Systems", "Data Modeling", "MySQL", "PHP / Spring Boot", "Agile Specs"]
  },
  {
    id: "exp-emsi-degree",
    role: "State Engineering Degree in Computer Science and Networks (DDSI)",
    company: "École Marocaine des Sciences de l'Ingénieur (EMSI)",
    location: "Rabat, Morocco",
    period: "2022 — Present",
    type: "Engineering Degree",
    summary: "Rigorous 5-year engineering curriculum covering software design, distributed architectures, algorithms, and cloud systems.",
    achievements: [
      "Mastery of software design principles: OOP, MVC, SOLID, modular architectures, and enterprise design patterns.",
      "Comprehensive coursework across enterprise Java (Spring Boot), web engineering (React, TypeScript), C/C++, and database management (Oracle, PostgreSQL, MySQL).",
      "Hands-on architectural delivery of production capstone platforms, containerized environments, and cloud infrastructure.",
      "Achieved dual professional certifications: OCI DevOps Professional (1Z0-1109-26) and OCI Architect Professional (1Z0-997-26)."
    ],
    metrics: [
      { label: "Program", value: "Computer Eng. (DDSI)" },
      { label: "Institution", value: "EMSI Rabat" },
      { label: "Certifications", value: "OCI DevOps & Architect" },
      { label: "Timeline", value: "2022 – Present" }
    ],
    technologies: ["Java", "Spring Boot", "Docker", "Linux", "Oracle Cloud (OCI)", "PostgreSQL", "React", "TypeScript"]
  }
];
