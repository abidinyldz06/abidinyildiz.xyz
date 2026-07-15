/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F1',
        ink: '#1B2D2A',
        forest: '#2D5A3D',
        earth: '#8B6F47',
        moss: '#A8B5A0',
        night: '#1A1F1E',
        'night-text': '#E8E4D9',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
