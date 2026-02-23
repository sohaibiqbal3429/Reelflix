/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090A10',
        surface: '#121522',
        muted: '#9AA1B4',
        teal: '#1EE6D3',
        magenta: '#D946EF'
      },
      borderRadius: {
        'card': '20px'
      }
    }
  },
  plugins: []
};
