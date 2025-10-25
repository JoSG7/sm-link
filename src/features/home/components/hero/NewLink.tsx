"use client"

import { IconCopyPlusFilled, IconExternalLink } from "@tabler/icons-react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function NewLink({ short }: { short: string }) {

  const container = document.getElementById("new-link")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => { toast.success("Copiado Correctamente") })
  }

  if (!container) return null

  return createPortal(

    <motion.section className="mt-5 py-2 px-3 flex items-center justify-between text-sm-movil text-neutral-200 rounded-lg 
    border-[1.5px] border-neutral-800 bg-neutral-950/50
    xs:mt-6 xs:py-3 xs:px-4
    sm:mt-8 sm:py-5 sm:px-6 sm:text-2xl-tablet
    lg:mt-0 lg:py-3 lg:px-4 lg:text-sm-desktop-sm lg:ml-5 lg:gap-3 lg:min-w-max lg:h-full
    xl:py-4 xl:text-lg-desktop xl:gap-2"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>

      <p>
        sm-link.vercel.app/<span>{short}</span>
      </p>

      <div className="flex items-center gap-2
      xs:gap-3
      sm:gap-4
      lg:hidden">
        <button className="p-1"
          onClick={copyToClipboard}>
          <IconCopyPlusFilled className="size-4 text-green-400
          xs:size-5
          sm:size-7
          lg:size-5" />
        </button>

        <a href={`https://sm-link.vercel.app/${short}`}
          target="_blank"
          aria-label="Use the new Link">
          <IconExternalLink className="size-4 text-blue-400
          xs:size-5
          sm:size-7
          lg:size-5" />
        </a>
      </div>
    </motion.section>,
    container
  )
}