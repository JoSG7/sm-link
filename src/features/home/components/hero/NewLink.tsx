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

    <motion.section className="mt-5 py-2 px-3 flex justify-between text-sm text-neutral-200 rounded-lg 
    border-[1.5px] border-neutral-800 bg-neutral-950/50
    xl:m-0 xl:p-0"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>

      <p>
        sm-link.vercel.app/<span>{short}</span>
      </p>

      <div className="flex items-center gap-2">
        <button className="p-1"
          onClick={copyToClipboard}>
          <IconCopyPlusFilled className="size-4 text-green-400" />
        </button>

        <a href={`https://sm-link.vercel.app/${short}`}
          target="_blank"
          aria-label="Use the new Link">
          <IconExternalLink className="size-4 text-blue-400" />
        </a>
      </div>
    </motion.section>,
    container
  )
}