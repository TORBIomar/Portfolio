"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "@/context/ThemeContext";

export type ChromeBotState = "idle" | "thinking" | "replying";

export type SleepStage =
  | "awake"
  | "fireflies"
  | "sleeping"
  | "waking"
  | "fetching_book"
  | "reading"
  | "closing_book"
  | "running_back";

export interface ChromeBot3DProps {
  state?: ChromeBotState;
  size?: number; // width & height in px
  className?: string;
  interactive?: boolean;
  isSleeping?: boolean;
  isChatOpen?: boolean;
  sleepStage?: SleepStage;
  fireflyProgress?: number;
  fireflyTrackingPos?: { x: number; y: number };
  wakeStartTime?: number;
  fetchStartTime?: number;
  closingStartTime?: number;
  mousePosRef?: React.MutableRefObject<{ x: number; y: number }>;
  externalMousePos?: { x: number; y: number };
  onClickReaction?: () => void;
  isMobile?: boolean;
}

// 3D Extruded and Beveled letter "Z" geometry matching the 3D chrome model
function createZGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1);
  shape.lineTo(1, 1);
  shape.lineTo(1, 0.76);
  shape.lineTo(0.34, 0.24);
  shape.lineTo(1, 0.24);
  shape.lineTo(1, 0);
  shape.lineTo(0, 0);
  shape.lineTo(0, 0.24);
  shape.lineTo(0.66, 0.76);
  shape.lineTo(0, 0.76);
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 4,
  });
  geom.center();
  return geom;
}

export const ChromeBot3D: React.FC<ChromeBot3DProps> = ({
  state = "idle",
  size = 180,
  className = "",
  interactive = true,
  isSleeping = false,
  isChatOpen = false,
  sleepStage = "awake",
  fireflyProgress = 0,
  fireflyTrackingPos = { x: 0, y: 0 },
  wakeStartTime = 0,
  fetchStartTime = 0,
  closingStartTime = 0,
  mousePosRef,
  externalMousePos,
  onClickReaction,
  isMobile = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const sleepingRef = useRef(isSleeping);
  const chatOpenRef = useRef(isChatOpen);
  const sleepStageRef = useRef<SleepStage>(sleepStage);
  const fireflyProgressRef = useRef(fireflyProgress);
  const fireflyTrackingRef = useRef(fireflyTrackingPos);
  const wakeStartTimeRef = useRef(wakeStartTime);
  const fetchStartTimeRef = useRef(fetchStartTime);
  const closingStartTimeRef = useRef(closingStartTime);
  const isMobileRef = useRef(isMobile);

  const mouseRef = useRef({ x: 0, y: 0 });
  const externalMouseRef = useRef(externalMousePos);
  const clickBopRef = useRef(0);
  const spinProgressRef = useRef(0);
  const spinVelocityRef = useRef(0);
  const isWinkingRef = useRef(false);

  // Read portfolio theme
  const { theme } = useTheme();
  const themeRef = useRef<"dark" | "light">(theme || "dark");

  useEffect(() => {
    themeRef.current = theme || "dark";
  }, [theme]);

  useEffect(() => {
    // Celebratory friendly wink when completing speech
    if (stateRef.current === "replying" && state === "idle") {
      isWinkingRef.current = true;
      setTimeout(() => {
        isWinkingRef.current = false;
      }, 350);
    }
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    sleepingRef.current = isSleeping;
  }, [isSleeping]);

  useEffect(() => {
    chatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  useEffect(() => {
    sleepStageRef.current = sleepStage;
  }, [sleepStage]);

  useEffect(() => {
    fireflyProgressRef.current = fireflyProgress;
  }, [fireflyProgress]);

  useEffect(() => {
    fireflyTrackingRef.current = fireflyTrackingPos;
  }, [fireflyTrackingPos]);

  useEffect(() => {
    wakeStartTimeRef.current = wakeStartTime;
  }, [wakeStartTime]);

  useEffect(() => {
    fetchStartTimeRef.current = fetchStartTime;
  }, [fetchStartTime]);

  useEffect(() => {
    closingStartTimeRef.current = closingStartTime;
  }, [closingStartTime]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    externalMouseRef.current = externalMousePos;
  }, [externalMousePos]);

  const handleContainerClick = () => {
    // Trigger dynamic 3D springy bop and joyous acrobatic spin
    clickBopRef.current = 1.0;
    spinVelocityRef.current = Math.PI * 3.5;
    isWinkingRef.current = true;
    setTimeout(() => {
      isWinkingRef.current = false;
    }, 380);
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

    // 3. Materials configured for Theme-Aware Liquid Metal & Warm Terracotta Branding
    const isDarkInitial = themeRef.current === "dark";

    // Head / Hair / Ears Material
    // Dark mode: Midnight Obsidian Titanium with metallic luster
    // Light mode: High-definition Liquid Satin Chrome
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(isDarkInitial ? 0x15171f : 0x828e9c),
      metalness: isDarkInitial ? 0.95 : 0.92,
      roughness: isDarkInitial ? 0.12 : 0.16,
      envMapIntensity: isDarkInitial ? 2.4 : 1.35,
      clearcoat: 1.0,
      clearcoatRoughness: isDarkInitial ? 0.08 : 0.09,
      reflectivity: 1.0,
    });

    // Cybernetic Eyes & Mouth Material: Luminous Terracotta Glow (Dark) / Polished Onyx Glass (Light)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isDarkInitial ? 0xffb0a1 : 0x0c0f17),
      roughness: isDarkInitial ? 0.1 : 0.14,
      metalness: isDarkInitial ? 0.4 : 0.85,
      emissive: new THREE.Color(isDarkInitial ? 0xffb0a1 : 0xa42f17),
      emissiveIntensity: isDarkInitial ? 1.2 : 0.2,
    });

    // Cybernetic Orbital Halo Material
    const haloMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isDarkInitial ? 0xffb0a1 : 0xa42f17),
      roughness: isDarkInitial ? 0.12 : 0.18,
      metalness: isDarkInitial ? 0.9 : 0.95,
      emissive: new THREE.Color(isDarkInitial ? 0xffb0a1 : 0xa42f17),
      emissiveIntensity: isDarkInitial ? 1.5 : 0.35,
    });

    // Book Materials
    const bookCoverMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.15,
    });
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.8,
      roughness: 0.25,
    });
    const goldBrightMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
    });
    const bookPlateMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
    });
    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
    });
    const textLinesMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.8,
    });
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.4,
    });
    const spineRibMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
    });

    // 4. Root Face Group
    const faceGroup = new THREE.Group();
    scene.add(faceGroup);

    // 5. Geometries & Meshes (Character Geometry)
    // Head: Sphere [1, 48, 48] scaled [1, 1.05, 1]
    const headGeometry = new THREE.SphereGeometry(1, 48, 48);
    const headMesh = new THREE.Mesh(headGeometry, chromeMaterial);
    headMesh.scale.set(1, 1.05, 1);
    faceGroup.add(headMesh);

    // Cybernetic Orbital Halo Ring
    const haloGeo = new THREE.TorusGeometry(0.88, 0.022, 16, 64);
    const haloMesh = new THREE.Mesh(haloGeo, haloMaterial);
    haloMesh.rotation.x = Math.PI / 2.3;
    haloMesh.position.set(0, 0.95, 0);
    faceGroup.add(haloMesh);

    // Hair Geometries
    const hairTLGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const hairTLMesh = new THREE.Mesh(hairTLGeo, chromeMaterial);
    hairTLMesh.scale.set(1, 1.8, 1);
    hairTLMesh.position.set(-0.5, 0.8, 0.4);
    hairTLMesh.rotation.set(0.4, -0.2, -0.5);
    faceGroup.add(hairTLMesh);

    const hairTMGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const hairTMMesh = new THREE.Mesh(hairTMGeo, chromeMaterial);
    hairTMMesh.scale.set(1, 1.8, 1);
    hairTMMesh.position.set(0, 0.95, 0.5);
    hairTMMesh.rotation.set(0.5, 0, 0);
    faceGroup.add(hairTMMesh);

    const hairTRGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const hairTRMesh = new THREE.Mesh(hairTRGeo, chromeMaterial);
    hairTRMesh.scale.set(1, 1.8, 1);
    hairTRMesh.position.set(0.5, 0.8, 0.4);
    hairTRMesh.rotation.set(0.4, 0.2, 0.5);
    faceGroup.add(hairTRMesh);

    const hairBLGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const hairBLMesh = new THREE.Mesh(hairBLGeo, chromeMaterial);
    hairBLMesh.scale.set(1, 1.5, 1);
    hairBLMesh.position.set(-0.8, 0.3, -0.2);
    hairBLMesh.rotation.set(0.2, 0, 0.5);
    faceGroup.add(hairBLMesh);

    const hairBRGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const hairBRMesh = new THREE.Mesh(hairBRGeo, chromeMaterial);
    hairBRMesh.scale.set(1, 1.5, 1);
    hairBRMesh.position.set(0.8, 0.3, -0.2);
    hairBRMesh.rotation.set(0.2, 0, -0.5);
    faceGroup.add(hairBRMesh);

    const hairBBLGeo = new THREE.SphereGeometry(0.2, 32, 32);
    const hairBBLMesh = new THREE.Mesh(hairBBLGeo, chromeMaterial);
    hairBBLMesh.scale.set(1, 1.2, 1);
    hairBBLMesh.position.set(-0.5, -0.5, -0.6);
    hairBBLMesh.rotation.set(0, 0, 0.3);
    faceGroup.add(hairBBLMesh);

    const hairBBRGeo = new THREE.SphereGeometry(0.2, 32, 32);
    const hairBBRMesh = new THREE.Mesh(hairBBRGeo, chromeMaterial);
    hairBBRMesh.scale.set(1, 1.2, 1);
    hairBBRMesh.position.set(0.5, -0.5, -0.6);
    hairBBRMesh.rotation.set(0, 0, -0.3);
    faceGroup.add(hairBBRMesh);

    // Ears
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

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.08, 32, 32);
    const leftEyeMesh = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEyeMesh.scale.set(1, 2.5, 1);
    leftEyeMesh.position.set(-0.35, 0.1, 0.95);
    faceGroup.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEyeMesh.scale.set(1, 2.5, 1);
    rightEyeMesh.position.set(0.35, 0.1, 0.95);
    faceGroup.add(rightEyeMesh);

    // Expressive Mouth Mesh
    const mouthGeo = new THREE.SphereGeometry(0.08, 32, 32);
    const mouthMesh = new THREE.Mesh(mouthGeo, eyeMaterial);
    mouthMesh.scale.set(0.6, 0.12, 0.2);
    mouthMesh.position.set(0, -0.22, 0.96);
    faceGroup.add(mouthMesh);

    // 6. 3D Glasses Component
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.15, 1.05);
    glassesGroup.scale.set(0, 0, 0);

    const lensGeo = new THREE.TorusGeometry(0.22, 0.035, 16, 48);
    const leftLens = new THREE.Mesh(lensGeo, chromeMaterial);
    leftLens.position.set(-0.32, 0, 0);
    glassesGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, chromeMaterial);
    rightLens.position.set(0.32, 0, 0);
    glassesGroup.add(rightLens);

    const bridgeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, chromeMaterial);
    bridgeMesh.rotation.z = Math.PI / 2;
    glassesGroup.add(bridgeMesh);

    const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    const leftArmMesh = new THREE.Mesh(armGeo, chromeMaterial);
    leftArmMesh.position.set(-0.54, 0, -0.3);
    leftArmMesh.rotation.x = Math.PI / 2;
    glassesGroup.add(leftArmMesh);

    const rightArmMesh = new THREE.Mesh(armGeo, chromeMaterial);
    rightArmMesh.position.set(0.54, 0, -0.3);
    rightArmMesh.rotation.x = Math.PI / 2;
    glassesGroup.add(rightArmMesh);

    faceGroup.add(glassesGroup);

    // 7. 3D Hardcover Book Component
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, -0.78, 1.05);
    bookGroup.rotation.x = -0.18;
    bookGroup.scale.set(0, 0, 0);

    const coverBoxGeo = new THREE.BoxGeometry(0.57, 0.77, 0.02);
    const plateBoxGeo = new THREE.BoxGeometry(0.34, 0.22, 0.005);
    const innerPlateGeo = new THREE.BoxGeometry(0.3, 0.18, 0.006);
    const diamondGeo = new THREE.BoxGeometry(0.07, 0.07, 0.007);
    const cornerGeo = new THREE.BoxGeometry(0.08, 0.08, 0.004);
    const paperBoxGeo = new THREE.BoxGeometry(0.55, 0.75, 0.035);
    const textLineGeo = new THREE.BoxGeometry(0.38, 0.022, 0.005);
    const shortTextGeo = new THREE.BoxGeometry(0.26, 0.022, 0.005);
    const rShortTextGeo = new THREE.BoxGeometry(0.22, 0.022, 0.005);

    // Left Page Group
    const leftPageGroup = new THREE.Group();
    leftPageGroup.position.set(-0.015, 0, 0);
    leftPageGroup.rotation.y = -0.32;

    const leftCover = new THREE.Mesh(coverBoxGeo, bookCoverMaterial);
    leftCover.position.set(-0.285, 0, 0.01);
    leftPageGroup.add(leftCover);

    const leftGoldPlate = new THREE.Mesh(plateBoxGeo, goldAccentMaterial);
    leftGoldPlate.position.set(-0.285, 0.08, 0.022);
    leftPageGroup.add(leftGoldPlate);

    const leftInnerPlate = new THREE.Mesh(innerPlateGeo, bookPlateMaterial);
    leftInnerPlate.position.set(-0.285, 0.08, 0.023);
    leftPageGroup.add(leftInnerPlate);

    const leftDiamond = new THREE.Mesh(diamondGeo, goldBrightMaterial);
    leftDiamond.position.set(-0.285, 0.08, 0.024);
    leftDiamond.rotation.z = Math.PI / 4;
    leftPageGroup.add(leftDiamond);

    const leftCorner1 = new THREE.Mesh(cornerGeo, goldAccentMaterial);
    leftCorner1.position.set(-0.5, 0.32, 0.021);
    leftPageGroup.add(leftCorner1);

    const leftCorner2 = new THREE.Mesh(cornerGeo, goldAccentMaterial);
    leftCorner2.position.set(-0.5, -0.32, 0.021);
    leftPageGroup.add(leftCorner2);

    const leftPaper = new THREE.Mesh(paperBoxGeo, paperMaterial);
    leftPaper.position.set(-0.275, 0, -0.018);
    leftPageGroup.add(leftPaper);

    const l1 = new THREE.Mesh(textLineGeo, textLinesMaterial);
    l1.position.set(-0.275, 0.22, -0.037);
    leftPageGroup.add(l1);

    const l2 = new THREE.Mesh(textLineGeo, textLinesMaterial);
    l2.position.set(-0.275, 0.1, -0.037);
    leftPageGroup.add(l2);

    const l3 = new THREE.Mesh(textLineGeo, textLinesMaterial);
    l3.position.set(-0.275, -0.02, -0.037);
    leftPageGroup.add(l3);

    const l4 = new THREE.Mesh(shortTextGeo, textLinesMaterial);
    l4.position.set(-0.335, -0.14, -0.037);
    leftPageGroup.add(l4);

    bookGroup.add(leftPageGroup);

    // Right Page Group
    const rightPageGroup = new THREE.Group();
    rightPageGroup.position.set(0.015, 0, 0);
    rightPageGroup.rotation.y = 0.32;

    const rightCover = new THREE.Mesh(coverBoxGeo, bookCoverMaterial);
    rightCover.position.set(0.285, 0, 0.01);
    rightPageGroup.add(rightCover);

    const rightGoldPlate = new THREE.Mesh(plateBoxGeo, goldAccentMaterial);
    rightGoldPlate.position.set(0.285, 0.08, 0.022);
    rightPageGroup.add(rightGoldPlate);

    const rightInnerPlate = new THREE.Mesh(innerPlateGeo, bookPlateMaterial);
    rightInnerPlate.position.set(0.285, 0.08, 0.023);
    rightPageGroup.add(rightInnerPlate);

    const rightDiamond = new THREE.Mesh(diamondGeo, goldBrightMaterial);
    rightDiamond.position.set(0.285, 0.08, 0.024);
    rightDiamond.rotation.z = Math.PI / 4;
    rightPageGroup.add(rightDiamond);

    const rightCorner1 = new THREE.Mesh(cornerGeo, goldAccentMaterial);
    rightCorner1.position.set(0.5, 0.32, 0.021);
    rightPageGroup.add(rightCorner1);

    const rightCorner2 = new THREE.Mesh(cornerGeo, goldAccentMaterial);
    rightCorner2.position.set(0.5, -0.32, 0.021);
    rightPageGroup.add(rightCorner2);

    const rightPaper = new THREE.Mesh(paperBoxGeo, paperMaterial);
    rightPaper.position.set(0.275, 0, -0.018);
    rightPageGroup.add(rightPaper);

    const r1 = new THREE.Mesh(textLineGeo, textLinesMaterial);
    r1.position.set(0.275, 0.22, -0.037);
    rightPageGroup.add(r1);

    const r2 = new THREE.Mesh(textLineGeo, textLinesMaterial);
    r2.position.set(0.275, 0.1, -0.037);
    rightPageGroup.add(r2);

    const r3 = new THREE.Mesh(textLineGeo, textLinesMaterial);
    r3.position.set(0.275, -0.02, -0.037);
    rightPageGroup.add(r3);

    const r4 = new THREE.Mesh(rShortTextGeo, textLinesMaterial);
    r4.position.set(0.195, -0.14, -0.037);
    rightPageGroup.add(r4);

    bookGroup.add(rightPageGroup);

    // Spine
    const spineGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.77, 24);
    const spine = new THREE.Mesh(spineGeo, bookPlateMaterial);
    spine.position.set(0, 0, 0.012);
    bookGroup.add(spine);

    const ribGeo = new THREE.CylinderGeometry(0.041, 0.041, 0.02, 24);
    [0.26, 0.09, -0.09, -0.26].forEach((yPos) => {
      const rib = new THREE.Mesh(ribGeo, spineRibMaterial);
      rib.position.set(0, yPos, 0.012);
      bookGroup.add(rib);
    });

    const ribbonGeo = new THREE.BoxGeometry(0.035, 0.45, 0.01);
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMaterial);
    ribbon.position.set(0.01, -0.25, -0.018);
    ribbon.rotation.set(-0.15, 0, 0.05);
    bookGroup.add(ribbon);

    faceGroup.add(bookGroup);

    // 8. 3D Floating Chrome "Zzz" Meshes
    const zGeom = createZGeometry();
    const zConfigs = [
      { delay: 0, baseScale: 0.34 },
      { delay: 1.2, baseScale: 0.25 },
      { delay: 2.4, baseScale: 0.17 },
    ];
    const zMeshes = zConfigs.map(() => {
      const m = new THREE.Mesh(zGeom, chromeMaterial);
      m.visible = false;
      scene.add(m);
      return m;
    });

    // 9. Dynamic Lights
    const ambientLight = new THREE.AmbientLight(
      isDarkInitial ? 0x0f172a : 0x94a3b8,
      isDarkInitial ? 1.0 : 0.75
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDarkInitial ? 2.6 : 2.4);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      isDarkInitial ? 0xa42f17 : 0x334155,
      isDarkInitial ? 1.4 : 1.2
    );
    fillLight.position.set(-8, -6, 5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(
      isDarkInitial ? 0xffb0a1 : 0xa42f17,
      isDarkInitial ? 3.5 : 2.6,
      12
    );
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    const gleamLight = new THREE.PointLight(0xffffff, isDarkInitial ? 1.2 : 0.9, 6);
    gleamLight.position.set(0, 0, 4);
    scene.add(gleamLight);

    // Green-gold firefly reflection point light
    const fireflyLight = new THREE.PointLight(0xa3e635, 0, 4);
    scene.add(fireflyLight);

    // Thinking neural light effect
    const thinkingLight = new THREE.PointLight(0xffb0a1, 0, 3.5);
    thinkingLight.position.set(0.3, 0.9, 0.9);
    scene.add(thinkingLight);

    // 10. Mouse Event Tracking (Fallback if not driven externally)
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

    // 11. Expressive Blinking & Organic Double-Blinks
    let isBlinking = false;
    let blinkTimeout: ReturnType<typeof setTimeout> | null = null;
    let nextBlinkTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerBlink = () => {
      if (!sleepingRef.current) {
        isBlinking = true;
        blinkTimeout = setTimeout(() => {
          isBlinking = false;
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

    // 12. Animation Loop with Visibility and Intersection Throttling
    let animId: number | null = null;
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;
    const startTime = performance.now() * 0.001;
    let lastTheme = themeRef.current;

    const stopAnimation = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const startAnimation = () => {
      if (animId === null && isIntersecting && isDocumentVisible) {
        animId = requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
      observer.observe(container);
    }

    const animate = () => {
      if (!isIntersecting || !isDocumentVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001 - startTime;

      const currentTheme = themeRef.current;
      const isDark = currentTheme === "dark";

      // Theme toggle material synchronization
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        if (isDark) {
          chromeMaterial.color.setHex(0x15171f);
          chromeMaterial.metalness = 0.95;
          chromeMaterial.roughness = 0.12;
          chromeMaterial.clearcoatRoughness = 0.08;
          chromeMaterial.envMapIntensity = 2.4;

          eyeMaterial.color.setHex(0xffb0a1);
          eyeMaterial.emissive.setHex(0xffb0a1);
          eyeMaterial.emissiveIntensity = 1.2;
          eyeMaterial.metalness = 0.4;
          eyeMaterial.roughness = 0.1;

          haloMaterial.color.setHex(0xffb0a1);
          haloMaterial.emissive.setHex(0xffb0a1);
          haloMaterial.emissiveIntensity = 1.5;

          ambientLight.color.setHex(0x0f172a);
          ambientLight.intensity = 1.0;
          keyLight.intensity = 2.6;
          fillLight.color.setHex(0xa42f17);
          fillLight.intensity = 1.4;
          rimLight.color.setHex(0xffb0a1);
          rimLight.intensity = 3.5;
          renderer.toneMappingExposure = 1.25;
        } else {
          chromeMaterial.color.setHex(0x828e9c);
          chromeMaterial.metalness = 0.92;
          chromeMaterial.roughness = 0.16;
          chromeMaterial.clearcoatRoughness = 0.09;
          chromeMaterial.envMapIntensity = 1.35;

          eyeMaterial.color.setHex(0x0c0f17);
          eyeMaterial.emissive.setHex(0xa42f17);
          eyeMaterial.emissiveIntensity = 0.2;
          eyeMaterial.metalness = 0.85;
          eyeMaterial.roughness = 0.14;

          haloMaterial.color.setHex(0xa42f17);
          haloMaterial.emissive.setHex(0xa42f17);
          haloMaterial.emissiveIntensity = 0.35;

          ambientLight.color.setHex(0x94a3b8);
          ambientLight.intensity = 0.75;
          keyLight.intensity = 2.4;
          fillLight.color.setHex(0x334155);
          fillLight.intensity = 1.2;
          rimLight.color.setHex(0xa42f17);
          rimLight.intensity = 2.6;
          renderer.toneMappingExposure = 1.05;
        }
      }

      const currentState = stateRef.current;
      const currentSleeping = sleepingRef.current;
      const currentChatOpen = chatOpenRef.current;
      const currentSleepStage = sleepStageRef.current;
      const p = fireflyProgressRef.current;
      const isMobileDevice = isMobileRef.current;

      const isThinking = currentState === "thinking";
      const isReplying = currentState === "replying";
      const isSleepingStage = currentSleepStage === "sleeping" || (currentSleeping && !currentChatOpen);
      const isFireflies = currentSleepStage === "fireflies";
      const isWaking = currentSleepStage === "waking";
      const isFetching = currentSleepStage === "fetching_book";
      const isReading = currentSleepStage === "reading";
      const isClosing = currentSleepStage === "closing_book";
      const isRunningBack = currentSleepStage === "running_back";

      // Floating animation rhythm & amplitude
      let floatSpeed = 1.5;
      let floatAmp = 0.12;

      if (isThinking) {
        floatSpeed = 2.0;
        floatAmp = 0.06;
      } else if (isReplying) {
        floatSpeed = 2.2;
        floatAmp = 0.05;
      } else if (currentChatOpen) {
        floatSpeed = 1.3;
        floatAmp = 0.05;
      } else if (isSleepingStage) {
        floatSpeed = 0.8;
        floatAmp = 0.05;
      } else if (isReading) {
        floatSpeed = 1.0;
        floatAmp = 0.04;
      } else if (isFetching || isRunningBack) {
        floatSpeed = 4.0;
        floatAmp = 0.08;
      } else if (isFireflies && p >= 0.45 && p <= 0.7) {
        floatSpeed = 2.0;
        floatAmp = 0.04;
      } else if (isWaking) {
        floatSpeed = 3.0;
        floatAmp = 0.03;
      }

      faceGroup.position.y =
        (currentChatOpen ? -0.04 : -0.08) + Math.sin(t * floatSpeed) * floatAmp;
      faceGroup.position.z = 0;

      // Position X movement for fetching book or running back
      let targetX = 0;
      if (isFetching) {
        const elapsed = (performance.now() - fetchStartTimeRef.current) / 1000;
        targetX = elapsed < 0.9 ? 4.0 : 0;
      } else if (isRunningBack) {
        targetX = 0;
      }

      const xLerpSpeed = isRunningBack ? 0.25 : isFetching ? 0.15 : 0.1;
      faceGroup.position.x = THREE.MathUtils.lerp(faceGroup.position.x, targetX, xLerpSpeed);

      // Book & Glasses visibility and flap animations
      let targetBookScale = 0;
      let targetGlassesScale = 0;

      if (isReading) {
        targetBookScale = 1;
        targetGlassesScale = 1;
        bookGroup.position.y = -0.78 + Math.sin(t * 1.6) * 0.012;
        leftPageGroup.rotation.y = -0.32;
        rightPageGroup.rotation.y = 0.32;
      } else if (isFetching) {
        bookGroup.position.y = -0.78;
        const elapsed = (performance.now() - fetchStartTimeRef.current) / 1000;
        if (elapsed >= 0.9) {
          targetBookScale = 1;
          targetGlassesScale = 1;
          leftPageGroup.rotation.y = -0.32;
          rightPageGroup.rotation.y = 0.32;
        }
      } else if (isClosing) {
        bookGroup.position.y = -0.78;
        const closeElapsed = (performance.now() - closingStartTimeRef.current) / 1000;
        targetBookScale = Math.max(0, 1 - closeElapsed * 3);
        targetGlassesScale = Math.max(0, 1 - closeElapsed * 3.5);

        const closeAngle = THREE.MathUtils.lerp(0.32, 1.48, Math.min(1, closeElapsed * 3.5));
        leftPageGroup.rotation.y = -closeAngle;
        rightPageGroup.rotation.y = closeAngle;
      } else {
        bookGroup.position.y = -0.78;
      }

      const scaleLerp = 0.18;
      bookGroup.scale.lerp(new THREE.Vector3(targetBookScale, targetBookScale, targetBookScale), scaleLerp);
      glassesGroup.scale.lerp(new THREE.Vector3(targetGlassesScale, targetGlassesScale, targetGlassesScale), scaleLerp);

      // Liquid metal hair ripples
      const hairWave = Math.sin(t * 2.8) * 0.025;
      hairTLMesh.position.y = 0.8 + hairWave;
      hairTMMesh.position.y = 0.95 + Math.cos(t * 2.5) * 0.028;
      hairTRMesh.position.y = 0.8 - hairWave;
      hairBLMesh.position.x = -0.8 + Math.sin(t * 2.1) * 0.015;
      hairBRMesh.position.x = 0.8 - Math.sin(t * 2.1) * 0.015;

      // Ears micro-motion
      earLeft.rotation.z = 0.3 + Math.sin(t * 2.3) * 0.035;
      earRight.rotation.z = -0.3 - Math.sin(t * 2.3) * 0.035;

      // Organic breathing body expansion
      const breath = isSleepingStage ? Math.sin(t * 1.2) * 0.018 : Math.sin(t * 1.8) * 0.014;
      headMesh.scale.set(1 + breath, 1.05 + breath * 1.2, 1 + breath);

      // Cybernetic Orbital Halo dynamic physics
      if (isThinking) {
        haloMesh.rotation.z += 0.07;
        const haloPulse = (Math.sin(t * 12) + 1) * 0.5;
        haloMaterial.emissiveIntensity = isDark ? 1.5 + 1.2 * haloPulse : 0.3 + 0.5 * haloPulse;
        haloMesh.position.y = 0.98 + Math.sin(t * 4) * 0.04;
      } else if (isReplying) {
        haloMesh.rotation.z += 0.03;
        const voicePulse = (Math.sin(t * 8) + 1) * 0.5;
        const haloScale = 1 + voicePulse * 0.07;
        haloMesh.scale.set(haloScale, haloScale, haloScale);
        haloMaterial.emissiveIntensity = isDark ? 1.8 + 0.8 * voicePulse : 0.4 + 0.4 * voicePulse;
        haloMesh.position.y = 0.95 + Math.sin(t * 3) * 0.03;
      } else if (isSleepingStage) {
        haloMesh.rotation.z += 0.003;
        haloMaterial.emissiveIntensity = isDark ? 0.2 : 0.06;
        haloMesh.position.y = THREE.MathUtils.lerp(haloMesh.position.y, 0.84, 0.05);
      } else {
        haloMesh.rotation.z += 0.014;
        haloMesh.position.y = 0.95 + Math.sin(t * 1.6) * 0.025;
        haloMaterial.emissiveIntensity = isDark ? 1.5 : 0.25;
        haloMesh.scale.set(1, 1, 1);
      }

      // Springy click bop
      if (clickBopRef.current > 0.01) {
        clickBopRef.current *= 0.9;
        const bopScale = 1 + Math.sin(clickBopRef.current * Math.PI) * 0.16;
        faceGroup.scale.set(bopScale, bopScale, bopScale);
      } else {
        faceGroup.scale.set(1, 1, 1);
      }

      // Acrobatic celebratory spin
      if (Math.abs(spinVelocityRef.current) > 0.08) {
        spinProgressRef.current += spinVelocityRef.current * 0.016;
        spinVelocityRef.current *= 0.9;
      } else {
        spinVelocityRef.current = 0;
        if (spinProgressRef.current !== 0) {
          spinProgressRef.current = THREE.MathUtils.lerp(spinProgressRef.current, 0, 0.14);
          if (Math.abs(spinProgressRef.current) < 0.01) spinProgressRef.current = 0;
        }
      }

      // Head Orientation Yaw & Pitch
      let rawMouseX = mousePosRef?.current
        ? mousePosRef.current.x
        : externalMouseRef.current
        ? externalMouseRef.current.x
        : mouseRef.current.x;

      let rawMouseY = mousePosRef?.current
        ? mousePosRef.current.y
        : externalMouseRef.current
        ? externalMouseRef.current.y
        : mouseRef.current.y;

      let targetYaw = isMobileDevice
        ? Math.sin(t * 0.6) * 0.14 + Math.sin(t * 1.3) * 0.05
        : rawMouseX;
      let targetPitch = isMobileDevice
        ? Math.sin(t * 0.45) * 0.08
        : rawMouseY;
      let targetZ = Math.sin(t * 1) * 0.04;

      if (isThinking) {
        targetYaw = -0.22 + Math.sin(t * 1.4) * 0.08;
        targetPitch = -0.18 + Math.cos(t * 1.6) * 0.04;
        targetZ = -0.1 + Math.sin(t * 1.2) * 0.03;
      } else if (isReplying) {
        targetYaw = -0.3 + Math.sin(t * 3.5) * 0.04;
        targetPitch = -0.18 + Math.cos(t * 4.0) * 0.03;
        targetZ = Math.sin(t * 2.0) * 0.03;
      } else if (currentChatOpen) {
        const chatBaseYaw = -0.28;
        const chatBasePitch = -0.2;
        if (isMobileDevice) {
          targetYaw = chatBaseYaw + Math.sin(t * 0.8) * 0.06;
          targetPitch = chatBasePitch + Math.cos(t * 0.6) * 0.04;
          targetZ = 0;
        } else {
          targetYaw = THREE.MathUtils.clamp(chatBaseYaw + rawMouseX * 0.35, -0.65, 0.1);
          targetPitch = THREE.MathUtils.clamp(chatBasePitch + rawMouseY * 0.25, -0.45, 0.05);
          targetZ = rawMouseX * 0.05;
        }
      } else if (isFetching) {
        const elapsed = (performance.now() - fetchStartTimeRef.current) / 1000;
        if (elapsed < 0.9) {
          targetYaw = 0.75;
          targetPitch = 0.05;
          targetZ = -0.12;
        } else {
          targetYaw = -0.4;
          targetPitch = 0.1;
          targetZ = 0.05;
        }
      } else if (isRunningBack) {
        targetYaw = -0.55;
        targetPitch = 0;
        targetZ = 0.08;
      } else if (isReading) {
        targetYaw = Math.sin(t * 1.8) * 0.12;
        targetPitch = 0.52;
        targetZ = 0;
      } else if (isClosing) {
        targetYaw = rawMouseX;
        targetPitch = rawMouseY;
        targetZ = 0;
      } else if (isWaking) {
        const wakeElapsed = Math.min(1, (performance.now() - wakeStartTimeRef.current) / 1150);
        const decay = Math.max(0, 1 - wakeElapsed);
        const headWaveYaw = Math.sin(wakeElapsed * Math.PI * 6.5) * 0.48 * decay;
        const headWavePitch = THREE.MathUtils.lerp(0.45, rawMouseY, Math.pow(wakeElapsed, 0.55));
        const headWaveZ = Math.sin(wakeElapsed * Math.PI * 5) * 0.16 * decay;

        targetYaw = headWaveYaw + (1 - decay) * rawMouseX;
        targetPitch = headWavePitch;
        targetZ = headWaveZ;
      } else if (isFireflies) {
        targetYaw = fireflyTrackingRef.current.x;
        targetPitch = fireflyTrackingRef.current.y;
        if (p >= 0.45 && p < 0.7) {
          targetPitch = -0.22;
          targetZ = Math.sin(t * 3.5) * 0.06;
        } else if (p >= 0.9) {
          targetPitch = THREE.MathUtils.lerp(targetPitch, 0.45, (p - 0.9) / 0.1);
        }
      } else if (isSleepingStage) {
        targetYaw = 0;
        targetPitch = 0.45;
        targetZ = 0;
      }

      const rotLerpSpeed = isThinking
        ? 0.12
        : isWaking
        ? 0.16
        : isReading
        ? 0.08
        : isFireflies
        ? 0.07
        : 0.1;
      faceGroup.rotation.y =
        THREE.MathUtils.lerp(faceGroup.rotation.y, targetYaw, rotLerpSpeed) +
        spinProgressRef.current;
      faceGroup.rotation.x = THREE.MathUtils.lerp(
        faceGroup.rotation.x,
        targetPitch,
        rotLerpSpeed
      );
      faceGroup.rotation.z = THREE.MathUtils.lerp(faceGroup.rotation.z, targetZ, 0.1);

      // Eyes Scale & Expressions
      let targetEyeScaleY = 2.5;

      if (isThinking) {
        targetEyeScaleY = 1.7;
      } else if (isReplying) {
        targetEyeScaleY = 2.5;
      } else if (currentChatOpen) {
        targetEyeScaleY = 2.4;
      } else if (isSleepingStage) {
        targetEyeScaleY = 0.08;
      } else if (isReading) {
        targetEyeScaleY = 1.6;
      } else if (isClosing || isRunningBack) {
        targetEyeScaleY = 2.8;
      } else if (isWaking) {
        const wakeElapsed = Math.min(1, (performance.now() - wakeStartTimeRef.current) / 1150);
        if (wakeElapsed < 0.22) {
          targetEyeScaleY = 1.1;
        } else if (wakeElapsed < 0.42) {
          targetEyeScaleY = 0.08;
        } else if (wakeElapsed < 0.68) {
          targetEyeScaleY = 1.8;
        } else if (wakeElapsed < 0.84) {
          targetEyeScaleY = 0.1;
        } else {
          targetEyeScaleY = 2.5;
        }
      } else if (isFireflies) {
        if (p < 0.22) {
          targetEyeScaleY = 2.4;
        } else if (p < 0.45) {
          const droop = (p - 0.22) / 0.23;
          const heavyBlink = p > 0.32 && p < 0.36 ? 0.08 : 1.0;
          targetEyeScaleY = THREE.MathUtils.lerp(2.4, 0.9, droop) * heavyBlink;
        } else if (p < 0.7) {
          targetEyeScaleY = 0.05;
        } else if (p < 0.9) {
          targetEyeScaleY = 0.35;
        } else {
          targetEyeScaleY = THREE.MathUtils.lerp(0.35, 0.08, (p - 0.9) / 0.1);
        }
      } else if (isBlinking) {
        targetEyeScaleY = 0.1;
      }

      let leftEyeTargetScaleY = targetEyeScaleY;
      let rightEyeTargetScaleY = targetEyeScaleY;

      if (isWinkingRef.current && !isSleepingStage) {
        leftEyeTargetScaleY = 0.08;
        rightEyeTargetScaleY = 2.6;
      } else if (isReplying) {
        const voiceMod = Math.sin(t * 9.5) * 0.25;
        leftEyeTargetScaleY = Math.max(0.4, targetEyeScaleY + voiceMod);
        rightEyeTargetScaleY = Math.max(0.4, targetEyeScaleY + voiceMod);
      }

      const targetEyeScaleX = isThinking ? 0.9 : isReplying ? 1.12 : 1.0;
      leftEyeMesh.scale.y = THREE.MathUtils.lerp(leftEyeMesh.scale.y, leftEyeTargetScaleY, 0.24);
      rightEyeMesh.scale.y = THREE.MathUtils.lerp(rightEyeMesh.scale.y, rightEyeTargetScaleY, 0.24);
      leftEyeMesh.scale.x = THREE.MathUtils.lerp(leftEyeMesh.scale.x, targetEyeScaleX, 0.12);
      rightEyeMesh.scale.x = THREE.MathUtils.lerp(rightEyeMesh.scale.x, targetEyeScaleX, 0.12);

      const targetEyePosY = isThinking ? 0.14 : currentChatOpen ? 0.12 : 0.1;
      leftEyeMesh.position.y = THREE.MathUtils.lerp(leftEyeMesh.position.y, targetEyePosY, 0.15);
      rightEyeMesh.position.y = THREE.MathUtils.lerp(rightEyeMesh.position.y, targetEyePosY, 0.15);

      // Expressive Mouth Articulation
      let targetMouthY = 0.12;
      let targetMouthX = 0.6;
      let targetMouthZ = 0.2;

      if (isThinking) {
        targetMouthY = 0.09;
        targetMouthX = 0.42;
        targetMouthZ = 0.16;
      } else if (isReplying) {
        targetMouthY = 0.14 + Math.abs(Math.sin(t * 11)) * 0.28;
        targetMouthX = 0.58 + Math.sin(t * 8) * 0.08;
        targetMouthZ = 0.22;
      } else if (currentChatOpen) {
        targetMouthY = 0.13;
        targetMouthX = 0.65;
        targetMouthZ = 0.2;
      } else if (isWaking) {
        const wakeElapsed = Math.min(1, (performance.now() - wakeStartTimeRef.current) / 1150);
        const stretch = Math.sin(wakeElapsed * Math.PI) * 0.45;
        targetMouthY = 0.12 + stretch;
        targetMouthX = 0.6 + stretch * 0.2;
      } else if (isFireflies && p >= 0.45 && p < 0.7) {
        // Cute big yawn 'O' stretch
        targetMouthY = 2.2;
        targetMouthX = 1.15;
        targetMouthZ = 0.9;
      } else if (isSleepingStage) {
        targetMouthY = 0.06;
        targetMouthX = 0.45;
        targetMouthZ = 0.15;
      }

      mouthMesh.scale.y = THREE.MathUtils.lerp(mouthMesh.scale.y, targetMouthY, 0.18);
      mouthMesh.scale.x = THREE.MathUtils.lerp(mouthMesh.scale.x, targetMouthX, 0.18);
      mouthMesh.scale.z = THREE.MathUtils.lerp(mouthMesh.scale.z, targetMouthZ, 0.18);

      // Eye Glow Reactions
      if (isThinking) {
        const pulse = (Math.sin(t * 8) + 1) * 0.5;
        if (isDark) {
          eyeMaterial.emissiveIntensity = 1.2 + 0.9 * pulse;
        } else {
          eyeMaterial.emissiveIntensity = 0.3 + 0.6 * pulse;
        }
      } else if (isReplying) {
        const voicePulse = (Math.sin(t * 10) + 1) * 0.5;
        if (isDark) {
          eyeMaterial.emissiveIntensity = 1.4 + 0.6 * voicePulse;
        } else {
          eyeMaterial.emissiveIntensity = 0.4 + 0.4 * voicePulse;
        }
      } else {
        if (isDark) {
          eyeMaterial.emissiveIntensity = isSleepingStage ? 0.2 : 1.0;
        } else {
          eyeMaterial.emissiveIntensity = isSleepingStage ? 0.05 : 0.2;
        }
      }

      // Thinking Light Effect
      if (isThinking) {
        const pulse = Math.sin(t * 3.5) * 0.5 + 0.5;
        thinkingLight.intensity = THREE.MathUtils.lerp(thinkingLight.intensity, 0.75 + pulse * 0.45, 0.1);
      } else {
        thinkingLight.intensity = THREE.MathUtils.lerp(thinkingLight.intensity, 0, 0.15);
      }

      // Firefly Reflection Light Effect (progress 0.65 to 0.98)
      if (isFireflies && p >= 0.65 && p <= 0.98) {
        const subP = (p - 0.65) / 0.33;
        const lx = -1.8 + subP * 3.6;
        const ly = 0.8 - Math.sin(subP * Math.PI) * 0.9;
        fireflyLight.position.set(lx, ly, 1.4);
        fireflyLight.intensity = (4.0 + Math.sin(t * 15) * 1.5) * Math.sin(subP * Math.PI);
      } else {
        fireflyLight.intensity = 0;
      }

      // 3D Floating Chrome "Zzz" physics
      const showZzz = isSleepingStage && !currentChatOpen && isDark;
      zMeshes.forEach((mesh, idx) => {
        if (!showZzz) {
          mesh.visible = false;
          return;
        }
        mesh.visible = true;
        const cfg = zConfigs[idx];
        const cycleDuration = 3.6;
        const rawP = ((t - cfg.delay) % cycleDuration + cycleDuration) % cycleDuration;
        const zp = rawP / cycleDuration;

        const startX = 0.35;
        const startY = 0.4;
        const startZ = 0.35;

        const currentZX = startX + zp * 0.55 + Math.sin(zp * Math.PI * 2) * 0.08;
        const currentZY = startY + zp * 1.55;
        const currentZZ = startZ + zp * 0.25;

        mesh.position.set(currentZX, currentZY, currentZZ);
        mesh.rotation.z = -0.1 + Math.sin(zp * Math.PI) * 0.35;
        mesh.rotation.y = Math.sin(zp * 2.5) * 0.45;
        mesh.rotation.x = 0.25 + Math.cos(zp * 2) * 0.25;

        let scaleMult = 1;
        if (zp < 0.2) {
          scaleMult = zp / 0.2;
        } else if (zp > 0.7) {
          scaleMult = (1 - zp) / 0.3;
        }

        const s = Math.max(0.001, cfg.baseScale * scaleMult);
        mesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 13. Comprehensive Disposal & Cleanup
    return () => {
      stopAnimation();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observer) observer.disconnect();
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
      haloGeo.dispose();
      hairTLGeo.dispose();
      hairTMGeo.dispose();
      hairTRGeo.dispose();
      hairBLGeo.dispose();
      hairBRGeo.dispose();
      hairBBLGeo.dispose();
      hairBBRGeo.dispose();
      earGeo.dispose();
      eyeGeo.dispose();
      mouthGeo.dispose();

      lensGeo.dispose();
      bridgeGeo.dispose();
      armGeo.dispose();

      coverBoxGeo.dispose();
      plateBoxGeo.dispose();
      innerPlateGeo.dispose();
      diamondGeo.dispose();
      cornerGeo.dispose();
      paperBoxGeo.dispose();
      textLineGeo.dispose();
      shortTextGeo.dispose();
      rShortTextGeo.dispose();
      spineGeo.dispose();
      ribGeo.dispose();
      ribbonGeo.dispose();
      zGeom.dispose();

      chromeMaterial.dispose();
      eyeMaterial.dispose();
      haloMaterial.dispose();
      bookCoverMaterial.dispose();
      goldAccentMaterial.dispose();
      goldBrightMaterial.dispose();
      bookPlateMaterial.dispose();
      paperMaterial.dispose();
      textLinesMaterial.dispose();
      ribbonMaterial.dispose();
      spineRibMaterial.dispose();
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
