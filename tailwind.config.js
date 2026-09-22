/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rd: {
          bg: '#0c0b09',
          panel: '#17140f',
          panel2: '#1e1a13',
          line: '#2c2717',
          cream: '#f5efe0',
          creamDim: '#b9ae98',
          gold: '#d9a94a',
          goldSoft: '#ecca7f',
          goldDark: '#8a6a2c',
          ink: '#1c1509',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
