import { Project, SkillCategory, ExperienceItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Omar Torbi",
  role: "Computer Engineering Student | Full-Stack Developer",
  tagline: "Computer Engineering & Networks student at EMSI Rabat experienced in building scalable web platforms, secure REST APIs, AI-assisted vector discovery, and interactive 3D industrial applications.",
  summary: "Computer Engineering and Networks student with a strong full-stack software engineering profile and practical experience gained through two software development internships. Experienced in building scalable web platforms, secure REST APIs, AI-assisted features, database-backed systems, and interactive 3D industrial applications. Comfortable working across frontend, backend, data, and integration layers using modern development tools and modular architecture principles. Combines analytical problem-solving, technical adaptability, and product-oriented execution to deliver reliable and maintainable software solutions.",
  status: "Available for new opportunities",
  availabilityDetails: "Open to Full-Stack, Backend, and Software Engineering Roles",
  location: "Rabat / Béni Mellal, Morocco",
  email: "torbi.dev@outlook.com",
  phone: "+212 612892619",
  github: "https://github.com/TORBIomar",
  linkedin: "https://www.linkedin.com/in/omar-torbi-b8340933a/",
  instagram: "https://www.instagram.com/omar.torbi",
  resumeUrl: "/resume.pdf",
  education: "Engineering Degree in Computer Engineering and Networks (IIR) — École Marocaine des Sciences de l’Ingénieur (EMSI), Rabat (2022 – Present)",
  spokenLanguages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Professional" },
    { name: "English", level: "Professional" }
  ],
  interests: ["AI & Architecture", "3D Technologies", "Industrial Software", "Fitness & Football"],
  coreStrengths: ["Problem Solving", "Cross-Functional Teamwork", "Fast Learning & Adaptability", "Agile Methodologies", "Technical Documentation"]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "zahiri-metal-cad",
    title: "Web CAD Platform for Industrial Tube Design",
    subtitle: "3D CAD & Fiber Laser Cutting Preparation for Zahiri Metal",
    category: "frontend",
    featured: true,
    summary: "Production-focused web CAD platform for industrial tube design and fiber laser cutting preparation. Integrates React, Three.js, and OpenCascade.js for 3D visualization, model validation, and STEP export.",
    description: "Architected for Zahiri Metal's manufacturing operations. Enables operators to interactively model parametric metal tubes and sheet profiles in 3D, inspect cutting geometry, perform model validation, and export compliant STEP files for Tube Pro laser cutting machine compatibility.",
    architecturalHighlights: [
      "Architected a production-focused web CAD platform for industrial tube design and fiber laser cutting preparation",
      "Developed responsive interfaces and interactive 3D visualization modules with React, Three.js, and OpenCascade.js",
      "Implemented geometry processing, model validation, and STEP export workflows for Tube Pro manufacturing compatibility",
      "Integrated precision orbit controls, collision boundary checks, and real-time mesh tessellation"
    ],
    metrics: [
      { label: "Rendering Rate", value: "60 FPS WebGL" },
      { label: "CAD Kernel", value: "OpenCascade.js" },
      { label: "Export Format", value: "STEP (Tube Pro)" },
      { label: "Processing", value: "Off-Thread Workers" }
    ],
    techStack: ["React", "Three.js", "OpenCascade.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/TORBIomar/3D-CAD-LASER-CUTTING",
    architectureDetails: {
      overview: "Combines an OpenCascade.js WebAssembly geometry engine with Three.js rendering. Heavy boundary representation (BREP) calculations and STEP exports run in background Web Workers to maintain interactive framerates.",
      keyDecisions: [
        "Utilized OpenCascade.js compiled to Wasm for true industrial BREP geometry manipulation in the browser.",
        "Engineered direct STEP export pipeline formatted specifically for Tube Pro CNC fiber laser machines.",
        "Built modular UI layers decoupling CAD canvas controls from parameter input panels."
      ],
      performanceBottlenecksResolved: "Avoided main thread rendering lockups by offloading complex geometric validation checks to Web Workers."
    }
  },
  {
    id: "intelligent-library",
    title: "Intelligent Library Platform",
    subtitle: "AI-Powered Document Platform with Semantic Search & Summarization",
    category: "backend",
    featured: true,
    summary: "Full-stack AI digital library supporting document management, contextual semantic search, and AI-powered summarization using Spring Boot, React, ChromaDB, and Gemini API.",
    description: "Engineered to transform traditional document archives into an intelligent discovery system. Features collaborative virtual reading spaces, dense vector embeddings with ChromaDB, and Google Gemini API integration for contextual document query answering and summarization.",
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
      overview: "Layered backend architecture separating relational document metadata (MySQL) from high-dimensional vector embeddings (ChromaDB), coordinated with Google Gemini API for generative context synthesis.",
      keyDecisions: [
        "Integrated ChromaDB for sub-100ms semantic similarity search across ingested document chunks.",
        "Used Gemini API to synthesize grounded summaries with source attribution, minimizing hallucinations.",
        "Applied Spring Boot dependency injection and modular service interfaces for easy AI model interchangeability."
      ],
      performanceBottlenecksResolved: "Asynchronous background document chunking and vector ingestion ensures zero upload latency for end users."
    }
  },
  {
    id: "elevate-recruitment",
    title: "Elevate — Recruitment Platform",
    subtitle: "Full-Stack Enterprise Applicant & Workflow Tracking Ecosystem",
    category: "fullstack",
    featured: true,
    summary: "Full-stack recruitment ecosystem connecting recruiters, candidates, job offers, and application workflows with role-based access control, built with Spring Boot, React, and MySQL.",
    description: "Designed for corporate hiring workflows. Provides dedicated portals for recruiters and candidates, dynamic requisition creation, multi-stage application pipelines, and real-time application tracking.",
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
        "Employed DTO projections to prevent over-fetching and minimize payload size across mobile and desktop clients."
      ],
      performanceBottlenecksResolved: "Eliminated N+1 query overhead in recruiter dashboard queries using optimized JPA fetch joins."
    }
  },
  {
    id: "onssa-stock-management",
    title: "ONSSA — Inventory & Stock Management System",
    subtitle: "Internal Logistics, Inventory Tracking & Administrative Workflow System",
    category: "systems",
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
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    description: "Core programming languages from systems C/C++ to enterprise Java and modern TypeScript.",
    iconName: "Terminal",
    skills: [
      { name: "Java", proficiency: "Expert", experienceYears: 3, productionContext: "Enterprise backend systems, Spring Boot, OOP & clean architecture", tags: ["Java 17/21", "Multithreading", "Streams", "OOP"] },
      { name: "C++", proficiency: "Advanced", experienceYears: 2, productionContext: "Object-oriented programming, data structures, algorithmic problem solving", tags: ["C++", "Memory Management", "Algorithms", "STL"] },
      { name: "SQL", proficiency: "Expert", experienceYears: 3, productionContext: "Complex relational queries, data normalization, joins and indexes", tags: ["SQL", "DDL/DML", "Query Tuning", "Relational"] },
      { name: "PL/SQL", proficiency: "Advanced", experienceYears: 2, productionContext: "Oracle database procedures, triggers, packages, and cursors", tags: ["PL/SQL", "Stored Procedures", "Triggers", "Oracle"] },
      { name: "Python", proficiency: "Advanced", experienceYears: 2, productionContext: "Backend routines, automation, data manipulation, Django APIs", tags: ["Python 3", "Automation", "Data Scripts", "Django"] },
      { name: "JavaScript", proficiency: "Expert", experienceYears: 4, productionContext: "Modern ES6+, asynchronous async/await, DOM APIs, Spotify API integration", tags: ["ESNext", "Promises", "Web APIs", "Async"] },
      { name: "TypeScript", proficiency: "Expert", experienceYears: 3, productionContext: "Strict type safety, 3D CAD interfaces, generics, modern React applications", tags: ["Type Safety", "Generics", "Interfaces"] },
      { name: "PHP", proficiency: "Advanced", experienceYears: 2, productionContext: "Server-side web development, Laravel framework, MVC architecture", tags: ["PHP 8", "Laravel", "MVC", "Backend"] },
      { name: "C", proficiency: "Advanced", experienceYears: 2, productionContext: "Low-level systems programming, memory pointers, hardware fundamentals", tags: ["Pointers", "Memory", "Data Structures"] }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    description: "Robust enterprise frameworks, scalable RESTful APIs, and MVC architectures.",
    iconName: "Cpu",
    skills: [
      { name: "Spring Boot", proficiency: "Expert", experienceYears: 3, productionContext: "Enterprise microservices, Spring Security, Spring Data JPA, REST APIs", tags: ["Spring Boot 3", "Spring Security", "JPA/Hibernate", "REST"] },
      { name: "Laravel", proficiency: "Advanced", experienceYears: 2, productionContext: "PHP enterprise applications, Eloquent ORM, Blade, RESTful controllers", tags: ["Laravel", "Eloquent ORM", "MVC", "Auth"] },
      { name: "Django", proficiency: "Advanced", experienceYears: 2, productionContext: "Python web services, Django ORM, authentication, modular apps", tags: ["Django", "Python ORM", "Admin", "REST"] },
      { name: "REST APIs", proficiency: "Expert", experienceYears: 3, productionContext: "Idempotent endpoints, HTTP semantics, JSON validation, Swagger documentation", tags: ["RESTful", "JWT Auth", "Endpoints", "OpenAPI"] }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern component-driven web interfaces, responsive layouts, and design systems.",
    iconName: "Layout",
    skills: [
      { name: "React", proficiency: "Expert", experienceYears: 3, productionContext: "Production SPAs, hooks, custom state management, component architecture", tags: ["React 18", "Hooks", "Context API", "State"] },
      { name: "HTML5", proficiency: "Expert", experienceYears: 4, productionContext: "Semantic document structuring, modern web standards, accessibility", tags: ["Semantic HTML", "SEO", "Web Standards"] },
      { name: "CSS3", proficiency: "Expert", experienceYears: 4, productionContext: "Advanced responsive styling, CSS Grid, Flexbox, transitions", tags: ["CSS Grid", "Flexbox", "Animations"] },
      { name: "Bootstrap", proficiency: "Advanced", experienceYears: 3, productionContext: "Rapid responsive grid prototyping, utility classes, components", tags: ["Bootstrap 5", "Grid System", "Responsive"] },
      { name: "Tailwind CSS", proficiency: "Expert", experienceYears: 3, productionContext: "Custom design systems, dark modes, token-based utility styling", tags: ["Design Tokens", "Dark Mode", "Utility-First"] }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational transactional databases, document stores, and high-dimensional vector search.",
    iconName: "Layers",
    skills: [
      { name: "Oracle", proficiency: "Advanced", experienceYears: 2, productionContext: "Enterprise relational database administration, schema modeling, PL/SQL", tags: ["Oracle DB", "PL/SQL", "Enterprise", "ACID"] },
      { name: "MySQL", proficiency: "Expert", experienceYears: 3, productionContext: "Relational schema design, query plan optimization, indexing, foreign keys", tags: ["MySQL 8", "Indexing", "Optimization", "Transactions"] },
      { name: "MongoDB", proficiency: "Advanced", experienceYears: 2, productionContext: "NoSQL document collections, aggregation pipelines, flexible schemas", tags: ["MongoDB", "NoSQL", "BSON", "Aggregation"] },
      { name: "ChromaDB", proficiency: "Advanced", experienceYears: 1, productionContext: "Vector search, high-dimensional cosine similarity embeddings, RAG pipelines", tags: ["ChromaDB", "Vector Search", "RAG", "Embeddings"] }
    ]
  },
  {
    id: "architecture-ai-3d",
    title: "Architecture & AI/3D",
    description: "Design paradigms, security models, generative AI integrations, and WebGL 3D CAD.",
    iconName: "Box",
    skills: [
      { name: "OOP & MVC", proficiency: "Expert", experienceYears: 3, productionContext: "Object-oriented design patterns, separation of concerns, MVC structure", tags: ["OOP", "Design Patterns", "MVC", "Inheritance"] },
      { name: "Modular Architecture", proficiency: "Expert", experienceYears: 3, productionContext: "Decoupled component layers, maintainable codebase boundaries", tags: ["Modular", "Clean Code", "Decoupling"] },
      { name: "RBAC", proficiency: "Expert", experienceYears: 3, productionContext: "Role-based access control, permission hierarchies, secure routing", tags: ["Security", "Authorization", "Roles", "Permissions"] },
      { name: "REST API Design", proficiency: "Expert", experienceYears: 3, productionContext: "API versioning, status codes, error models, request/response DTOs", tags: ["API Standards", "DTOs", "Documentation"] },
      { name: "Three.js", proficiency: "Advanced", experienceYears: 2, productionContext: "WebGL scene graphs, custom camera controls, lighting, mesh geometries", tags: ["Three.js", "WebGL", "3D Graphics", "Meshes"] },
      { name: "OpenCascade.js", proficiency: "Advanced", experienceYears: 1, productionContext: "Industrial CAD modeling, BREP geometry kernel, STEP export workflows", tags: ["OpenCascade", "CAD", "BREP", "STEP Export"] },
      { name: "Gemini API", proficiency: "Advanced", experienceYears: 1, productionContext: "Contextual AI document retrieval, summarization, prompt engineering", tags: ["Gemini API", "LLMs", "Summarization", "Prompts"] },
      { name: "Semantic Search", proficiency: "Advanced", experienceYears: 1, productionContext: "Vector embeddings, cosine similarity matching, contextual RAG discovery", tags: ["Semantic Search", "Embeddings", "Cosine Distance"] }
    ]
  },
  {
    id: "devops-systems",
    title: "DevOps & Systems",
    description: "Version control, containerization, operating systems, and cloud fundamentals.",
    iconName: "Cloud",
    skills: [
      { name: "Git", proficiency: "Expert", experienceYears: 4, productionContext: "Version control, GitFlow, branching strategies, collaborative workflows", tags: ["Git", "GitHub", "Branching", "Collaboration"] },
      { name: "Docker", proficiency: "Advanced", experienceYears: 2, productionContext: "Containerization of full-stack services, Dockerfiles, compose stacks", tags: ["Docker", "Containers", "Docker Compose"] },
      { name: "Linux", proficiency: "Advanced", experienceYears: 3, productionContext: "Unix environment, bash scripting, server administration, CLI tools", tags: ["Linux", "Bash", "CLI", "Server Admin"] },
      { name: "Cloud Concepts", proficiency: "Advanced", experienceYears: 2, productionContext: "Cloud architecture, container registries, managed compute, cloud storage", tags: ["Cloud", "OCI", "Container Registry", "Deployment"] }
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
    type: "Full-time",
    summary: "Architected a production-focused web CAD platform for industrial tube design and fiber laser cutting preparation.",
    achievements: [
      "Architected a production-focused web CAD platform for industrial tube design and fiber laser cutting preparation.",
      "Developed responsive interfaces and interactive 3D visualization modules with React, Three.js, and OpenCascade.js.",
      "Implemented geometry processing, model validation, and STEP export workflows for Tube Pro manufacturing compatibility."
    ],
    metrics: [
      { label: "CAD Engine", value: "OpenCascade.js" },
      { label: "3D Viewport", value: "Three.js (60 FPS)" },
      { label: "Compatibility", value: "Tube Pro CNC" },
      { label: "Output Format", value: "STEP 3D Export" }
    ],
    technologies: ["React", "Three.js", "OpenCascade.js", "TypeScript", "Tailwind CSS", "Tube Pro"]
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
      "Hands-on architectural delivery of production capstone projects including 3D CAD software and AI vector platforms."
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
