import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.5rem", { lineHeight: "0.75rem" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          "100": "#F1F1F1",
          "200": "#EFEFED",
          "300": "#b3b3b3",
          "400": "#999999",
          "500": "#808080",
          "600": "#666666",
          "700": "#4d4d4d",
          "800": "#2a2a2a",
          "900": "#262626",
        },
        purple: {
          "100": "#d9dcf2",
          "200": "#b3b9e6",
          "300": "#8c96d9",
          "400": "#6674cc",
          "500": "#4050bf",
          "600": "#3949ac",
          "700": "#334199",
          "800": "#2d3986",
          "900": "#263073",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
