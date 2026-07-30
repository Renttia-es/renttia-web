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
        '8xl': ['6rem',   { lineHeight: '1.0',  letterSpacing: '-0.04em' }],
        '9xl': ['8rem',   { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'     },
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) both',
        'fade-in':   'fadeIn 0.6s cubic-bezier(0.23,1,0.32,1) both',
        'slide-left':'slideInLeft 0.6s cubic-bezier(0.23,1,0.32,1) both',
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
