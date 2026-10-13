/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tm: {
          blue: '#00843D',
          red: '#C8102E',
          gold: '#FFC72C',
          dark: '#1a1a2e',
          cream: '#fdf8f0',
          light: '#ecf0f1',
        },
        cn: {
          red: '#C8102E',
        },
        duolingo: {
          green: '#58CC02',
          greenDark: '#46A302',
          blue: '#1CB0F6',
          blueDark: '#1899D6',
          yellow: '#FFC800',
          orange: '#FF9600',
          red: '#FF4B4B',
          purple: '#CE82FF',
          gray: '#E5E5E5',
          grayDark: '#AFAFAF',
          text: '#4B4B4B',
          textLight: '#777777',
          bg: '#FFFFFF',
          bgDark: '#131F24',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-short': 'bounce 0.3s ease-in-out 1',
        'shake': 'shake 0.5s ease-in-out',
        'pop': 'pop 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'celebrate': 'celebrate 0.6s ease-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        celebrate: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.2) rotate(-5deg)' },
          '50%': { transform: 'scale(1.2) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
      boxShadow: {
        'duo': '0 4px 0 0 rgba(0,0,0,0.15)',
        'duo-active': '0 2px 0 0 rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
};
