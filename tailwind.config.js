/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      comfortaa: ["Comfortaa", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"), "@tailwindcss/forms"],
};
