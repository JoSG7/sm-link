"use client"

// import { IconBrandInstagramFilled, IconFileDescriptionFilled } from "@tabler/icons-react";
import { ShortLinkForm } from "./ShortLinkForm";
import { LinkFormTitle } from "./Title";
import { motion } from "framer-motion";
// import { Pill } from "@/components/shared/Pill";

export function LinkFormSection() {

  return (

    <section className="flex justify-center lg:h-content-desktop-sm lg-2:h-content-desktop 
    2xl:h-content-desktop-lg 3xl:h-content-desktop-xl 3xl:max-h-[1091px] 4xl:h-content-desktop-2xl" id="link-form-section">

      {/* Layout content */}
      <div className="w-[90vw] py-7 md:gap-5
      lg:py-0 lg:flex lg:items-center 
      lg-2:w-[81vw] 3xl:max-w-[2060px]">

        {/* Main Content */}
        <main className="w-full lg:gap-12 lg:flex lg:flex-row-reverse 
        lg-2:flex-row-reverse lg-2:gap-16 2xl:gap-20 3xl:gap-24 4xl:gap-32">
          <LinkFormTitle />

          <ShortLinkForm />

          {/* This section only appears in movil */}
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
        </main>
      </div>
    </section>
  )
}