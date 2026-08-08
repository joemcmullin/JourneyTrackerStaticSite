/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        'card-hover': 'var(--bg-card-hover)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        gold: 'var(--gold)',
        momentum: 'var(--momentum)',
        'text-hi': 'var(--text-hi)',
        'text-mid': 'var(--text-mid)',
        'text-lo': 'var(--text-lo)',
      },
      fontFamily: {
        sans: ['"Albert Sans"', 'system-ui', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
