/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"VT323"', 'monospace'],
        press: ['"Press Start 2P"', 'monospace'],
        screen: ['"Silkscreen"', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        retro: ['"Geneva"', '"Chicago"', '"Apple Garamond"', 'sans-serif'],
      },
      colors: {
        mac: {
          bg: '#C3C7CB',
          window: '#FFFFFF',
          border: '#000000',
          pinstripe: '#555555',
          header: '#C3C7CB',
          active: '#000080',
          highlight: '#316AC5',
          amber: '#FFB000',
          crtgreen: '#33FF33',
        }
      }
    },
  },
  plugins: [],
}
