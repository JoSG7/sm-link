"use client"

import { IconBasketDiscount, IconBrandInstagramFilled, IconBrandOffice } from "@tabler/icons-react";
import { ShortLinkForm } from "./ShortLinkForm";
import { LinkFormTitle } from "./Title";

export function LinkFormSection() {

  return (

    <section className="flex justify-center">
      <div className="w-[90vw] py-7 max-w-[325px]
      md:w-[94%] md:flex md:gap-5 lg:gap-6 lg-2:max-w-5xl lg-2:py-9 lg-2:flex-row-reverse lg-2:justify-between">
        <LinkFormTitle />
        <ShortLinkForm />

        {/* This p only appears in 360px */}
        <p className="pb-5 pt-3 font-medium text-neutral-400 text-muted-foreground text-center max-w-xs lg-2:hidden">
          Quick to share and easy to manage, perfect for social media, newsletters, team collaboration, and more
        </p>

        <div className="overflow-x-auto flex justify-between lg-2:hidden">
          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1 rounded-full bg-neutral-900">
                <IconBrandInstagramFilled className="text-neutral-300" />
              </div>
            </div>
            <p className="text-xs text-neutral-300">Social Media</p>
          </article>

          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1 rounded-full bg-neutral-900">
                <IconBasketDiscount className="text-neutral-300" />
              </div>
            </div>
            <p className="text-xs text-neutral-300">Exclusive Offers</p>
          </article>

          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1 rounded-full bg-neutral-900">
                <IconBrandOffice className="text-neutral-300" />
              </div>
            </div>
            <p className="text-xs text-neutral-300">Documents</p>
          </article>
        </div>
      </div>
    </section>
  )
}