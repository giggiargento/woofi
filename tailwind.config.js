/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#F9A23B',
        background: '#FFF4EA',
        cream: '#FFF9F3',
        butter: '#FFF4B8',
        lavender: '#D8C3FF',
        pink: '#FFC8D8',
        sky: '#BDEFFF',
        mint: '#CFF5DC',
        text: '#1F2937',
        muted: '#6B7280',
        card: '#FFFFFF',
        border: '#000000',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.08)',
        card: '0 6px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
