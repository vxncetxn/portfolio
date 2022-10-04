/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      primary: ["Neue Montreal", ...defaultTheme.fontFamily.sans],
      secondary: ["Cirka", ...defaultTheme.fontFamily.serif],
    },
    fontMetrics: {
      primary: {
        capHeight: 715,
        ascent: 958,
        descent: -242,
        lineGap: 0,
        unitsPerEm: 1000,
      },
      secondary: {
        capHeight: 637,
        ascent: 640,
        descent: -200,
        lineGap: 0,
        unitsPerEm: 1000,
      },
    },
    fontSize: {
      14: ["0.875rem", "1.25rem"],
      16: ["1rem", "1.5rem"],
      18: ["1.125rem", "1.75rem"],
      20: ["1.25rem", "2rem"],
      24: ["1.5rem", "2.25rem"],
      28: ["1.75rem", "2.5rem"],
      32: ["2rem", "2.5rem"],
      40: ["2.5rem", "3rem"],
    },
    spacing: {
      0: "0",
      2: "0.125rem",
      4: "0.25rem",
      8: "0.5rem",
      12: "0.75rem",
      16: "1rem",
      20: "1.25rem",
      24: "1.5rem",
      32: "2rem",
      40: "2.5rem",
      48: "3rem",
      64: "4rem",
      80: "5rem",
      96: "6rem",
      120: "7.5rem",
      160: "10rem",
      200: "12.5rem",
      240: "15rem",
      280: "17.5rem",
      320: "20rem",
      360: "22.5rem",
    },
    extend: {
      colors: {
        "neutral-01": "var(--color-neutral-01)",
        "neutral-02": "var(--color-neutral-02)",
      },
    },
  },
  plugins: [require("tailwindcss-capsize")],
};