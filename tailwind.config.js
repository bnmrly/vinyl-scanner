/** @type {import('tailwindcss').Config} */
const colours = require('./designSystem/tokens/colors.cjs');

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...(colours.colours || colours),
      },
    },
  },
  plugins: [],
};
