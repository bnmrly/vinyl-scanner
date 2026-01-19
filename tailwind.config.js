/** @type {import('tailwindcss').Config} */
const colours = require('./designSystem/tokens/colors.cjs');

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        ...(colours.colours || colours),
        // Semantic color mappings that auto-switch with dark: variants
        // Backgrounds
        'bg-screen': colours.white?.offWhite,
        'bg-section': colours.white?.default,
        'bg-card': colours.grey?.['100'],  
        // Text
        'text-content': colours.black?.blackBlue,
        'text-muted': colours.grey?.['600'],
        'text-brand': colours.orange?.['500'],
        // UI
        'border-default': colours.grey?.['200'],
        tint: colours.orange?.['300'],
      },
    },
  },
  plugins: [],
};
