import { Project, SkillCategory, ExperienceItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Omar Torbi",
  role: "Computer Engineering Student | Software Engineer",
  tagline: "Computer Engineering & Networks student at EMSI Rabat specializing in scalable backend architectures (Spring Boot), AI-powered vector discovery (Gemini & ChromaDB), relational/NoSQL data systems, and cloud DevOps.",
  summary: "Computer Engineering and Networks student with a strong software engineering profile across backend architectures, distributed systems, AI integrations, data engineering, and DevOps. Experienced in building scalable web platforms, secure REST APIs with Spring Boot, vector search RAG pipelines using ChromaDB and Google Gemini API, and containerized deployment workflows with Docker and Linux. Combines analytical problem-solving, modular architecture principles, and product-oriented execution to deliver reliable, high-throughput software solutions.",
  status: "Available for new opportunities",
  availabilityDetails: "Open to Software Engineering, Backend (Spring Boot), AI/Data, and DevOps Roles",
  location: "Rabat / Béni Mellal, Morocco",
  email: "torbi.dev@outlook.com",
  phone: "+212 612892619",
  github: "https://github.com/TORBIomar",
  linkedin: "https://www.linkedin.com/in/omar-torbi-b8340933a/",
  instagram: "https://www.instagram.com/omar.torbi",
  resumeUrl: "/CV-OMAR TORBI.pdf",
  education: "Engineering Degree in Computer Engineering and Networks (IIR) — École Marocaine des Sciences de l’Ingénieur (EMSI), Rabat (2022 – Present)",
  spokenLanguages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Professional" },
    { name: "English", level: "Professional" }
  ],
  interests: ["AI & Vector RAG", "Distributed Systems & Cloud", "Database Architecture", "DevOps & Reliability", "Fitness & Football"],
  coreStrengths: ["Problem Solving", "Cross-Functional Teamwork", "Fast Learning & Adaptability", "Agile Methodologies", "Technical Documentation"]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "intelligent-library",
    title: "Intelligent Library Platform",
    subtitle: "AI-Powered Document Platform with Semantic Search & Summarization",
    category: "ai-backend",
    featured: true,
    summary: "Full-stack AI digital library supporting document management, contextual semantic search, and AI-powered summarization using Spring Boot, React, ChromaDB, and Google Gemini API.",
    description: "Engineered to transform traditional document archives into an intelligent discovery system. Features collaborative virtual reading spaces, dense high-dimensional vector embeddings with ChromaDB, and Google Gemini API integration for contextual document query answering, chunking, and source-grounded summarization.",
    architecturalHighlights: [
      "Built a digital library supporting document management, semantic search, and AI-powered summarization",
      "Integrated Gemini API and ChromaDB to improve contextual retrieval and user-facing knowledge discovery",
      "Structured frontend and backend modules for clear separation of search, storage, and AI services",
      "Engineered secure token-based authentication and modular REST API endpoints in Spring Boot"
    ],
    metrics: [
      { label: "AI Integration", value: "Gemini API" },
      { label: "Vector Search", value: "ChromaDB RAG" },
      { label: "Backend Core", value: "Spring Boot" },
      { label: "Architecture", value: "Modular REST" }
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
    id: "elevate-recruitment",
    title: "Elevate — Recruitment Platform",
    subtitle: "Full-Stack Enterprise Applicant & Workflow Tracking Ecosystem",
    category: "backend-data",
    featured: true,
    summary: "Full-stack recruitment ecosystem connecting recruiters, candidates, job offers, and application workflows with role-based access control, built with Spring Boot, React, and MySQL.",
    description: "Designed for corporate hiring workflows. Provides dedicated portals for recruiters and candidates, dynamic requisition creation, multi-stage application pipelines, and real-time application tracking with strict role segregation.",
    architecturalHighlights: [
      "Engineered a recruitment ecosystem connecting recruiters, candidates, job offers, and application workflows",
      "Implemented secure role-based access control (RBAC), authentication, and real-time application tracking features",
      "Designed modular REST APIs and relational data models for maintainable backend evolution",
      "Optimized database schema with targeted indexing for instant applicant search and filtering"
    ],
    metrics: [
      { label: "Security Pattern", value: "RBAC + JWT" },
      { label: "Architecture", value: "Modular REST" },
      { label: "Database", value: "MySQL 8.0" },
      { label: "Frontend", value: "React + Tailwind" }
    ],
    techStack: ["Spring Boot", "React", "MySQL", "Tailwind CSS", "REST APIs", "TypeScript"],
    githubUrl: "https://github.com/TORBIomar/RecruitmentPlatform",
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
    id: "true-shuffler",
    title: "True Shuffler — Algorithmic Music Utility",
    subtitle: "Spotify API Integration with Fair Randomization Algorithms",
    category: "data-algorithms",
    featured: true,
    summary: "Algorithmic music utility interacting directly with Spotify Web APIs, featuring fair randomization algorithms and high-throughput pagination logic for large playlists.",
    description: "Developed to solve the non-random bias in standard streaming shuffle algorithms. Connects to the Spotify Web API via OAuth 2.0, ingests extensive music libraries, and applies true Fisher-Yates algorithmic randomization with pagination handling for zero-latency playback queue generation.",
    architecturalHighlights: [
      "Developed a music playback utility interacting directly with Spotify APIs and user library data",
      "Programmed fair randomization algorithms and pagination logic for large playlists and music libraries",
      "Engineered secure OAuth 2.0 token refresh workflows and client-side caching",
      "Optimized asynchronous pagination to handle playlists exceeding 10,000+ tracks seamlessly"
    ],
    metrics: [
      { label: "API Ingress", value: "Spotify Web API" },
      { label: "Algorithm", value: "Fisher-Yates" },
      { label: "Auth Flow", value: "OAuth 2.0 PKCE" },
      { label: "Payload Limit", value: "10,000+ Tracks" }
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
    title: "ONSSA — Inventory & Stock Management System",
    subtitle: "Internal Logistics, Inventory Tracking & Administrative Workflow System",
    category: "data-systems",
    featured: true,
    summary: "Enterprise inventory and asset management platform developed during software engineering internship at ONSSA. Streamlines internal stock tracking, supplies allocation, and administrative approval workflows.",
    description: "Engineered for the Office National de Sécurité Sanitaire des Produits Alimentaires (ONSSA) to digitalize and modernize regional administrative workflows. Centralizes asset allocations, office equipment tracking, inventory restock alerts, and automated requisition reporting with transactional consistency.",
    architecturalHighlights: [
      "Architected an internal inventory and supply management system to streamline ONSSA logistical operations",
      "Designed normalized relational schemas and database procedures for audit tracking and inventory movements",
      "Implemented automated stock threshold alerts, entry/exit logs, and administrative reporting dashboards",
      "Structured modular MVC architecture ensuring maintainability and reliable role-based operational permissions"
    ],
    metrics: [
      { label: "Deployment", value: "ONSSA Division" },
      { label: "Architecture", value: "Modular MVC" },
      { label: "Database", value: "Relational SQL" },
      { label: "Integrity", value: "ACID Transactions" }
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML5/CSS3", "REST APIs"],
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
  },
  {
    id: "web-cad-laser-cutting",
    title: "Web CAD Platform for Industrial Tube Design",
    subtitle: "High-Performance Wasm Geometry Engine & STEP Export Pipeline",
    category: "systems-frontend",
    featured: false,
    summary: "Production-focused web CAD platform for industrial parametric design. Combines React, Three.js, and OpenCascade.js WebAssembly for 3D model validation and STEP manufacturing export.",
    description: "Architected for industrial metal manufacturing operations. Enables operators to interactively model parametric metal tubes and sheet profiles in 3D, inspect cutting geometry, perform model validation, and export compliant STEP files for CNC laser cutting machine compatibility.",
    architecturalHighlights: [
      "Architected a production-focused web CAD platform for industrial tube design and manufacturing preparation",
      "Developed responsive interfaces and interactive 3D visualization modules with React, Three.js, and OpenCascade.js",
      "Implemented geometry processing, model validation, and STEP export workflows for CNC manufacturing compatibility",
      "Offloaded heavy BREP geometry calculations to Web Workers to ensure an uninterruptible 60 FPS UI thread"
    ],
    metrics: [
      { label: "CAD Kernel", value: "OpenCascade.js Wasm" },
      { label: "Rendering", value: "60 FPS WebGL" },
      { label: "Export Format", value: "STEP 3D CNC" },
      { label: "Thread Model", value: "Off-Thread Workers" }
    ],
    techStack: ["React", "Three.js", "OpenCascade.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/TORBIomar/3D-CAD-LASER-CUTTING",
    architectureDetails: {
      overview: "Combines an OpenCascade.js WebAssembly geometry engine with Three.js rendering. Heavy boundary representation (BREP) calculations and STEP exports run in background Web Workers to maintain interactive framerates.",
      keyDecisions: [
        "Utilized OpenCascade.js compiled to Wasm for true industrial BREP geometry manipulation in the browser.",
        "Engineered direct STEP export pipeline formatted specifically for CNC laser machines.",
        "Built modular UI layers decoupling CAD canvas controls from parameter input panels."
      ],
      performanceBottlenecksResolved: "Avoided main thread rendering lockups by offloading complex geometric validation checks to Web Workers."
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-data",
    title: "AI & Data Engineering",
    description: "Vector embeddings, RAG pipelines, generative AI models, and relational/document databases.",
    iconName: "Layers",
    skills: [
      { name: "Gemini API", proficiency: "Expert", experienceYears: 2, productionContext: "Contextual document discovery, RAG retrieval augmentation, prompt engineering", tags: ["Gemini API", "LLMs", "RAG", "Embeddings"] },
      { name: "ChromaDB", proficiency: "Expert", experienceYears: 2, productionContext: "Dense vector database, cosine similarity matching, semantic document retrieval", tags: ["ChromaDB", "Vector Search", "Embeddings", "HNSW"] },
      { name: "Semantic Search", proficiency: "Expert", experienceYears: 2, productionContext: "High-dimensional similarity indexing, document chunking, hybrid keyword retrieval", tags: ["Semantic Search", "Cosine Distance", "Vector Index"] },
      { name: "Oracle DB", proficiency: "Advanced", experienceYears: 2, productionContext: "Enterprise relational database administration, schema modeling, PL/SQL packages", tags: ["Oracle DB", "PL/SQL", "Enterprise", "ACID"] },
      { name: "PostgreSQL", proficiency: "Advanced", experienceYears: 2, productionContext: "Relational persistence, JSONB document fields, complex joins and indexes", tags: ["PostgreSQL", "SQL", "Indexing", "ACID"] },
      { name: "MySQL", proficiency: "Expert", experienceYears: 3, productionContext: "Normalized schema design, query plan optimization, indexing, foreign key constraints", tags: ["MySQL 8", "Indexing", "Query Plan", "Transactions"] },
      { name: "MongoDB", proficiency: "Advanced", experienceYears: 2, productionContext: "NoSQL document collections, aggregation pipelines, dynamic schemas", tags: ["MongoDB", "NoSQL", "BSON", "Aggregation"] },
      { name: "SQL & PL/SQL", proficiency: "Expert", experienceYears: 3, productionContext: "Complex relational queries, stored procedures, triggers, database normalization", tags: ["SQL", "PL/SQL", "Stored Procedures", "Triggers"] }
    ]
  },
  {
    id: "backend-cloud",
    title: "Backend & Cloud Services",
    description: "Enterprise frameworks, microservices, secure RESTful APIs, and cloud backends.",
    iconName: "Cpu",
    skills: [
      { name: "Spring Boot", proficiency: "Expert", experienceYears: 3, productionContext: "Enterprise backend microservices, Spring Security, Spring Data JPA, REST APIs", tags: ["Spring Boot 3", "Spring Security", "JPA/Hibernate", "REST"] },
      { name: "REST API Design", proficiency: "Expert", experienceYears: 3, productionContext: "Idempotent endpoints, HTTP semantics, DTO projections, Swagger OpenAPI", tags: ["RESTful", "JWT Auth", "DTOs", "OpenAPI"] },
      { name: "Laravel", proficiency: "Advanced", experienceYears: 2, productionContext: "PHP enterprise applications, Eloquent ORM, MVC routing, auth middleware", tags: ["Laravel", "Eloquent ORM", "MVC", "Auth"] },
      { name: "Django", proficiency: "Advanced", experienceYears: 2, productionContext: "Python web services, Django ORM, authentication, modular apps", tags: ["Django", "Python ORM", "Admin", "REST"] },
      { name: "Supabase & Firebase", proficiency: "Advanced", experienceYears: 2, productionContext: "Cloud authentication, realtime subscriptions, backend-as-a-service storage", tags: ["Supabase", "Firebase", "Realtime", "Auth"] }
    ]
  },
  {
    id: "devops-systems",
    title: "DevOps & Systems",
    description: "Containerization, Unix operating systems, version control, and cloud concepts.",
    iconName: "Cloud",
    skills: [
      { name: "Docker", proficiency: "Expert", experienceYears: 2, productionContext: "Containerization of full-stack services, multi-stage Dockerfiles, Docker Compose stacks", tags: ["Docker", "Containers", "Docker Compose", "Multi-stage"] },
      { name: "Linux", proficiency: "Expert", experienceYears: 3, productionContext: "Unix environment, bash scripting, server administration, process management, CLI tools", tags: ["Linux", "Bash", "CLI", "Server Admin"] },
      { name: "Git & GitHub", proficiency: "Expert", experienceYears: 4, productionContext: "Version control, GitFlow, branching strategies, collaborative PR reviews", tags: ["Git", "GitHub", "Branching", "Collaboration"] },
      { name: "Cloud Concepts", proficiency: "Advanced", experienceYears: 2, productionContext: "Container registries, managed compute, cloud storage, microservices architecture", tags: ["Cloud", "Container Registry", "Deployment", "Microservices"] }
    ]
  },
  {
    id: "programming",
    title: "Core Languages",
    description: "Enterprise Java, modern Python, systems C/C++, and full-stack TypeScript.",
    iconName: "Terminal",
    skills: [
      { name: "Java", proficiency: "Expert", experienceYears: 3, productionContext: "Enterprise backend systems, Spring Boot, OOP & clean architecture", tags: ["Java 17/21", "Multithreading", "Streams", "OOP"] },
      { name: "Python", proficiency: "Advanced", experienceYears: 2, productionContext: "Backend routines, automation, data manipulation, Django APIs", tags: ["Python 3", "Automation", "Data Scripts", "Django"] },
      { name: "TypeScript", proficiency: "Expert", experienceYears: 3, productionContext: "Strict type safety, modern React applications, generics, interfaces", tags: ["Type Safety", "Generics", "Interfaces"] },
      { name: "JavaScript", proficiency: "Expert", experienceYears: 4, productionContext: "Modern ES6+, asynchronous async/await, DOM APIs, Spotify API integration", tags: ["ESNext", "Promises", "Web APIs", "Async"] },
      { name: "C++", proficiency: "Advanced", experienceYears: 2, productionContext: "Object-oriented programming, data structures, algorithmic problem solving", tags: ["C++", "Memory Management", "Algorithms", "STL"] },
      { name: "C", proficiency: "Advanced", experienceYears: 2, productionContext: "Low-level systems programming, memory pointers, hardware fundamentals", tags: ["Pointers", "Memory", "Data Structures"] },
      { name: "PHP", proficiency: "Advanced", experienceYears: 2, productionContext: "Server-side web development, Laravel framework, MVC architecture", tags: ["PHP 8", "Laravel", "MVC", "Backend"] }
    ]
  },
  {
    id: "architecture",
    title: "Software Architecture",
    description: "Design paradigms, clean architecture, security models, and distributed principles.",
    iconName: "Box",
    skills: [
      { name: "OOP & SOLID", proficiency: "Expert", experienceYears: 3, productionContext: "Object-oriented design patterns, separation of concerns, SOLID principles", tags: ["OOP", "Design Patterns", "SOLID", "Inheritance"] },
      { name: "Modular Architecture", proficiency: "Expert", experienceYears: 3, productionContext: "Decoupled component layers, clean boundaries, maintainability", tags: ["Modular", "Clean Code", "Decoupling"] },
      { name: "RBAC Security", proficiency: "Expert", experienceYears: 3, productionContext: "Role-based access control, permission hierarchies, secure API routing", tags: ["Security", "Authorization", "Roles", "Permissions"] },
      { name: "Distributed Systems", proficiency: "Advanced", experienceYears: 2, productionContext: "Raft consensus, write-ahead logging, failover, quorum consistency", tags: ["Raft", "Consensus", "WAL", "Fault Tolerance"] }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Component-driven web interfaces, responsive layouts, and modern web standards.",
    iconName: "Layout",
    skills: [
      { name: "React", proficiency: "Expert", experienceYears: 3, productionContext: "Production SPAs, hooks, custom state management, component architecture", tags: ["React 18", "Hooks", "Context API", "State"] },
      { name: "Next.js", proficiency: "Advanced", experienceYears: 2, productionContext: "Server-side rendering, API routes, optimized static builds", tags: ["Next.js", "SSR", "App Router"] },
      { name: "Tailwind CSS", proficiency: "Expert", experienceYears: 3, productionContext: "Custom design systems, dark modes, token-based utility styling", tags: ["Design Tokens", "Dark Mode", "Utility-First"] },
      { name: "HTML5 & CSS3", proficiency: "Expert", experienceYears: 4, productionContext: "Semantic document structuring, modern web standards, accessibility", tags: ["Semantic HTML", "SEO", "Web Standards"] },
      { name: "Bootstrap", proficiency: "Advanced", experienceYears: 3, productionContext: "Rapid responsive grid prototyping, utility classes, components", tags: ["Bootstrap 5", "Grid System", "Responsive"] }
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "exp-industrial-cad",
    role: "Full-Stack Software Developer Intern",
    company: "Industrial Laser Solutions",
    location: "Morocco",
    period: "Summer 2026 — 2 months",
    type: "Full-time",
    summary: "Architected a production-focused web software platform for industrial parametric design and CNC machine preparation.",
    achievements: [
      "Architected a production-focused web platform for parametric industrial design and manufacturing preparation.",
      "Developed responsive interfaces, geometric validation modules, and WebAssembly integration with React and TypeScript.",
      "Implemented geometry processing, model validation, and STEP export workflows for CNC manufacturing compatibility.",
      "Offloaded complex geometric validation calculations to Web Workers to maintain interactive 60 FPS performance."
    ],
    metrics: [
      { label: "Wasm Engine", value: "C++ / OpenCascade" },
      { label: "Framerate", value: "60 FPS WebGL" },
      { label: "Integration", value: "CNC Machine Prep" },
      { label: "Output Format", value: "STEP 3D Export" }
    ],
    technologies: ["React", "TypeScript", "Web Workers", "WebAssembly", "Tailwind CSS"]
  },
  {
    id: "exp-onssa",
    role: "Software Engineering Intern",
    company: "Office National de Sécurité Sanitaire des Produits Alimentaires (ONSSA)",
    location: "Morocco",
    period: "Summer 2025 — 1 month",
    type: "Full-time",
    summary: "Analyzed internal information systems to improve workflow efficiency and software specifications.",
    achievements: [
      "Analyzed internal information systems and identified improvements for administrative workflow efficiency.",
      "Collaborated with technical teams to translate operational requirements into actionable software specifications.",
      "Documented functional needs, data flows, and implementation priorities for maintainable internal tools."
    ],
    metrics: [
      { label: "Focus", value: "Workflow Efficiency" },
      { label: "Specifications", value: "Software Specs" },
      { label: "Agency", value: "ONSSA" },
      { label: "Documentation", value: "Data Flows" }
    ],
    technologies: ["Software Architecture", "Information Systems", "Data Flows", "Specifications", "Process Optimization"]
  },
  {
    id: "exp-emsi-degree",
    role: "Engineering Degree in Computer Engineering and Networks (IIR)",
    company: "École Marocaine des Sciences de l’Ingénieur (EMSI)",
    location: "Rabat, Morocco",
    period: "2022 — Present",
    type: "Leadership",
    summary: "Rigorous academic curriculum covering advanced software engineering, distributed systems, algorithms, web technologies, and database architecture.",
    achievements: [
      "Mastery of software design principles (OOP, MVC, SOLID, modular architectures, and design patterns).",
      "Comprehensive coursework across enterprise Java (Spring Boot), web engineering (React, TypeScript), C/C++, and database management (Oracle, MySQL).",
      "Hands-on architectural delivery of production capstone projects including AI vector discovery platforms and distributed cluster engines."
    ],
    metrics: [
      { label: "Program", value: "Computer Eng. (IIR)" },
      { label: "Institution", value: "EMSI Rabat" },
      { label: "Timeline", value: "2022 – Present" },
      { label: "Focus", value: "Software Engineering" }
    ],
    technologies: ["Java", "Spring Boot", "C/C++", "Oracle", "MySQL", "React", "Software Architecture"]
  }
];
