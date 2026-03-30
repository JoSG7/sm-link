"use client"

import { IconChartHistogram, IconClockExclamation, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { ShorterForm } from './components/ShorterForm'
import { HeroTitle } from './components/Title'
// import { GitHubAuthButton } from '../auth/SignInButton'
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
      title: "Global CDN for fast redirects",
      icon: <IconWorld className="text-blue-400 " />,
      color: "blue"
    },
    {
      title: "Advanced Security",
      icon: <IconShieldCheckFilled className="text-green-400 " />,
      color: "green"
    },
    {
      title: "Real-Time Analytics",
      icon: <IconChartHistogram className="text-blue-400 " />,
      color: "blue"
    },
    {
      title: "Custom Expirations",
      icon: <IconClockExclamation className="text-green-400 " />,
      color: "green"
    }
  ]


  return (

    // Layout Content
    <section className="w-full px-5 justify-center items-center xs:px-6 lg:flex lg:mx-auto
    lg:max-w-7xl ">

      <div className="absolute mask-[linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]"></div>

      {/* Main content */}
      <main className="py-10 flex flex-col gap-7 grow xs:py-14 sm:py-20 lg:py-14">

        {/* Title and Form */}
        <div className="grow lg:flex lg:gap-6 lg:justify-between">

          <HeroTitle />

          <section className="w-full lg:max-w-[39rem]">
            <ShorterForm />
          </section>
        </div>

        {/* Features Cards Section */}
        <section className="w-full grid grid-cols-1 gap-4 justify-center
        md:grid-cols-2 lg:flex lg:gap-5">
          {
            featureCards.map((el, i) => (
              
              <FeatureCard 
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