module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-5px 5px 35px 25px',
      }
    },
    fontFamily: {
      roboto : "'Roboto', sans-serif",
      mitr : "'Mitr', sans-serif",
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(10px)',
    },
    screens: {
      'sm':   {'min': '320px', 'max': '640px'},
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [require("tailwind-scrollbar-hide"),
  require('tailwindcss-filters'),
], 
}
