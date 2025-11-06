/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"], // Dark mode toggle karein
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Sare files include karein
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: {
          DEFAULT: '#0A2342',
          600: '#081b33',
          700: '#061424'
        },
        secondary: {
          DEFAULT: '#FF8C00',
          600: '#e67d00',
          700: '#cc6f00'
        },
        accent: {
          DEFAULT: '#FF8C00'
        },
        bgLight: '#F8F9FA',
        textDark: '#212529',
        textSubtle: '#6C757D'
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [tailwindcssAnimate], // Plugin ko import karein
};