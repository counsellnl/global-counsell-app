/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A192F',
        'dark-green': '#112A22',
        'off-white': '#F5F5F5',
        gold: '#D4AF37',
      }
    },
  },
  plugins: [],
}
