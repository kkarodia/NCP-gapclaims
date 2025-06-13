import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'netcare-gradient': 'linear-gradient(135deg, #0F2027 0%, #203A43 25%, #2C5364 50%, #4A90A4 75%, #7DD3FC 100%)',
        'netcare-hero-gradient': 'linear-gradient(135deg, #1B4B5A 0%, #2C5364 50%, #7DD3FC 100%)',
        'netcare-card-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F0FDFF 50%, #E0F7FA 100%)',
        'netcare-button-gradient': 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
        'netcare-accent-gradient': 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
        'netcare-circles': 'radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(125, 211, 252, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'netcare': '0 4px 6px -1px rgba(34, 211, 238, 0.1), 0 2px 4px -1px rgba(34, 211, 238, 0.06)',
        'netcare-lg': '0 10px 15px -3px rgba(34, 211, 238, 0.1), 0 4px 6px -2px rgba(34, 211, 238, 0.05)',
        'netcare-xl': '0 20px 25px -5px rgba(34, 211, 238, 0.1), 0 10px 10px -5px rgba(34, 211, 238, 0.04)',
      },
      colors: {
        // Netcare Brand Colors - Teal/Turquoise Theme
        netcare: {
          // Primary teal colors (from the image)
          'deep-teal': '#0F2027',
          'dark-teal': '#1B4B5A',
          'medium-teal': '#203A43',
          'teal': '#2C5364',
          'light-teal': '#4A90A4',
          'cyan': '#22D3EE',
          'light-cyan': '#7DD3FC',
          'pale-cyan': '#A5F3FC',

          // Supporting colors
          'navy': '#0F172A',
          'slate': '#1E293B',
          'gray': '#475569',
          'light-gray': '#64748B',
          'silver': '#94A3B8',

          // Background colors
          'bg-primary': '#0F2027',
          'bg-secondary': '#1B4B5A',
          'bg-light': '#F0FDFF',
          'bg-card': '#FFFFFF',
          'bg-card-hover': '#F8FAFC',

          // Text colors
          'text-primary': '#0F172A',
          'text-secondary': '#475569',
          'text-muted': '#64748B',
          'text-light': '#94A3B8',
          'text-white': '#FFFFFF',

          // Border colors
          'border-light': '#E2E8F0',
          'border-medium': '#CBD5E1',
          'border-dark': '#475569',
          'border-accent': '#22D3EE',

          // Button colors
          'button-primary': '#0891B2',
          'button-primary-hover': '#0E7490',
          'button-secondary': '#22D3EE',
          'button-secondary-hover': '#06B6D4',

          // Status colors
          'success': '#10B981',
          'warning': '#F59E0B',
          'error': '#EF4444',
          'info': '#3B82F6',

          // Legacy compatibility (mapped to new colors)
          'primary-blue': '#0891B2',
          'secondary-blue': '#22D3EE',
          'light-blue': '#7DD3FC',
          'powder-blue': '#A5F3FC',
          white: '#FFFFFF',
          gold: '#22D3EE', // Mapped to cyan for consistency
          'light-gold': '#7DD3FC',
          bronze: '#0891B2',
        },
        // Shadcn UI Colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'subtle-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(102, 182, 196, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(102, 182, 196, 0.5)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite',
      },
      fontFamily: {
        'sans': ['Open Sans', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'netcare': '0 4px 20px rgba(102, 182, 196, 0.1)',
        'netcare-lg': '0 8px 40px rgba(102, 182, 196, 0.15)',
        'netcare-xl': '0 12px 60px rgba(102, 182, 196, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;