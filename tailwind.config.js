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
            "0%":   { transform: "scale(1)   translate(-10px, 30px)" },
            "38%":  { transform: "scale(0.8, 1) translate(-8px, 3px) rotate(16deg)" },
            "40%":  { transform: "scale(0.8, 1) translate(-8px, 3px) rotate(16deg)" },
            "78%":  { transform: "scale(1.3) translate(0px, 5px) rotate(-40deg)" },
            "80%":  { transform: "scale(1.3) translate(0px, 5px) rotate(-40deg)" },
            "100%": { transform: "scale(1)   translate(-10px, 30px)" }
        },
      },
      animation: {
        wiggle: "wiggle 16s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
