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
        background: '#000000',
        surface: {
          DEFAULT: '#09090B',
          subtle: '#121214',
          elevated: '#18181B',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.2)',
        },
        foreground: '#FAFAFA',
        card: {
          DEFAULT: '#09090B',
          foreground: '#FAFAFA',
          hover: '#121214',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
          hover: '#E4E4E7',
        },
        secondary: {
          DEFAULT: '#18181B',
          foreground: '#E4E4E7',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          hover: '#E4E4E7',
          foreground: '#000000',
          subtle: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.25)',
          glow: 'rgba(255, 255, 255, 0.35)',
        },
        orange: {
          DEFAULT: '#FFFFFF',
          hover: '#E4E4E7',
          subtle: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.25)',
        },
        silver: {
          DEFAULT: '#E4E4E7',
          light: '#FAFAFA',
          muted: '#A1A1AA',
          dark: '#71717A',
        },
        cyan: {
          DEFAULT: '#D4D4D8',
          hover: '#FAFAFA',
          subtle: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
        amber: {
          DEFAULT: '#FFFFFF',
          hover: '#E4E4E7',
          subtle: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.25)',
        },
        muted: {
          DEFAULT: '#18181B',
          foreground: '#A1A1AA',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        ring: '#FFFFFF',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 25px rgba(255, 255, 255, 0.25)',
        'glow-orange': '0 0 25px rgba(255, 255, 255, 0.25)',
        'glow-silver': '0 0 25px rgba(255, 255, 255, 0.2)',
        'glow-cyan': '0 0 25px rgba(255, 255, 255, 0.2)',
        'card-elevated': '0 12px 32px -4px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.08)',
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
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.4)' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85', boxShadow: '0 0 12px 3px rgba(255, 255, 255, 0.25)' },
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
