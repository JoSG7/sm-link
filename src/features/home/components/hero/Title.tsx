"use client"

import { AnimatedTitle } from "@/components/motion/AnimatedTitle"
import { motion } from "framer-motion"

export function HeroTitle() {

  return (
    <div>
      {/* Title */}
      <AnimatedTitle className="pt-2 tracking-tight text-center text-4xl-movil 
      lg:text-6xl-desktop-sm lg:text-start lg:p-0
      lg-2:text-6xl-desktop " 
      title="The smartest way to share your links" 
      gradientWords={['smartest', 'way']} />

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
    </div>
  )
}