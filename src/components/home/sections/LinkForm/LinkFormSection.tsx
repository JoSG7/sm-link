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

        <ShortLinkForm />

        {/* This section only appears in 360px */}
        <div className="flex items-center gap-4 pt-5 xs:gap-5 xs:pt-6 sm:gap-7 sm:pt-8 lg-2:hidden">
          <article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow">
            <div className="font-bold text-xl-movil text-sky-300">1M+</div>
            <div className="text-gray-300 text-xs-movil">Links</div>
          </article>

          <article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow">
            <div className="font-bold text-green-300 text-xl-movil">50M+</div>
            <div className="text-gray-300 text-xs-movil">Clicks Tracked</div>
          </article>

          <article className="border rounded-lg bg-neutral-950/70 backdrop-blur-sm p-4-fluid border-graphite grow">
            <div className="font-bold text-xl-movil  text-sky-300">99.9%</div>
            <div className="text-gray-300 text-xs-movil ">Uptime</div>
          </article>
        </div>
      </div>
    </section>
  )
}