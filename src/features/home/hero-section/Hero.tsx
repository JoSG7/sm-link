"use client"

import { IconChartHistogram, IconClockExclamation, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { ShorterForm } from './components/ShorterForm'
import { HeroTitle } from './components/Title'
// import { GitHubAuthButton } from '../auth/SignInButton'
import { ReactNode } from 'react'

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
    <section className="w-full px-5 justify-center items-center xs:px-6 lg:flex xl:mx-auto xl:h-desktop xl:max-h-[32.5rem]
    xl:max-w-7xl ">

      {/* Main content */}
      <main className="py-10 flex flex-col gap-10 grow xs:py-14 sm:py-20 xl:py-0">

        {/* Title and Form */}
        <div className="grow xl:flex xl:justify-between">

          <section>
            <HeroTitle />

            <div className="hidden xl:flex">
              {/* <GitHubAuthButton /> */}
            </div>
          </section>

          <section className="w-full xl:max-w-[37rem]">
            <ShorterForm />
          </section>
        </div>

        {/* Features Cards Section */}
        <section className="w-full grid grid-cols-1 gap-4 justify-center
        md:grid-cols-2 lg:flex">
          {
            featureCards.map((el, i) => {

              if (el.color == "blue") return (
                <article className="flex p-3 gap-3 items-center rounded-lg text-neutral-200 grow
                border-1.5 border-neutral-900 bg-neutral-850"
                  key={i}>

                  <div className="p-2 rounded-full bg-blue-500/10">
                    {el.icon}
                  </div>
                  <p>{el.title}</p>

                </article>
              )

              return (
                <article className="flex p-3 gap-3 items-center rounded-lg text-neutral-200 grow
                border-1.5 border-neutral-900 bg-neutral-850"
                  key={i}>

                  <div className="p-2 rounded-full bg-green-500/10">
                    {el.icon}
                  </div>
                  <p>{el.title}</p>

                </article>
              )
            })
          }
        </section>
      </main>
    </section>
  )
}