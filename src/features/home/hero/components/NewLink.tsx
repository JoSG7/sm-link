"use client"

import { IconCopyPlusFilled, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function NewLink({ short }: { short: string | null }) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`sm-link.vercel.app/${short}`).then(() => { toast.success("Copied!") })
  }

  return (

    <section className="mt-5 flex gap-3 text-base xs:text-base sm:text-lg sm:gap-4 lg:text-sm">

      <p className="p-3 text-nowrap overflow-hidden rounded-lg flex-1
      border-1.5 border-neutral-800 bg-neutral-900/80 ">
        {
          short ?
            <span>sm-link.vercel.app/{short}</span>
            :
            <span className="text-neutral-500">sm-link.vercel.app/abc123 (Example) </span>
        }
      </p>

      {
        short &&
        <motion.div className="flex items-center gap-3 p-3 rounded-lg border-1.5 border-neutral-800 bg-neutral-900/80"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}>
          <button className="cursor-pointer"
            onClick={copyToClipboard}
            type="button">
            <IconCopyPlusFilled className="size-5 text-green-400" />
          </button>

          <Link className=""
            href={`https://sm-link.vercel.app/${short}`}
            target="_blank"
            aria-label="Use the new Link">
            <IconExternalLink className="size-5 text-blue-400" />
          </Link>
        </motion.div>
      }
    </section>
  )
}