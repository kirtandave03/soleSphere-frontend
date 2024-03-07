/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url(/src/assets/bg.png)",
      },
      colors: {
        "input-bg": "#f1f4f9",
        "input-border": "#d8d8d8",
      },
    },
  },
  plugins: [],
};
