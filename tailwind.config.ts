import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "green-default": "#06a358",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideDown: "slideDown 0.4s ease-in-out",
      },
      backgroundImage: {
        "slider-bg": 'url("/assets/images/slider-bg.jpg")',
      },
    },
  },
  variants: {},
  plugins: [],
};
export default config;
