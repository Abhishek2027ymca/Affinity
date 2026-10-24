/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tahoma", '"MS Sans Serif"', "Geneva", "sans-serif"],
        chat: ["Arial", "Helvetica", "sans-serif"],
        times: ['"Times New Roman"', "Times", "serif"],
        banner: ['"Arial Black"', "Arial", "sans-serif"],
      },
      colors: {
        win: {
          desktop: "#008080",
          face: "#c0c0c0",
          gray: "#808080",
          navy: "#000080",
        },
      },
    },
  },
  plugins: [],
};
