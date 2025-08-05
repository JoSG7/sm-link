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
        'xs-movil': ['clamp(12px, 3.2vw, 50px)', {
          lineHeight: '1.2',
        }],
        'sm-movil': ['clamp(14px, 3.8vw, 50px)', {
          lineHeight: '1.4',
        }],
        'base-movil': ['clamp(16px, 4.2vw, 50px)', {
          lineHeight: '1.4',
        }],
        'lg-movil': ['clamp(18px, 5vw, 50px)', {
          lineHeight: '1.5',
        }],
        'xl-movil': ['clamp(20px, 5.5vw, 50px)', {
          lineHeight: '1.5',
        }],
        '4xl-movil': ['clamp(36px, 10vw, 100px)', {
          lineHeight: '1.1',
        }],

        // Desktop Sm Sizes

        'xs-desktop-sm': ['clamp(12px, 1.1vw, 50px)', {
          lineHeight: '1.1',
        }],
        'sm-desktop-sm': ['clamp(14px, 1.3vw, 50px)', {
          lineHeight: '1.1',
        }],
        'base-desktop-sm': ['clamp(16px, 1.4vw, 50px)', {
          lineHeight: '1.4',
        }],
        'lg-desktop-sm': ['clamp(18px, 1.7vw, 50px)', {
          lineHeight: '1.5',
        }],
        'xl-desktop-sm': ['clamp(20px, 5.5vw, 50px)', {
          lineHeight: '1.5',
        }],
        '6xl-desktop-sm': ['clamp(60px, 5.8vw, 200px)', {
          lineHeight: '1',
        }],

        // Desktop 

        'xs-desktop': ['clamp(12px, 0.9vw, 25px)', {
          lineHeight: '1.1',
        }],
        'sm-desktop': ['clamp(14px, 1.1vw, 30px)', {
          lineHeight: '1.45',
        }],
        'base-desktop': ['clamp(16px, 1.25vw, 50px)', {
          lineHeight: '1.2',
        }],
        'lg-desktop': ['clamp(18px, 1.4vw, 38px)', {
          lineHeight: '1.5',
        }],
        'xl-desktop': ['clamp(20px, 1.5vw, 39px)', {
          lineHeight: '1.5',
        }],
        '4xl-desktop': ['clamp(36px, 3.5vw, 100px)', {
          lineHeight: '1.1',
        }],
        '6xl-desktop': ['clamp(60px, 4.7vw, 120px)', {
          lineHeight: '1',
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
        '7-fluid': 'clamp(28px, 8vw, 40px)',
        'content-desktop-sm' : 'calc(100vh - 68px)',
        'content-desktop' : 'calc(100vh - 72px)',
        'content-desktop-lg' : 'calc(100vh - 80px)',
        'content-desktop-xl' : 'calc(100vh - 97px)',
        'content-desktop-2xl' : 'calc(100vh - 121px)'
      },
      padding: {
        '4-fluid' : 'clamp(16px, 4.5vw, 40px)',
      },
      minWidth: {
        'img-desktop-sm' : 'clamp(376px, 36.5vw, 390px)',
        'img-desktop' : 'clamp(430px, 34vw, 865px)'

      },
      minHeight: {
        'img-desktop-sm' : 'clamp(400px, 39vw, 414px)',
        'img-desktop' : 'clamp(454px, 35vw, 890px)'
      },
      screens: {
        'xs' : "412px",
        "lg-2": "1272px",
        '3xl' : "1908px",
        '4xl' : "2540px"
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
