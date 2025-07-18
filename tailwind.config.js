/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        space: {
          900: '#0B0B1F',
          800: '#1A1A3A',
          700: '#2A2A5A',
          600: '#3A3A7A',
          500: '#4A4A9A',
        },
        cosmic: {
          blue: '#64B5F6',
          purple: '#BA68C8',
          pink: '#F48FB1',
          green: '#81C784',
          yellow: '#FFB74D',
        },
        neon: {
          blue: '#00D4FF',
          purple: '#9D4EDD',
          pink: '#FF006E',
          green: '#06FFA5',
          yellow: '#FFD60A',
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0B0B1F 0%, #1A1A3A 25%, #2A2A5A 50%, #1A1A3A 75%, #0B0B1F 100%)',
        'cosmic-gradient': 'linear-gradient(45deg, #64B5F6, #BA68C8, #F48FB1)',
        'neon-gradient': 'linear-gradient(45deg, #00D4FF, #9D4EDD, #FF006E)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 20px rgba(100, 181, 246, 0.5)' },
          '100%': { textShadow: '0 0 30px rgba(100, 181, 246, 0.8)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
