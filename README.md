## INSTALL REACT ROUTER 
    - npm install react-router-dom
## React title Dynamic
    - npm i react-helmet
## Install tailwind css
    - npm install -D tailwindcss postcss autoprefixer
    - npx tailwindcss init -p
Configure the template paths inside the tailwind.config.js file:

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

## Sweetalert 
- npm i sweetalert2-react