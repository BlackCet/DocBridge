/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include JSX and other file types
  ],
  theme: {
    extend: {
      colors: {
        navydark: '#213555',   
        navylight: '#3E5879',   
        beigedark: '#D8C4B6',  
        beigelight: '#F5EFE7',   
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}