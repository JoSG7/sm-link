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
        lg:flex lg:py-0 lg:items-center
        xl:gap-4 xl:grow
        2xl:gap-6 3xl:gap-8">

          <section className="grow">

            {/* Title */}
            <HeroTitle />

            <section className="flex justify-center">
              <ShorterForm />
            </section>

            {/* Features Cards Section */}
            <section className="flex flex-col gap-3 py-5 w-full justify-center
            xl:flex-row xl:gap-4 xl:py-6">
              <FeatureCard title="Global CDN for fast redirects"
              icon={<IconWorld className="text-blue-400" />} />

              <FeatureCard title="Advanced Security"
              icon={<IconShieldCheckFilled className="text-green-400" />} />

              <FeatureCard title="Real-Time Analitycs"
              icon={<IconChartHistogram className="text-blue-400" />} />

              <FeatureCard title="+1M links created"
              icon={<IconPaperclip className="text-green-400" />} />
            </section>

            {/* Terms Section */}
            <p className="text-center text-neutral-400 text-xs ">
              By proceeding, you agree to our
              <span className="text-blue-400"> Terms of Service </span>
              and
              <span className="text-blue-400"> Privacy Policy</span>.
            </p>



            {/* Info Cards for movils and desktop */}
            {/* <InfoCards /> */}

            {/* Start Button section */}
            {/* <div className="flex justify-center lg:items-center lg:gap-7 lg:justify-start">
              <motion.button className="py-2 font-medium transition-transform duration-200 rounded-full px-7 text-lg-movil bg-gradient-to-r from-green-400 to-blue-500 text-neutral-200 hover:scale-105 xs:py-3
                lg:py-2 lg:px-4 lg:text-lg-desktop-sm lg:from-green-500 lg:to-blue-600
                lg-2:text-lg-desktop 
                2xl:px-6 3xl:py-3 3xl:px-8"
                onClick={() => { scrollTo("link-form-section") }}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 1.6, ease: "easeIn" }}
                viewport={{ once: true }}
              >
                {`Let's start now!`}
              </motion.button>

              <motion.p className="hidden text-neutral-200 items-center gap-1 
                lg:text-sm-desktop-sm lg:flex lg-2:text-sm-desktop
                2xl:gap-2"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 1.6, ease: "easeIn" }}
                viewport={{ once: true }}
              >
                <IconStarFilled className="size-4 text-lime-400 2xl:size-5 3xl:size-6 4xl:size-7" />
                Trusted by 10,000+ users
              </motion.p>
            </div> */}
          </section>
        </main>
      </div>
    </section>
  )
}