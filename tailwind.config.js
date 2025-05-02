/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "instagram-pink": "rgb(193, 53, 132)",
        "socialblade-brand": "rgb(179, 56, 44)",
        "github-act-none": "#eff2f5",
        "github-act-some": "#aceebb",
        "github-act-medium": "#4ac26b",
        "github-act-lot": "#2da44e",
        "github-act-most": "#116329",

        "github-act-none-dark": "#151b23",
        "github-act-some-dark": "#033a16",
        "github-act-medium-dark": "#196c2e",
        "github-act-lot-dark": "#2ea043",
        "github-act-most-dark": "#56d364",
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
