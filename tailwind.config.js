module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "-5px 5px 35px 25px",
      },
    },
    fontFamily: {
      roboto: "'Roboto', sans-serif",
      mitr: "'Mitr', sans-serif",
    },
    backdropFilter: {
      none: "none",
      blur: "blur(10px)",
    },
    screens: {
      sm: { min: "320px", max: "680px" },

      md: { min: "768px", max: "1020px" },

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      scOne: "1366px",
      xxl: "1440px",
      scTwo: "1536px",
      scThree: "1680px",
      
      xxxl: "2560px",
      // => @media (min-width: 2560px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwindcss-filters")],
};
