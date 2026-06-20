/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bz-negro': '#0A0A0A',
        'bz-ambar': '#D4820A',
        'bz-beige': '#F0EAD6',
        'bz-crema': '#F5F1E8',
        'bz-grafito': '#2C2C2A',
        'bz-muted': '#888780',
      },
      fontFamily: {
        display: ['Anton', 'Arial Black', 'Impact', 'sans-serif'],
        body: ['Darker Grotesque', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'bz-meta': ['8px', { letterSpacing: '1.5px', lineHeight: '1' }],
        'bz-label': ['9px', { letterSpacing: '3px', lineHeight: '1' }],
        'bz-xs': ['10px', { letterSpacing: '0.3px', lineHeight: '1.5' }],
        'bz-sm': ['12px', { letterSpacing: '0.3px', lineHeight: '1.6' }],
        'bz-base': ['14px', { letterSpacing: '0', lineHeight: '1.5' }],
        'bz-card': ['13px', { letterSpacing: '0', lineHeight: '1.2' }],
        'bz-lead': ['20px', { letterSpacing: '0', lineHeight: '1.45', fontWeight: '700' }],
        'bz-md': ['18px', { letterSpacing: '0', lineHeight: '1.3' }],
        'bz-lg': ['24px', { letterSpacing: '0', lineHeight: '1.2' }],
        'bz-xl': ['36px', { letterSpacing: '0', lineHeight: '1.05' }],
        'bz-2xl': ['52px', { letterSpacing: '-1px', lineHeight: '1' }],
        'bz-hero': ['72px', { letterSpacing: '-2px', lineHeight: '0.95' }],
      },
      borderRadius: {
        bz: '10px',
        'bz-sm': '6px',
      },
      borderWidth: {
        bz: '1.5px',
      },
      spacing: {
        'bz-xs': '8px',
        'bz-sm': '16px',
        'bz-md': '24px',
        'bz-lg': '40px',
        'bz-xl': '64px',
        'bz-2xl': '96px',
        'bz-label-gap': '14px',
        'bz-cards-gap': '12px',
        'bz-section-gap': '36px',
        'bz-shadow': '6px',
      },
      keyframes: {
        'bz-rise': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bz-pop': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'bz-rise': 'bz-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'bz-pop': 'bz-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}