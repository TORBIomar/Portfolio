"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ChromeBot3D, SleepStage, ChromeBotState } from "./ChromeBot3D";
import { sound } from "@/utils/sound";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const AiChatModal = dynamic(
  () => import("./AiChatModal").then((m) => m.AiChatModal),
  { ssr: false }
);

interface ScreenFirefliesProps {
  active: boolean;
  onProgress: (p: number, screenX: number, screenY: number) => void;
  onComplete: () => void;
}

// 5 Organic Glowing Fireflies flying across the screen from left to right
function ScreenFireflies({ active, onProgress, onComplete }: ScreenFirefliesProps) {
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);
  const reqIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const configs = useMemo(
    () => [
      { id: 1, startX: -90, startYFactor: 0.14, targetYOffset: -25, freq: 2.2, waveAmpX: 18, waveAmpY: 26, scale: 1.25, delay: 0.0, phase: 0.0 },
      { id: 2, startX: -130, startYFactor: 0.32, targetYOffset: 20, freq: 2.8, waveAmpX: 24, waveAmpY: 34, scale: 0.95, delay: 0.08, phase: 1.5 },
      { id: 3, startX: -70, startYFactor: 0.5, targetYOffset: -10, freq: 2.0, waveAmpX: 20, waveAmpY: 22, scale: 1.1, delay: 0.03, phase: 3.0 },
      { id: 4, startX: -150, startYFactor: 0.68, targetYOffset: 25, freq: 2.5, waveAmpX: 26, waveAmpY: 28, scale: 0.9, delay: 0.12, phase: 4.2 },
      { id: 5, startX: -100, startYFactor: 0.86, targetYOffset: 5, freq: 1.8, waveAmpX: 16, waveAmpY: 30, scale: 0.85, delay: 0.06, phase: 5.5 },
    ],
    []
  );

  useEffect(() => {
    if (!active) {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      setCoords([]);
      startTimeRef.current = null;
      return;
    }

    const DURATION = 7600; // 7.6s graceful natural flight

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const p = Math.min(1, elapsed / DURATION);

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      // Swarm centroid coordinates for 3D model gaze tracking
      const centroidX = -100 + p * (screenW + 200);
      const botY = screenH - 95;
      const centroidY = THREE.MathUtils.lerp(screenH * 0.5, botY, Math.pow(p, 1.3));

      onProgress(p, centroidX, centroidY);

      const newCoords = configs.map((c) => {
        const indP = THREE.MathUtils.clamp((p - c.delay) / (1 - c.delay), 0, 1);
        const curX = c.startX + indP * (screenW + 220 - c.startX);
        const startY = screenH * c.startYFactor;
        const targetY = botY + c.targetYOffset;
        const curveFactor = Math.pow(indP, 1.35);
        const baseY = THREE.MathUtils.lerp(startY, targetY, curveFactor);

        const timeFactor = (timestamp / 1000) * c.freq + c.phase;
        const waveX = Math.sin(timeFactor * 1.5) * c.waveAmpX;
        const waveY = Math.cos(timeFactor * 2.0) * c.waveAmpY;

        return {
          x: curX + waveX,
          y: baseY + waveY,
        };
      });

      setCoords(newCoords);

      if (p < 1) {
        reqIdRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [active, configs, onProgress, onComplete]);

  if (!active || coords.length === 0) return null;

  return (
    <div className="firefly-screen-overlay" aria-hidden="true">
      {coords.map((pos, idx) => (
        <div
          key={idx}
          className="screen-firefly"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `translate(-50%, -50%) scale(${configs[idx].scale})`,
          }}
        >
          <div className="firefly-aura" />
          <div className="firefly-core" />
          <div className="firefly-wing wing-left" />
          <div className="firefly-wing wing-right" />
        </div>
      ))}
    </div>
  );
}

interface FloatingChatWidgetProps {
  onSelectProject?: (projectId: string) => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onSelectProject,
}) => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [sleepStage, setSleepStage] = useState<SleepStage>("awake");
  const [botState, setBotState] = useState<ChromeBotState>("idle");
  const [fireflyProgress, setFireflyProgress] = useState(0);
  const [fireflyTrackingPos, setFireflyTrackingPos] = useState({ x: 0, y: 0 });

  const [wakeStartTime, setWakeStartTime] = useState(0);
  const [fetchStartTime, setFetchStartTime] = useState(0);
  const [closingStartTime, setClosingStartTime] = useState(0);

  const [showAgentBubble, setShowAgentBubble] = useState(true);
  const [welcomeBubbleText, setWelcomeBubbleText] = useState("");
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bookTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const welcomeBubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpenRef = useRef(isOpen);
  const sleepStageRef = useRef<SleepStage>(sleepStage);
  const isMobileRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Detect mobile & touch devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth <= 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile, show the friendly tap to chat bubble briefly on load
  useEffect(() => {
    if (isMobile && !isOpen) {
      setShowAgentBubble(true);
      const timer = setTimeout(() => {
        setShowAgentBubble(false);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isOpen]);

  // Synchronize refs
  useEffect(() => {
    sleepStageRef.current = sleepStage;
  }, [sleepStage]);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) {
      wakeUp();
      setShowAgentBubble(false);
      setShowWelcomeBubble(false);
    } else {
      resetTimeout();
    }
  }, [isOpen]);

  const wakeUp = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (wakeTimeoutRef.current) clearTimeout(wakeTimeoutRef.current);
    if (bookTimeoutRef.current) clearTimeout(bookTimeoutRef.current);
    setFireflyProgress(0);
    setSleepStage("awake");
  };

  const triggerWelcomeBack = (msg: string) => {
    setWelcomeBubbleText(msg);
    setShowWelcomeBubble(true);
    if (welcomeBubbleTimeoutRef.current) clearTimeout(welcomeBubbleTimeoutRef.current);
    welcomeBubbleTimeoutRef.current = setTimeout(() => {
      setShowWelcomeBubble(false);
    }, 3600);
  };

  const resetTimeout = (delay = 4500) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (bookTimeoutRef.current) clearTimeout(bookTimeoutRef.current);

    if (isOpenRef.current) {
      wakeUp();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (isOpenRef.current) return;

      const isLightMode = theme === "light";

      if (isLightMode) {
        // LIGHT MODE: Head runs off screen to fetch hardcover book and reading glasses
        const now = performance.now();
        setFetchStartTime(now);
        setSleepStage("fetching_book");
        setShowAgentBubble(false);

        bookTimeoutRef.current = setTimeout(() => {
          if (sleepStageRef.current === "fetching_book") {
            setSleepStage("reading");
          }
        }, 1800);
      } else {
        // DARK MODE: 5 Fireflies launch across screen into sleeping mode
        setSleepStage("fireflies");
        setShowAgentBubble(false);
      }
    }, delay);
  };

  // Activity tracking (Desktop & Mobile)
  useEffect(() => {
    const handleUserActivity = () => {
      // 1. If user returned while STILL fetching the book
      if (sleepStageRef.current === "fetching_book") {
        if (bookTimeoutRef.current) clearTimeout(bookTimeoutRef.current);
        setSleepStage("running_back");
        setShowAgentBubble(false);
        triggerWelcomeBack(t.chat.welcomeBackRunner);
        if (wakeTimeoutRef.current) clearTimeout(wakeTimeoutRef.current);
        wakeTimeoutRef.current = setTimeout(() => {
          setSleepStage("awake");
        }, 750);
      }
      // 2. If user returned while reading book with glasses
      else if (sleepStageRef.current === "reading") {
        const now = performance.now();
        setClosingStartTime(now);
        setSleepStage("closing_book");
        setShowAgentBubble(false);
        triggerWelcomeBack(t.chat.welcomeBackReader);
        if (wakeTimeoutRef.current) clearTimeout(wakeTimeoutRef.current);
        wakeTimeoutRef.current = setTimeout(() => {
          setSleepStage("awake");
        }, 1100);
      }
      // 3. Sleeping mode wake-up in dark mode
      else if (sleepStageRef.current === "sleeping") {
        const now = performance.now();
        setWakeStartTime(now);
        setSleepStage("waking");
        setShowAgentBubble(false);
        if (wakeTimeoutRef.current) clearTimeout(wakeTimeoutRef.current);
        wakeTimeoutRef.current = setTimeout(() => {
          setSleepStage("awake");
        }, 1150);
      } else if (sleepStageRef.current === "fireflies") {
        wakeUp();
      } else if (sleepStageRef.current === "awake") {
        wakeUp();
      }

      resetTimeout();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobileRef.current) {
        const wrapper = wrapperRef.current || document.querySelector(".chatbot-canvas-wrapper");
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = e.clientX - centerX;
          const dy = centerY - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const CIRCLE_RADIUS = 750;

          if (dist <= CIRCLE_RADIUS) {
            const depth = 350;
            const yaw = Math.atan2(dx, depth);
            const pitch = -Math.atan2(dy, Math.sqrt(dx * dx + depth * depth));

            mousePosRef.current = {
              x: THREE.MathUtils.clamp(yaw, -1.2, 0.8),
              y: THREE.MathUtils.clamp(pitch, -0.85, 0.55),
            };
            setShowAgentBubble(false);
          } else {
            mousePosRef.current = { x: 0, y: 0 };
            if (!isOpenRef.current && sleepStageRef.current === "awake" && !showWelcomeBubble) {
              setShowAgentBubble(true);
            }
          }
        }
      }

      handleUserActivity();
    };

    const handleMouseLeave = () => {
      if (isOpenRef.current) {
        wakeUp();
        return;
      }
      mousePosRef.current = { x: 0, y: 0 };
      resetTimeout(3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleUserActivity);
    window.addEventListener("blur", handleMouseLeave);
    window.addEventListener("focus", handleUserActivity);

    // Mobile touch & scroll events to keep Maro alive
    window.addEventListener("scroll", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("touchmove", handleUserActivity, { passive: true });

    resetTimeout();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleUserActivity);
      window.removeEventListener("blur", handleMouseLeave);
      window.removeEventListener("focus", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("touchmove", handleUserActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (wakeTimeoutRef.current) clearTimeout(wakeTimeoutRef.current);
      if (bookTimeoutRef.current) clearTimeout(bookTimeoutRef.current);
      if (welcomeBubbleTimeoutRef.current) clearTimeout(welcomeBubbleTimeoutRef.current);
    };
  }, [t.chat.welcomeBackRunner, t.chat.welcomeBackReader, showWelcomeBubble]);

  // Handle tracking fireflies as they fly across screen
  const handleFireflyProgress = (p: number, swarmScreenX: number, swarmScreenY: number) => {
    setFireflyProgress(p);

    const botCenterX = window.innerWidth - 32 - 75;
    const botCenterY = window.innerHeight - 32 - 75;

    const dx = swarmScreenX - botCenterX;
    const dy = botCenterY - swarmScreenY;

    const depth = 350;
    const yaw = THREE.MathUtils.clamp(Math.atan2(dx, depth), -1.1, 0.55);
    const pitch = THREE.MathUtils.clamp(-Math.atan2(dy, Math.sqrt(dx * dx + depth * depth)), -0.7, 0.45);

    setFireflyTrackingPos({ x: yaw, y: pitch });
  };

  const handleFireflyComplete = () => {
    if (!isOpenRef.current) {
      setSleepStage("sleeping");
    }
  };

  // Global event listener to open AI chat from anywhere
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

  const isSleeping = sleepStage === "sleeping";

  return (
    <div className="chatbot-container">
      {/* 5 Fireflies flying from left to right across the screen */}
      <ScreenFireflies
        active={sleepStage === "fireflies"}
        onProgress={handleFireflyProgress}
        onComplete={handleFireflyComplete}
      />

      {/* Floating 3D Character Trigger in Bottom-Right */}
      <div className="fixed bottom-2 right-2 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end select-none pointer-events-auto">
        {/* Welcome Back & Tap to Chat Speech Bubble */}
        <AnimatePresence>
          {!isOpen && (showWelcomeBubble || (isMobile && showAgentBubble)) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.22 }}
              className="chatbot-welcome-bubble"
            >
              {welcomeBubbleText || t.chat.tapToChat}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={wrapperRef}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleToggleChat}
          onMouseEnter={() => sound.playHover()}
          className={`chatbot-canvas-wrapper ${isOpen ? "active" : ""} relative flex items-center justify-center cursor-pointer`}
          title={
            language === "fr"
              ? "Discuter avec Maro — Copilote IA d'Omar"
              : "Chat with Maro — Omar's AI Copilot"
          }
        >
          {/* Subtle ambient luminous aura under the 3D model */}
          <span className="absolute -inset-2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_70%)] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Clean 3D Character Head */}
          <div className="relative w-[150px] h-[150px] sm:w-[185px] sm:h-[185px] flex items-center justify-center">
            <ChromeBot3D
              size={185}
              state={botState}
              mousePosRef={mousePosRef}
              isSleeping={isSleeping}
              isChatOpen={isOpen}
              sleepStage={sleepStage}
              fireflyProgress={fireflyProgress}
              fireflyTrackingPos={fireflyTrackingPos}
              wakeStartTime={wakeStartTime}
              fetchStartTime={fetchStartTime}
              closingStartTime={closingStartTime}
              isMobile={isMobile}
              interactive={true}
              className="drop-shadow-[0_10px_22px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
            />
          </div>
        </motion.div>
      </div>

      {/* The AI Chat Dialog Modal */}
      {isOpen && (
        <AiChatModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelectProject={onSelectProject}
          onBotStateChange={(st) => setBotState(st)}
        />
      )}
    </div>
  );
};
