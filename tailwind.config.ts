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
        purple: {
          "100": "#A2A9E1",
          "200": "#7686b6",
          "300": "#5e73ab",
          "400": "#475fa0",
          "500": "#4050bf",
          "600": "#3a45a5",
          "700": "#343a8a",
          "800": "#2e2f70",
          "900": "#282555",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
