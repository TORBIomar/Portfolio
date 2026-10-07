"use client";

import React, { useState } from "react";
import {
  Terminal as TerminalIcon,
  Box,
  Layers,
  Workflow,
  Check,
  Copy,
  ChevronRight,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Cpu,
  Flame,
} from "lucide-react";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const HeroMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cad" | "elevate" | "matrix" | "cli">("cad");
  const { showToast } = useToast();

  // CAD interactive state
  const [tubeDiameter, setTubeDiameter] = useState(80);
  const [tubeLength, setTubeLength] = useState(600);
  const [wallThickness, setWallThickness] = useState(3.5);
  const [holeOffset, setHoleOffset] = useState(250);
  const [mitreAngle, setMitreAngle] = useState(45);

  // Elevate RBAC state
  const [currentRole, setCurrentRole] = useState<"ROLE_RECRUITER" | "ROLE_CANDIDATE" | "ROLE_ADMIN">("ROLE_RECRUITER");

  // Terminal state
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; out: string | React.ReactNode }>>([
    {
      cmd: "sysctl --status omar.torbi",
      out: (
        <div className="text-zinc-300 space-y-1">
          <div className="text-emerald-400 font-semibold">[SYSTEM HEALTHY // ALL METRICS OPERATIONAL]</div>
          <div>• Discipline: Software &amp; DevOps Engineering (EMSI Rabat DDSI)</div>
          <div>• Certifications: OCI DevOps Pro (1Z0-1109-26) &amp; OCI Architect Pro (1Z0-997-26)</div>
          <div>• Core Stack: Spring Boot 3, Docker, Linux, OCI Cloud, Three.js, React</div>
        </div>
      ),
    },
  ]);

  const handleRunCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;
    sound.playKey();

    let output: React.ReactNode = "";
    if (trimmed === "help") {
      output = (
        <div className="text-zinc-400 space-y-1">
          <div className="text-white font-semibold">Commands available:</div>
          <div><span className="text-zinc-200 font-mono">devops</span> — Check Docker &amp; OCI cluster status</div>
          <div><span className="text-zinc-200 font-mono">backend</span> — Spring Boot 3 &amp; REST architecture</div>
          <div><span className="text-zinc-200 font-mono">certifs</span> — Oracle Cloud Infrastructure verified badges</div>
          <div><span className="text-zinc-200 font-mono">cad</span> — Zahiri Metal 3D parametric kernel info</div>
          <div><span className="text-zinc-200 font-mono">contact</span> — Reach out directly via email/phone</div>
          <div><span className="text-zinc-200 font-mono">clear</span> — Clear terminal output</div>
        </div>
      );
    } else if (trimmed === "devops" || trimmed === "docker") {
      output = (
        <div className="text-zinc-300 space-y-0.5 font-mono text-[11px]">
          <div className="text-zinc-500">CONTAINER ID   IMAGE                 STATUS        PORTS</div>
          <div><span className="text-emerald-400">c81d2f09a12</span>   spring-boot-api:v3.3  Up 48h (OK)   0.0.0.0:8080-&gt;8080/tcp</div>
          <div><span className="text-emerald-400">e4b7a19c03d</span>   postgres:16-alpine    Up 48h (OK)   0.0.0.0:5432-&gt;5432/tcp</div>
          <div><span className="text-emerald-400">920ab8f117a</span>   n8n-matrix-prod:v1.8  Up 48h (OK)   0.0.0.0:5678-&gt;5678/tcp</div>
          <div className="text-zinc-400 pt-1">• Host: OCI Compute Instance (Ubuntu 24.04 LTS / Systemd / Multi-stage Alpine)</div>
        </div>
      );
    } else if (trimmed === "backend" || trimmed === "spring") {
      output = (
        <div className="text-zinc-300 space-y-1 font-mono text-xs">
          <div className="text-white font-semibold">[Spring Boot 3 Core Features]:</div>
          <div>• Granular RBAC + Stateless JWT Authentication Filters</div>
          <div>• JPA Fetch Joins (zero N+1 query overhead in high-throughput endpoints)</div>
          <div>• Idempotent REST API schemas with DTO projections</div>
        </div>
      );
    } else if (trimmed === "certifs") {
      output = (
        <div className="text-zinc-300 space-y-1 font-mono text-xs">
          <div className="text-amber-400 font-semibold">[Oracle University Cloud Credentials]:</div>
          <div>1. OCI DevOps Professional (1Z0-1109-26)</div>
          <div>2. OCI Architect Professional (1Z0-997-26)</div>
          <div className="text-zinc-400 text-[11px]">• Validated for cloud architecture, security governance &amp; automated pipelines.</div>
        </div>
      );
    } else if (trimmed === "cad") {
      output = (
        <div className="text-zinc-300 space-y-1 font-mono text-xs">
          <div className="text-cyan-400 font-semibold">[Zahiri Metal 3D CAD Engine]:</div>
          <div>• WebAssembly CSG Boolean Kernel (OpenCascade.js)</div>
          <div>• 60 FPS WebGL rendering via Three.js with background Web Workers</div>
          <div>• ISO-6983 4-axis G-code output for Trumpf / Bystronic CNC fiber laser cutters</div>
        </div>
      );
    } else if (trimmed === "contact") {
      output = (
        <div className="text-zinc-300 space-y-1 font-mono text-xs">
          <div>• Email: <span className="text-white font-semibold">{PERSONAL_INFO.email}</span></div>
          <div>• Phone: <span className="text-white font-semibold">{PERSONAL_INFO.phone}</span></div>
          <div>• Location: <span className="text-white">{PERSONAL_INFO.location}</span></div>
        </div>
      );
    } else if (trimmed === "clear") {
      setTermHistory([]);
      setTermInput("");
      return;
    } else {
      output = (
        <div className="text-rose-400 text-xs">
          Command not recognized: "{trimmed}". Type <span className="underline cursor-pointer font-bold text-white" onClick={() => handleRunCommand("help")}>help</span> to see commands.
        </div>
      );
    }

    setTermHistory((prev) => [...prev, { cmd: trimmed, out: output }]);
    setTermInput("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Dark Outer Shell with high-end border and soft atmospheric glow */}
      <div className="relative rounded-2xl bg-[#0e0f12] border border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden text-zinc-300">
        
        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#14151a] border-b border-zinc-800/80 select-none">
          {/* macOS window control buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-inner" />
            
            <span className="ml-3 font-mono text-[11px] text-zinc-400 hidden sm:inline-block">
              torbi-workspace // production-grade systems
            </span>
          </div>

          {/* Interactive Tab Switchers */}
          <div className="flex items-center gap-1 bg-[#090a0d] p-0.5 rounded-lg border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("cad");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "cad"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D CAD [Wasm]</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("elevate");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "elevate"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spring RBAC</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("matrix");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "matrix"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-amber-400" />
              <span>n8n Scraper</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("cli");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "cli"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5 text-violet-400" />
              <span>CLI Shell</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Zahiri Metal 3D CAD Studio */}
        {activeTab === "cad" && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0a0b0e]">
            {/* Visual 3D Canvas Mockup (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-gradient-to-b from-[#121319] to-[#0c0d11] border border-zinc-800 p-5 relative overflow-hidden min-h-[300px]">
              {/* Background isometric grid */}
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between z-10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-zinc-300 font-semibold">ZAHIRI METAL 3D KERNEL</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-cyan-400 font-mono">60.2 FPS</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-[10px] text-zinc-400">
                  Wasm OpenCascade.js
                </span>
              </div>

              {/* Visual Tube Representation SVG */}
              <div className="my-8 flex items-center justify-center relative z-10 py-4">
                <svg
                  viewBox="0 0 500 200"
                  className="w-full max-w-md h-auto filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                >
                  <defs>
                    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#71717a" />
                      <stop offset="35%" stopColor="#e4e4e7" />
                      <stop offset="65%" stopColor="#a1a1aa" />
                      <stop offset="100%" stopColor="#3f3f46" />
                    </linearGradient>
                    <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Main Extruded Cylinder Tube */}
                  <g transform="translate(40, 60)">
                    {/* Left Cap Ellipse */}
                    <ellipse cx="40" cy="40" rx="20" ry={tubeDiameter * 0.45} fill="#27272a" stroke="#52525b" strokeWidth="2" />
                    <ellipse cx="40" cy="40" rx="14" ry={tubeDiameter * 0.35} fill="#09090b" stroke="#06b6d4" strokeWidth="1.5" />

                    {/* Tube Body Rect */}
                    <path
                      d={`M 40,${40 - tubeDiameter * 0.45} L ${40 + tubeLength * 0.6},${40 - tubeDiameter * 0.45} A 20,${tubeDiameter * 0.45} 0 0,1 ${40 + tubeLength * 0.6},${40 + tubeDiameter * 0.45} L 40,${40 + tubeDiameter * 0.45} Z`}
                      fill="url(#metalGrad)"
                      stroke="#52525b"
                      strokeWidth="1.5"
                    />

                    {/* Parametric Cutout Hole */}
                    <ellipse
                      cx={40 + holeOffset * 0.6}
                      cy="40"
                      rx="12"
                      ry="22"
                      fill="#09090b"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                    <path
                      d={`M ${40 + holeOffset * 0.6 - 12},40 L ${40 + holeOffset * 0.6 + 12},40`}
                      stroke="#06b6d4"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />

                    {/* Laser Cut Beam Simulation */}
                    <line
                      x1={40 + holeOffset * 0.6}
                      y1="-20"
                      x2={40 + holeOffset * 0.6}
                      y2="30"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4,2"
                    />
                    <circle cx={40 + holeOffset * 0.6} cy="30" r="3" fill="#38bdf8" className="animate-ping" />

                    {/* Right Cap with Mitre Cut Angle */}
                    <path
                      d={`M ${40 + tubeLength * 0.6},${40 - tubeDiameter * 0.45} L ${40 + tubeLength * 0.6 - (mitreAngle * 0.4)},${40 + tubeDiameter * 0.45}`}
                      stroke="#e11d48"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                  </g>
                </svg>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="z-10 grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800 text-[11px] font-mono">
                <div>
                  <span className="text-zinc-500">PROFILE:</span>{" "}
                  <span className="text-zinc-200">Round Ø{tubeDiameter}mm</span>
                </div>
                <div>
                  <span className="text-zinc-500">LENGTH:</span>{" "}
                  <span className="text-zinc-200">{tubeLength}mm</span>
                </div>
                <div>
                  <span className="text-zinc-500">G-CODE:</span>{" "}
                  <span className="text-emerald-400">ISO-6983 OK</span>
                </div>
              </div>
            </div>

            {/* Interactive Parametric Controls & G-Code (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 font-mono text-xs">
              <div className="bg-[#121319] p-4 rounded-xl border border-zinc-800 space-y-3.5">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-white font-semibold">Parametric Geometry</span>
                  <span className="text-[10px] text-zinc-500">DIN 6935 Sheet</span>
                </div>

                {/* Diameter Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Tube Diameter (Ø)</span>
                    <span className="text-white font-bold">{tubeDiameter} mm</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={tubeDiameter}
                    onChange={(e) => {
                      sound.playKey();
                      setTubeDiameter(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Length Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Extrusion Length (L)</span>
                    <span className="text-white font-bold">{tubeLength} mm</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="800"
                    value={tubeLength}
                    onChange={(e) => {
                      sound.playKey();
                      setTubeLength(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Hole Position Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Hole Z-Offset</span>
                    <span className="text-white font-bold">{holeOffset} mm</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max={tubeLength - 50}
                    value={holeOffset}
                    onChange={(e) => {
                      sound.playKey();
                      setHoleOffset(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Generated G-Code Preview */}
              <div className="bg-[#0e0f14] p-3 rounded-xl border border-zinc-800 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-zinc-800">
                  <span className="text-zinc-300 font-semibold">CNC Toolpath Output (.nc)</span>
                  <button
                    onClick={() => {
                      showToast("ISO-6983 G-code snippet copied!");
                    }}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="text-zinc-500 font-mono text-[10px] leading-relaxed pt-1">
                  <div>G90 G21 G17 (Metric 4-Axis Mode)</div>
                  <div>G00 X0.00 Y0.00 Z5.00 A0.00</div>
                  <div className="text-cyan-400">M03 S2500 (Laser Emission Active)</div>
                  <div>G01 Z-3.50 F1200.0 (Wall Pierce)</div>
                  <div>G01 X{holeOffset}.00 A180.00 F2400.0</div>
                  <div className="text-emerald-400">M05 (Laser Beam Off // Next Block)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Elevate Enterprise Recruitment RBAC */}
        {activeTab === "elevate" && (
          <div className="p-4 sm:p-6 bg-[#0a0b0e] font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="space-y-0.5">
                <div className="text-white font-semibold text-sm">Elevate Recruitment Ecosystem</div>
                <div className="text-zinc-500 text-[11px]">Spring Boot 3 + Spring Security + Stateless JWT</div>
              </div>

              {/* Role Switcher */}
              <div className="flex items-center gap-1 bg-[#14151a] p-1 rounded-lg border border-zinc-800 text-[11px]">
                {(["ROLE_RECRUITER", "ROLE_CANDIDATE", "ROLE_ADMIN"] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      sound.playClick();
                      setCurrentRole(role);
                    }}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      currentRole === role
                        ? "bg-emerald-500 text-black font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {role.replace("ROLE_", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated REST & Claims Inspection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121319] p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="text-zinc-400 font-semibold text-[11px]">DECODED JWT PAYLOAD</div>
                <div className="bg-black/60 p-3 rounded text-[11px] text-zinc-300 font-mono space-y-1">
                  <div>{"{"}</div>
                  <div className="pl-4">"sub": "user_10928@elevate.internal",</div>
                  <div className="pl-4">"authorities": [<span className="text-emerald-400">"{currentRole}"</span>],</div>
                  <div className="pl-4">"iat": 1728302400,</div>
                  <div className="pl-4">"exp": 1728388800</div>
                  <div>{"}"}</div>
                </div>
              </div>

              <div className="bg-[#121319] p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="text-zinc-400 font-semibold text-[11px]">AUTHORIZATION ACCESS POLICY</div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span>GET /api/v1/requisitions/all</span>
                    <span className="text-emerald-400 font-bold">ALLOW (200 OK)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span>POST /api/v1/candidates/evaluate</span>
                    {currentRole === "ROLE_CANDIDATE" ? (
                      <span className="text-rose-400 font-bold">DENY (403 FORBIDDEN)</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">ALLOW (200 OK)</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                    <span>DELETE /api/v1/users/purge</span>
                    {currentRole === "ROLE_ADMIN" ? (
                      <span className="text-emerald-400 font-bold">ALLOW (200 OK)</span>
                    ) : (
                      <span className="text-rose-400 font-bold">DENY (403 FORBIDDEN)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Creator Outreach Matrix */}
        {activeTab === "matrix" && (
          <div className="p-4 sm:p-6 bg-[#0a0b0e] font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="space-y-0.5">
                <div className="text-white font-semibold text-sm">Creator Outreach Matrix</div>
                <div className="text-zinc-500 text-[11px]">Playwright Evasive Scraper + n8n + Zoho Mail API</div>
              </div>
              <div className="flex items-center gap-2 text-amber-400 text-xs">
                <Flame className="w-4 h-4" />
                <span>4x Throughput via Media Route Abortion</span>
              </div>
            </div>

            {/* Workflow Execution Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#121319] border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">PAGES SCRAPED</div>
                <div className="text-lg font-bold text-white mt-1">1,480+</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121319] border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">ROUTE DROPS</div>
                <div className="text-lg font-bold text-amber-400 mt-1">98.4% (IMG/VID)</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121319] border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">LEADS PARSED</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">420 Verified</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121319] border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">LLM REPLIES</div>
                <div className="text-lg font-bold text-cyan-400 mt-1">Sub-2s Intent</div>
              </div>
            </div>

            <div className="bg-[#121319] p-3.5 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="text-zinc-300 font-semibold">[LIVE WEBHOOK EVENT DISPATCH]</div>
              <div className="text-zinc-500">[00:04:12] Playwright: Bypassed bot heuristics (jitter sleep: 184ms)</div>
              <div className="text-zinc-500">[00:04:13] Payload aborted: Video stream (.mp4) dropped → Saved 4.2 MB</div>
              <div className="text-emerald-400">[00:04:14] n8n Webhook: Pushed lead payload to Zoho Mail dispatch queue</div>
            </div>
          </div>
        )}

        {/* Tab 4: Interactive CLI Shell */}
        {activeTab === "cli" && (
          <div className="p-4 sm:p-6 bg-[#0a0b0e] font-mono text-xs space-y-3">
            <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1">
              {termHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-emerald-400 font-bold">omar@devops:~$</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="pl-4">{item.out}</div>
                </div>
              ))}
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <span className="text-emerald-400 font-bold shrink-0">omar@devops:~$</span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRunCommand(termInput);
                  }
                }}
                placeholder="Type 'help', 'devops', 'backend', 'certifs', 'cad'..."
                className="flex-1 bg-transparent border-none text-white outline-none font-mono text-xs"
              />
              <button
                onClick={() => handleRunCommand(termInput)}
                className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] cursor-pointer"
              >
                Run ↵
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
