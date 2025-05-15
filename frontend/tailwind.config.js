module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  future: {
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "pastel"],
  },
};
