/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        brown: 'var(--brown)',
        amber: 'var(--amber)',
        teal: 'var(--teal)',
        green: 'var(--green)',
        pink: 'var(--pink)',
        sky: 'var(--sky)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
};
