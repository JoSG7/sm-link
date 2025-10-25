"use client"

import { IconChartHistogram, IconPaperclip, IconShieldCheckFilled, IconWorld } from '@tabler/icons-react'
import { FeatureCard } from './FeatureCard'
import { ShorterForm } from './ShorterForm'
import { HeroTitle } from './Title'

export function Hero() {

  return (

    <section className="flex justify-center ">

      {/* Layout Content */}
      <div className="w-[90vw]
      lg:flex lg:justify-center lg:items-center
      xl:w-[85vw] 3xl:max-w-[2060px] ">

        {/* Main content */}
        <main className="py-7 xs:py-10 sm:py-16 md:py-20 
        lg:py-20 lg:grow 
        2xl:py-24 3xl:py-28 4xl:py-36">

          <section className="grow
          lg:flex lg:gap-10 
          xl:flex-col xl:gap-0">

            <div className="grow">
              {/* Title */}
              <HeroTitle />

              <section className="w-full flex flex-col justify-center 
              lg:flex-row">
                <ShorterForm />
                <div id="new-link" />
              </section>
            </div>

            {/* Features Cards Section */}
            <section className="w-full grid grid-cols-1 gap-4 py-5 justify-center
            xs:gap-5 xs:py-6
            sm:gap-7 sm:py-8 sm:grid-cols-2
            md:gap-8 md:py-9
            lg:gap-7 lg:py-0 lg:grid-cols-1 lg:max-w-max
            xl:gap-8 xl:py-8 xl:flex xl:min-w-full
            2xl:gap-10 2xl:py-10
            3xl:gap-12 3xl:py-12
            4xl:gap-14 4xl:py-14">

              <FeatureCard title="Global CDN for fast redirects"
              icon={<IconWorld className="text-blue-400 
              xs:size-8 
              sm:size-11
              md:size-12
              lg:size-7 
              2xl:size-9
              3xl:size-11
              4xl:size-[52px]" />} />

              <FeatureCard title="Advanced Security"
              icon={<IconShieldCheckFilled className="text-green-400 
              xs:size-8 
              sm:size-11
              md:size-12
              lg:size-7 
              2xl:size-9
              3xl:size-11
              4xl:size-[52px]" />} />

              <FeatureCard title="Real-Time Analytics"
              icon={<IconChartHistogram className="text-blue-400 
              xs:size-8 
              sm:size-11
              md:size-12
              lg:size-7 
              2xl:size-9
              3xl:size-11
              4xl:size-[52px]" />} />

              <FeatureCard title="+1M links created"
              icon={<IconPaperclip className="text-green-400 
              xs:size-8 
              sm:size-11
              md:size-12
              lg:size-7 
              2xl:size-9
              3xl:size-11
              4xl:size-[52px]" />} />

            </section>

            {/* Terms Section in Movil */}
            <p className="text-center text-neutral-400 text-xs-movil 
            sm:text-lg-tablet
            lg:hidden 
            xl:block xl:text-sm-desktop">
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