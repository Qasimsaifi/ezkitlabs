/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'rgb(59, 130, 246)',
  				light: 'rgb(96, 165, 250)',
  				dark: 'rgb(37, 99, 235)',
  				foreground: 'rgb(255, 255, 255)'
  			},
  			secondary: {
  				DEFAULT: 'rgb(20, 184, 166)',
  				foreground: 'rgb(153, 246, 228)'
  			},
  			accent: {
  				DEFAULT: 'rgb(168, 85, 247)',
  				foreground: 'rgb(255, 255, 255)'
  			},
  			background: 'rgb(15, 23, 42)',
  			foreground: 'rgb(209, 213, 219)',
  			muted: {
  				DEFAULT: 'rgb(51, 65, 85)',
  				foreground: 'rgb(156, 163, 175)'
  			},
  			card: {
  				DEFAULT: 'rgb(30, 41, 59)',
  				foreground: 'rgb(209, 213, 219)'
  			},
  			popover: {
  				DEFAULT: 'rgb(30, 41, 59)',
  				foreground: 'rgb(209, 213, 219)'
  			},
  			border: 'rgb(51, 65, 85)',
  			input: 'rgb(51, 65, 85)',
  			ring: 'rgb(59, 130, 246)',
  			destructive: {
  				DEFAULT: 'rgb(239, 68, 68)',
  				foreground: 'rgb(255, 255, 255)'
  			},
  			warning: {
  				DEFAULT: 'rgb(250, 204, 21)',
  				foreground: 'rgb(31, 41, 55)'
  			},
  			success: {
  				DEFAULT: 'rgb(74, 222, 128)',
  				foreground: 'rgb(31, 41, 55)'
  			},
  			chart: {
  				'1': 'rgb(59, 130, 246)',
  				'2': 'rgb(20, 184, 166)',
  				'3': 'rgb(168, 85, 247)',
  				'4': 'rgb(250, 204, 21)',
  				'5': 'rgb(74, 222, 128)'
  			}
  		},
  		borderRadius: {
  			lg: '0.5rem',
  			md: '0.375rem',
  			sm: '0.25rem'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
