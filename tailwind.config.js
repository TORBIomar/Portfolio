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
        background: '#050507',
        surface: {
          DEFAULT: '#0B0C10',
          subtle: '#101217',
          elevated: '#161820',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.22)',
        },
        foreground: '#F4F6FB',
        card: {
          DEFAULT: '#0A0B0F',
          foreground: '#F4F6FB',
          hover: '#11131A',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          DEFAULT: '#12131A',
          foreground: '#FFFFFF',
          hover: '#1A1C25',
        },
        secondary: {
          DEFAULT: '#161822',
          foreground: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#FF6B00',
          hover: '#FF7E1F',
          foreground: '#FFFFFF',
          subtle: 'rgba(255, 107, 0, 0.1)',
          border: 'rgba(255, 107, 0, 0.3)',
          glow: 'rgba(255, 107, 0, 0.45)',
        },
        orange: {
          DEFAULT: '#FF6B00',
          hover: '#FF7E1F',
          subtle: 'rgba(255, 107, 0, 0.1)',
          border: 'rgba(255, 107, 0, 0.3)',
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
          DEFAULT: '#FF6B00',
          subtle: 'rgba(255, 107, 0, 0.1)',
          border: 'rgba(255, 107, 0, 0.3)',
        },
        muted: {
          DEFAULT: '#12141C',
          foreground: '#8E9BB0',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        ring: '#FF6B00',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"IBM Plex Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 25px rgba(255, 107, 0, 0.4)',
        'glow-orange': '0 0 25px rgba(255, 107, 0, 0.4)',
        'glow-silver': '0 0 25px rgba(255, 255, 255, 0.2)',
        'glow-cyan': '0 0 25px rgba(203, 213, 225, 0.2)',
        'card-elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 107, 0, 0.12)',
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
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(255, 107, 0, 0.5)' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85', boxShadow: '0 0 12px 3px rgba(255, 107, 0, 0.35)' },
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
