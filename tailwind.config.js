/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans Ethiopic', 'Nyala', 'Abyssinica SIL', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['2.75rem', { lineHeight: '1.15' }],      // 44px
        '6xl': ['3.25rem', { lineHeight: '1.1' }],       // 52px
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#2563EB',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        secondary: '#0EA5E9',
        accent: '#22C55E',
        background: 'var(--background)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
        info: '#0284C7',

        // Backward compatibility mappings
        lucycom: {
          primary: '#2563EB',
          navy: '#0a192f',
          slate: '#112240',
          silver: '#E2E8F0',
          cyan: '#0EA5E9',
          gold: '#F59E0B',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(37, 99, 235, 0.35)',
        'glow-cyan': '0 0 25px rgba(14, 165, 233, 0.35)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
};
