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
        portfolio: {
          bg: "#F8F7F4",
          surface: "#FFFFFF",
          text: "#252525",
          dark: "#171717",
          accent: "#A69B8C",
          "accent-hover": "#938776",
          "accent-subtle": "#F2EFE9",
          border: "#E7E3DC",
          "border-dark": "#D1CABE",
          muted: "#77736E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(23, 23, 23, 0.04), 0 1px 2px -1px rgba(23, 23, 23, 0.02)",
        card: "0 4px 6px -1px rgba(23, 23, 23, 0.03), 0 2px 4px -2px rgba(23, 23, 23, 0.03)",
        elevated: "0 12px 24px -4px rgba(23, 23, 23, 0.06), 0 4px 8px -2px rgba(23, 23, 23, 0.03)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
