/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#18C37D",
        grayish: "#F8F8F8",
        darkGray: "#202123",
        lightGray: "#343541",
      },
    },
  },
  plugins: [],
};
