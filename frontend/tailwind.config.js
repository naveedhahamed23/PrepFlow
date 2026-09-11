/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
        secondary: "#06B6D4",  // cyan
        accent: "#2563EB",
        // Deep navy-based background palette (replacing zinc-gray)
        bg: {
          DEFAULT: "#080C14",      // near-black navy
          card: "#0D1424",         // deep navy card surface
          "card-2": "#101828",     // slightly lighter navy card
          hover: "#141E30",        // hover state navy
          border: "#1E2D45",       // blue-tinted border
        },
        text: {
          DEFAULT: "#F0F4FF",      // slightly blue-white
          muted: "#7B91B0",        // blue-gray muted
          subtle: "#4A6080",       // very muted
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        // Semantic category colors matching reference
        dsa: "#3B82F6",       // blue
        aptitude: "#F59E0B",  // orange/amber
        interview: "#EC4899", // pink
        resume: "#10B981",    // emerald green
        studytime: "#8B5CF6", // purple
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59, 130, 246, 0.45)",
        "glow-sm": "0 0 20px -5px rgba(59, 130, 246, 0.3)",
        card: "0 4px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-blue": "0 4px 24px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59,130,246,0.1)",
        "card-hover": "0 8px 32px -4px rgba(59, 130, 246, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(to right, rgba(30,45,69,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,45,69,0.5) 1px, transparent 1px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
