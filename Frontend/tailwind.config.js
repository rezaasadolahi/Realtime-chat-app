const withMT = require("@material-tailwind/react/utils/withMT")





module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'sm': '200px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
})