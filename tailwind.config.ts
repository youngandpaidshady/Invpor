import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════
        // MAGMA DESIGN SYSTEM
        // Orange-500 on Zinc-950. No white BGs.
        // ═══════════════════════════════════════

        // Brand accent
        magma: "#F97316",

        // Core
        background: "#09090B",
        foreground: "#FAFAFA",

        // Surfaces
        surface: {
          DEFAULT: "#18181B",
          2: "#27272A",
        },

        // Primary — Orange accent
        primary: {
          DEFAULT: "#F97316",
          foreground: "#000000",
        },

        // Signal Colors — semantic data only
        signal: {
          green: "#00FF88",
          red: "#FF3366",
          blue: "#3B82F6",
        },

        // Semantic
        profit: "#00FF88",
        loss: "#FF3366",

        // UI
        muted: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA",
        },
        destructive: {
          DEFAULT: "#FF3366",
          foreground: "#FFFFFF",
        },

        // Cards
        card: {
          DEFAULT: "#111113",
          foreground: "#FAFAFA",
        },

        // Borders
        border: "#3F3F46",
        "border-subtle": "#27272A",
        input: "#3F3F46",
        ring: "#F97316",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 4vw, 2.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.25rem, 3vw, 1.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "data-xl": ["3rem", { lineHeight: "1", letterSpacing: "0" }],
        "data-lg": ["2rem", { lineHeight: "1", letterSpacing: "0" }],
        "data-md": ["1.5rem", { lineHeight: "1", letterSpacing: "0" }],
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "6px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.15)",
        md: "0 4px 16px rgba(0, 0, 0, 0.2)",
        lg: "0 8px 32px rgba(0, 0, 0, 0.25)",
        // Magma glow
        "glow-magma": "0 0 25px rgba(249, 115, 22, 0.5)",
        "glow-magma-sm": "0 0 12px rgba(249, 115, 22, 0.3)",
        "glow-magma-lg": "0 0 50px rgba(249, 115, 22, 0.3)",
        // Semantic
        "glow-green": "0 0 20px rgba(0, 255, 136, 0.3)",
        "glow-red": "0 0 20px rgba(255, 51, 102, 0.3)",
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "fade-up": "fade-up 400ms ease-out",
        "ticker": "ticker 40s linear infinite",
        "pulse-live": "pulse-live 2s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-live": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
