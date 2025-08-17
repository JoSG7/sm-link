"use client"

import { IconAlarmFilled, IconDeviceAnalytics, IconGlobe, IconLock, IconSettingsFilled, IconShieldCheckFilled } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Pill } from "../ui/Pill"

export function InfoCards() {

  return (

    <>
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
          delay={1.2} />

        <Pill title="100% Secure"
          icon={<IconLock className="text-green-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />}
          containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
          3xl:py-2 3xl:px-5 
          4xl:px-6"
          iconContainerClass="bg-emerald-300 3xl:p-1.5"
          titleClass="text-xs-desktop-sm lg-2:text-xs-desktop"
          delay={1.4} />
      </div>
    </>
  )
}