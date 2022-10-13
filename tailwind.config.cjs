/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Neue Montreal", ...defaultTheme.fontFamily.sans],
      serif: ["Cirka", ...defaultTheme.fontFamily.serif],
    },
    fontMetrics: {
      sans: {
        capHeight: 715,
        ascent: 958,
        descent: -242,
        lineGap: 0,
        unitsPerEm: 1000,
      },
      serif: {
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
    borderRadius: {
      none: "0",
      2: "0.125rem",
      4: "0.25rem",
      8: "0.5rem",
      16: "1rem",
      full: "50%",
    },
    screens: {
      mobile: "375px",
      tablet: "768px",
      desktop: "1024px",
    },
    extend: {
      colors: {
        "neutral-01": "var(--color-neutral-01)",
        "neutral-02": "var(--color-neutral-02)",
        "neutral-03": "var(--color-neutral-03)",
        "neutral-04": "var(--color-neutral-04)",
        "theme-selected": "var(--color-theme-selected)",
      },
      borderWidth: {
        6: "6px",
      },
    },
  },
  plugins: [
    require("tailwindcss-capsize"),
    plugin(function ({ addVariant }) {
      addVariant("hover-none", "@media (hover: none)");
    }),
  ],
};
