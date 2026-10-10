"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChromeBot3D, ChromeBotState } from "./ChromeBot3D";

export type AvatarMode = "chrome";

interface AvatarVisualProps {
  size?: "sm" | "md" | "lg" | "xl";
  mode?: AvatarMode;
  isTyping?: boolean;
  isSpeaking?: boolean;
  showStatus?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AvatarVisual: React.FC<AvatarVisualProps> = ({
  size = "md",
  isTyping = false,
  isSpeaking = false,
  showStatus = true,
  className = "",
  onClick,
}) => {
  // Enhanced, enlarged 3D pixel scales
  const pixelMap = {
    sm: 44,
    md: 70,
    lg: 110,
    xl: 160,
  };

  const containerSizeMap = {
    sm: "w-11 h-11",
    md: "w-18 h-18",
    lg: "w-28 h-28",
    xl: "w-40 h-40",
  };

  const badgeSizeMap = {
    sm: "w-2.5 h-2.5",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
    xl: "w-5 h-5",
  };

  const chromeState: ChromeBotState = isSpeaking
    ? "replying"
    : isTyping
    ? "thinking"
    : "idle";

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group cursor-pointer ${className}`}
    >
      {/* Specular ambient halo */}
      <motion.div
        animate={
          isTyping || isSpeaking
            ? { scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }
            : { scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }
        }
        transition={{
          duration: isTyping || isSpeaking ? 1.4 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-400/20 via-zinc-300/25 to-white/30 dark:from-cyan-400/25 dark:via-zinc-500/20 dark:to-white/20 blur-md pointer-events-none"
      />

      {/* 3D Model Outer Frame Container */}
      <div
        className={`relative ${containerSizeMap[size]} rounded-2xl overflow-hidden p-[1px] bg-gradient-to-b from-white via-zinc-200 to-zinc-300 dark:from-white/20 dark:via-zinc-800 dark:to-zinc-950 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_35px_rgba(0,0,0,0.85)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 backdrop-blur-md`}
      >
        <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-150 dark:from-[#0d0d10] dark:to-[#050507] flex items-center justify-center border border-zinc-200 dark:border-white/10">
          <ChromeBot3D
            size={pixelMap[size]}
            state={chromeState}
          />
        </div>
      </div>

      {/* Online Status Beacon */}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${badgeSizeMap[size]} rounded-full bg-emerald-500 border-2 border-white dark:border-black shadow-xs flex items-center justify-center z-10`}
          title="3D AI Copilot Online"
        >
          <span className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-60" />
        </span>
      )}
    </div>
  );
};
