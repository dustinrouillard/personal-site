/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "socialblade-brand": "rgb(179, 56, 44)",
      },
      screens: {
        xs: "370px",
        vs: "400px",
        bg: "600px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
