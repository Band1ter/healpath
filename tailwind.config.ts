import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brief design system
        primary: "#7C3AED",
        "primary-light": "#A78BFA",
        accent: "#EC4899",
        bg: "#0F0A1E",
        surface: "#1A1030",
        surface2: "#241840",
        border: "#3D2B6B",
        muted: "#9B8AC4",
        crisis: "#FF4D6A",
        safe: "#34D399",
        // Keep legacy aliases for any remaining light components
        lavender: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        sage: {
          50: "#f1f8f4",
          100: "#dcefe3",
          200: "#b9dfc7",
          300: "#8ec9a7",
          400: "#5dae81",
          500: "#3d9262",
        },
        warmNeutral: {
          50: "#fdf8f6",
          100: "#f7ede8",
          200: "#eeddd5",
          300: "#e0c5b8",
          400: "#c9a08c",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Lora", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
