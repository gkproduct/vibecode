/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F7F7F5',
          surface: '#FFFFFF',
          text: '#1F1E1B',
          muted: '#6B6A66',
          accent: '#30A46C',
          accentAlt: '#F59E0B',
          accentSoft: '#FDE68A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.06)',
      },
      maxWidth: {
        content: '1120px'
      }
    },
  },
  plugins: [],
}


