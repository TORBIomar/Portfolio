import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES } from '../../../data/portfolioData';
import { retroSound } from '../../../utils/retroSound';

interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const RetroTerminalApp: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: 'init-1',
      type: 'output',
      text: 'OmarOS 7.5.3 (ttyS0) - High Performance Phosphor Shell',
    },
    {
      id: 'init-2',
      type: 'output',
      text: 'Type "help" to display available terminal commands, or "neofetch" for system telemetry.',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    retroSound.playKeyClick();

    // Add to command history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Record user command in output
    const userLine: OutputLine = {
      id: `cmd-${Date.now()}`,
      type: 'input',
      text: `omar@omarios:~$ ${trimmed}`,
    };

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let resultLines: OutputLine[] = [];

    switch (cmd) {
      case 'help':
        resultLines = [
          { id: `h-1`, type: 'output', text: 'AVAILABLE COMMANDS:' },
          { id: `h-2`, type: 'output', text: '  neofetch      - Render OmarOS telemetry and ASCII system badge' },
          { id: `h-3`, type: 'output', text: '  whoami        - Print professional identity & engineering focus' },
          { id: `h-4`, type: 'output', text: '  skills        - List engineered capabilities, stacks & runtimes' },
          { id: `h-5`, type: 'output', text: '  projects      - List all 6 production projects with status' },
          { id: `h-6`, type: 'output', text: '  project <id>  - Inspect specific project specs (e.g. project elevate)' },
          { id: `h-7`, type: 'output', text: '  certs         - Display Oracle Cloud (OCI) credentials' },
          { id: `h-8`, type: 'output', text: '  contact       - Output email, phone, and direct communication links' },
          { id: `h-9`, type: 'output', text: '  cat resume    - Dump plain text engineering summary' },
          { id: `h-10`, type: 'output', text: '  date          - Print current date and timezone' },
          { id: `h-11`, type: 'output', text: '  clear         - Clear terminal screen' },
        ];
        break;

      case 'clear':
        setOutput([]);
        setInputVal('');
        return;

      case 'neofetch':
        resultLines = [
          { id: `nf-1`, type: 'output', text: '       .---.       omar@omarios-7.5' },
          { id: `nf-2`, type: 'output', text: '      /     \\      ----------------' },
          { id: `nf-3`, type: 'output', text: '     | () () |     OS: OmarOS 7.5.3 (Mac System 7 Vintage Edition)' },
          { id: `nf-4`, type: 'output', text: '      \\  _  /      Kernel: Spring-Boot-3 / Linux-6.x-LTS' },
          { id: `nf-5`, type: 'output', text: '       |||||       Host: EMSI Rabat — Computer Eng. (DDSI)' },
          { id: `nf-6`, type: 'output', text: '       |||||       Uptime: 5 Years Engineering Rigor (2022-Present)' },
          { id: `nf-7`, type: 'output', text: '                   Certifications: OCI DevOps + OCI Architect Pro' },
          { id: `nf-8`, type: 'output', text: '                   Core Stack: Java, Spring Boot, Docker, Linux, React' },
          { id: `nf-9`, type: 'output', text: '                   Memory: 32,768K Total (Zero Memory Leaks)' },
          { id: `nf-10`, type: 'output', text: '                   Target: PFE Internship (Feb 2027) & Full-Time' },
        ];
        break;

      case 'whoami':
        resultLines = [
          { id: `w-1`, type: 'success', text: `NAME: ${PERSONAL_INFO.name}` },
          { id: `w-2`, type: 'output', text: `TITLE: ${PERSONAL_INFO.titleDisplay}` },
          { id: `w-3`, type: 'output', text: `LOCATION: ${PERSONAL_INFO.location}` },
          { id: `w-4`, type: 'output', text: `SUMMARY: ${PERSONAL_INFO.summary}` },
        ];
        break;

      case 'certs':
        resultLines = [
          { id: `c-1`, type: 'output', text: 'ORACLE CLOUD INFRASTRUCTURE (OCI) CREDENTIALS:' },
          ...PERSONAL_INFO.certifications.map((c, i) => ({
            id: `c-item-${i}`,
            type: 'success' as const,
            text: `  [VERIFIED] ${c.name} (${c.code}) - Issuer: ${c.issuer}`,
          })),
        ];
        break;

      case 'skills':
        resultLines = [
          { id: `s-1`, type: 'output', text: 'ENGINEERING SUBSYSTEMS & CAPABILITIES:' },
          ...SKILL_CATEGORIES.flatMap((cat) => [
            { id: `cat-${cat.id}`, type: 'output' as const, text: `\n[ ${cat.title.toUpperCase()} ]` },
            ...cat.skills.map((s) => ({
              id: `sk-${cat.id}-${s.name}`,
              type: 'success' as const,
              text: `  - ${s.name.padEnd(22)} [${s.proficiency.padEnd(8)}] : ${s.productionContext}`,
            })),
          ]),
        ];
        break;

      case 'projects':
        resultLines = [
          { id: `p-1`, type: 'output', text: 'PRODUCTION REPOSITORIES & ARCHITECTURES:' },
          ...PROJECTS_DATA.map((p, i) => ({
            id: `p-item-${i}`,
            type: 'output' as const,
            text: `  [${p.id.padEnd(25)}] ${p.title} (${p.category})`,
          })),
          { id: `p-note`, type: 'output', text: '\nTip: Type "project <id>" to view comprehensive technical details.' },
        ];
        break;

      case 'project': {
        const found = PROJECTS_DATA.find((p) => p.id.toLowerCase() === arg || p.title.toLowerCase().includes(arg));
        if (found) {
          resultLines = [
            { id: `pr-1`, type: 'success', text: `PROJECT: ${found.title}` },
            { id: `pr-2`, type: 'output', text: `SUBTITLE: ${found.subtitle}` },
            { id: `pr-3`, type: 'output', text: `CATEGORY: ${found.category}` },
            { id: `pr-4`, type: 'output', text: `DESCRIPTION:\n${found.description}` },
            { id: `pr-5`, type: 'output', text: `\nARCHITECTURAL HIGHLIGHTS:` },
            ...found.architecturalHighlights.map((hl, idx) => ({
              id: `pr-hl-${idx}`,
              type: 'output' as const,
              text: `  * ${hl}`,
            })),
            { id: `pr-6`, type: 'output', text: `\nTECH STACK: ${found.techStack.join(', ')}` },
            ...(found.githubUrl ? [{ id: `pr-7`, type: 'output' as const, text: `GITHUB: ${found.githubUrl}` }] : []),
            ...(found.liveUrl ? [{ id: `pr-8`, type: 'output' as const, text: `LIVE DEMO: ${found.liveUrl}` }] : []),
          ];
        } else {
          resultLines = [
            {
              id: `pr-err`,
              type: 'error',
              text: `Project "${arg}" not found. Type "projects" to list all valid project IDs.`,
            },
          ];
        }
        break;
      }

      case 'cat':
        if (arg === 'resume' || arg === 'cv') {
          resultLines = [
            { id: `cat-1`, type: 'output', text: `====================================================` },
            { id: `cat-2`, type: 'success', text: `${PERSONAL_INFO.name.toUpperCase()} — RESUME DIGEST` },
            { id: `cat-3`, type: 'output', text: `====================================================` },
            { id: `cat-4`, type: 'output', text: `ROLE: ${PERSONAL_INFO.titleDisplay}` },
            { id: `cat-5`, type: 'output', text: `DEGREE: ${PERSONAL_INFO.education}` },
            { id: `cat-6`, type: 'output', text: `OCI CERTS: OCI DevOps Pro (1Z0-1109-26) | OCI Architect Pro (1Z0-997-26)` },
            { id: `cat-7`, type: 'output', text: `LOCATION: ${PERSONAL_INFO.location}` },
            { id: `cat-8`, type: 'output', text: `AVAILABILITY: ${PERSONAL_INFO.workAuthorization}` },
            { id: `cat-9`, type: 'output', text: `EMAIL: ${PERSONAL_INFO.email}` },
            { id: `cat-10`, type: 'output', text: `PHONE: ${PERSONAL_INFO.phone}` },
            { id: `cat-11`, type: 'output', text: `\nUse the GUI Finder / Contact App to download original PDF files.` },
          ];
        } else {
          resultLines = [{ id: `cat-err`, type: 'error', text: `cat: ${arg}: No such file or directory. Try: cat resume` }];
        }
        break;

      case 'contact':
        resultLines = [
          { id: `ct-1`, type: 'output', text: 'DIRECT CONTACT CHANNELS:' },
          { id: `ct-2`, type: 'output', text: `  Email:    ${PERSONAL_INFO.email}` },
          { id: `ct-3`, type: 'output', text: `  Phone:    ${PERSONAL_INFO.phone}` },
          { id: `ct-4`, type: 'output', text: `  WhatsApp: ${PERSONAL_INFO.whatsappUrl}` },
          { id: `ct-5`, type: 'output', text: `  LinkedIn: ${PERSONAL_INFO.linkedin}` },
          { id: `ct-6`, type: 'output', text: `  GitHub:   ${PERSONAL_INFO.github}` },
        ];
        break;

      case 'date':
        resultLines = [
          { id: `d-1`, type: 'output', text: new Date().toUTCString() + ' (Morocco UTC+1)' },
        ];
        break;

      case 'sudo':
        resultLines = [
          {
            id: `sudo-1`,
            type: 'error',
            text: 'omar is in the sudoers file. However, this incident will be reported to Omar Torbi.',
          },
        ];
        break;

      default:
        resultLines = [
          {
            id: `err-cmd`,
            type: 'error',
            text: `omarios-sh: command not found: ${cmd}. Type "help" for valid commands.`,
          },
        ];
        break;
    }

    setOutput((prev) => [...prev, userLine, ...resultLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-col h-full bg-[#060D07] text-[#33FF33] font-mono text-xs sm:text-sm p-4 overflow-y-auto cursor-text select-text"
    >
      {/* Terminal Screen Header */}
      <div className="border-b-2 border-[#33FF33]/40 pb-2.5 mb-3 text-xs opacity-90 flex justify-between select-none">
        <span>OMAROS PHOSPHOR VT100 / TERMINAL v7.5</span>
        <span>BAUD: 9600 • 80x25 CRT</span>
      </div>

      {/* Output Stream */}
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {output.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'error'
                ? 'text-[#FF4444]'
                : line.type === 'success'
                ? 'text-[#66FF99] font-bold'
                : line.type === 'input'
                ? 'text-[#FFFF66]'
                : 'text-[#33FF33]'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt with Generous Padding */}
      <div className="flex items-center gap-2 pt-3 border-t-2 border-[#33FF33]/30 mt-3">
        <span className="text-[#FFFF66] font-bold shrink-0 select-none">omar@omarios:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-[#33FF33] focus:outline-none font-mono text-xs sm:text-sm caret-[#33FF33]"
        />
      </div>
    </div>
  );
};
