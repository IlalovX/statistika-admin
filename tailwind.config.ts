// tailwind.config.js
module.exports = {
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#3f51b5',
					dark: '#7986cb',
				},
				secondary: {
					light: '#f50057',
					dark: '#ff4081',
				},
				bg: {
					light: '#f5f5f5',
					dark: '#242424',
					paperDark: '#1e1e1e',
					paperLight: '#ffffff',
				},
				text: {
					primaryDark: '#ffffff',
					secondaryDark: '#b0bec5',
				},
				dividerDark: 'rgba(255, 255, 255, 0.12)',
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out both',
				'fade-up': 'fadeUp 0.5s ease-out both',
				'spin-slow': 'spin 1.4s linear infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, transform: 'scale(0.96)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
				fadeUp: {
					'0%': { opacity: 0, transform: 'translateY(8px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
		},
	},
}
