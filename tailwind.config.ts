import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#123462',   // color principal del logo Renttia
          light:   '#1a4070',
          lighter: '#1f5080',
          dark:    '#0c2449',
          50:      '#e8eef8',
        },
        cream: {
          DEFAULT: '#FAFAF7',
          dark:    '#F0EFE9',
        },
        cta: {
          DEFAULT: '#123462',   // mismo azul principal del logo
          hover:   '#0c2449',
          light:   '#dde8f5',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight:   '-0.02em',
        tighter: '-0.03em',
        wide:    '0.06em',
        widest:  '0.14em',
      },
      fontSize: {
        '5xl': ['3rem',   { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem',{ lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
}

export default config
