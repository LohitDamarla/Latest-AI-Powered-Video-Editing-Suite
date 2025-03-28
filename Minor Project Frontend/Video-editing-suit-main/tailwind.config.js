/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",  // Blue
        secondary: "#FF0000", // Red
        dark: "#000000",      // Black
        lightGray: "#F5F5F5", // Light Gray
      },
    },
  },
  plugins: [],
};

  