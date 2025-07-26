"use client"

// import { IconBrandInstagramFilled, IconFileDescriptionFilled } from "@tabler/icons-react";
import { ShortLinkForm } from "./ShortLinkForm";
import { LinkFormTitle } from "./Title";
// import { Pill } from "@/components/shared/Pill";

export function LinkFormSection() {

  return (

    <section className="flex justify-center" id="link-form-section">
      <div className="w-[90vw] py-7
      lg-2:flex md:gap-5 lg:gap-6 lg-2:max-w-5xl lg-2:py-9 lg-2:flex-row-reverse lg-2:justify-between">
        <LinkFormTitle />

        <section className="lg-2:hidden">
          <p className="pb-5 font-medium text-center text-lg-fluid text-neutral-300 xs:pb-6">
            Quick to share and easy to manage, perfect for social media and team
          </p>
        </section>

        <ShortLinkForm />

        {/* This section only appears in 360px */}
        <div className="flex items-center gap-4 pt-5 xs:gap-5 xs:pt-6 lg-2:hidden">
          <article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow">
            <div className="font-bold text-xl-fluid text-sky-300">1M+</div>
            <div className="text-gray-300 text-xs-fluid">Links</div>
          </article>

          <article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow">
            <div className="font-bold text-green-300 text-xl-fluid">50M+</div>
            <div className="text-gray-300 text-xs-fluid">Clicks Tracked</div>
          </article>

          <article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow">
            <div className="font-bold text-xl-fluid text-sky-300">99.9%</div>
            <div className="text-gray-300 text-xs-fluid">Uptime</div>
          </article>
        </div>
      </div>
    </section>
  )
}