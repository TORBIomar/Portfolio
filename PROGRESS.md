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

## 3. Git & Deployment Log

| Commit | Message | Summary |
|---|---|---|
| `373e749` | `feat: integrate whoami svg card, update cursor terracotta color, fix project card dark styles` | Base SVG card & cursor styles |
| `90f9997` | `feat: localize terminal whoami card (FR/EN), add curl /cli endpoint, and wire Command Palette trigger` | Bilingual SVGs, `/cli` API route |
| `9448fbc` | `refactor: remove command palette button from hero action tray` | Clean 2-button action layout |

**Vercel Production Deployment**:  
* Status: **Ready & Live**  
* Canonical URL: [https://www.omartorbi.engineer](https://www.omartorbi.engineer)  
* CLI Test: `curl -sL https://www.omartorbi.engineer/cli`  

---

## 4. Pending Architectural Decisions

1. **3D Chat Bot (Maro) Materials**:
   * **Recommendation**: Retain the **Liquid Chrome / Obsidian Titanium** body for PBR reflections, while tuning the **electric cyan eyes and halo** (`#00f2fe`) to **warm terracotta** (`#FFB0A1` / `#A42F17`) to harmonize with the brand palette.
