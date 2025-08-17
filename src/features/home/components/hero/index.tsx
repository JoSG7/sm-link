"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeroTitle } from './Title'
import { InfoCards } from './InfoCards'
import { IconStarFilled } from '@tabler/icons-react'
import { useScrollTo } from '../../hooks/useScrollTo'

export function Hero() {

  const scrollTo = useScrollTo()

  return (

    <section className="flex justify-center lg:h-content-desktop-sm lg-2:h-content-desktop 2xl:h-content-desktop-lg 3xl:h-content-desktop-xl 3xl:max-h-[1091px]
    4xl:h-content-desktop-2xl">

      {/* Layout Content */}
      <div className="w-[90vw]
      lg:flex lg:justify-center lg:items-center
      lg-2:w-[81vw] 3xl:max-w-[2060px] ">

        {/* Main content */}
        <main className="py-7 xs:py-10
        lg:flex lg:flex-row-reverse lg:py-0 lg:items-center lg:grow lg-2:gap-4
        2xl:gap-6 3xl:gap-8">

          {/* Img Section */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.3, delay: 2, ease: 'easeOut' }}
              viewport={{ once: true }}>

              <Image src="/imgs/mano5.png" alt="logo" width={500} height={500}
                className="size-60 fade sm:size-80 md:size-96 
                lg:min-w-img-desktop-sm lg:min-h-img-desktop-sm
                lg-2:min-w-img-desktop lg-2:min-h-img-desktop" />
            </motion.div>
          </div>

          {/* Text and Cards Sections */}
          <section className="">
            {/* Title */}
            <HeroTitle />

            {/* Info Cards for movils and desktop */}
            <InfoCards />

            {/* Start Button section */}
            <div className="flex justify-center lg:items-center lg:gap-7 lg:justify-start">
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
            </div>
          </section>
        </main>
      </div>
    </section>
  )
}