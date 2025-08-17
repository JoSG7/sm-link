"use client"

import { useMediaQuery } from "usehooks-ts"
import { LoginDetailsTitle } from "./Title"
import { LoginDetailsCards } from "./DetailsCards"
import { motion } from "framer-motion"

export function LoginDetails() {

  const isMobile = useMediaQuery("(max-width: 639px)")

  return(
    <section className="flex justify-center">
      <div className="w-[90vw] pt-7 lg:p-0
      lg-2:w-[81vw]">

        <main className="w-full flex flex-col py-20">
          <LoginDetailsTitle />
          
          <LoginDetailsCards />

          <div className="flex items-center justify-center">
            <motion.button className="px-7 py-2 font-medium transition-transform duration-200 rounded-full text-lg-movil bg-gradient-to-r from-green-400 to-blue-500 text-neutral-200 hover:scale-105 xs:py-3 
            lg:text-lg-desktop-sm lg:py-2 lg:px-4
            lg-2:text-lg lg-2:py-2 lg-2:px-4"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: isMobile ? 1.5 : 1, ease: "easeIn" }}
              viewport={{ once: true }}>
              Get Started
            </motion.button>
          </div>
        </main>
      </div>
    </section> 
  )
}