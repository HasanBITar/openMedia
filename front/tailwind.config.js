export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "media",
  theme: {
    extend: {
      width: {
        "card-lg": "40rem",
      },
      height: {
        subpage: "calc(100vh - 5.5rem)",
      },
      boxShadow: {
        "down-8": "0 8px 0 0 black",
      },
      colors: {
        "semi-trans": "#00000088",
        gray: {
          900: "#000000",
          800: "#121212",
          hover: "#1f1f1f",
          menu: "#282828",
          input: "#242424",
          // 900: '#1f2937',
          // 800: '#111827'
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
