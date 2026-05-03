/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors:{
        primary:"#4B5945",
        secondary:"#66785F",
        accent:"#91AC8F"
    },
    fontSize:{
        base:"14px",
        md:"22.7px",
        lg:"36.7px",
        xl:"59.4px"
    },
     fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
