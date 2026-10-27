/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          text: "#0F172A",
        },
        dark: {
          bg: "#09090B",
          card: "#121215",
          border: "rgba(39, 39, 42, 0.8)",
          text: "#F8FAFC",
        },
        accent: {
          light: "#EAB308",
          dark: "#FBBF24",
        },
      },
      boxShadow: {
        'card-light': '0 4px 20px -4px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 20px -4px rgba(0, 0, 0, 0.40)',
        'card-hover-light': '0 12px 28px -4px rgba(234, 179, 8, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'card-hover-dark': '0 12px 28px -4px rgba(251, 191, 36, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.4)',
        'glow-gold': '0 0 15px -2px rgba(251, 191, 36, 0.3)',
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
