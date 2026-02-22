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
        // BRAXLEYNEVIM DESIGN SYSTEM
        // Premium gold on deep black
        // ═══════════════════════════════════════

        chartreuse: "#C7A257",
        arctic: "#C7A257",

        background: "#000000",
        foreground: "#FFFFFF",

        surface: {
          DEFAULT: "#080808",
          2: "#111111",
          3: "#1C1C1C",
        },

        primary: {
          DEFAULT: "#C7A257",
          foreground: "#000000",
        },

        signal: {
          green: "#22C55E",
          red: "#EF4444",
          blue: "#3B82F6",
        },

        profit: "#22C55E",
        loss: "#EF4444",
        gold: "#C7A257",

        muted: {
          DEFAULT: "#111111",
          foreground: "#666666",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },

        card: {
          DEFAULT: "#050505",
          foreground: "#FFFFFF",
        },

        border: "#333333",
        "border-subtle": "#222222",
        input: "#333333",
        ring: "#C7A257",
        accent: "#C7A257",

        magma: "#C7A257",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(5rem, 15vw, 16rem)", { lineHeight: "0.85", letterSpacing: "0.02em" }],
        "display-2xl": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.9", letterSpacing: "0.01em" }],
        "display-xl": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "0.9", letterSpacing: "0.01em" }],
        "display-lg": ["clamp(2rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "display-md": ["clamp(1.5rem, 4vw, 2.5rem)", { lineHeight: "1", letterSpacing: "0em" }],
        "display-sm": ["clamp(1.25rem, 3vw, 1.75rem)", { lineHeight: "1.1", letterSpacing: "0em" }],
        "data-xl": ["3rem", { lineHeight: "1", letterSpacing: "0.05em" }],
        "data-lg": ["2rem", { lineHeight: "1", letterSpacing: "0.04em" }],
        "data-md": ["1.5rem", { lineHeight: "1", letterSpacing: "0.03em" }],
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
      },
      boxShadow: {
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        "glow-cyan": "0 0 20px rgba(199, 162, 87, 0.4)",
        "glow-cyan-sm": "0 0 10px rgba(199, 162, 87, 0.25)",
        "glow-cyan-lg": "0 0 40px rgba(199, 162, 87, 0.3)",
        "glow-arctic": "0 0 20px rgba(199, 162, 87, 0.4)",
        "glow-arctic-sm": "0 0 10px rgba(199, 162, 87, 0.25)",
        "glow-arctic-lg": "0 0 40px rgba(199, 162, 87, 0.3)",
        "glow-magma": "0 0 20px rgba(199, 162, 87, 0.4)",
        "glow-magma-sm": "0 0 10px rgba(199, 162, 87, 0.25)",
        "glow-magma-lg": "0 0 40px rgba(199, 162, 87, 0.3)",
        "glow-green": "0 0 15px rgba(34, 197, 94, 0.3)",
        "glow-red": "0 0 15px rgba(239, 68, 68, 0.3)",
        "glow-gold": "0 0 20px rgba(199, 162, 87, 0.4)",
      },
      animation: {
        "fade-in": "fade-in 100ms ease-out",
        "fade-up": "fade-up 200ms ease-out",
        "ticker": "ticker 40s linear infinite",
        "pulse-live": "pulse-live 1.5s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer-sweep 4s ease-in-out infinite",
        "draw": "draw-line 2s ease-out forwards",
        "float-slow": "float-slow 8s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "ticker": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "pulse-live": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
        "scan-line": { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        "float": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-5px)" } },
        "shimmer-sweep": { "0%, 100%": { backgroundPosition: "200% center" }, "50%": { backgroundPosition: "-200% center" } },
        "draw-line": { to: { strokeDashoffset: "0" } },
        "float-slow": { "0%, 100%": { transform: "translateY(0) scale(1)" }, "50%": { transform: "translateY(-12px) scale(1.02)" } },
      },
      spacing: { "18": "4.5rem", "22": "5.5rem" },
    },
  },
  plugins: [],
};

export default config;
