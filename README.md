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
## Hero Icon
- npm i heroicons

https://tailwindui.com/components/marketing/elements/headers
https://flowbite.com/docs/components/tables/
## Calendar 
- npm i primereact (https://primereact.org/calendar/)
## Skeleton
- npm install skeleton-effect
## Deployment
- npm run build
- build folder ပေါ်လာမယ်..
- build folder ကို dsimple ရဲ့ public folder ထဲမှာ ထည့်သည်
- laravel/public folder ထဲကို command နဲ့ဝင် 
- npm install -g serve
- serve -s build ကို run 
- forever run (npm install -g forever)
- forever start -c serve -s build