/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#5f5549',
        mist: '#fcf8ef',
        ember: '#d7bc86',
        pine: '#9f7b3b',
        sand: '#f2e7ca',
        gold: '#f4dda6',
      },
      boxShadow: {
        panel: '0 24px 60px -34px rgba(110, 90, 52, 0.3)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
