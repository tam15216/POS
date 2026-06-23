/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'checkmark': {
          '0%': { strokeDashoffset: '100', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'scale-up': 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'checkmark': 'checkmark 0.4s ease-in-out 0.2s forwards',
      }
    },
  },
  plugins: [],
}