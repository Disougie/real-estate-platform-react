/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a5f',
        secondary: '#2d4a6f',
        accent: '#4cc9f0',
        background: '#f5f5f5',
        foreground: '#1a1a1a',
      },
      fontFamily: {
        arabic: ['Tajawal', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
