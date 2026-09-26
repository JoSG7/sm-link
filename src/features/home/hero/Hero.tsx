"use client"

import { IconChartHistogram, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { ShorterForm } from './components/ShorterForm'
import { HeroTitle } from './components/Title'
import { FeatureCard } from './components/FeatureCard'
import { SpaceParticles } from './components/SpaceParticles'

interface FeatureCardData {
  title: string
  description: string
  icon: ReactNode
  color: "blue" | "green"
}

const featureCards: FeatureCardData[] = [
  {
    title: "Global Edge Network",
    description: "Fast delivery wherever your audience is",
    icon: <IconWorld className="size-4" />,
    color: "blue"
  },
  {
    title: "Privacy focused",
    description: "Keep every link under your control",
    icon: <IconShieldCheckFilled className="size-4" />,
    color: "green"
  },
  {
    title: "Real-Time Analytics",
    description: "See every click as it happens",
    icon: <IconChartHistogram className="size-4" />,
    color: "blue"
  },

]

export function Hero() {

  return (

    // Layout Content
    <section className="relative isolate w-full overflow-hidden bg-transparent px-5 pt-13 pb-20 sm:px-6 lg:pt-8 lg:pb-40">

      <SpaceParticles />

      <div className="relative mx-auto max-w-7xl">
        <main className="flex w-full flex-col gap-2 sm:gap-7">

          <div className="pointer-events-none absolute -right-56 top-1/2 -z-10 h-160 w-160 -translate-y-80 rounded-full border border-green-300/8 sm:-translate-y-70" />

          <div className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-128 w-lg -translate-y-64 rounded-full border border-sky-300/6 sm:-translate-y-54" />

          <HeroTitle />

          <div className="flex flex-col-reverse flex-1 items-center justify-end gap-15 lg:flex-row">

            <div className="relative w-full lg:w-max lg:min-w-90 xl:min-w-120">

              <div className="hidden pointer-events-none absolute -left-8 top-1/2 z-0 size-70 -translate-y-1/2 rounded-full border border-green-300/8 sm:block" />

              <div className="relative z-10 flex flex-col gap-4">
                {featureCards.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    color={feature.color} />
                ))}
              </div>
            </div>

            <ShorterForm />

          </div>

        </main>
      </div>
    </section>
  )
}

