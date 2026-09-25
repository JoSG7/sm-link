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

export function Hero() {

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


  return (

    // Layout Content
    <section className="relative isolate w-full overflow-hidden bg-transparent px-5 py-20 sm:px-6 lg:pt-20 lg:py-30">

      <SpaceParticles />

      <div className="relative mx-auto max-w-7xl">
        <main className="flex w-full flex-col gap-12 sm:gap-7">

          <div className="pointer-events-none absolute -right-66 top-1/2 -z-10 h-160 w-160 -translate-y-1/2 rounded-full border border-green-300/8" />
          <div className="pointer-events-none absolute -right-50 top-1/2 -z-10 h-128 w-lg -translate-y-1/2 rounded-full border border-sky-300/6" />

          <HeroTitle />

          <div className="flex flex-1 items-center justify-end gap-15">

            <div className="min-w-120 flex flex-col gap-4">
              {featureCards.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color} />
              ))}
            </div>

            <ShorterForm />

          </div>

        </main>
      </div>
    </section>
  )
}

