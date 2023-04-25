/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NunitoSans: "Nunito Sans,sans-serif",
      },
      colors: {
        primary: "#6379F4",
        dark: "#3A3D42",
        error: "#FF5B37",
        greySecondary: "#3A3D4299",
        greythirty: "#DADADA",
        greyFont: "#7A7886",
        greyPrime: "#4D4B57",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"],
  },
};
