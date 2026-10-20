/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FAF6EE',
          card: '#FFFFFF',
          sand: '#F4ECE1',
          linen: '#EBE1D2',
          midnight: '#07101C',
          navy: '#0B1726',
          'navy-light': '#112238',
          overlay: 'rgba(7, 16, 28, 0.6)',
        },
        brand: {
          gold: '#C59B27',
          'gold-light': '#E5C158',
          'gold-dark': '#9A7513',
          terracotta: '#C75B39',
          'terracotta-dark': '#A84424',
          forest: '#2D5016',
          'forest-light': 'rgba(45, 80, 22, 0.1)',
          marigold: '#E8A84C',
          'marigold-dark': '#D4952F',
        },
        text: {
          heading: '#1A1815',
          body: '#524D46',
          meta: '#8F867C',
          muted: '#A69E94',
          gold: '#D4AF37',
          inverse: '#FFFFFF',
        },
        border: {
          subtle: '#EBE2D5',
          gold: 'rgba(197, 155, 39, 0.35)',
          dark: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        editorial: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        heading: ['Cinzel', 'Playfair Display', 'serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E5C158 0%, #C59B27 50%, #9A7513 100%)',
        'gold-soft': 'linear-gradient(135deg, rgba(229, 193, 88, 0.15) 0%, rgba(197, 155, 39, 0.05) 100%)',
        'navy-gradient': 'linear-gradient(180deg, #07101C 0%, #0B1726 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 24, 21, 0.06)',
        'card-hover': '0 14px 40px rgba(26, 24, 21, 0.12)',
        'gold': '0 4px 20px rgba(197, 155, 39, 0.35)',
        'gold-lg': '0 8px 30px rgba(197, 155, 39, 0.45)',
        'dark': '0 10px 40px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '999px',
      }
    },
  },
  plugins: [],
}
