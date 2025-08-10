"use client"

import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { motion } from 'framer-motion'

export function LoginDetailsTitle() {
  return (
    <section className="">

      {/* Title */}
      <AnimatedTitle className="tracking-tight text-center text-4xl-movil 
      lg:text-6xl-desktop-sm
      lg-2:text-6xl-desktop"
      title="Sign In to control all your links" gradientWords={["Sign", "In"]} />

      <motion.p className="py-5 font-medium text-center text-lg-movil text-neutral-300 xs:pb-6 sm:pb-7
      lg:text-center lg:text-lg-desktop-sm
      lg-2:text-xl-desktop "
      initial= {{ opacity: 0, y:-10 }}
      whileInView={{ opacity: 1, y:0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
      viewport={{ once: true }}>
      
        Access your dashboard to take full control—track performance
      </motion.p>

    </section>
  )
}


