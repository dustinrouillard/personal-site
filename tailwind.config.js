/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "370px",
        vs: "400px",
        bg: "600px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
