"use client"

import { IconChartHistogram, IconClockExclamation, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { ShorterForm } from './components/ShorterForm'
import { HeroTitle } from './components/Title'
import { ReactNode } from 'react'
import { FeatureCard } from './components/FeatureCard'

interface FeatureCard {
  title: string
  icon: ReactNode
  color: "blue" | "green"
}

export function Hero() {

  const featureCards: FeatureCard[] = [
    {
      title: "Global Edge Network",
      icon: <IconWorld />,
      color: "blue"
    },
    {
      title: "Privacy focused",
      icon: <IconShieldCheckFilled />,
      color: "green"
    },
    {
      title: "Real-Time Analytics",
      icon: <IconChartHistogram />,
      color: "blue"
    },
    {
      title: "Custom Expirations",
      icon: <IconClockExclamation />,
      color: "green"
    }
  ]


  return (

    // Layout Content
    <section className="w-full px-5 justify-center items-center xs:px-6 lg:flex lg:mx-auto
    lg:max-w-7xl xl:px-0">

      {/* Main content */}
      <main className="py-10 flex flex-col gap-8 flex-1 xs:py-14 sm:py-20 lg:max-w-295 lg:py-14 xl:max-w-full">

        {/* Title and Form */}
        <div className="flex-1 lg:flex lg:gap-7 xl:gap-10">

          <HeroTitle />

          <div className="flex flex-col flex-1 lg:gap-5">
            <ShorterForm />
          </div>

        </div>

        {/* Features Cards Section */}
        <section className="w-full grid grid-cols-1 gap-4 justify-center
        sm:grid-cols-2 sm:gap-5 lg:flex xl:gap-6">
          {
            featureCards.map((el, i) => (

              <FeatureCard className="h-18"
                key={i}
                icon={el.icon}
                title={el.title}
                color={el.color} />

            ))
          }
        </section>
      </main>
    </section>
  )
}

{/* <a class="relative inline-flex items-center justify-center select-none rounded-2xl disabled:cursor-not-allowed ease-in-out text-white border-[2px] border-white/5 backdrop-blur-[25px] bg-origin-border bg-[linear-gradient(104deg,rgba(253,253,253,0.05)_5%,rgba(240,240,228,0.1)_100%)] shadow-sm not-disabled:hover:bg-white/90 not-disabled:hover:text-black not-disabled:hover:shadow-button transition-all duration-200 disabled:opacity-30 disabled:text-white/50 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-hidden focus-visible:bg-white/90 focus-visible:text-black after:absolute after:w-[calc(100%+4px)] after:h-[calc(100%+4px)] after:top-[-2px] after:left-[-2px] after:rounded-[1rem] after:bg-[url("/static/texture-btn.png")] after:bg-repeat after:pointer-events-none text-base h-12 gap-0 px-5 font-semibold" href="/signup"></a> */}

{/* <div className="absolute inset-0 bg-[radial-gradient(#27272A_.0313rem,transparent_.0313rem),radial-gradient(#27272A_.0313rem,transparent_.0313rem)] bg-transparent opacity-80 bg-position-[0_0,.625rem_.625rem] bg-size-[1.25rem_1.25rem] -z-10"></div> */ }