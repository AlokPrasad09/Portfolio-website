/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        accent: {
          500: '#EC4899',
          600: '#DB2777',
        },
        slate: {
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'base': ['1.125rem', { lineHeight: '1.75rem' }],
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],
        'xl': ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
        '5xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.45)',
        glow: '0 0 40px rgba(99, 102, 241, 0.25)',
        'glow-accent': '0 0 40px rgba(236, 72, 153, 0.2)',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at top, rgba(129,140,248,0.35), transparent 60%), radial-gradient(circle at bottom, rgba(248,113,113,0.25), transparent 60%)',
        'gradient-hero':
          'linear-gradient(135deg, rgba(129,140,248,0.18), rgba(236,72,153,0.18))',
        'grid-pattern': 'linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
    },
  },
  plugins: [],
};
