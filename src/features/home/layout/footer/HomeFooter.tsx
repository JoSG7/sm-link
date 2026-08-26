"use client"

import { IconBrandGithubFilled, IconBrandX } from "@tabler/icons-react";

export function HomeFooter() {

  return (

    <section className="flex justify-center border-t border-graphite">
      <div className="w-[90vw] py-5 xl:w-[81vw] ">
        <div className="flex gap-4 pb-3">
          <a href="https://github.com/JoSG7" target="_blank" className="flex items-center justify-center p-2 rounded-full bg-neutral-950">
            <IconBrandGithubFilled className="size-6" />
          </a>

          <div className="flex items-center justify-center p-2 rounded-full bg-neutral-950">
            <IconBrandX className="size-6" />
          </div>
        </div>

        <div className="flex gap-4 font-medium text-sm">
          <span>Privacy Police</span> <span>Terms of Service</span> <span>License</span>
        </div>

        <p className="pt-1 font-medium text-neutral-400 text-sm">
          @2025 SmLink. All Rights Reserved
        </p>
      </div>
    </section>
  )
}