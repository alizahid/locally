const { radixThemePreset } = require('radix-themes-tw')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.tsx'],
  plugins: [],
  presets: [radixThemePreset],
  theme: {
    fontFamily: {
      mono: ['var(--font-mono)'],
      sans: ['var(--font-sans)'],
    },
  },
}
