"use client"

import { IconChartHistogram, IconClockExclamation, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { FeatureCard } from './components/FeatureCard'
import { ShorterForm } from './components/ShorterForm'
import { HeroTitle } from './components/Title'

export function Hero() {

  return (

    <section className="flex justify-center ">

      {/* Layout Content */}
      <div className="w-full px-5 xs:px-6 lg:flex xl:max-w-7xl">

        {/* Main content */}
        <main className="py-10 xs:py-14 sm:py-20
        lg:py-20 lg:grow ">

          <section className="grow flex flex-col gap-10
          lg:flex lg:gap-10 
          xl:flex-col ">
            
            {/* Title and Form */}
            <div className="grow">
              
              <HeroTitle />

              <section className="w-full flex flex-col justify-center ">
                
                <ShorterForm />
                <div id="new-link" />

                <p className="mt-6 text-center text-neutral-400 text-xs
                lg:block ">
                  By proceeding, you agree to our
                  <span className="text-blue-400"> Terms of Service </span>
                  and
                  <span className="text-blue-400"> Privacy Policy</span>.
                </p>

              </section>
            </div>

            {/* Features Cards Section */}
            <section className="w-full grid grid-cols-1 gap-4 justify-center
            md:grid-cols-2
            lg:flex">

              <FeatureCard title="Global CDN for fast redirects"
                icon={<IconWorld className="text-blue-400 " />} />

              <FeatureCard title="Advanced Security"
                icon={<IconShieldCheckFilled className="text-green-400 " />} />

              <FeatureCard title="Real-Time Analytics"
                icon={<IconChartHistogram className="text-blue-400 " />} />

              <FeatureCard title="Custom Expirations"
                icon={<IconClockExclamation className="text-green-400 " />} />

            </section>

          </section>
        </main>
      </div>
    </section>
  )
}