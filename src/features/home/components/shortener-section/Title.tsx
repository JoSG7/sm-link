"use client"

import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { Pill } from "@/components/shared/Pill";
import { IconBolt, IconWorld } from "@tabler/icons-react";
import { motion } from 'framer-motion'
import { useMediaQuery } from "usehooks-ts";

export function LinkFormTitle() {

  const isMobile = useMediaQuery("(max-width: 639px)")

  return (

    <section className="flex items-center lg:w-[60%] lg-2:w-[50%]">
      <div className="lg-2:py-0">

        {/* Title */}
        <AnimatedTitle title="Shorten your first link in seconds" gradientWords={["your", "first"]} delay={isMobile ? 0 : 7}
          className="text-4xl-movil text-center tracking-tight lg:text-6xl-desktop-sm lg:text-start lg:block lg-2:text-6xl-desktop" />

        {/* Paragraph */}
        <motion.p className="py-5 pt-3 font-medium text-center text-lg-movil text-neutral-300 xs:pb-6 sm:pb-7
        lg:text-start lg:py-4 lg:text-lg-desktop-sm lg:text-neutral-400
        lg-2:text-xl-desktop
        2xl:py-5 3xl:py-6 4xl:py-8"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: isMobile ? 0.7 : 1.3, type: "spring" }}
          viewport={{ once: true }}>
          Quick to share and easy to manage, perfect for social media and team
        </motion.p>

        {/* Features only for desktop */}
        <section className="hidden lg:block">

          {/* Features Pills */}
          <div className="flex gap-4 pb-4 lg-2:pb-5 
          2xl:gap-5 2xl:pb-6 
          3xl:gap-6 3xl:pb-7
          4xl:gap-8 4xl:pb-9">
            <Pill icon={<IconBolt className="size-5 text-green-400 2xl:size-6 3xl:size-7 4xl:size-9" />}
              title="Lightning fast shortening"
              titleClass="text-xs-desktop-sm lg-2:text-xs-desktop"
              iconContainerClass="p-1 bg-green-500/20"
              containerClass="2xl:py-2 2xl:px-4 3xl:gap-3 4xl:px-6 4xl:gap-5"
              delay={1.5} />

            <Pill icon={<IconWorld className="size-5 text-blue-400 2xl:size-6 3xl:size-7 4xl:size-9" />}
              title="Global CDN for fast redirects"
              titleClass="text-xs-desktop-sm lg-2:text-xs-desktop"
              iconContainerClass="p-1 bg-blue-500/20"
              containerClass="2xl:py-2 2xl:px-4 3xl:gap-3 4xl:px-6 4xl:gap-5"
              delay={1.5} />
          </div>

          {/* Features cards */}
          <div className="flex gap-4 lg-2:gap-5 2xl:gap-6 3xl:gap-7 4xl:gap-9">
            <motion.article className="border rounded-lg bg-neutral-950 border-graphite py-3 px-4 grow
            2xl:py-4 2xl:px-5 3xl:py-5 3xl:px-6 4xl:py-7 4xl:px-8"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
              viewport={{ once: true }}>

              <div className="font-bold text-sky-300 text-lg-desktop-sm 
              lg-2:text-lg-desktop ">1M+</div>

              <div className="text-gray-300 text-xs-desktop-sm
              lg-2:text-xs-desktop">Links created</div>
            </motion.article>

            <motion.article className="border rounded-lg bg-neutral-950 border-graphite py-3 px-4 grow
            2xl:py-4 2xl:px-5 3xl:py-5 3xl:px-6 4xl:py-7 4xl:px-8"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 2, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="font-bold text-green-300 text-lg-desktop-sm 
              lg-2:text-lg-desktop ">50M+</div>

              <div className="text-gray-300 text-xs-desktop-sm
              lg-2:text-xs-desktop">Clicks Tracked</div>
            </motion.article>

            <motion.article className="border rounded-lg bg-neutral-950 border-graphite py-3 px-4 grow
            2xl:py-4 2xl:px-5 3xl:py-5 3xl:px-6 4xl:py-7 4xl:px-8"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 2.2, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="font-bold text-sky-300 text-lg-desktop-sm 
              lg-2:text-lg-desktop ">99%</div>

              <div className="text-gray-300 text-xs-desktop-sm
              lg-2:text-xs-desktop">Uptime</div>
            </motion.article>
          </div>
        </section>
      </div>
    </section>
  )
}

