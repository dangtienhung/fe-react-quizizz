/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: [{ primary: ['Quicksand', 'sans-serif'] }],
			colors: { primary: '#8854C0', secondary: '#72737D', 'gray-1': '#E9E9EB' },
		},
	},
	plugins: [require('daisyui'), require('flowbite/plugin')],
};
