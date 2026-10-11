"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw } from "lucide-react";
import { AvatarVisual } from "./AvatarVisual";
import {
  ChatMessage,
  ChatAction,
  getLocalAiResponse,
} from "@/data/aiKnowledge";
import { sound } from "@/utils/sound";
import { useToast } from "../common/Toast";

let msgSequence = 0;
function createMsgId(prefix: string): string {
  msgSequence += 1;
  return `${prefix}-${msgSequence}-${Math.random().toString(36).slice(2, 7)}`;
}

function getLocalTimeString(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const STARTER_PROMPTS = [
  {
    title: "Who is Maro?",
    subtitle: "Architecture, background, and capabilities",
  },
  {
    title: "Backend & DevOps Stack",
    subtitle: "Spring Boot 3, Docker, Linux, and OCI",
  },
  {
    title: "Dual OCI Certifications",
    subtitle: "DevOps & Architect Professional credentials",
  },
  {
    title: "Internship Availability",
    subtitle: "2027 End-of-Studies PFE and engineering roles",
  },
];

// Precision Syntax-styled Code Block (Zero Fake Traffic-light Orbs)
interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "code" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0c0c10] text-zinc-100 shadow-xs">
      <div className="px-3.5 py-1.5 bg-[#14141a] border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono">
        <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center px-2 py-0.5 rounded-md hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10.5px] font-mono font-medium focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-cyan-500"
          title="Copy code to clipboard"
        >
          {copied ? (
            <span className="text-emerald-400 font-bold">Copied</span>
          ) : (
            <span className="font-semibold">Copy</span>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-xs font-mono font-medium leading-relaxed text-zinc-200 selection:bg-cyan-900 selection:text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
};

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const AiChatModal: React.FC<AiChatModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const { showToast } = useToast();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I'm **Maro**, Omar's personal AI assistant and engineering copilot.\n\nAsk me anything about Omar's backend engineering (Spring Boot 3, REST APIs), DevOps & OCI Cloud infrastructure, 3D Web CAD (Three.js/Wasm), or his availability for internships and engineering roles.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input when modal opens
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, scrollToBottom]);

  // Global Esc key dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleClearChat = () => {
    sound.playClick();
    setMessages([
      {
        id: createMsgId("ai-welcome"),
        sender: "ai",
        text: "Conversation reset. What would you like to explore about Omar's engineering work?",
        timestamp: getLocalTimeString(),
      },
    ]);
    showToast("Conversation cleared");
  };

  const streamAiResponse = async (
    fullText: string,
    actions?: ChatAction[],
    suggestions?: string[]
  ) => {
    const msgId = createMsgId("ai");
    setStreamingMsgId(msgId);
    setIsReplying(true);
    sound.playSuccess();

    const newMsg: ChatMessage = {
      id: msgId,
      sender: "ai",
      text: "",
      timestamp: getLocalTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    const totalLen = fullText.length;
    const stepSize = totalLen > 350 ? 3 : totalLen > 140 ? 2 : 1;
    let index = 0;

    while (index < totalLen) {
      const nextIndex = Math.min(totalLen, index + stepSize);
      const partial = fullText.slice(0, nextIndex);
      index = nextIndex;

      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, text: partial } : m))
      );

      if (index % 18 === 0 && !sound.isMuted()) {
        sound.playHover();
      }

      const lastChar = fullText[index - 1];
      let delay = 12;
      if (lastChar === "." || lastChar === "!" || lastChar === "?") {
        delay = 40;
      } else if (lastChar === "," || lastChar === ";" || lastChar === ":") {
        delay = 22;
      } else if (lastChar === "\n") {
        delay = 28;
      }

      await new Promise((r) => setTimeout(r, delay));
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? {
              ...m,
              text: fullText,
              actions,
              suggestions,
            }
          : m
      )
    );

    setStreamingMsgId(null);
    setTimeout(() => {
      setIsReplying(false);
    }, 800);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isTyping || isReplying) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      id: createMsgId("u"),
      sender: "user",
      text: textToSend,
      timestamp: getLocalTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      let answered = false;
      let replyText = "";
      let replyActions: ChatAction[] | undefined;
      let replySuggestions: string[] | undefined;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            history: messages.slice(-4),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.answer) {
            replyText = data.answer;
            replyActions = data.actions;
            replySuggestions = data.suggestions;
            answered = true;
          }
        }
      } catch (err) {
        console.warn("Server API chat route unavailable, using local fallback:", err);
      }

      if (!answered) {
        await new Promise((r) => setTimeout(r, 250));
        const local = getLocalAiResponse(textToSend);
        replyText = local.text;
        replyActions = local.actions;
        replySuggestions = local.suggestions;
      }

      setIsTyping(false);
      await streamAiResponse(replyText, replyActions, replySuggestions);
    } catch {
      setIsTyping(false);
      showToast("Unable to process message right now.");
    }
  };

  const handleActionClick = (action: ChatAction) => {
    sound.playClick();
    if (action.type === "download" && action.payload) {
      window.open(action.payload, "_blank");
      showToast(`Opening: ${action.label}`);
    } else if (action.type === "contact" && action.payload) {
      window.location.assign(action.payload);
    } else if (action.type === "link" && action.payload) {
      if (action.payload.startsWith("#")) {
        onClose();
        const element = document.querySelector(action.payload);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(action.payload, "_blank");
      }
    } else if (action.type === "project" && action.payload && onSelectProject) {
      onClose();
      onSelectProject(action.payload);
    } else if (action.type === "prompt" && action.payload) {
      handleSendMessage(action.payload);
    }
  };

  const renderFormattedText = (rawText: string, isStreamingActive: boolean) => {
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const blocks: Array<{ type: "code"; lang: string; code: string } | { type: "text"; content: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        blocks.push({
          type: "text",
          content: rawText.slice(lastIndex, match.index),
        });
      }
      blocks.push({
        type: "code",
        lang: match[1] || "code",
        code: match[2].trimEnd(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < rawText.length) {
      blocks.push({
        type: "text",
        content: rawText.slice(lastIndex),
      });
    }

    return (
      <div className="relative space-y-2 text-[13.5px] font-medium leading-relaxed tracking-[-0.01em]">
        {blocks.map((block, bIdx) => {
          if (block.type === "code") {
            return <CodeBlock key={`cb-${bIdx}`} code={block.code} language={block.lang} />;
          }

          const lines = block.content.split("\n");
          return (
            <div key={`tb-${bIdx}`} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
                const isHeader = line.trim().startsWith("### ") || line.trim().startsWith("## ");
                const cleanLine = isBullet
                  ? line.trim().replace(/^[•-]\s*/, "")
                  : isHeader
                  ? line.trim().replace(/^#{2,3}\s*/, "")
                  : line;

                const parseInline = (str: string) => {
                  const parts: React.ReactNode[] = [];
                  let cur = str;
                  let pKey = 0;

                  while (cur.length > 0) {
                    const linkMatch = cur.match(/^\[([^\]]+)\]\(([^)]+)\)/);
                    if (linkMatch) {
                      parts.push(
                        <a
                          key={`lnk-${lIdx}-${pKey++}`}
                          href={linkMatch[2]}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold underline underline-offset-3 text-cyan-700 dark:text-cyan-400 hover:opacity-80 transition-opacity"
                        >
                          {linkMatch[1]}
                        </a>
                      );
                      cur = cur.slice(linkMatch[0].length);
                      continue;
                    }

                    const boldMatch = cur.match(/^\*\*([^*]+)\*\*/);
                    if (boldMatch) {
                      parts.push(
                        <strong
                          key={`b-${lIdx}-${pKey++}`}
                          className="font-bold text-zinc-950 dark:text-white tracking-tight"
                        >
                          {boldMatch[1]}
                        </strong>
                      );
                      cur = cur.slice(boldMatch[0].length);
                      continue;
                    }

                    const codeMatch = cur.match(/^`([^`]+)`/);
                    if (codeMatch) {
                      parts.push(
                        <code
                          key={`c-${lIdx}-${pKey++}`}
                          className="px-1.5 py-0.5 rounded-md bg-zinc-200/90 dark:bg-zinc-800 text-zinc-950 dark:text-cyan-300 font-mono font-semibold text-[11.5px] border border-zinc-300/70 dark:border-white/10"
                        >
                          {codeMatch[1]}
                        </code>
                      );
                      cur = cur.slice(codeMatch[0].length);
                      continue;
                    }

                    const nextSpecial = cur.search(/(\*\*|`|\[)/);
                    if (nextSpecial === -1) {
                      parts.push(cur);
                      break;
                    } else if (nextSpecial === 0) {
                      parts.push(cur[0]);
                      cur = cur.slice(1);
                    } else {
                      parts.push(cur.slice(0, nextSpecial));
                      cur = cur.slice(nextSpecial);
                    }
                  }
                  return parts;
                };

                if (isHeader) {
                  return (
                    <h4
                      key={lIdx}
                      className="font-bold text-sm sm:text-[14px] text-zinc-950 dark:text-white pt-2 pb-1 tracking-tight border-b border-zinc-200/80 dark:border-zinc-800"
                    >
                      {parseInline(cleanLine)}
                    </h4>
                  );
                }

                if (isBullet) {
                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-2.5 my-1 text-[13.5px] font-medium leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 mt-2 shrink-0" />
                      <div className="flex-1 text-zinc-900 dark:text-zinc-100">
                        {parseInline(cleanLine)}
                      </div>
                    </div>
                  );
                }

                if (!line.trim()) {
                  return <div key={lIdx} className="h-1.5" />;
                }

                return (
                  <p
                    key={lIdx}
                    className="my-1 text-[13.5px] font-medium leading-relaxed text-zinc-900 dark:text-zinc-100"
                  >
                    {parseInline(line)}
                  </p>
                );
              })}
            </div>
          );
        })}

        {isStreamingActive && (
          <span className="inline-block w-1.5 h-3.5 ml-1 rounded-sm bg-cyan-500 animate-pulse align-middle" />
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Dimmed Backdrop for Focus (Zero Cluttered Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity"
            aria-hidden="true"
          />

          {/* Dialog Container: Full-bleed bottom sheet on mobile, clean window on desktop */}
          <motion.div
            role="dialog"
            aria-label="Maro — Technical Assistant"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 flex flex-col w-full sm:w-[480px] h-[90vh] sm:h-[640px] sm:max-h-[calc(100vh-3.5rem)] rounded-t-3xl sm:rounded-2xl bg-white dark:bg-[#0c0c10] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden font-sans"
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="sm:hidden flex items-center justify-center pt-2.5 pb-1">
              <span className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>

            {/* Header: Clean Precision Engineering Header */}
            <header className="px-4 py-3 sm:py-3.5 border-b border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/90 dark:bg-[#101014] flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <AvatarVisual
                  size="sm"
                  isTyping={isTyping}
                  isSpeaking={isReplying}
                  showStatus={false}
                />
                <div className="flex flex-col text-left">
                  <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-none">
                    Maro
                  </h2>
                  <span className="text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 mt-1 leading-none">
                    Omar Torbi • Technical Copilot
                  </span>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 select-none">
                  Esc
                </span>

                <button
                  type="button"
                  onClick={handleClearChat}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  aria-label="Close assistant"
                  title="Close assistant (Esc)"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((msg) => {
                const isCurrentlyStreaming = streamingMsgId === msg.id;
                const isAi = msg.sender === "ai";

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl p-4 transition-all ${
                        isAi
                          ? "bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-zinc-800 rounded-tl-xs shadow-2xs"
                          : "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-[13px] sm:text-[13.5px] tracking-tight rounded-tr-xs shadow-xs"
                      }`}
                    >
                      {/* Maro Sender Title */}
                      {isAi && (
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-zinc-900 dark:text-white select-none tracking-tight">
                          <span>Maro</span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-normal">
                            {msg.timestamp}
                          </span>
                        </div>
                      )}

                      {/* Formatted Content */}
                      {renderFormattedText(msg.text, isCurrentlyStreaming)}

                      {/* Contextual Action Tiles */}
                      {msg.actions && msg.actions.length > 0 && !isCurrentlyStreaming && (
                        <div className="mt-3.5 pt-2.5 border-t border-zinc-200/90 dark:border-zinc-800 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, actIdx) => (
                            <button
                              key={actIdx}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-900 dark:text-zinc-100 text-xs font-semibold tracking-tight transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500"
                            >
                              <span>{act.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp for user messages */}
                    {!isAi && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-semibold mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    )}
                  </motion.div>
                );
              })}

              {/* First-Run Structured Inquiry Tiles (Anti-Slop Content Architecture) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="pt-2"
                >
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider font-semibold">
                    Inquiry Topics
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STARTER_PROMPTS.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleSendMessage(prompt.title)}
                        className="text-left p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/80 dark:hover:bg-zinc-800/90 border border-zinc-200/90 dark:border-zinc-800 transition-colors group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500"
                      >
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors block leading-tight">
                          {prompt.title}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-1 leading-tight font-medium">
                          {prompt.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Calm, Truthful Synthesizing State (No Endless Looping Balls) */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
                  <span>Maro is synthesizing response...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-3.5 border-t border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/95 dark:bg-[#101014] flex items-center gap-2 shrink-0"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={() => {
                    if (!sound.isMuted()) sound.playKey();
                  }}
                  placeholder="Ask about Omar's backend, OCI cloud, or projects..."
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-hidden focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isTyping || isReplying}
                aria-label="Send message"
                title="Send message (Enter)"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-xs shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <span className="hidden sm:inline">Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
