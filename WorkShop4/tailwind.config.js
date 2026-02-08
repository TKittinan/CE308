/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets : [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#EC4899",
        danger: "#EF4444",
      },
      borderRadius: {
        xl: "1rem",
      },
      fontSize: {
        "10xl":"136px"
      },
    },
  },
  plugins: [],
}

