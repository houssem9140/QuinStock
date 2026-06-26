/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Impact", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        surface: "#1C1C1E",
        "surface-container-lowest": "#111113",
        "surface-container-low": "#171719",
        "surface-container": "#222224",
        "surface-container-high": "#2C2C2E",
        "surface-container-highest": "#3A3A3C",
        "on-surface": "#F5F4F0",
        "on-surface-variant": "#B7B2A8",
        "outline-variant": "#3A3A3C",
        primary: "#D4820A",
        "on-primary": "#FFFFFF",
        "primary-container": "#F0A030",
        "on-primary-container": "#2A1506",
        tertiary: "#F0A030",
        "on-tertiary": "#2A1506",
        "tertiary-container": "#2A1506",
        error: "#ffb4ab",
        "surface-variant": "#3A3A3C",
        steel: "#8B8FA8",
        "off-white": "#F5F4F0",
        charcoal: "#1C1C1E",
        amber: "#D4820A",
        rust: "#2A1506",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
