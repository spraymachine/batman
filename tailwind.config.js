/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#000000',
        'space-deeper': '#000000',
        'aurora-green': '#00ff87',
        'aurora-blue': '#00d4ff',
        'aurora-purple': '#b794f6',
        'silver-white': '#e8f4f8',
        'cosmic-yellow': '#ffd700',
        'sun-orange': '#ff6b35',
        'moon-silver': '#c0c0c0',
        'jupiter-orange': '#c88b3a',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro', 'Segoe UI', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}

