/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      xs: "400px",
      mx: "700px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1880px",

      300: "300px",
      // => @media (min-width: 300px) { ... }
      400: "400px",
      // => @media (min-width: 400px) { ... }
      // => @media (min-width: 440px) { ... }
      500: "500px",
      // => @media (min-width: 500px) { ... }
      600: "600px",
      // => @media (min-width: 600px) { ... }
      // => @media (min-width: 640px) { ... }
      700: "700px",
      // => @media (min-width: 700px) { ... }
      // => @media (min-width: 768px) { ... }
      800: "800px",
      // => @media (min-width: 800px) { ... }
      900: "900px",
      // => @media (min-width: 900px) { ... }
      1000: "1000px",
      // => @media (min-width: 1024px) { ... }
      1100: "1100px",
      // => @media (min-width: 1100px) { ... }
      1200: "1200px",
      // => @media (min-width: 1200px) { ... }
      // => @media (min-width: 1280px) { ... }
      1300: "1300px",
      // => @media (min-width: 1300px) { ... }
      1400: "1400px",
      // => @media (min-width: 1400px) { ... }
      1500: "1500px",
      // => @media (min-width: 1500px) { ... }
      // => @media (min-width: 1536px) { ... }
      1600: "1600px",
      // => @media (min-width: 1600px) { ... }
      1700: "1700px",
      // => @media (min-width: 1700px) { ... }
      1800: "1800px",
      // => @media (min-width: 1800px) { ... }
      1900: "1900px",
      // => @media (min-width: 1900px) { ... }
      1920: "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        "primary-developer": "#ff7e4b",
        "primary-user": "#ff518c",
        "primary-stakeholder": "#5e309c",
        secondary: "#0e1f35",
        primaryBg: "#14233A",
      },
      transitionProperty: {
        background: "background-color",
        border: "border-color",
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(90deg, #FF7E4B 0%, #FF518C 50%, #66319B 100%)",
      },
      boxShadow: {
        "custom-double-left-right": "10px 0px 15px rgba(105, 51, 155, 0.7), -10px 0px 15px rgba(255, 126, 75, 0.7)",
        c2: "1px 4px 37px 0px rgba(11, 24, 41, 0.20)",
      },
      keyframes: {
        slideInDown: {
          "0%": {
            transform: "translateY(-200%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideInDown: "slideInDown 0.5s ease-out",
        subtleRotateMove: "subtleRotateMove 10s ease-in-out infinite",
        subtleRotateMove2: "subtleRotateMove2 10s ease-in-out infinite",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        michroma: ["michroma", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
