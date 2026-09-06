/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', '"Comic Sans MS"', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#7c3aed',
          pink: '#ec4899',
          blue: '#3b82f6',
          sky: '#0ea5e9',
          green: '#22c55e',
          yellow: '#facc15',
          orange: '#fb923c',
          red: '#ef4444',
        },
      },
      boxShadow: {
        pop: '0 6px 0 0 rgba(0,0,0,0.15)',
        'pop-sm': '0 4px 0 0 rgba(0,0,0,0.15)',
        card: '0 10px 30px -10px rgba(80, 40, 160, 0.35)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '1' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-8px)' },
          '40%,80%': { transform: 'translateX(8px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0)' },
          '80%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        pop: 'pop 0.35s ease-out',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        confetti: 'confettiFall linear forwards',
        shake: 'shake 0.4s ease-in-out',
        popIn: 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
