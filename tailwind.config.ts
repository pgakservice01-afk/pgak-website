import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — values live as CSS variables in globals.css and
        // swap under :root[data-theme="light"]. Channel form keeps /opacity
        // modifiers (e.g. bg-accent/10) working.
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        "bg-2": "rgb(var(--c-bg-2) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        "panel-2": "rgb(var(--c-panel-2) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--c-ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--c-ink-faint) / <alpha-value>)",
        line: "var(--c-line)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "accent-2": "rgb(var(--c-accent-2) / <alpha-value>)",
        "accent-deep": "rgb(var(--c-accent-deep) / <alpha-value>)",
        danger: "rgb(var(--c-danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        xl2: "20px",
      },
      keyframes: {
        scanY: {
          "0%, 100%": { top: "8%" },
          "50%": { top: "90%" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        dash: {
          to: { strokeDashoffset: "-16" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        scanY: "scanY 3.4s linear infinite",
        pulseDot: "pulseDot 1.4s infinite",
        floaty: "floaty 6s ease-in-out infinite",
        dash: "dash 0.9s linear infinite",
        glowPulse: "glowPulse 2.6s ease-in-out infinite",
        sweep: "sweep 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
