/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'casino-green': '#0D4F3C',
        'casino-gold': '#D4AF37',
        'casino-burgundy': '#722F37',
        'card-red': '#DC2626',
        'card-black': '#1F2937',
        'velvet': '#0A1A0A'
      },
      fontFamily: {
        'card': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'deal-card': 'dealCard 0.6s ease-out',
        'flip-card': 'flipCard 0.8s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shuffle': 'shuffle 0.3s ease-in-out'
      },
      keyframes: {
        dealCard: {
          '0%': { transform: 'translateY(-100px) rotate(10deg)', opacity: '0' },
          '50%': { transform: 'translateY(-20px) rotate(-5deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' }
        },
        flipCard: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37' },
          '100%': { boxShadow: '0 0 20px #D4AF37, 0 0 30px #D4AF37' }
        },
        shuffle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px) rotate(-2deg)' },
          '75%': { transform: 'translateX(5px) rotate(2deg)' }
        }
      }
    },
  },
  plugins: [],
}
