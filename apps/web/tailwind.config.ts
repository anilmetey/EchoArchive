import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        paper: "#eef7ff",
        moss: "#14b889",
        clay: "#f973c2",
        tide: "#0ea5e9",
        plum: "#8b5cf6",
        cyan: "#22d3ee",
        violet: "#7c3aed",
        mint: "#34d399"
      },
      boxShadow: {
        soft: "0 22px 80px rgba(14, 165, 233, 0.18)",
        glow: "0 0 0 1px rgba(255,255,255,0.45), 0 24px 90px rgba(124, 58, 237, 0.22)"
      }
    }
  },
  plugins: [forms]
};

export default config;
