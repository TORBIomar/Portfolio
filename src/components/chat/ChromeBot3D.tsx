"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "@/context/ThemeContext";

export type ChromeBotState = "idle" | "thinking" | "replying";

export interface ChromeBot3DProps {
  state?: ChromeBotState;
  size?: number; // width & height in px
  className?: string;
  interactive?: boolean;
  isSleeping?: boolean;
  isChatOpen?: boolean;
  mousePosRef?: React.MutableRefObject<{ x: number; y: number }>;
  externalMousePos?: { x: number; y: number };
  onClickReaction?: () => void;
}

export const ChromeBot3D: React.FC<ChromeBot3DProps> = ({
  state = "idle",
  size = 180,
  className = "",
  interactive = true,
  isSleeping = false,
  isChatOpen = false,
  mousePosRef,
  externalMousePos,
  onClickReaction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const sleepingRef = useRef(isSleeping);
  const chatOpenRef = useRef(isChatOpen);
  const mouseRef = useRef({ x: 0, y: 0 });
  const externalMouseRef = useRef(externalMousePos);
  const clickBopRef = useRef(0);

  // Read portfolio theme
  const { theme } = useTheme();
  const themeRef = useRef<"dark" | "light">(theme || "dark");

  useEffect(() => {
    themeRef.current = theme || "dark";
  }, [theme]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    sleepingRef.current = isSleeping;
  }, [isSleeping]);

  useEffect(() => {
    chatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  useEffect(() => {
    externalMouseRef.current = externalMousePos;
  }, [externalMousePos]);

  const handleContainerClick = () => {
    // Trigger cool 3D springy bop on click
    clickBopRef.current = 1.0;
    if (onClickReaction) onClickReaction();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Photorealistic Studio Environment (RoomEnvironment + PMREM)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envRenderTarget = pmremGenerator.fromScene(roomEnv);
    scene.environment = envRenderTarget.texture;

    // 3. Materials configured for Theme-Aware Liquid Metal
    const isDarkInitial = themeRef.current === "dark";

    // Head / Hair / Ears Material
    // Dark mode: Midnight Obsidian Titanium with metallic luster
    // Light mode: High-definition Liquid Satin Chrome with deep contour shading
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDarkInitial ? 0x15171f : 0x828e9c),
      metalness: isDarkInitial ? 0.95 : 0.92,
      roughness: isDarkInitial ? 0.12 : 0.16,
      envMapIntensity: isDarkInitial ? 2.4 : 1.35,
      clearcoat: 1.0,
      clearcoatRoughness: isDarkInitial ? 0.08 : 0.09,
      reflectivity: 1.0,
    });

    // Cybernetic Eyes Material
    // Dark mode: Glowing neon cyan electric core
    // Light mode: Polished deep onyx obsidian glass with catchlight
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isDarkInitial ? 0x00f2fe : 0x0c0f17),
      roughness: isDarkInitial ? 0.1 : 0.12,
      metalness: isDarkInitial ? 0.4 : 0.85,
      emissive: new THREE.Color(isDarkInitial ? 0x00f2fe : 0x000000),
      emissiveIntensity: isDarkInitial ? 1.2 : 0.0,
    });

    // 4. Root Face Group
    const faceGroup = new THREE.Group();
    scene.add(faceGroup);

    // 5. Geometries & Meshes (Faithful to character geometry)
    // Head: Sphere [1, 48, 48] scaled [1, 1.05, 1]
    const headGeometry = new THREE.SphereGeometry(1, 48, 48);
    const headMesh = new THREE.Mesh(headGeometry, chromeMaterial);
    headMesh.scale.set(1, 1.05, 1);
    faceGroup.add(headMesh);

    // Hair Top Left: Sphere [0.35, 32, 32] scale [1, 1.8, 1] pos [-0.5, 0.8, 0.4] rot [0.4, -0.2, -0.5]
    const hairTLGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const hairTLMesh = new THREE.Mesh(hairTLGeo, chromeMaterial);
    hairTLMesh.scale.set(1, 1.8, 1);
    hairTLMesh.position.set(-0.5, 0.8, 0.4);
    hairTLMesh.rotation.set(0.4, -0.2, -0.5);
    faceGroup.add(hairTLMesh);

    // Hair Top Middle: Sphere [0.4, 32, 32] scale [1, 1.8, 1] pos [0, 0.95, 0.5] rot [0.5, 0, 0]
    const hairTMGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const hairTMMesh = new THREE.Mesh(hairTMGeo, chromeMaterial);
    hairTMMesh.scale.set(1, 1.8, 1);
    hairTMMesh.position.set(0, 0.95, 0.5);
    hairTMMesh.rotation.set(0.5, 0, 0);
    faceGroup.add(hairTMMesh);

    // Hair Top Right: Sphere [0.35, 32, 32] scale [1, 1.8, 1] pos [0.5, 0.8, 0.4] rot [0.4, 0.2, 0.5]
    const hairTRGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const hairTRMesh = new THREE.Mesh(hairTRGeo, chromeMaterial);
    hairTRMesh.scale.set(1, 1.8, 1);
    hairTRMesh.position.set(0.5, 0.8, 0.4);
    hairTRMesh.rotation.set(0.4, 0.2, 0.5);
    faceGroup.add(hairTRMesh);

    // Hair Back Left: Sphere [0.25, 32, 32] scale [1, 1.5, 1] pos [-0.8, 0.3, -0.2] rot [0.2, 0, 0.5]
    const hairBLGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const hairBLMesh = new THREE.Mesh(hairBLGeo, chromeMaterial);
    hairBLMesh.scale.set(1, 1.5, 1);
    hairBLMesh.position.set(-0.8, 0.3, -0.2);
    hairBLMesh.rotation.set(0.2, 0, 0.5);
    faceGroup.add(hairBLMesh);

    // Hair Back Right: Sphere [0.25, 32, 32] scale [1, 1.5, 1] pos [0.8, 0.3, -0.2] rot [0.2, 0, -0.5]
    const hairBRGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const hairBRMesh = new THREE.Mesh(hairBRGeo, chromeMaterial);
    hairBRMesh.scale.set(1, 1.5, 1);
    hairBRMesh.position.set(0.8, 0.3, -0.2);
    hairBRMesh.rotation.set(0.2, 0, -0.5);
    faceGroup.add(hairBRMesh);

    // Hair Back Bottom Left: Sphere [0.2, 32, 32] scale [1, 1.2, 1] pos [-0.5, -0.5, -0.6] rot [0, 0, 0.3]
    const hairBBLGeo = new THREE.SphereGeometry(0.2, 32, 32);
    const hairBBLMesh = new THREE.Mesh(hairBBLGeo, chromeMaterial);
    hairBBLMesh.scale.set(1, 1.2, 1);
    hairBBLMesh.position.set(-0.5, -0.5, -0.6);
    hairBBLMesh.rotation.set(0, 0, 0.3);
    faceGroup.add(hairBBLMesh);

    // Hair Back Bottom Right: Sphere [0.2, 32, 32] scale [1, 1.2, 1] pos [0.5, -0.5, -0.6] rot [0, 0, -0.3]
    const hairBBRGeo = new THREE.SphereGeometry(0.2, 32, 32);
    const hairBBRMesh = new THREE.Mesh(hairBBRGeo, chromeMaterial);
    hairBBRMesh.scale.set(1, 1.2, 1);
    hairBBRMesh.position.set(0.5, -0.5, -0.6);
    hairBBRMesh.rotation.set(0, 0, -0.3);
    faceGroup.add(hairBBRMesh);

    // Ears: Spheres [0.15, 32, 32] scale [1, 1.2, 1]
    const earGeo = new THREE.SphereGeometry(0.15, 32, 32);
    const earLeft = new THREE.Mesh(earGeo, chromeMaterial);
    earLeft.scale.set(1, 1.2, 1);
    earLeft.position.set(-1.0, 0, 0.1);
    earLeft.rotation.set(0, 0, 0.3);
    faceGroup.add(earLeft);

    const earRight = new THREE.Mesh(earGeo, chromeMaterial);
    earRight.scale.set(1, 1.2, 1);
    earRight.position.set(1.0, 0, 0.1);
    earRight.rotation.set(0, 0, -0.3);
    faceGroup.add(earRight);

    // Eyes: Spheres [0.08, 32, 32] scale [1, 2.5, 1] pos [-0.35, 0.1, 0.95] & [0.35, 0.1, 0.95]
    const eyeGeo = new THREE.SphereGeometry(0.08, 32, 32);
    const leftEyeMesh = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEyeMesh.scale.set(1, 2.5, 1);
    leftEyeMesh.position.set(-0.35, 0.1, 0.95);
    faceGroup.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEyeMesh.scale.set(1, 2.5, 1);
    rightEyeMesh.position.set(0.35, 0.1, 0.95);
    faceGroup.add(rightEyeMesh);

    renderer.toneMappingExposure = isDarkInitial ? 1.25 : 1.05;

    // 6. Dynamic Lights
    const ambientLight = new THREE.AmbientLight(
      isDarkInitial ? 0x0f172a : 0x94a3b8,
      isDarkInitial ? 1.0 : 0.75
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDarkInitial ? 2.6 : 2.4);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      isDarkInitial ? 0x0284c7 : 0x334155,
      isDarkInitial ? 1.4 : 1.2
    );
    fillLight.position.set(-8, -6, 5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(
      isDarkInitial ? 0x00f2fe : 0x0284c7,
      isDarkInitial ? 3.5 : 2.6,
      12
    );
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    const gleamLight = new THREE.PointLight(0xffffff, isDarkInitial ? 1.2 : 0.9, 6);
    gleamLight.position.set(0, 0, 4);
    scene.add(gleamLight);

    // 7. Mouse Event Tracking (fallback if not driven externally)
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || externalMouseRef.current || mousePosRef) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = {
        x: THREE.MathUtils.clamp(x * 0.7, -1.0, 0.8),
        y: THREE.MathUtils.clamp(y * 0.5, -0.6, 0.5),
      };
    };

    if (interactive && !externalMousePos && !mousePosRef) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // 8. Expressive Blinking & Double-Blink Logic
    let isBlinking = false;
    let blinkTimeout: ReturnType<typeof setTimeout> | null = null;
    let nextBlinkTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerBlink = () => {
      if (!sleepingRef.current) {
        isBlinking = true;
        blinkTimeout = setTimeout(() => {
          isBlinking = false;
          // 25% chance of a quick organic double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              isBlinking = true;
              setTimeout(() => {
                isBlinking = false;
              }, 120);
            }, 100);
          }
        }, 140);
      }
      const delay = Math.random() * 2800 + 2000;
      nextBlinkTimer = setTimeout(triggerBlink, delay);
    };

    nextBlinkTimer = setTimeout(triggerBlink, 2200);

    // 9. Animation Loop
    let animId: number;
    const startTime = performance.now() * 0.001;
    let lastTheme = themeRef.current;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001 - startTime;

      const currentTheme = themeRef.current;
      const isDark = currentTheme === "dark";

      // Dynamically adapt materials & lights on theme toggle
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        if (isDark) {
          // Switch to Midnight Obsidian Titanium
          chromeMaterial.color.setHex(0x15171f);
          chromeMaterial.metalness = 0.95;
          chromeMaterial.roughness = 0.12;
          chromeMaterial.clearcoatRoughness = 0.08;
          chromeMaterial.envMapIntensity = 2.4;

          eyeMaterial.color.setHex(0x00f2fe);
          eyeMaterial.emissive.setHex(0x00f2fe);
          eyeMaterial.emissiveIntensity = 1.2;
          eyeMaterial.metalness = 0.4;
          eyeMaterial.roughness = 0.1;

          ambientLight.color.setHex(0x0f172a);
          ambientLight.intensity = 1.0;
          keyLight.intensity = 2.6;
          fillLight.color.setHex(0x0284c7);
          fillLight.intensity = 1.4;
          rimLight.color.setHex(0x00f2fe);
          rimLight.intensity = 3.5;
          renderer.toneMappingExposure = 1.25;
        } else {
          // Switch to Liquid Satin Chrome with deep contour shading
          chromeMaterial.color.setHex(0x828e9c);
          chromeMaterial.metalness = 0.92;
          chromeMaterial.roughness = 0.16;
          chromeMaterial.clearcoatRoughness = 0.09;
          chromeMaterial.envMapIntensity = 1.35;

          eyeMaterial.color.setHex(0x0c0f17);
          eyeMaterial.emissive.setHex(0x000000);
          eyeMaterial.emissiveIntensity = 0.0;
          eyeMaterial.metalness = 0.85;
          eyeMaterial.roughness = 0.12;

          ambientLight.color.setHex(0x94a3b8);
          ambientLight.intensity = 0.75;
          keyLight.intensity = 2.4;
          fillLight.color.setHex(0x334155);
          fillLight.intensity = 1.2;
          rimLight.color.setHex(0x0284c7);
          rimLight.intensity = 2.6;
          renderer.toneMappingExposure = 1.05;
        }
      }

      const currentState = stateRef.current;
      const currentSleeping = sleepingRef.current;
      const currentChatOpen = chatOpenRef.current;
      const actuallySleeping = currentSleeping && !currentChatOpen;

      // Anti-gravity zero-gravity floating with organic double wave
      const floatSpeed = actuallySleeping ? 0.7 : 1.4;
      const floatAmplitude = actuallySleeping ? 0.04 : 0.12;
      faceGroup.position.y =
        -0.08 +
        Math.sin(t * floatSpeed) * floatAmplitude +
        Math.cos(t * 0.7) * 0.02;

      // Handle interactive click spring bop
      if (clickBopRef.current > 0.01) {
        clickBopRef.current *= 0.90; // spring decay
        const bopScale = 1 + Math.sin(clickBopRef.current * Math.PI) * 0.14;
        faceGroup.scale.set(bopScale, bopScale, bopScale);
      } else {
        faceGroup.scale.set(1, 1, 1);
      }

      // Target Yaw & Pitch angles
      let targetYaw = mousePosRef?.current
        ? mousePosRef.current.x
        : externalMouseRef.current
        ? externalMouseRef.current.x
        : mouseRef.current.x;

      let targetPitch = mousePosRef?.current
        ? mousePosRef.current.y
        : externalMouseRef.current
        ? externalMouseRef.current.y
        : mouseRef.current.y;

      let targetZ = 0;

      if (currentChatOpen) {
        // Look towards chat conversation window
        targetYaw = -0.35;
        targetPitch = 0.05;
        targetZ = -0.02;
      } else if (actuallySleeping) {
        // Nod head down into peaceful sleep
        targetYaw = 0;
        targetPitch = 0.48;
        targetZ = 0;
      } else {
        // Gentle floating Z tilt for zero-gravity feeling
        targetZ = Math.sin(t * 1.1) * 0.035;
      }

      // Cognitive State Variations
      if (currentState === "thinking") {
        targetZ = -0.10; // Thoughtful head tilt
        targetPitch -= 0.05;
      } else if (currentState === "replying") {
        const speechNod = Math.sin(t * 5.2) * 0.05;
        targetPitch += speechNod; // Affirmative nodding
      }

      // Smooth interpolation for head rotations
      faceGroup.rotation.y = THREE.MathUtils.lerp(faceGroup.rotation.y, targetYaw, 0.08);
      faceGroup.rotation.x = THREE.MathUtils.lerp(faceGroup.rotation.x, targetPitch, 0.08);
      faceGroup.rotation.z = THREE.MathUtils.lerp(faceGroup.rotation.z, targetZ, 0.1);

      // Eyes Scale Logic (blinking, sleep, or attentive gaze)
      const targetEyeScaleY = actuallySleeping ? 0.06 : isBlinking ? 0.09 : 2.5;
      const targetEyeScaleX = currentState === "thinking" ? 0.9 : currentState === "replying" ? 1.1 : 1.0;

      leftEyeMesh.scale.y = THREE.MathUtils.lerp(leftEyeMesh.scale.y, targetEyeScaleY, 0.22);
      rightEyeMesh.scale.y = THREE.MathUtils.lerp(rightEyeMesh.scale.y, targetEyeScaleY, 0.22);

      leftEyeMesh.scale.x = THREE.MathUtils.lerp(leftEyeMesh.scale.x, targetEyeScaleX, 0.1);
      rightEyeMesh.scale.x = THREE.MathUtils.lerp(rightEyeMesh.scale.x, targetEyeScaleX, 0.1);

      // Eye Glow Reactions for Thinking / Replying
      if (currentState === "thinking") {
        const pulse = (Math.sin(t * 7) + 1) * 0.5;
        if (isDark) {
          eyeMaterial.emissive.setRGB(0.1 * pulse, 0.8 + 0.2 * pulse, 1.0);
          eyeMaterial.emissiveIntensity = 1.0 + 0.8 * pulse;
        } else {
          eyeMaterial.emissive.setRGB(0.02 * pulse, 0.55 * pulse, 0.85 * pulse);
          eyeMaterial.emissiveIntensity = 1.0 * pulse;
        }
      } else if (currentState === "replying") {
        if (isDark) {
          eyeMaterial.emissive.setRGB(0.2, 0.95, 0.8);
          eyeMaterial.emissiveIntensity = 1.4;
        } else {
          eyeMaterial.emissive.setRGB(0.05, 0.70, 0.50);
          eyeMaterial.emissiveIntensity = 0.9;
        }
      } else {
        if (isDark) {
          eyeMaterial.emissive.setHex(0x00f2fe);
          eyeMaterial.emissiveIntensity = 1.0;
        } else {
          eyeMaterial.emissive.setHex(0x000000);
          eyeMaterial.emissiveIntensity = 0.0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      if (blinkTimeout) clearTimeout(blinkTimeout);
      if (nextBlinkTimer) clearTimeout(nextBlinkTimer);
      if (interactive && !externalMousePos && !mousePosRef) {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      renderer.dispose();
      pmremGenerator.dispose();
      envRenderTarget.dispose();
      roomEnv.dispose();

      headGeometry.dispose();
      hairTLGeo.dispose();
      hairTMGeo.dispose();
      hairTRGeo.dispose();
      hairBLGeo.dispose();
      hairBRGeo.dispose();
      hairBBLGeo.dispose();
      hairBBRGeo.dispose();
      earGeo.dispose();
      eyeGeo.dispose();

      chromeMaterial.dispose();
      eyeMaterial.dispose();
    };
  }, [size, interactive, externalMousePos]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      onClick={handleContainerClick}
      className={`relative select-none flex items-center justify-center overflow-visible cursor-pointer ${className}`}
    />
  );
};
