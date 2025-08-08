"use client"

import { IconAlarmFilled, IconDeviceAnalytics, IconGlobe, IconLock, IconSettingsFilled, IconShieldCheckFilled, IconStarFilled } from "@tabler/icons-react";
import { Pill } from "@/components/shared/Pill";
import { useScrollTo } from "@/hooks/useScrollTo";
import { motion } from 'framer-motion'
import Image from "next/image";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";

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
              initial={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 1.6 , ease: 'easeOut' }}
              viewport={{ once: true }}>

              <Image src="/imgs/mano5.png" alt="logo" width={500} height={500}
                className="size-60 fade sm:size-80 md:size-96 
                lg:min-w-img-desktop-sm lg:min-h-img-desktop-sm
                lg-2:min-w-img-desktop lg-2:min-h-img-desktop" />
            </motion.div>
          </div>

          {/* Text and Cards Sections */}
          <section className="">
            <div className="">

              {/* Title */}
              <AnimatedTitle title="The smartest way to share your links" gradientWords={['smartest', 'way']}
                className="pt-2 tracking-tight text-center text-4xl-movil 
              lg:text-6xl-desktop-sm lg:text-start lg:p-0
              lg-2:text-6xl-desktop " />

              {/* Paragraph */}
              <motion.p className="py-5 text-center text-neutral-300 text-lg-movil xs:pb-6 sm:pb-7
              lg:text-lg-desktop-sm lg:text-start lg:py-4 lg:w-11/12 lg:text-neutral-400
              lg-2:w-[97%] lg-2:text-xl-desktop lg-2:pt-5 lg-2:pb-6 lg-2:font-medium
              2xl:pt-6 2xl:pb-7 
              3xl:pt-7 3xl:pb-8
              4xl:pt-9 4xl:pb-10"
                initial={{ opacity: 0, filter: "blur(3px)", clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}>
                Tired of messy URLs? Shorten links in seconds and track their metrics
                <span className="hidden lg:inline"> anywhere - 24 hours a day</span>
              </motion.p>

              {/* Since 360px */}
              <div className="flex gap-5 pb-6 xs:gap-6 xs:pb-7 sm:gap-8 sm:pb-9 lg:hidden">
                <motion.article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5"
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                  viewport={{ once: true }}>
                  <div className="flex justify-center pb-2">
                    <div className="">
                      <IconShieldCheckFilled className="text-green-400 xs:size-7 sm:size-10" />
                    </div>
                  </div>
                  <p className="text-center text-xs-movil ">Protection</p>
                </motion.article>

                <motion.article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5"
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}>
                  <div className="flex justify-center pb-2">
                    <div className="">
                      <IconAlarmFilled className="text-blue-400 xs:size-7 sm:size-10" />
                    </div>
                  </div>
                  <p className="text-center text-xs-movil ">Expirations</p>
                </motion.article>

                <motion.article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5"
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
                  viewport={{ once: true }}>
                  <div className="flex justify-center pb-2">
                    <div className="">
                      <IconSettingsFilled className="text-emerald-400 xs:size-7 sm:size-10" />
                    </div>
                  </div>
                  <p className="text-center text-xs-movil ">Settings </p>
                </motion.article>
              </div>

              {/* Since 1024 */}
              <div className="hidden lg:flex lg:gap-3 lg:pb-5
              lg-2:gap-3 lg-2:pb-7
              2xl:gap-4 2xl:pb-8
              3xl:gap-5 3xl:pb-9
              4xl:gap-7 4xl:pb-11 ">
                <Pill title="Global Reach"
                  icon={<IconGlobe className="text-green-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />}
                  containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
                  3xl:py-2 3xl:px-5 
                  4xl:px-6"
                  iconContainerClass="bg-emerald-300 3xl:p-1.5"
                  titleClass="text-xs-desktop-sm lg-2:text-xs-desktop"
                  delay={1} />

                <Pill title="Real-Time Analytics"
                  icon={<IconDeviceAnalytics className="text-blue-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />}
                  containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
                  3xl:py-2 3xl:px-5 
                  4xl:px-6"
                  iconContainerClass="bg-sky-400 3xl:p-1.5"
                  titleClass="text-xs-desktop-sm lg-2:text-xs-desktop"
                  delay={1} />

                <Pill title="100% Secure"
                  icon={<IconLock className="text-green-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />}
                  containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
                  3xl:py-2 3xl:px-5 
                  4xl:px-6"
                  iconContainerClass="bg-emerald-300 3xl:p-1.5"
                  titleClass="text-xs-desktop-sm lg-2:text-xs-desktop"
                  delay={1} />
              </div>

              {/* Start Button section */}
              <div className="flex justify-center lg:items-center lg:gap-7 lg:justify-start">
                <motion.button className="py-2 font-medium transition-transform duration-200 rounded-full px-7 text-lg-movil bg-gradient-to-r from-green-400 to-blue-500 text-neutral-200 hover:scale-105 xs:py-3
                lg:py-2 lg:px-4 lg:text-lg-desktop-sm lg:from-green-500 lg:to-blue-600
                lg-2:text-lg-desktop 
                2xl:px-6 3xl:py-3 3xl:px-8"
                  onClick={() => { scrollTo("link-form-section") }}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1.3, ease: "easeIn" }}
                  viewport={{ once: true }}
                >
                  {`Let's start now!`}
                </motion.button>

                <motion.p className="hidden text-neutral-200 items-center gap-1 
                lg:text-sm-desktop-sm lg:flex lg-2:text-sm-desktop
                2xl:gap-2"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1.3, ease: "easeIn" }}
                  viewport={{ once: true }}
                >
                  <IconStarFilled className="size-4 text-lime-400 2xl:size-5 3xl:size-6 4xl:size-7" />
                  Trusted by 10,000+ users
                </motion.p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  )
}