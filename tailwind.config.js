/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: "var(--body-font)",
    },
    extend: {
      fontFamily: {
        inter: "var(--body-font)",
      },
      colors: {
        "cw-primary": "#228063",
        "cw-secondary": "#584021",
        "cw-primary-lightest": "#ecf5f0",
        "cw-primary-lighter": "#d1ece4",
        "cw-secondary-lighter": "#E1D8D3",
        "cw-secondary-lightest": "#F0ECE9",
        "cw-light-gray": "#DADADA",
        "cw-dark-gray": "#444444",
        "cw-darker-gray": "#333333",
        "cw-info": "#31708F",
        "cw-info-bg": "#D9EDF7",
      },
      borderColor: {
        DEFAULT: "rgb(229 229 229)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "112ch",
            fontFamily: "Inter, sans-serif",
          },
        },
      },
      backgroundImage: {
        "auth-background": "url('/img/background.jpg')",
      },
    },
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
  },
  plugins: [],
}

