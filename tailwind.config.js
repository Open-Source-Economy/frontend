/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-all": ``,
        "primary-developer": "#ff7e4b",
        "primary-user": "#ff518c",
        "primary-stakeholder": "#5e309c",
        secondary: "#0e1f35",
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
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        michroma: ["michroma", "sans-serif"],
      },
    },
  },
  plugins: [],
};
