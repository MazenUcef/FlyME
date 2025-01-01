/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#76fcfe',
        secondary: '#4983ef',
        third: '#546473',
        fourth: '#1c2735'
      },
    },
  },
  plugins: [],
}