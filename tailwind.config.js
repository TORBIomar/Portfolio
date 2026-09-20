/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#08090E',
        surface: {
          DEFAULT: '#0D111A',
          subtle: '#111724',
          elevated: '#161E30',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.2)',
        },
        foreground: '#F4F6FB',
        card: {
          DEFAULT: '#0E131F',
          foreground: '#F4F6FB',
          hover: '#131A2B',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          DEFAULT: '#141A29',
          foreground: '#FFFFFF',
          hover: '#1E263B',
        },
        secondary: {
          DEFAULT: '#1B2336',
          foreground: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#00FF9D',
          hover: '#00E58D',
          foreground: '#08090E',
          subtle: 'rgba(0, 255, 157, 0.08)',
          border: 'rgba(0, 255, 157, 0.25)',
          glow: 'rgba(0, 255, 157, 0.4)',
        },
        cyan: {
          DEFAULT: '#00E5FF',
          hover: '#00C8E0',
          subtle: 'rgba(0, 229, 255, 0.08)',
          border: 'rgba(0, 229, 255, 0.25)',
        },
        amber: {
          DEFAULT: '#FFB800',
          subtle: 'rgba(255, 184, 0, 0.08)',
          border: 'rgba(255, 184, 0, 0.25)',
        },
        muted: {
          DEFAULT: '#151C2C',
          foreground: '#8E9BB0',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        ring: '#00FF9D',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"IBM Plex Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 25px rgba(0, 255, 157, 0.25)',
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.25)',
        'glow-amber': '0 0 25px rgba(255, 184, 0, 0.25)',
        'card-elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 157, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'laser-flow': 'laserFlow 3s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        laserFlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(0.95)' },
          '50%': { opacity: '0.9', transform: 'scaleX(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
