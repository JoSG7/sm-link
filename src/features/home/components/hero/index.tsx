"use client"

import { IconChartHistogram, IconPaperclip, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { FeatureCard } from './FeatureCard'
import { ShorterForm } from './ShorterForm'
import { HeroTitle } from './Title'

export function Hero() {

  return (

    <section className="flex justify-center 
    xl:h-content-desktop ">

      {/* Layout Content */}
      <div className="w-[90vw]
      lg:flex lg:justify-center lg:items-center
      xl:w-[85vw] 3xl:max-w-[2060px] ">

        {/* Main content */}
        <main className="py-7 xs:py-10
        xl:gap-4 xl:grow ">

          <section className="grow">

            {/* Title */}
            <HeroTitle />

            <section className="flex flex-col justify-center">
              <ShorterForm />
              <div id="new-link" />
            </section>

            {/* Features Cards Section */}
            <section className="w-full grid grid-cols-1 gap-4 py-5 justify-center
            xs:gap-5 xs:py-6
            sm:gap-7 sm:py-8 sm:grid-cols-2
            md:gap-8 md:py-9 
            xl:flex xl:flex-row xl:gap-4 xl:py-6">
              <FeatureCard title="Global CDN for fast redirects"
              icon={<IconWorld className="text-blue-400 
              xs:size-8 
              sm:size-11
              md:size-12 
              xl:size-7" />} />

              <FeatureCard title="Advanced Security"
              icon={<IconShieldCheckFilled className="text-green-400 
              xs:size-8 
              sm:size-11
              md:size-12 
              xl:size-7" />} />

              <FeatureCard title="Real-Time Analitycs"
              icon={<IconChartHistogram className="text-blue-400 
              xs:size-8 
              sm:size-11
              md:size-12 
              xl:size-7" />} />

              <FeatureCard title="+1M links created"
              icon={<IconPaperclip className="text-green-400 
              xs:size-8 
              sm:size-11
              md:size-12 
              xl:size-7" />} />
            </section>

            {/* Terms Section */}
            <p className="text-center text-neutral-400 text-xs-movil 
            sm:text-lg-tablet">
              By proceeding, you agree to our
              <span className="text-blue-400"> Terms of Service </span>
              and
              <span className="text-blue-400"> Privacy Policy</span>.
            </p>

          </section>
        </main>
      </div>
    </section>
  )
}