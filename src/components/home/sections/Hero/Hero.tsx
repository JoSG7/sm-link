"use client"

import { IconAlarmFilled, IconDeviceAnalytics, IconGlobe, IconLock, IconSettingsFilled, IconShieldCheckFilled, IconStarFilled } from "@tabler/icons-react";
import { Pill } from "@/components/shared/Pill";
import Image from "next/image";
import { useScrollTo } from "@/hooks/useScrollTo";

export function Hero() {

  const scrollTo = useScrollTo()

  return (

    <section className="flex justify-center">
      <div className="w-[90vw] sm:max-w-lg
      lg-2:w-full lg-2:py-9 lg-2:max-w-5xl lg-2:flex lg-2:flex-row-reverse lg-2:justify-between">

        <Image src="/imgs/mano5.png" alt="Home Imge for 1272px" width={430} height={454}
          className="hidden fade object-cover lg-2:block " />

        <article className="lg-2:max-w-[580px]">
          <div className="py-7 lg-2:py-12">
            <div className="flex justify-center">
              <Image src="/imgs/mano5.png" alt="logo" width={500} height={500}
                className="size-60 fade object-cover sm:size-72 lg-2:hidden" />
            </div>

            <h1 className="text-4xl pt-2 sm:text-6xl sm:text-start
            lg-2:text-white lg-2:text-start lg-2:text-6xl lg-2:tracking-tight">
              The smartest way to share your links
            </h1>

            <p className="text-neutral-400 py-5 sm:text-xl sm:text-start
            lg-2:text-start lg-2:text-xl lg-2:font-medium">
              Tired of messy URLs? Shorten links in seconds and track their performance
              <span className="hidden lg-2:inline"> anywhere - 24 hours a day</span>
            </p>

            {/* Since 360px */}
            <div className="flex gap-4 pb-5 sm:justify-normal sm:gap-5 lg-2:hidden">
              <article className="rounded-xl bg-neutral-900 border border-graphite p-2 grow">
                <div className="flex justify-center pb-2">
                  <div className="p-1 rounded-full bg-gray-800 ">
                    <IconShieldCheckFilled className="text-emerald-400 sm:size-7" />
                  </div>
                </div>
                <p className="text-xs text-center sm:text-base">Protected links</p>
              </article>

              <article className="rounded-xl bg-neutral-900 border border-graphite p-2 grow">
                <div className="flex justify-center pb-2">
                  <div className="p-1 rounded-full bg-gray-800 ">
                    <IconAlarmFilled className="text-cyan-400 sm:size-7" />
                  </div>
                </div>
                <p className="text-xs text-center sm:text-base">Set expirations</p>
              </article>

              <article className="rounded-xl bg-neutral-900 border border-graphite p-2 grow">
                <div className="flex justify-center pb-2">
                  <div className="p-1 rounded-full bg-gray-800 ">
                    <IconSettingsFilled className="text-purple-400 sm:size-7" />
                  </div>
                </div>
                <p className="text-xs text-center sm:text-base">Control now</p>
              </article>
            </div>

            {/* Since 1024 */}
            <div className="hidden lg-2:flex lg-2:gap-2 lg-2:pb-7">
              <Pill title="Global Reach"
                icon={<IconGlobe className="text-green-700 size-4" />} iconContainerClass="bg-emerald-200" />

              <Pill title="Real-Time Analytics"
                icon={<IconDeviceAnalytics className="text-blue-700 size-4" />} iconContainerClass="bg-sky-300" />

              <Pill title="100% Secure"
                icon={<IconLock className="text-purple-700 size-4" />} iconContainerClass="bg-violet-400" />
            </div>

            {/* Start Button section */}
            <div className="flex items-center gap-4 justify-center sm:justify-start
            lg-2:gap-7 lg-2:justify-start">
              <button className="py-2 px-5 text-lg rounded-full bg-gradient-to-r from-neutral-100 to-neutral-400 text-neutral-950 transition-transform duration-200 hover:scale-105 sm:text-xl sm:py-4 sm:px-5
              lg-2:py-2 lg-2:px-4 lg-2:text-lg" onClick={() => { scrollTo("link-form-section") }}>
                {`Let's start now!`}
              </button>

              <p className="hidden text-[#E2E2EB] items-center gap-1 text-xs sm:flex sm:text-base
              lg-2:text-sm lg-2:flex">
                <IconStarFilled className="size-4 text-amber-300" />
                Trusted by 10,000+ users
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>

  )

}