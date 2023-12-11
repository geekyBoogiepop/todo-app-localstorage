/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'wewak': {
          '50': '#fdf3f4',
          '100': '#fbe8eb',
          '200': '#f6d5da',
          '300': '#ea9daa',
          '400': '#e58799',
          '500': '#d75c77',
          '600': '#c13d60',
          '700': '#a22e4f',
          '800': '#882947',
          '900': '#752642',
          '950': '#411020',
        },

      },
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaley(1)" },
        }
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-linear",
      }
    },
  },
  plugins: [],
}

