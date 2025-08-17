"use client"

import { IconChartHistogram, IconLinkPlus, IconPencilStar } from "@tabler/icons-react"
import { motion } from "framer-motion"

export function LoginDetailsCards() {

  return (

    // Cards for Movil
    <section className="flex flex-col gap-5 pb-5 xs:gap-6 xs:pb-6 sm:gap-8 sm:pb-8 lg:hidden">
      <motion.article className="relative flex gap-5 p-3 border rounded-lg bg-neutral-950 border-graphite sm:p-6"
        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1, ease: "easeOut", type: "spring" }}
        viewport={{ once: true }}>
        <div className="grow">
          <h1 className="pb-1 font-medium text-lg-movil">Advanced Analytics</h1>
          <p className="text-sm-movil text-neutral-300 ">
            Track clicks, referrers, and device information with detailed insights.
          </p>
        </div>
        <div className="flex items-center p-3 rounded-lg bg-neutral-900">
          <IconChartHistogram className="text-green-300 size-7 xs:size-9 sm:size-12" />
        </div>
        <div className="absolute -top-[1px] left-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        <div className="absolute -bottom-[1px] right-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-700 to-transparent " />
      </motion.article>

      <motion.article className="relative flex gap-5 p-3 border rounded-lg bg-neutral-950 border-graphite sm:p-6"
        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut", type: "spring" }}
        viewport={{ once: true }}>
        <div className="grow">
          <h1 className="pb-1 font-medium text-lg-movil">Customize your SmLink</h1>
          <p className="text-sm-movil text-neutral-300 ">
            Customize the url of your link
          </p>
        </div>
        <div className="flex items-center p-3 rounded-lg bg-neutral-900">
          <IconPencilStar className="text-sky-300 size-7 xs:size-9 sm:size-12" />
        </div>
      </motion.article>

      <motion.article className="flex gap-5 p-3 border rounded-lg bg-neutral-950 border-graphite sm:p-6"
        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.4, ease: "easeOut", type: "spring" }}
        viewport={{ once: true }}>
        <div className="grow">
          <h1 className="pb-1 font-medium text-lg-movil">More SmLinks</h1>
          <p className="text-sm-movil text-neutral-300">
            Extend limit from 7 to 15 links
          </p>
        </div>
        <div className="flex items-center p-3 rounded-lg bg-neutral-900">
          <IconLinkPlus className="text-green-300 size-7 xs:size-9 sm:size-12" />
        </div>
      </motion.article>
    </section>

  )

}