const { tailwindColors, tailwindFontSize, shadows } = require('./src/design/tokens.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: tailwindColors,
      fontSize: tailwindFontSize,
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '28px',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
      },
      boxShadow: {
        'warm-sm': shadows.warmSm,
        'warm-md': shadows.warmMd,
        'warm-lg': shadows.warmLg,
      },
    },
  },
  plugins: [],
};
