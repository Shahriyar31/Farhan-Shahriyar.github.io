/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Add this block to define the custom animation
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-slow-reverse': 'spin 40s linear infinite reverse',
      }
    },
  },
  plugins: [],
}