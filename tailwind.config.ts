import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "float-orb": "float-orb 8s ease-in-out infinite",
        "gradient-rotate": "gradient-rotate 4s linear infinite",
        "shine-sweep": "shine-sweep 5s ease-in-out infinite",
        "text-pulse-glow": "text-pulse-glow 3s ease-in-out infinite",
        "aurora-shift": "aurora-shift 12s ease infinite",
        "noise-drift": "noise-drift 20s linear infinite",
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "holographic-shift": "holographic-shift 8s ease infinite",
        "holographic-glare": "holographic-glare 3s ease infinite",
        "pulse-glow": "pulse-glow-effect 2s ease-in-out infinite",
        "slide-in-bottom": "slide-in-bottom 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-top": "slide-in-top 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.8s ease",
        "bounce-in": "bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "rotate-in": "rotate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "flip-in": "flip-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "glitch-1": "glitch-1 0.3s infinite",
        "glitch-2": "glitch-2 0.3s infinite",
        "blink-caret": "blink-caret 1s step-end infinite",
      },
      keyframes: {
        "float-orb": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)",
          },
          "50%": {
            transform: "translate3d(3%, -4%, 0) scale(1.08)",
          },
        },
        "gradient-rotate": {
          "0%": { "--gradient-angle": "0deg" } as any,
          "100%": { "--gradient-angle": "360deg" } as any,
        },
        "shine-sweep": {
          "0%": {
            transform: "translateX(-100%) skewX(-15deg)",
          },
          "100%": {
            transform: "translateX(200%) skewX(-15deg)",
          },
        },
        "text-pulse-glow": {
          "0%, 100%": {
            textShadow: "0 0 20px rgba(167, 139, 250, 0.4), 0 0 40px rgba(167, 139, 250, 0.2)",
          },
          "50%": {
            textShadow: "0 0 30px rgba(167, 139, 250, 0.6), 0 0 60px rgba(167, 139, 250, 0.35)",
          },
        },
        "aurora-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "noise-drift": {
          "0%": {
            backgroundPosition: "0 0",
          },
          "100%": {
            backgroundPosition: "100% 100%",
          },
        },
        "neon-pulse": {
          "0%, 100%": {
            filter: "brightness(1) drop-shadow(0 0 8px currentColor)",
          },
          "50%": {
            filter: "brightness(1.2) drop-shadow(0 0 16px currentColor)",
          },
        },
        "holographic-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "holographic-glare": {
          "0%": {
            backgroundPosition: "-200% 0%",
          },
          "100%": {
            backgroundPosition: "200% 0%",
          },
        },
        "pulse-glow-effect": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-in-top": {
          "0%": {
            transform: "translateY(-100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "bounce-in": {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "rotate-in": {
          "0%": {
            transform: "rotate(-180deg) scale(0)",
            opacity: "0",
          },
          "100%": {
            transform: "rotate(0) scale(1)",
            opacity: "1",
          },
        },
        "flip-in": {
          "0%": {
            transform: "perspective(400px) rotateY(-90deg)",
            opacity: "0",
          },
          "100%": {
            transform: "perspective(400px) rotateY(0)",
            opacity: "1",
          },
        },
        "glitch-1": {
          "0%, 100%": {
            transform: "translate(0)",
          },
          "20%": {
            transform: "translate(-2px, 2px)",
          },
          "40%": {
            transform: "translate(-2px, -2px)",
          },
          "60%": {
            transform: "translate(2px, 2px)",
          },
          "80%": {
            transform: "translate(2px, -2px)",
          },
        },
        "glitch-2": {
          "0%, 100%": {
            transform: "translate(0)",
          },
          "20%": {
            transform: "translate(2px, -2px)",
          },
          "40%": {
            transform: "translate(2px, 2px)",
          },
          "60%": {
            transform: "translate(-2px, -2px)",
          },
          "80%": {
            transform: "translate(-2px, 2px)",
          },
        },
        "blink-caret": {
          "0%, 49%": {
            opacity: "1",
          },
          "50%, 100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
