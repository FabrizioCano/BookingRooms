/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-main)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-light": "var(--primary-light)",
        text: "var(--text-main)",
        "text-footer": "var(--text-footer)",
        "text-link": "var(--text-link)",
        "text-link-hover": "var(--text-link-hover)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
