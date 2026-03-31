"use client"

import { IconEditCircle, IconGraph, IconSettings } from "@tabler/icons-react"


export function HeroTitle() {


  return (
    <div className="lg:shrink-0 lg:my-auto lg:max-w-[33rem] xl:max-w-[35rem]">
      {/* Title */}
      <h1 className="tracking-tight text-5xl font-[400]
      xs:text-center sm:text-7xl 
      lg:text-6xl lg:text-start xl:text-title">
        The
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500 lg:hidden">
          {" Best way "}
        </span>
        <span className="hidden text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500 lg:inline">
          {" Smartest way "}
        </span>
        to share your links
      </h1>

      {/* Paragraph */}
      <p className="py-6 text-neutral-300/90 sm:text-lg xs:text-center lg:pb-5 lg:text-start">
        <span className="hidden lg:inline">Shorten links in seconds and get instant insights on how your links perform in real time.</span>
        <span className="lg:hidden">Tired of messy URLs? Shorten links in seconds and track their metrics</span>
      </p>

      {/* This section only appears in destokp */}
      <section className="hidden flex-col text-sm text-neutral-200 lg:block">

        <article className="flex flex-wrap gap-3 pb-5">

          <div className="flex gap-1.5 items-center">
            <IconGraph />
            Access to dashboard
          </div>
          |
          <div className="flex gap-1.5 items-center">
            <IconEditCircle/>
            Customize your links
          </div>
          |
          <div className="flex gap-1.5 items-center">
            <IconSettings />
            Settings
          </div>

        </article>

        <button className="relative inline-flex items-center justify-center select-none rounded-2xl disabled:cursor-not-allowed ease-in-out text-white border-2 border-white/5 backdrop-blur-[25px] bg-origin-border bg-[linear-gradient(104deg,rgba(253,253,253,0.05)_5%,rgba(240,240,228,0.1)_100%)] focus-visible:text-black text-base h-12 gap-0 px-5 font-medium">
          Get Started
        </button>

      </section>
    </div>
  )
}





