import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a1014",
        "bg-2": "#0d161b",
        panel: "#101e25",
        "panel-2": "#13252e",
        ink: "#eaf3f2",
        "ink-soft": "#9fb4b6",
        "ink-faint": "#65807f",
        line: "rgba(159,180,182,0.14)",
        accent: "#7CF5C4",
        "accent-2": "#3ed8e0",
        "accent-deep": "#0fb89a",
        danger: "#ff8a6b",
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
