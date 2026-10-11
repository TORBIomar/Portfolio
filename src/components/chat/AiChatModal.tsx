"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
} from "lucide-react";
import { AvatarVisual } from "./AvatarVisual";
import {
  ChatMessage,
  ChatAction,
  INITIAL_SUGGESTIONS,
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
  "Who is Maro?",
  "Tell me about Omar",
  "Key projects & tech stack",
  "Internship & availability",
];

// Interactive Syntax-highlighted Terminal Code Block with Copy Feedback
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
    <div className="my-2.5 rounded-xl overflow-hidden border border-zinc-300 dark:border-white/10 bg-[#09090c] text-zinc-100 shadow-md">
      <div className="px-3.5 py-1.5 bg-[#121217] border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-zinc-300 text-[10px] uppercase tracking-wider font-bold">
            {language || "code"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center px-2 py-0.5 rounded-md hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10.5px] font-mono font-medium"
          title="Copy code"
        >
          {copied ? (
            <span className="text-emerald-400 font-bold">Copied</span>
          ) : (
            <span className="font-semibold">Copy</span>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-xs font-mono font-medium leading-relaxed text-zinc-200">
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

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping, isReplying]);

  // Keyboard shortcut: Escape to close
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
        id: createMsgId("cleared"),
        sender: "ai",
        text: "Conversation reset! I'm **Maro** — what would you like to explore about Omar's architecture, projects, or credentials?",
        timestamp: getLocalTimeString(),
      },
    ]);
    showToast("Chat history reset");
  };

  // Helper to stream typewriter response smoothly with adaptive human typing cadence
  const streamAiResponse = async (
    fullText: string,
    actions?: ChatAction[],
    suggestions?: string[]
  ) => {
    const msgId = createMsgId("ai");
    setStreamingMsgId(msgId);
    setIsReplying(true);
    sound.playSuccess();

    // Create placeholder message
    const newMsg: ChatMessage = {
      id: msgId,
      sender: "ai",
      text: "",
      timestamp: getLocalTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    const totalLen = fullText.length;
    // Dynamic step size: fast fluid water stream for long text, precise for short
    const stepSize = totalLen > 350 ? 3 : totalLen > 140 ? 2 : 1;
    let index = 0;

    while (index < totalLen) {
      const nextIndex = Math.min(totalLen, index + stepSize);
      const partial = fullText.slice(0, nextIndex);
      index = nextIndex;

      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, text: partial } : m))
      );

      // Soft keystroke sound periodically
      if (index % 18 === 0 && !sound.isMuted()) {
        sound.playHover();
      }

      // Natural speech punctuation cadence pauses
      const lastChar = fullText[index - 1];
      let delay = 12;
      if (lastChar === "." || lastChar === "!" || lastChar === "?") {
        delay = 44; // natural thought pause
      } else if (lastChar === "," || lastChar === ";" || lastChar === ":") {
        delay = 24;
      } else if (lastChar === "\n") {
        delay = 32;
      }

      await new Promise((r) => setTimeout(r, delay));
    }

    // Attach actions and suggestions once stream concludes
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
    }, 1000);
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

      // 1. Call Next.js /api/chat (powered by Gemini)
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

      // 2. Local Fallback if server timed out
      if (!answered) {
        await new Promise((r) => setTimeout(r, 350));
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

  // Markdown formatting for code blocks, headers, inline code, bold, links, and bullet points
  const renderFormattedText = (rawText: string, isStreamingActive: boolean) => {
    // Separate fenced code blocks (```lang\n...\n```) from standard text
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
      <div className="relative space-y-2 text-[13px] sm:text-[13.5px] font-medium leading-relaxed tracking-[-0.01em]">
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
                    // Links: [label](url)
                    const linkMatch = cur.match(/^\[([^\]]+)\]\(([^)]+)\)/);
                    if (linkMatch) {
                      parts.push(
                        <a
                          key={`lnk-${lIdx}-${pKey++}`}
                          href={linkMatch[2]}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold underline underline-offset-3 text-cyan-600 dark:text-cyan-400 hover:opacity-85"
                        >
                          {linkMatch[1]}
                        </a>
                      );
                      cur = cur.slice(linkMatch[0].length);
                      continue;
                    }

                    // Bold: **text**
                    const boldMatch = cur.match(/^\*\*([^*]+)\*\*/);
                    if (boldMatch) {
                      parts.push(
                        <strong key={`b-${lIdx}-${pKey++}`} className="font-bold text-zinc-950 dark:text-white tracking-tight">
                          {boldMatch[1]}
                        </strong>
                      );
                      cur = cur.slice(boldMatch[0].length);
                      continue;
                    }

                    // Inline code: `code`
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
                    <h4 key={lIdx} className="font-bold text-sm sm:text-[14px] text-zinc-950 dark:text-white pt-2 pb-1 tracking-tight border-b border-zinc-200/60 dark:border-white/5">
                      {parseInline(cleanLine)}
                    </h4>
                  );
                }

                if (isBullet) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 my-1 text-[13px] sm:text-[13.5px] font-medium leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.85)]" />
                      <div className="flex-1 text-zinc-900 dark:text-zinc-100">{parseInline(cleanLine)}</div>
                    </div>
                  );
                }

                if (!line.trim()) {
                  return <div key={lIdx} className="h-1.5" />;
                }

                return (
                  <p key={lIdx} className="my-1 text-[13px] sm:text-[13.5px] font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
                    {parseInline(line)}
                  </p>
                );
              })}
            </div>
          );
        })}

        {/* Live typing cyber pulse cursor */}
        {isStreamingActive && (
          <span className="inline-block w-1.5 h-4 ml-1.5 rounded-full bg-gradient-to-b from-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(6,182,212,0.9)] animate-pulse align-middle" />
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col w-[min(440px,calc(100vw-2rem))] h-[min(600px,calc(100vh-5rem))] rounded-3xl bg-white/95 dark:bg-[#0a0a0d]/95 border border-zinc-200/90 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden font-sans backdrop-blur-2xl"
        >
          {/* Header - Simple & Clean Window Chrome */}
          <div className="px-4 py-3.5 border-b border-zinc-200/80 dark:border-white/10 bg-zinc-50/90 dark:bg-[#0c0c10]/90 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <AvatarVisual
                size="sm"
                isTyping={isTyping}
                isSpeaking={isReplying}
                showStatus={false}
              />
              <div className="text-left">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight leading-none">
                  Maro
                </h3>
              </div>
            </div>

            {/* Header Controls: Clean Reset & Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                title="Close chat (Esc)"
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isCurrentlyStreaming = streamingMsgId === msg.id;
              const isAi = msg.sender === "ai";

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 transition-all shadow-2xs ${
                      isAi
                        ? "bg-zinc-100/95 dark:bg-[#0c0c10]/95 text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-white/10 rounded-tl-sm backdrop-blur-xl shadow-xs"
                        : "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold text-[13px] sm:text-[13.5px] tracking-tight rounded-tr-sm shadow-md"
                    }`}
                  >
                    {/* Maro identity header */}
                    {isAi && (
                      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-zinc-900 dark:text-white select-none tracking-tight">
                        <span>Maro</span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono font-normal">
                          // Engineering Copilot
                        </span>
                      </div>
                    )}

                    {/* Rendered Text */}
                    {renderFormattedText(msg.text, isCurrentlyStreaming)}

                    {/* Contextual Action Buttons */}
                    {msg.actions && msg.actions.length > 0 && !isCurrentlyStreaming && (
                      <div className="mt-3.5 pt-2.5 border-t border-zinc-200/80 dark:border-white/10 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, actIdx) => (
                          <button
                            key={actIdx}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold tracking-tight transition-all cursor-pointer border border-zinc-200/90 dark:border-white/10 shadow-xs hover:scale-[1.02]"
                          >
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-semibold mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </motion.div>
              );
            })}

            {/* Simple starter prompt pills right beneath initial greeting */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-1.5 pt-1"
              >
                {STARTER_PROMPTS.map((promptText, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleSendMessage(promptText)}
                    className="px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-850 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer border border-zinc-200/90 dark:border-white/10 hover:scale-[1.02]"
                  >
                    {promptText}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Modern Animated Synthesizing / Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl rounded-tl-sm bg-zinc-100/95 dark:bg-[#0c0c10]/95 border border-zinc-200/90 dark:border-white/10 w-fit backdrop-blur-xl shadow-xs"
              >
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-bounce shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </div>
                <span className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-300">
                  Maro is synthesizing response...
                </span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Clean Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-3.5 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50/90 dark:bg-[#0c0c10]/90 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={() => {
                if (!sound.isMuted()) sound.playKey();
              }}
              placeholder="Ask Maro anything about Omar..."
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-hidden focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping || isReplying}
              className="p-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 disabled:opacity-30 hover:opacity-90 transition-opacity cursor-pointer shadow-xs shrink-0 flex items-center justify-center"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
