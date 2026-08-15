import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "#FAFAF7",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#0F5132",
          50: "#E8F2ED",
          100: "#CCE4D6",
          200: "#99C9AD",
          300: "#66AE84",
          400: "#33935B",
          500: "#0F5132",
          600: "#0C4128",
          700: "#09311E",
          800: "#062014",
          900: "#03100A",
        },
        secondary: {
          DEFAULT: "#3F7D5E",
          50: "#EEF5F1",
          100: "#DDEBE2",
          200: "#BBD7C5",
          300: "#99C3A8",
          400: "#77AF8B",
          500: "#3F7D5E",
          600: "#32644B",
          700: "#264B38",
          800: "#193226",
          900: "#0D1913",
        },
        accent: {
          DEFAULT: "#C9A961",
          50: "#FAF6EC",
          100: "#F5EDD9",
          200: "#EBDBB3",
          300: "#E1C98D",
          400: "#D7B767",
          500: "#C9A961",
          600: "#A1874E",
          700: "#79653A",
          800: "#504327",
          900: "#282213",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
