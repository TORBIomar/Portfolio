# Omar Torbi — Personal Portfolio & Engineering Showcase

A modern, responsive, and interactive developer portfolio built to showcase full-stack projects, architecture case studies, and engineering experience. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## ⚡ Features

* **Interactive Hero & Terminal Simulation:** Includes a custom terminal widget (`TerminalWidget.tsx`) displaying profile metadata and quick commands.


* **Project Showcase & Deep Dives:** Detailed modal views (`ProjectModal.tsx`) with architecture breakdowns, technology stacks, and direct links to code and live demos.


* **Interactive Code Sandbox:** Live sandbox demonstration component (`InteractiveSandbox.tsx`) showcasing technical concepts in real time.


* **Skills Matrix & Experience Timeline:** Clean, categorized skill representations (`SkillsSection.tsx`) and an interactive career experience timeline (`ExperienceSection.tsx`).


* **Direct Resume Access:** Embedded and downloadable PDF resume integration.


* **Optimized for Modern Web:** Fully responsive layout styled with Tailwind CSS, supporting dark-mode aesthetic standards.



---

## 🛠 Tech Stack

* **Frontend Framework:** React 18


* **Language:** TypeScript


* **Build Tool:** Vite


* **Styling:** Tailwind CSS + PostCSS


* **Deployment:** Vercel



---

## 📂 Project Structure

```text
Portfolio-main/
├── design-system/             # Design system specifications and documentation
│   └── portfolio/MASTER.md
├── public/                    # Static assets (favicons, resume/CV PDFs)
├── src/
│   ├── components/
│   │   ├── common/            # Reusable UI primitives (Button, SectionHeading)
│   │   ├── contact/           # Contact form and touchpoint components
│   │   ├── experience/        # Career & academic experience timeline
│   │   ├── hero/              # Hero banner and interactive Terminal widget
│   │   ├── layout/            # Navigation bar and Footer
│   │   ├── projects/          # Project grid, card views, and modal deep-dives
│   │   ├── sandbox/           # Interactive sandbox demo module
│   │   └── skills/            # Categorized skills matrix
│   ├── data/
│   │   ├── portfolioData.ts   # Projects, work history, and skills data
│   │   └── sandboxData.ts     # Configuration for sandbox simulations
│   ├── types/
│   │   └── portfolio.ts       # TypeScript interfaces & types
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # DOM root entrypoint
│   └── index.css              # Global styles and Tailwind directives
├── tailwind.config.js         # Tailwind theme customizations
├── tsconfig.json              # TypeScript compilation rules
├── vercel.json                # Vercel deployment routing & configuration
└── vite.config.ts             # Vite bundler configuration

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or newer recommended) and **npm** installed on your machine.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio

```


2. **Install dependencies:**
```bash
npm install

```



3. **Start the development server:**
```bash
npm run dev

```


4. **Open in browser:**
Navigate to `http://localhost:5173` to view the running app.

---

## 🏗 Available Scripts

* `npm run dev` — Starts the Vite development server with Hot Module Replacement (HMR).
* `npm run build` — Type-checks and compiles production-ready bundles into the `dist/` directory.


* `npm run preview` — Locally previews the built production output.

---

## 🌐 Deployment

The project is configured for one-click deployments to **Vercel** with SPA routing preconfigured via `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

```

---

## 📬 Contact

* **Email:** [torbi.dev@outlook.com](https://www.google.com/search?q=mailto%3Atorbi.dev%40outlook.com)
* **GitHub:** [@your-github-handle](https://github.com/TORBIomar)
* **LinkedIn:** [Omar Torbi](https://www.linkedin.com/in/torbiomar/)
