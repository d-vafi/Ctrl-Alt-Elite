/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // <--- this enables dark mode toggling via media
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
        },
      },
      animation: {
        "fade-in": "fade-in 3.5s ease-out forwards",
        "pulse-slow": "pulse-slow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}