import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CLIFF Brand Colors (Dark Mode)
        background: '#0F0F1E',
        surface: '#1A1A2E',
        'surface-variant': '#2A2A3E',
        
        primary: {
          DEFAULT: '#8B7EFF',
          hover: '#A094FF',
          dim: '#6B5CD6',
        },
        secondary: {
          DEFAULT: '#FF6B9D',
        },
        accent: {
          DEFAULT: '#4ECDC4',
        },
        
        text: {
          primary: '#F8F9FA',
          secondary: '#B2B9C0',
          dim: '#6B7280',
        },
        
        border: {
          DEFAULT: '#2A2A3E',
          strong: '#3E3E56',
        },
        
        state: {
          error: '#EF4444',
          success: '#10B981',
          warning: '#F59E0B',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
