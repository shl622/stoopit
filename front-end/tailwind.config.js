/*
	This file is what sets up our custom theme with DaisyUI
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			{
				stoopit: {
					primary: '#FAA636',
					secondary: '#F7C4A5',
					accent: '#EEE5E9',
					neutral: '#000',
					'base-100': '#FFFFFF',
					info: '#91C4F2',
					success: '#CEEC97',
					warning: '#FBBD23',
					error: '#F87272',
					'--primary': '#FAA636',
					'--secondary': '#F7C4A5',
					'--accent': '#EEE5E9',
					'--neutral': '#000',
					'--base-100': '#FFFFFF',
					'--info': '#91C4F2',
					'--success': '#CEEC97',
					'--warning': '#FBBD23',
					'--error': '#F87272'
				}
			}
		]
	},
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
