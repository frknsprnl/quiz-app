/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-5deg) translateX(20px) translateY(15px)",
          },
          "50%": {
            transform: "rotate(5deg) translateX(-30px) translateY(-10px)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
