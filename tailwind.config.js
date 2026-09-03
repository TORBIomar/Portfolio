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
        background: '#0F172A',
        foreground: '#F8FAFC',
        card: {
          DEFAULT: '#1B2336',
          foreground: '#F8FAFC',
          hover: '#222C42',
        },
        primary: {
          DEFAULT: '#1E293B',
          foreground: '#FFFFFF',
          hover: '#334155',
        },
        secondary: {
          DEFAULT: '#334155',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
          foreground: '#0F172A',
          subtle: 'rgba(34, 197, 94, 0.12)',
          border: 'rgba(34, 197, 94, 0.3)',
        },
        muted: {
          DEFAULT: '#272F42',
          foreground: '#94A3B8',
        },
        border: '#334155',
        ring: '#22C55E',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"IBM Plex Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(34, 197, 94, 0.2)',
        'glow-md': '0 0 20px rgba(34, 197, 94, 0.25)',
        'glow-lg': '0 0 30px rgba(34, 197, 94, 0.3)',
        'card-elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
