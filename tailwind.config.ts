import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F4F0E7',
          200: '#E8E2D7',
          300: '#D7D0C3',
        },
        charcoal: {
          900: '#171614',
          800: '#23221E',
          700: '#34322E',
          600: '#4A4742',
        },
        warmgray: {
          500: '#6D675E',
          400: '#8C857B',
          300: '#ADA79D',
          200: '#CDC7BC',
        },
        gold: {
          500: '#B08A45',
          400: '#C79F56',
          300: '#D9B46F',
          600: '#8F6E34',
        },
        maroon: {
          900: '#4A2424',
          800: '#5C2D2D',
          700: '#733939',
        },
        stone: {
          300: '#D7D0C3',
          200: '#E5DFD4',
          100: '#F0EBE1',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(23, 22, 20, 0.05)',
        'editorial': '0 10px 30px -5px rgba(23, 22, 20, 0.08)',
      },
      letterSpacing: {
        'widest-heritage': '0.25em',
        'subtle-caps': '0.15em',
      }
    },
  },
  plugins: [],
};

export default config;
