# Portfolio Engineering & Optimization Progress Report

**Project**: Omar Torbi — Personal Portfolio & Engineering Showcase  
**Live URL**: [https://www.omartorbi.engineer](https://www.omartorbi.engineer)  
**Repository**: [https://github.com/TORBIomar/Portfolio.git](https://github.com/TORBIomar/Portfolio.git)  
**Last Updated**: October 12, 2026  

---

## 1. Executive Summary

This session accomplished a comprehensive modernization and performance optimization of Omar Torbi's software & DevOps engineering portfolio. Key highlights include achieving top-tier PageSpeed metrics, integrating React Bits futuristic target cursor physics, overhauling the hero narrative with a bilingual terminal card, building a native Unix `curl` CLI endpoint, and deploying all updates directly to production on Vercel.

---

## 2. Completed Milestones

### A. Performance Optimization (PageSpeed / Lighthouse 100% Target)
* **Diagnosis**: Identified critical metrics dragging PageSpeed performance:
  * High Total Blocking Time (TBT) caused by heavy Three.js / WebGL avatar instantiation on initial parse.
  * Largest Contentful Paint (LCP) delays due to complex DOM rendering and CSS calculations.
* **LCP Acceleration**: Replaced complex multi-node DOM hero card layouts with optimized, zero-CLS vector SVG graphics ([`card.svg`](./public/card.svg) & [`card-light.svg`](./public/card-light.svg)), rendered instantly with `fetchPriority="high"`.
* **Deferred 3D Hydration**: Reconfigured `FloatingChatWidget.tsx` and `ChromeBot3D.tsx` to defer mounting until after initial idle time (4500ms) or first user interaction (`scroll`, `mousemove`, `touchstart`, `keydown`).
* **Turbopack Build Cleanliness**: Eliminated unused dependencies, strict type validation, and zero compile warnings.

---

### B. React Bits `<TargetCursor />` Integration
* **Component Architecture**: Integrated the open-source `<TargetCursor />` component from React Bits into `src/components/common/TargetCursor.tsx`.
* **Physics & Interactions**:
  * Spring physics with 4 brackets snapping onto `.cursor-target` elements.
  * Support for dynamic hover badges via `data-cursor-label`.
  * Parallax lean and mouse click squeeze animation.
  * Dynamic corner border-radius tracking (`matchRadius`).
* **Terracotta Brand Theming**:
  * **Dark Mode**: Soft neon terracotta `#FFB0A1` with subtle difference blending.
  * **Light Mode**: Rich deep terracotta `#A42F17` for maximum legibility on light backgrounds.
* **Mobile Guard**: Embedded `(hover: hover) and (pointer: fine)` media query to avoid cursor rendering on touch devices.

---

### C. Track Record Light Mode Fix
* **Issue**: In light mode, project cards in the Track Record / Projects section remained styled with dark backgrounds (`#09090b`), causing contrast issues.
* **Fix**: Unified theme classes with conditional background, border, and text styles:
  * High-contrast glassmorphic card containers (`bg-white/80 dark:bg-[#09090b]`).
  * High-contrast typography (`text-neutral-950 dark:text-white`).
  * Proper badge contrast for tech stack tags.

---

### D. Hero Section Overhaul & `$ whoami` Terminal Card
* **Streamlined Narrative**: Removed the duplicate "About Me" block and elevated the `$ whoami` terminal card as the central hero showcase.
* **Architecture Pillars Retained**: Preserved the 3 core foundation pillars beneath the card:
  1. **01. CONTROL**: Enterprise Backend Architecture (Spring Boot 3, Java 17/21, Clean Architecture, stateless JWT, granular RBAC).
  2. **02. GOVERNANCE**: Reproducible DevOps & Cloud (OCI DevOps & Architect Professional, multi-stage Alpine Docker, hardened Linux ops).
  3. **03. VALUE**: Persistence & Browser 3D (Sub-10ms queries, PostgreSQL, MySQL 8, Three.js, OpenCascade.js Wasm CAD, Gemini RAG).

---

### E. Full Bilingual Support (French & English)
* **Dedicated French Card Vectors**:
  * [`public/card-fr.svg`](./public/card-fr.svg) (Dark mode)
  * [`public/card-light-fr.svg`](./public/card-light-fr.svg) (Light mode)
* **Reactive Switching**: Connected to `LanguageContext` in `HeroTerminalCard.tsx`:
  * French: `omar@torbi: ~$ qui-suis-je | profil ingénieur v2.5`
  * English: `omar@torbi: ~$ whoami | engineer profile v2.5`
  * Status badge: `"Disponible pour Stage PFE (Fév 2027) & Opportunités CDI"`
  * Download button automatically downloads the localized SVG file.
* **Bilingual Pillars**: Exported `FOUNDATION_PILLARS_FR` for French language mode.

---

### F. Native Unix CLI Endpoint (`/cli`) & Clean Hero CTA
* **UNIX Terminal Endpoint**: Implemented `src/app/cli/route.ts`:
  ```bash
  curl omartorbi.engineer/cli
  ```
  Returns a retro-futuristic ANSI-colored profile box directly inside any shell.
* **Terminal Top Bar Button**: Added a 1-click button on the card top bar copying `curl -fsSL https://omartorbi.engineer/cli | sh`.
* **Action Tray Refinement**:
  * Removed `npx omar-torbi` command button.
  * Kept the clean two-button primary layout:
    * `[ PROJECTS → ]` (Scrolls to `#projects`)
    * `[ CONTACT → ]` (Scrolls to `#contact`)
* **Global Command Palette**: Preserved global keyboard shortcut `⌘K` / `Ctrl+K` and Navbar search icon.

---

### G. 3D AI Assistant (Maro) Lifelike Animations, Sleep Physics & Brand Theming Upgrade
* **Multi-Stage Sleep State Machine (`sleepStage`)**:
  * **Dark Mode Fireflies & Zzz Physics**: 5 organic glowing fireflies (`ScreenFireflies`) take flight across the screen from left to right with individual flight flutter. As they approach Maro, a real-time green-gold point light reflects across his metallic chrome head. Maro tracks the swarm centroid, opens his mouth in an expressive sleepy yawn stretch, and enters deep sleep with 3D extruded, beveled chrome "Zzz" meshes tumbling into zero gravity.
  * **Light Mode Book Fetching & Reading**: On inactivity, Maro sprints off-screen to fetch glasses and an authentic 3D hardcover book with gold crests, corner brackets, spine ribs, and crimson bookmark ribbon (`fetching_book` -> `reading`), peacefully scanning pages back and forth.
  * **Lifelike Wakeup & Speech Bubbles**: Flaps book shut on wake-up (`closing_book`), dashes back into frame (`running_back`), and presents a responsive speech bubble (`"Welcome back! 📚"` / `"Bon retour ! 📚"`).
* **Mouth Mesh & Syllable Articulation**: Added 3D expressive mouth mesh dynamically articulating speech syllables during Gemini streaming responses, pursing thoughtfully when reasoning, and smiling when listening.
* **Terracotta Brand Alignment**: Converted the eyes, orbital halo ring, and cognitive neural lighting to the signature warm terracotta palette (`#FFB0A1` in dark mode / `#A42F17` in light mode).
* **Bi-directional State Communication**: Connected `AiChatModal` to `FloatingChatWidget` so the 3D avatar mirrors thinking and replying states in real time.

---

### H. 3D Laptop Coding Idle Animation & Simplified Clean Chat Modal
* **3D PC / Laptop & Coding Idle Physics**:
  * On idle (3.8s inactivity), Maro smoothly scales up an authentic 3D PC/laptop, pops open the hinged lid (`1.85 rad`), puts on glasses, and starts coding.
  * Detailed keyboard unit with key strips, spacebar, trackpad, IDE screen glass, window control dots, and syntax-highlighted code lines (terracotta, cyan, green, and white).
  * Real-time coding screen point light casts ambient reflections across Maro's face & glasses while he bobs his head to the typing groove.
  * On user interaction (mouse/touch/scroll), the lid snaps shut, glasses scale down, and Maro looks up popping `"Welcome back! 💻"` / `"Bon retour ! 💻"`.
* **Streamlined Clean Chat Modal**:
  * Removed the `"Gemini Live"` badge from the modal header.
  * Replaced `"Technical Copilot"` with simple and clean `"AI Assistant"` (`"Assistant IA"` in French).
  * Simplified AI message sender tags to a clean `"Maro"` header without vendor tags.

### I. Search Engine Optimization (SEO) & Google Name Ranking
* **Name-First Title Tag**: Configured `<title>` default to `"Omar Torbi — Software & DevOps Engineer | Portfolio"` with template `"%s | Omar Torbi"`.
* **Clean Semantic `<h1>` Structure**: Unified the hero intro badge and title into a single semantic `<h1>` element so Googlebot and Bingbot directly associate `"Omar Torbi"` with the primary heading of the site.
* **Schema.org JSON-LD Graph**: Injected structured data declaring `Person` (`Omar Torbi`, alumni of EMSI Rabat, certifications, skills, sameAs links to GitHub, LinkedIn, and personal website) and `WebSite` entity.
* **Search Crawlers & Robots**: Created `src/app/robots.ts` and `src/app/sitemap.ts` (`priority: 1.0`, `weekly`), pointing search bots directly to the live sitemap XML.
* **Open Graph & Twitter Cards**: Updated full metadata with canonical URL `https://www.omartorbi.engineer`, localized metadata descriptions, and high-resolution Open Graph vectors.

---

## 3. Git & Deployment Log

| Commit | Message | Summary |
|---|---|---|
| `373e749` | `feat: integrate whoami svg card, update cursor terracotta color, fix project card dark styles` | Base SVG card & cursor styles |
| `90f9997` | `feat: localize terminal whoami card (FR/EN), add curl /cli endpoint, and wire Command Palette trigger` | Bilingual SVGs, `/cli` API route |
| `9448fbc` | `refactor: remove command palette button from hero action tray` | Clean 2-button action layout |
| `81cbc66` | `docs: add comprehensive progress and milestone report` | Documentation & progress report |
| `9b039b1` | `feat(chat): upgrade 3D bot with multi-stage sleep physics, book fetching, fireflies, mouth articulation, and terracotta styling` | 3D bot lifelike physics & terracotta branding |
| `2f120fc` | `feat(chat): add 3D laptop coding idle animation with glasses and simplify modal header` | 3D laptop coding idle mode & simple chat UI |
| `ed8eee9` | `refactor(chat): simplify greeting and model indicator` | Simplified Maro greeting and model tag |
| `da572de` | `feat(seo): prioritize Omar Torbi in title, h1 heading, schema.org JSON-LD, and sitemap` | Name-first SEO, semantic h1, JSON-LD, sitemap, robots |
| `e1be3c2` | `feat(seo): add Google-compliant 48px multiple favicons, webmanifest, and Organization logo structured data` | Multi-resolution favicons (48px multiples), web manifest, Schema.org logo |

**Vercel Production Deployment**:  
* Status: **Ready & Live**  
* Canonical URL: [https://www.omartorbi.engineer](https://www.omartorbi.engineer)  
* CLI Test: `curl -sL https://www.omartorbi.engineer/cli`  

---

## 4. Architectural Decisions & Status

1. **3D Chat Bot (Maro) Materials & Theming**: **Resolved & Completed**  
   * Retained Liquid Chrome (light) / Obsidian Titanium (dark) PBR metalness.  
   * Tuned cybernetic eyes, orbital halo ring, and neural thinking light to warm terracotta (`#FFB0A1` / `#A42F17`).  
   * Added expressive mouth mesh, reading glasses, 3D hardcover book, screen firefly flight swarm, extruded tumbling Zzz physics, and 3D laptop coding idle mode.

2. **Google Search Entity Ranking**: **Resolved & Deployed**  
   * Prioritized "Omar Torbi" at the absolute start of title, meta tags, and semantic `<h1>`.
   * Schema.org Person JSON-LD links GitHub and LinkedIn identities directly to `omartorbi.engineer`.
   * Auto-generated dynamic sitemap and robots.txt deployed.


