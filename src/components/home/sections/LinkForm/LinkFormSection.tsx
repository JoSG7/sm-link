"use client"

import { IconBasketDiscount, IconBrandInstagramFilled, IconBrandOffice } from "@tabler/icons-react";
import { ShortLinkForm } from "./ShortLinkForm";
import { LinkFormTitle } from "./Title";

export function LinkFormSection() {

  return (

    <section className="flex justify-center">
      <div className="w-[90vw] py-7 max-w-[325px] sm:max-w-lg
      lg-2:flex md:gap-5 lg:gap-6 lg-2:max-w-5xl lg-2:py-9 lg-2:flex-row-reverse lg-2:justify-between">
        <LinkFormTitle />
        <ShortLinkForm />

        {/* This p only appears in 360px */}
        <p className="py-5 font-medium text-center text-[#E5E7Eb] max-w-xs sm:py-6 sm:max-w-max sm:text-xl sm:text-start lg-2:hidden">
          Quick to share and easy to manage, perfect for social media, newsletters, team collaboration, and more
        </p>

        <div className="overflow-x-auto flex justify-between sm:justify-center sm:gap-6 lg-2:hidden">
          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1 rounded-full bg-gray-900">
                <IconBrandInstagramFilled className="sm:size-7" />
              </div>
            </div>
            <p className="text-xs sm:text-base">Social Media</p>
          </article>

          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1 rounded-full bg-gray-900">
                <IconBasketDiscount className="sm:size-7" />
              </div>
            </div>
            <p className="text-xs sm:text-base">Exclusive Offers</p>
          </article>

          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1 rounded-full bg-gray-900">
                <IconBrandOffice className="sm:size-7" />
              </div>
            </div>
            <p className="text-xs sm:text-base">Documents</p>
          </article>
        </div>
      </div>
    </section>
  )
}