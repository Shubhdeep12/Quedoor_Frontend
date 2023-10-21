import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: {
            50: "#fff",
            100: "#238BFB30",
            200: "#238BFB60",
            300: "#238BFB90",
            400: "#238BFB",
            500: "#000"
          },
        }
      },
      fontFamily: {
				sans: ['var(--font-manrope)'],
      },
      screens: {
				laptop: '1000px',
			},
			maxWidth: {
				laptop: '1440px',
      },
      keyframes: {
        'page-transition': {
					'0%': { transform: 'scale(0.975)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
      },
      animation: {
				'page-transition': 'page-transition 300ms ease-in-out backwards',
				// scroll: 'scroll 15s linear infinite',
				// wave: 'wave 2.5s infinite',
			},
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
export default config
