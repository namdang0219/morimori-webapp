/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffcc00',
        danger: '#e74c3c',
      },
      spacing: {
        'main-padding': '16px',
        'header-height': '56px',
      },
    },
  },
  plugins: [],
}