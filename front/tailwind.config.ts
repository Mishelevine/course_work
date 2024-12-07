import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        dark: {
          1: '#1C1F2E',
          2: '#161925',
        },
        light: {
          1: '#F2F3F7',
          2: '#FFFFFF',
          3: '#FCFCFC'
        },
        blue: {
          1: '#73AEF7',
          2: '#002D6E',
          3: '#0A3C82'
        },
        sky: {
          1: '#C9DDFF',
          2: '#E4EEFF'
        },
        moss: {
          1: '#415111'
        },
        redbutton: {
          1: '#A00924',
          2: '#D62323'
        },
        greenbutton: {
          1: '#006E2C',
          2: '#07B54C'
        },
        test: '#C4DDFF',
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
      backgroundImage: {
        hero: "url('/images/hero-background.jpg')",
        auth: "url('/images/auth-background.jpg')"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      variants: {
        opacity: ["hover"],
        backgroundColor: ["responsive", "hover", "focus", "active"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
