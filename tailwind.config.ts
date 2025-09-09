import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base neutrals (no blues)
        base: {
          white: '#FFFFFF',
          light: '#F7F7F7',
          gray: '#EAEAEA',
          dark: '#222222'
        },
        // Accent palette avoiding blue/sky
        accent: {
          green: '#22C55E',
          orange: '#F59E0B',
          yellow: '#EAB308',
          emerald: '#10B981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,0.12)'
      }
    }
  },
  plugins: []
} satisfies Config


