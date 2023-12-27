/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#292D32',
        accent: '#3991F8',
        textPrimary: '#D5D5D5',
        textSecondary: '#101010',
        textLight: '#FFFFFF',
        textDark: '#000000',
        lightContainer: '#F6F6F6',
        darkContainer: 'rgba(255, 255, 255, 0.1)',
        buttonBackgroundColor: 'rgba(57, 145, 248, 0.1)',
        buttonLightTextColor: '#6A7DA9',
        buttonDarkTextColor: '#8FA6E5',
        buttonDisabled: 'rgba(147, 147, 147, 0.3)',
        borderPrimary: '#D9D9D9',
        borderSecondary: '#E6E6E6',
        error: '#D32F2F',
        success: '#388E3C',
        warning: '#F57C00',
        info: '#1976D2',
        black: '#232323',
        darkerGrey: '#4F4F4F',
        darkGrey: '#939393',
        grey: '#E0E0E0',
        softGrey: '#F4F4F4',
        lightGrey: '#F9F9F9',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}

