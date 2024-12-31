import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ['class'],
	theme: {
    	extend: {
    		colors: {
    			primaryblue: 'var(--background)',
    			foreground: 'var(--foreground)',
    			bannerbg: 'var(--bannerbg)',
    			secondrybackground: 'var(--secondrybackground)',
    			lightGray: 'var(--lightGray)'
    		},
    		padding: {
    			mainPading: 'var(--mainPadding)',
    			secondryPadding: 'var(--secondryPadding)'
    		},
    		backgroundImage: {
    			'custom-gradient': 'linear-gradient(to bottom, #8C9B97CC, #003B95CC)'
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
	plugins: [],
} satisfies Config;
