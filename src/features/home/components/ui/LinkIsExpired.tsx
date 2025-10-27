"use client"

import { motion } from 'framer-motion'

export function LinkIsExpired() {

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <motion.div className="w-72 bg-neutral-950 rounded-xl border border-neutral-900 lg-2:w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}>

        <h1 className="p-4 text-sm border-neutral-900 lg-2:text-lg">
          Oops! This link had an expiration date and it is gone.
        </h1>

      </motion.div>
    </section>
  )

}