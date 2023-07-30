/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   light: {
    //   },
    // },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        // light: {
        //   "color-scheme": "light",
        //   primary: "#570df8",
        //   "primary-content": "#E0D2FE",
        //   secondary: "#f000b8",
        //   "secondary-content": "#FFD1F4",
        //   accent: "#1ECEBC",
        //   "accent-content": "#07312D",
        //   neutral: "#2B3440",
        //   "neutral-content": "#D7DDE4",
        //   "base-100": "#f5f2f2",
        //   "base-200": "#e4e7e7",
        //   "base-300": "#d7dada",
        //   "base-content": "#1f2937",
        // },
      },
      // {
      //   dark: {
      {
        dark: {
          "color-scheme": "dark",
          primary: "#661AE6",
          "primary-content": "#ffffff",
          secondary: "#D926AA",
          "secondary-content": "#ffffff",
          accent: "#1FB2A5",
          "accent-content": "#ffffff",
          neutral: "#2a323c",
          "neutral-focus": "#242b33",
          "neutral-content": "#A6ADBB",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          // "base-content": "#adb6c7",
          "base-content": "#ffffff",
        },
      },
      "light",
      "dark",
    ],
  },
};
