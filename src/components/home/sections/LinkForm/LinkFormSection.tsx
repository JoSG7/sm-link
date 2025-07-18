"use client"

import { IconBrandInstagramFilled, IconFileDescriptionFilled } from "@tabler/icons-react";
import { ShortLinkForm } from "./ShortLinkForm";
import { LinkFormTitle } from "./Title";
import { Pill } from "@/components/shared/Pill";

export function LinkFormSection() {

  return (

    <section className="flex justify-center" id="link-form-section">
      <div className="w-[90vw] py-7 sm:max-w-lg
      lg-2:flex md:gap-5 lg:gap-6 lg-2:max-w-5xl lg-2:py-9 lg-2:flex-row-reverse lg-2:justify-between">
        <LinkFormTitle />

        {/* This section only appears in 360px */}
        <section className="lg-2:hidden">
          <p className="font-medium text-center text-lg text-neutral-300">
            Quick to share and easy to manage, perfect for social media and team collaboration
          </p>

          {/* Pill Section */}
          <div className="flex gap-5 items-center py-6 lg-2:hidden">
            <Pill title="Social Media" containerClass="grow bg-neutral-950 justify-center"
              icon={<IconBrandInstagramFilled className="text-green-500" />} />

            <Pill title="Documents" containerClass="grow bg-neutral-950 justify-center"
              icon={<IconFileDescriptionFilled className="text-lime-500" />} />
          </div>
        </section>

        <ShortLinkForm />
        {/* This p only appears in 360px */}
        {/* <p className="py-5 font-medium text-center text-[#E2EBE7] max-w-xs sm:py-6 sm:max-w-max sm:text-xl sm:text-start lg-2:hidden">
          Quick to share and easy to manage, perfect for social media, newsletters, team collaboration, and more
        </p> */}

        {/* <div className="overflow-x-auto flex justify-between sm:justify-center sm:gap-6 lg-2:hidden">
          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1.5 rounded-full bg-gray-800">
                <IconBrandInstagramFilled className="text-red-400 sm:size-7" />
              </div>
            </div>
            <p className="text-xs sm:text-base">Social Media</p>
          </article>

          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1.5 rounded-full bg-gray-800">
                <IconDiscountFilled className="text-sky-400 sm:size-7" />
              </div>
            </div>
            <p className="text-xs sm:text-base">Exclusive Offers</p>
          </article>

          <article className="rounded-xl border bg-neutral-950 border-[#1c1d1d] p-2">
            <div className="flex justify-center pb-2">
              <div className="p-1.5 rounded-full bg-gray-800">
                <IconFileDescriptionFilled className="text-emerald-400 sm:size-7" />
              </div>
            </div>
            <p className="text-xs sm:text-base">Documents</p>
          </article>
        </div> */}
      </div>
    </section>
  )
}