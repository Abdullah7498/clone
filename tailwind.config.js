/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s infinite",
      },
    }
  },
  plugins: [],
};
