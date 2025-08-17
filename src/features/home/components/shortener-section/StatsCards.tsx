"use client"

import { motion } from "framer-motion"

export function StatsCards() {

  return (

    // Stats Cards for Movil
    <div className="flex items-center gap-4 pt-5 xs:gap-5 xs:pt-6 sm:gap-7 sm:pt-8 lg:hidden">
      <motion.article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow "
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}>
        <div className="font-bold text-xl-movil text-sky-300 ">1M+</div>

        <div className="text-gray-300 text-xs-movil ">Links</div>
      </motion.article>

      <motion.article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow "
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 1.7, ease: "easeOut" }}
        viewport={{ once: true }}>
        <div className="font-bold text-green-300 text-xl-movil ">50M+</div>

        <div className="text-gray-300 text-xs-movil ">Clicks Tracked</div>
      </motion.article>

      <motion.article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow "
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 1.9, ease: "easeOut" }}
        viewport={{ once: true }}>
        <div className="font-bold text-xl-movil text-sky-300 ">99.9%</div>

        <div className="text-gray-300 text-xs-movil ">Uptime</div>
      </motion.article>
    </div>

  )

}