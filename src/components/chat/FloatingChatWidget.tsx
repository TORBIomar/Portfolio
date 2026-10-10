"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChromeBot3D } from "./ChromeBot3D";
import { AiChatModal } from "./AiChatModal";
import { sound } from "@/utils/sound";

interface FloatingChatWidgetProps {
  onSelectProject?: (projectId: string) => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onSelectProject,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpenRef = useRef(isOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Synchronize isOpenRef and manage sleep timer
  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) {
      setIsSleeping(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      resetTimeout();
    }
  }, [isOpen]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // If user is inside chat, NEVER fall asleep
    if (isOpenRef.current) {
      setIsSleeping(false);
      return;
    }
    // 7 seconds of inactivity outside chat = sleep
    timeoutRef.current = setTimeout(() => {
      if (!isOpenRef.current) {
        setIsSleeping(true);
      }
    }, 7000);
  };

  // Cursor tracking, 20cm proximity threshold (~750px), and sleep management
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current || document.querySelector(".chatbot-canvas-wrapper");
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = centerY - e.clientY; // positive dy = cursor is UP
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 20 cm circle area threshold (~750 pixels on standard displays)
        const CIRCLE_RADIUS = 750;

        if (dist <= CIRCLE_RADIUS) {
          // Inside 20cm circle: follow cursor closely!
          const depth = 350;
          const yaw = Math.atan2(dx, depth);
          const pitch = -Math.atan2(dy, Math.sqrt(dx * dx + depth * depth));

          mousePosRef.current = {
            x: THREE.MathUtils.clamp(yaw, -1.2, 0.8),
            y: THREE.MathUtils.clamp(pitch, -0.85, 0.55),
          };
        } else {
          // Outside 20cm circle: smoothly face forward towards user
          mousePosRef.current = { x: 0, y: 0 };
        }
      }
      setIsSleeping(false);
      resetTimeout();
    };

    const handleMouseLeave = () => {
      if (isOpenRef.current) {
        setIsSleeping(false);
        return;
      }
      mousePosRef.current = { x: 0, y: 0 };
      resetTimeout();
    };

    const handleMouseEnter = () => {
      setIsSleeping(false);
      resetTimeout();
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleMouseLeave);
    window.addEventListener("focus", handleMouseEnter);
    resetTimeout();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleMouseLeave);
      window.removeEventListener("focus", handleMouseEnter);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Global event listener to open AI chat from anywhere (e.g. Navbar or Command Palette)
  useEffect(() => {
    const handleOpenChatEvent = () => {
      setIsOpen(true);
      sound.playClick();
    };

    window.addEventListener("open-ai-chat", handleOpenChatEvent);
    return () => window.removeEventListener("open-ai-chat", handleOpenChatEvent);
  }, []);

  const handleToggleChat = () => {
    sound.playClick();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="chatbot-container">
      {/* Floating 3D Character Trigger in Bottom-Right */}
      <div className="fixed bottom-2 right-2 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end select-none pointer-events-auto">
        <motion.div
          ref={wrapperRef}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleToggleChat}
          onMouseEnter={() => sound.playHover()}
          className={`chatbot-canvas-wrapper ${isOpen ? "active" : ""} relative flex items-center justify-center cursor-pointer`}
          title="Omar's AI Copilot — Click to chat"
        >
          {/* Subtle ambient luminous aura under the 3D model */}
          <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-sky-400/15 via-zinc-300/10 to-transparent dark:from-cyan-500/25 dark:via-blue-600/15 dark:to-cyan-400/15 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Clean, enlarged 3D Liquid Metal Character Head */}
          <div className="relative w-[150px] h-[150px] sm:w-[185px] sm:h-[185px] flex items-center justify-center">
            <ChromeBot3D
              size={185}
              mousePosRef={mousePosRef}
              isSleeping={isSleeping}
              isChatOpen={isOpen}
              interactive={true}
              className="drop-shadow-[0_10px_22px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
            />
          </div>
        </motion.div>
      </div>

      {/* The AI Chat Dialog Modal */}
      <AiChatModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectProject={onSelectProject}
      />
    </div>
  );
};
