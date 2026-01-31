"use client"

import { IconCopyPlusFilled, IconExternalLink } from "@tabler/icons-react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function NewLink({ short }: { short: string }) {

  const container = document.getElementById("new-link")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => { toast.success("Copied!") })
  }

  if (!container) return null

  return createPortal(

    <motion.section className="mt-5 p-3 flex items-center justify-between text-sm text-neutral-200 rounded-lg 
    border-1.5 border-neutral-800 bg-neutral-950 
    xs:text-base sm:p-3 "
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>

      <p>
        sm-link.vercel.app/{short}
      </p>

      {/* these buttons is hidden in desktop */}
      <div className="flex items-center gap-2 ">
        <button className="p-1 cursor-pointer"
          onClick={copyToClipboard}
          type="button">
          <IconCopyPlusFilled className="size-5 text-green-400
          sm:size-5" />
        </button>

        <a href={`https://sm-link.vercel.app/${short}`}
          target="_blank"
          aria-label="Use the new Link">
          <IconExternalLink className="size-5 text-blue-400
          sm:size-5" />
        </a>
      </div>
    </motion.section>,
    container
  )
}