/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        darkYellow: "#D6F6DD",
        lightYellow: "#FCF8DF",
        black: "#0A0A0A",
        green: "#18C37D",
        grayish: "#F8F8F8",
        darkGray: "#202123",
        lightGray: "#343541",
        lightBrown: "#FAF1E6",
        mediumBrown: "#E8D1BF",
        darkBrown: "#222222",
      },
      keyframes: {
        wiggle: {
          "0%": { tranform: "-translateX(50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s linear infinite",
      },
    },
  },
  plugins: [],
};
