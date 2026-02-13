/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				gold: {
					light: '#FFD700',
					DEFAULT: '#DAA520',
					dark: '#B8860B',
				},
				maroon: '#800000',
				deepRed: '#DC143C',
				cream: '#FFFDD0',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				telugu: ['Lakki Reddy', 'serif'], // Example Telugu font, or generic fallback
			},
			animation: {
				float: 'float 6s ease-in-out infinite',
				'spin-slow': 'spin 12s linear infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
			},
		},
	},
	plugins: [],
};
