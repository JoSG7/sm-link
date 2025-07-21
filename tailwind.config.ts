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
        'fluid-title' : ['clamp(36px, 10vw, 52px)', {
          lineHeight: '1.05',
        }]
      },
      screens: {
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
