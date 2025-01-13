/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#9A33EF",
				secondary: "#ffcc00",
				danger: "#e74c3c",
				"ios-blue": "#007AFF",
			},
			spacing: {
				"main-padding": "16px",
				"header-height": "46px",
			},
		},
	},
	plugins: [],
};
