"use client"

import { IconChartHistogram, IconClockExclamation, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { FeatureCard } from './components/FeatureCard'
import { ShorterForm } from './components/ShorterForm'
import { HeroTitle } from './components/Title'
// import { GitHubAuthButton } from '../auth/SignInButton'

export function Hero() {

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

          <FeatureCard title="Global CDN for fast redirects"
            icon={<IconWorld className="text-blue-400 " />} />

          <FeatureCard title="Advanced Security"
            icon={<IconShieldCheckFilled className="text-green-400 " />} />

          <FeatureCard title="Real-Time Analytics"
            icon={<IconChartHistogram className="text-blue-400 " />} />

          <FeatureCard title="Custom Expirations"
            icon={<IconClockExclamation className="text-green-400 " />} />

        </section>

      </main>
    </section>

  )
}