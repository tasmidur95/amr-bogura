import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        terracotta: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        brand: {
          primary: "#0B4635",
          secondary: "#C85A28",
          accent: "#F59E0B",
          surface: "#F9F8F4",
          dark: "#022C22",
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"Plus Jakarta Sans"',
          '"Hind Siliguri"',
          '"Noto Sans Bengali"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        english: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

