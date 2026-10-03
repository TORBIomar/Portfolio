import React from 'react';
import { RetroIconName } from '../../types/retro';

interface RetroIconProps {
  name: RetroIconName | 'apple' | 'speaker' | 'speaker-muted';
  size?: number;
  className?: string;
}

export const RetroIcon: React.FC<RetroIconProps> = ({ name, size = 32, className = '' }) => {
  switch (name) {
    case 'apple':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
          {/* Classic 6-Color Retro Rainbow Apple */}
          <path d="M7 1 C8 1 9 2 9 3 C8 3 7 2 7 1 Z" fill="#65A30D" />
          <rect x="5" y="4" width="6" height="1.2" fill="#84CC16" />
          <rect x="4" y="5.2" width="8" height="1.2" fill="#FBBF24" />
          <rect x="4" y="6.4" width="8" height="1.2" fill="#F97316" />
          <rect x="4" y="7.6" width="8" height="1.2" fill="#EF4444" />
          <rect x="4" y="8.8" width="8" height="1.2" fill="#A855F7" />
          <rect x="5" y="10" width="6" height="1.2" fill="#3B82F6" />
        </svg>
      );

    case 'mac':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Classic Macintosh Case */}
          <rect x="4" y="3" width="24" height="26" rx="2" fill="#FBF8EB" stroke="#000000" strokeWidth="1.5" />
          {/* Beveled Chin */}
          <rect x="4" y="22" width="24" height="7" fill="#E8DEC3" stroke="#000000" strokeWidth="1.5" />
          {/* Vibrant CRT Screen with Turquoise / Blue glow */}
          <rect x="7" y="6" width="18" height="13" rx="1" fill="#0E2A38" stroke="#000000" strokeWidth="1.5" />
          {/* Happy Mac Face */}
          <rect x="10" y="9" width="3" height="3" fill="#38BDF8" />
          <rect x="19" y="9" width="3" height="3" fill="#38BDF8" />
          <path d="M11 15 C13 17 19 17 21 15" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Rainbow Logo on Chin */}
          <rect x="6" y="24" width="2.5" height="3" fill="#EC4899" />
          {/* 3.5" Floppy Slot */}
          <rect x="11" y="24" width="11" height="1.5" fill="#000000" />
        </svg>
      );

    case 'folder':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Sunny Warm Amber / Gold Folder Tab */}
          <path d="M4 8 L12 8 L15 11 L28 11 L28 26 L4 26 Z" fill="#F59E0B" stroke="#000000" strokeWidth="1.5" />
          {/* Front Flap in Bright Yellow */}
          <path d="M4 12 L28 12 L26 26 L2 26 Z" fill="#FCD34D" stroke="#000000" strokeWidth="1.5" />
          {/* Folder Label Stripe */}
          <rect x="6" y="16" width="16" height="3" fill="#FFFFFF" stroke="#000000" strokeWidth="0.8" />
          <line x1="8" y1="17.5" x2="16" y2="17.5" stroke="#2563EB" strokeWidth="1" />
        </svg>
      );

    case 'cpu':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Emerald PCB Substrate */}
          <rect x="6" y="6" width="20" height="20" rx="2" fill="#065F46" stroke="#000000" strokeWidth="1.5" />
          {/* Golden Die Core */}
          <rect x="10" y="10" width="12" height="12" fill="#F59E0B" stroke="#000000" strokeWidth="1" />
          {/* Silicon Core */}
          <rect x="12" y="12" width="8" height="8" fill="#1E293B" />
          <circle cx="16" cy="16" r="2" fill="#38BDF8" />
          {/* Gold Connector Pins */}
          {[8, 13, 18, 23].map((pos) => (
            <React.Fragment key={pos}>
              <line x1={pos} y1="2" x2={pos} y2="6" stroke="#F59E0B" strokeWidth="1.5" />
              <line x1={pos} y1="26" x2={pos} y2="30" stroke="#F59E0B" strokeWidth="1.5" />
              <line x1="2" y1={pos} x2="6" y2={pos} stroke="#F59E0B" strokeWidth="1.5" />
              <line x1="26" y1={pos} x2="30" y2={pos} stroke="#F59E0B" strokeWidth="1.5" />
            </React.Fragment>
          ))}
        </svg>
      );

    case 'briefcase':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Handle */}
          <path d="M12 9 L12 5 L20 5 L20 9" stroke="#000000" strokeWidth="2" fill="none" />
          {/* Rich Amber / Leather Body */}
          <rect x="4" y="9" width="24" height="18" rx="2" fill="#B45309" stroke="#000000" strokeWidth="1.5" />
          {/* Center Strap & Brass Lock */}
          <line x1="4" y1="16" x2="28" y2="16" stroke="#78350F" strokeWidth="1.5" />
          <rect x="14" y="14" width="4" height="4" fill="#FDE047" stroke="#000000" strokeWidth="1" />
          <rect x="6" y="11" width="3" height="3" fill="#D97706" />
          <rect x="23" y="11" width="3" height="3" fill="#D97706" />
        </svg>
      );

    case 'mail':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Crisp White Envelope */}
          <rect x="3" y="7" width="26" height="18" rx="1" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          {/* Blue Airmail Flap */}
          <path d="M3 8 L16 18 L29 8" stroke="#2563EB" strokeWidth="1.5" />
          {/* Hot Pink Postage Stamp */}
          <rect x="22" y="9" width="5" height="6" fill="#F43F5E" stroke="#000000" strokeWidth="0.8" />
          <circle cx="24.5" cy="12" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'terminal':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="3" y="5" width="26" height="20" rx="2" fill="#E2E8F0" stroke="#000000" strokeWidth="1.5" />
          {/* Dark CRT Screen */}
          <rect x="5" y="7" width="22" height="14" rx="1" fill="#021C0F" stroke="#000000" strokeWidth="1.2" />
          {/* Glowing Green Phosphor Prompt */}
          <path d="M8 11 L12 14 L8 17" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="17" x2="19" y2="17" stroke="#10B981" strokeWidth="1.5" />
          {/* Stand */}
          <rect x="13" y="25" width="6" height="3" fill="#94A3B8" stroke="#000000" strokeWidth="1" />
        </svg>
      );

    case 'paint':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Wooden Artist Palette */}
          <path
            d="M16 4 C9 4 4 9 4 16 C4 23 9 28 16 28 C18 28 19 26 19 24 C19 23 18 22 18 21 C18 19 20 17 22 17 L25 17 C28 17 30 14 30 11 C30 7 24 4 16 4 Z"
            fill="#FED7AA"
            stroke="#000000"
            strokeWidth="1.5"
          />
          {/* Rainbow Dabs of Paint */}
          <circle cx="10" cy="11" r="2.5" fill="#EF4444" stroke="#000" strokeWidth="0.5" />
          <circle cx="17" cy="8" r="2.5" fill="#F59E0B" stroke="#000" strokeWidth="0.5" />
          <circle cx="24" cy="11" r="2.5" fill="#3B82F6" stroke="#000" strokeWidth="0.5" />
          <circle cx="10" cy="20" r="2.5" fill="#10B981" stroke="#000" strokeWidth="0.5" />
          <circle cx="20" cy="22" r="2" fill="#A855F7" stroke="#000" strokeWidth="0.5" />
        </svg>
      );

    case 'tape':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Vibrant Tangerine / Black Cassette Shell */}
          <rect x="3" y="6" width="26" height="19" rx="2" fill="#F97316" stroke="#000000" strokeWidth="1.5" />
          {/* Bright Yellow Label */}
          <rect x="6" y="8" width="20" height="11" fill="#FEF08A" stroke="#000000" strokeWidth="1" />
          {/* Tape window */}
          <rect x="9" y="11" width="14" height="6" fill="#1E293B" stroke="#000000" strokeWidth="0.8" />
          {/* White Spools */}
          <circle cx="12" cy="14" r="2" fill="#FFFFFF" />
          <circle cx="20" cy="14" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'trash':
    case 'trash-full':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Silver Lid with Red Accent */}
          <rect x="7" y="5" width="18" height="3" rx="1" fill="#E2E8F0" stroke="#000000" strokeWidth="1.5" />
          <rect x="13" y="3" width="6" height="2" fill="#E2E8F0" stroke="#000000" strokeWidth="1" />
          {/* Metal Can Body */}
          <path d="M8 8 L10 27 L22 27 L24 8 Z" fill="#CBD5E1" stroke="#000000" strokeWidth="1.5" />
          {/* Ribs */}
          <line x1="12" y1="10" x2="13" y2="25" stroke="#000000" strokeWidth="1" />
          <line x1="16" y1="10" x2="16" y2="25" stroke="#000000" strokeWidth="1" />
          <line x1="20" y1="10" x2="19" y2="25" stroke="#000000" strokeWidth="1" />
          {/* Full trash paper */}
          {name === 'trash-full' && (
            <path d="M12 5 L14 1 L18 3 L20 1 L21 5 Z" fill="#F43F5E" stroke="#000000" strokeWidth="1" />
          )}
        </svg>
      );

    case 'floppy':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Electric Blue 3.5" Disk */}
          <path d="M4 4 L24 4 L28 8 L28 28 L4 28 Z" fill="#2563EB" stroke="#000000" strokeWidth="1.5" />
          {/* Silver Shutter */}
          <rect x="8" y="4" width="13" height="9" fill="#E2E8F0" stroke="#000000" strokeWidth="1" />
          <rect x="15" y="6" width="3" height="5" fill="#000000" />
          {/* White Paper Label with Red Header Line */}
          <rect x="7" y="16" width="18" height="11" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
          <rect x="9" y="18" width="14" height="2" fill="#EF4444" />
          <line x1="9" y1="23" x2="21" y2="23" stroke="#94A3B8" strokeWidth="1" />
        </svg>
      );

    case 'settings':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="4" width="24" height="24" rx="2" fill="#E2E8F0" stroke="#000000" strokeWidth="1.5" />
          {/* Color Slider Tracks */}
          <line x1="8" y1="10" x2="24" y2="10" stroke="#000000" strokeWidth="1.5" />
          <rect x="12" y="8" width="4" height="4" fill="#EF4444" stroke="#000000" strokeWidth="0.8" />
          <line x1="8" y1="16" x2="24" y2="16" stroke="#000000" strokeWidth="1.5" />
          <rect x="18" y="14" width="4" height="4" fill="#F59E0B" stroke="#000000" strokeWidth="0.8" />
          <line x1="8" y1="22" x2="24" y2="22" stroke="#000000" strokeWidth="1.5" />
          <rect x="10" y="20" width="4" height="4" fill="#10B981" stroke="#000000" strokeWidth="0.8" />
        </svg>
      );

    case 'speaker':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
          <polygon points="2,5 6,5 10,2 10,14 6,11 2,11" />
          <path d="M12,5 C13.5,6.5 13.5,9.5 12,11" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );

    case 'speaker-muted':
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
          <polygon points="2,5 6,5 10,2 10,14 6,11 2,11" />
          <line x1="12" y1="5" x2="16" y2="11" stroke="#EF4444" strokeWidth="1.8" />
          <line x1="16" y1="5" x2="12" y2="11" stroke="#EF4444" strokeWidth="1.8" />
        </svg>
      );

    default:
      return null;
  }
};
