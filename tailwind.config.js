/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'teal-custom': {
          50: '#e6f3f3',
          100: '#cce6e6',
          200: '#99cccc',
          700: '#008080',
          900: '#004d4d'
        }
      }
    }
  },
  plugins: []
}