/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6e6ff',
          100: '#c2c2ff',
          200: '#9e9eff',
          300: '#7a7aff',
          400: '#5656ff',
          500: '#3232ff',
          600: '#0000ff', // Base blue for teletext
          700: '#0000cc',
          800: '#000099',
          900: '#000066',
          950: '#000033',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        teletext: {
          blue: '#0000ff',
          yellow: '#ffff00',
          red: '#ff0000',
          green: '#00ff00',
          cyan: '#00ffff',
          magenta: '#ff00ff',
        },
        background: {
          light: '#f0f0f0',
        }
      },
      fontFamily: {
        sans: ['var(--font-space-mono)', 'sans-serif'],
        display: ['var(--font-archivo-black)', 'serif'],
        teletext: ['var(--font-vt323)', 'monospace'],
      },
    },
  },
  plugins: [],
} 