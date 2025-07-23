"use client"

// import { IconBrandInstagramFilled, IconFileDescriptionFilled } from "@tabler/icons-react";
import { ShortLinkForm } from "./ShortLinkForm";
import { LinkFormTitle } from "./Title";
// import { Pill } from "@/components/shared/Pill";

export function LinkFormSection() {

  return (

    <section className="flex justify-center" id="link-form-section">
      <div className="w-[90vw] py-7 sm:max-w-lg
      lg-2:flex md:gap-5 lg:gap-6 lg-2:max-w-5xl lg-2:py-9 lg-2:flex-row-reverse lg-2:justify-between">
        <LinkFormTitle />

        <section className="lg-2:hidden">
          <p className="font-medium text-center text-lg-fluid text-neutral-300 pb-5">
            Quick to share and easy to manage, perfect for social media and team
          </p>
        </section>

        <ShortLinkForm />

        {/* This section only appears in 360px */}
        <div className="flex gap-4 items-center pt-5 lg-2:hidden">
          <article className="bg-neutral-950/70 backdrop-blur-sm rounded-lg p-4 border border-graphite grow">
            <div className="text-xl-fluid font-bold text-sky-300">1M+</div>
            <div className="text-xs-fluid text-gray-300">Links</div>
          </article>

          <article className="bg-neutral-950/70 backdrop-blur-sm rounded-lg p-4 border border-graphite grow">
            <div className="text-xl-fluid font-bold text-green-300">50M+</div>
            <div className="text-xs-fluid text-gray-300">Clicks Tracked</div>
          </article>

          <article className="bg-neutral-950/70 backdrop-blur-sm rounded-lg p-4 border border-graphite grow">
            <div className="text-xl-fluid font-bold text-sky-300">99.9%</div>
            <div className="text-xs-fluid text-gray-300">Uptime</div>
          </article>
        </div>
      </div>
    </section>
  )
}