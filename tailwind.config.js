/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F5F1EB",
        charcoal: "#1C1C1C",
        warmgray: "#6B6B6B",
        gold: "#C9A24D",
        ocean: "#0E3B3B",

        heroBg: "#D8F9FF",
        heroText: "#2234A8",
        heroHighlight: "#00008C",
      },
      fontFamily: {
              russo: ["'Russo One'", "sans-serif"],
        courgette: ["'Courgette'", "cursive"],
        yellowtail: ["'Yellowtail'", "cursive"],
        bodoni: ["'Libre Bodoni'", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
