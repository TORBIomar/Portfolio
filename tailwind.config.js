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
        background: '#0E1117',
        surface: {
          DEFAULT: '#141820',
          subtle: '#181D26',
          elevated: '#1E2430',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.2)',
        },
        foreground: '#F0F3F8',
        card: {
          DEFAULT: '#141820',
          foreground: '#F0F3F8',
          hover: '#191F2B',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          DEFAULT: '#141820',
          foreground: '#FFFFFF',
          hover: '#1C222E',
        },
        secondary: {
          DEFAULT: '#181D26',
          foreground: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#E58A3C',
          hover: '#F09A4E',
          foreground: '#FFFFFF',
          subtle: 'rgba(229, 138, 60, 0.12)',
          border: 'rgba(229, 138, 60, 0.35)',
          glow: 'rgba(229, 138, 60, 0.4)',
        },
        orange: {
          DEFAULT: '#E58A3C',
          hover: '#F09A4E',
          subtle: 'rgba(229, 138, 60, 0.12)',
          border: 'rgba(229, 138, 60, 0.35)',
        },
        silver: {
          DEFAULT: '#E2E8F0',
          light: '#F8FAFC',
          muted: '#94A3B8',
          dark: '#64748B',
        },
        cyan: {
          DEFAULT: '#CBD5E1',
          hover: '#E2E8F0',
          subtle: 'rgba(203, 213, 225, 0.08)',
          border: 'rgba(203, 213, 225, 0.25)',
        },
        amber: {
          DEFAULT: '#E58A3C',
          hover: '#F09A4E',
          subtle: 'rgba(229, 138, 60, 0.12)',
          border: 'rgba(229, 138, 60, 0.35)',
        },
        muted: {
          DEFAULT: '#141820',
          foreground: '#8E9BB0',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        ring: '#E58A3C',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"IBM Plex Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 25px rgba(229, 138, 60, 0.35)',
        'glow-orange': '0 0 25px rgba(229, 138, 60, 0.35)',
        'glow-silver': '0 0 25px rgba(255, 255, 255, 0.2)',
        'glow-cyan': '0 0 25px rgba(203, 213, 225, 0.2)',
        'card-elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(229, 138, 60, 0.12)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      animation: {
        'beacon': 'smoothBeacon 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beacon-green': 'smoothBeaconGreen 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'shimmer-glide': 'shimmerGlide 3s ease-in-out infinite',
      },
      keyframes: {
        smoothBeacon: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(229, 138, 60, 0.4)' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85', boxShadow: '0 0 12px 3px rgba(229, 138, 60, 0.3)' },
        },
        smoothBeaconGreen: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.5)' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85', boxShadow: '0 0 12px 3px rgba(16, 185, 129, 0.35)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shimmerGlide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      }
    },
  },
  plugins: [],
}
