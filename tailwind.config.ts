import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'border-green-400',
    'border-red-400',
    'h-[310px]',
    'h-[560px]',
    'max-h-[310px]',
    'animate-pulse',
    'duration-500',
    'w-[73%]',
    'opacity-0',
    'w-4/6',
    'w-1/2',
    'z-30',
    'w-[300px]',
    'bg-[rgba(0,0,0,0.8)]',
    'bg-sky-600',
    'duuration-300'
  ],
  theme: {
    extend: {
      fontSize: {
        'xs-fluid': ['clamp(12px, 3.2vw, 36px)', {
          lineHeight: '1.2',
        }],
        'sm-fluid': ['clamp(14px, 3.8vw, 36px)', {
          lineHeight: '1.4',
        }],
        'base-fluid': ['clamp(16px, 4.2vw, 36px)', {
          lineHeight: '1.4',
        }],
        'lg-fluid': ['clamp(18px, 5vw, 36px)', {
          lineHeight: '1.5',
        }],
        'xl-fluid': ['clamp(20px, 5.5vw, 36px)', {
          lineHeight: '1.5',
        }],
        '4xl-fluid': ['clamp(36px, 10vw, 64px)', {
          lineHeight: '1.1',
        }],
      },
      width: {
        '5-fluid': 'clamp(20px, 5.5vw, 32px)',
        '6-fluid': 'clamp(24px, 6.5vw, 36px)',
        '7-fluid': 'clamp(28px, 8vw, 40px)'
      },
      height: {
        '5-fluid': 'clamp(20px, 5.5vw, 32px)',
        '6-fluid': 'clamp(24px, 5.2vw, 36px)',
        '7-fluid': 'clamp(28px, 8vw, 40px)'
      },
      padding: {
        '4-fluid' : 'clamp(16px, 4.5vw, 40px)'
      },
      screens: {
        'xs' : "412px",
        "lg-2": "1272px"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: '#f5d98b',
        graphite: '#1c1d1d'
      },
    },
  },
  plugins: [],
} satisfies Config;
