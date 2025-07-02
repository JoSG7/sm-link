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
    'w-[300px]'

  ],
  theme: {
    extend: {
      screens: {
        "lg-2": "1272px"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
