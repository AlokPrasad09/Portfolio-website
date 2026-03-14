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
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.45)',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at top, rgba(129,140,248,0.35), transparent 60%), radial-gradient(circle at bottom, rgba(248,113,113,0.25), transparent 60%)',
        'gradient-hero':
          'linear-gradient(135deg, rgba(129,140,248,0.18), rgba(236,72,153,0.18))',
      },
    },
  },
  plugins: [],
};

