"use client"

import { IconAlarmFilled, IconDeviceAnalytics, IconGlobe, IconLock, IconSettingsFilled, IconShieldCheckFilled, IconStarFilled } from "@tabler/icons-react";
import { Pill } from "@/components/shared/Pill";
import Image from "next/image";
import { useScrollTo } from "@/hooks/useScrollTo";

export function Hero() {

  const scrollTo = useScrollTo()

  return (
    <section className="flex justify-center">
      {/* Layout Content */}
      <div className="w-[90vw] lg-2:w-full lg-2:py-9 lg-2:max-w-5xl ">
        {/* Main content */}
        <div className="py-7 xs:py-10 lg-2:py-0 lg-2:flex lg-2:flex-row-reverse lg-2:justify-between">
          {/* Img Section */}
          <div className="flex justify-center">
            <Image src="/imgs/mano5.png" alt="logo" width={500} height={500}
              className="size-60 fade sm:size-80 lg-2:w-[430px] lg-2:h-[454px]" />
          </div>

          {/* Text and Cards Sections */}
          <section className="lg-2:max-w-[580px] lg-2:py-12">
            {/* Title */}
            <h1 className="pt-2 tracking-tight text-center text-4xl-fluid 
              lg-2:text-start lg-2:text-white  lg-2:text-6xl">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">smartest way </span>
              to share your links
            </h1>

            {/* Paragraph */}
            <p className="py-5 text-center text-neutral-300 text-lg-fluid xs:pb-6 sm:pb-7
              lg-2:text-start lg-2:text-xl lg-2:text-neutral-400 lg-2:font-medium">
              Tired of messy URLs? Shorten links in seconds and track their metrics
              <span className="hidden lg-2:inline"> anywhere - 24 hours a day</span>
            </p>

            {/* Since 360px */}
            <div className="flex gap-5 pb-6 xs:gap-6 xs:pb-7 sm:gap-8 sm:pb-9 lg-2:hidden">
              <article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5">
                <div className="flex justify-center pb-2">
                  <div className="">
                    <IconShieldCheckFilled className="text-green-400 xs:size-7 sm:size-10" />
                  </div>
                </div>
                <p className="text-center text-xs-fluid ">Protection</p>
              </article>

              <article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5">
                <div className="flex justify-center pb-2">
                  <div className="">
                    <IconAlarmFilled className="text-blue-400 xs:size-7 sm:size-10" />
                  </div>
                </div>
                <p className="text-center text-xs-fluid ">Expirations</p>
              </article>

              <article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5">
                <div className="flex justify-center pb-2">
                  <div className="">
                    <IconSettingsFilled className="text-emerald-400 xs:size-7 sm:size-10" />
                  </div>
                </div>
                <p className="text-center text-xs-fluid ">Settings </p>
              </article>
            </div>

            {/* Since 1024 */}
            <div className="hidden lg-2:flex lg-2:gap-3 lg-2:pb-7">
              <Pill title="Global Reach"
                icon={<IconGlobe className="text-green-700 size-4" />} iconContainerClass="bg-emerald-300" />

              <Pill title="Real-Time Analytics"
                icon={<IconDeviceAnalytics className="text-blue-700 size-4" />} iconContainerClass="bg-sky-400" />

              <Pill title="100% Secure"
                icon={<IconLock className="text-green-700 size-4" />} iconContainerClass="bg-emerald-300" />
            </div>

            {/* Start Button section */}
            <div className="flex justify-center lg-2:items-center lg-2:gap-7 lg-2:justify-start">
              <button className="py-2 font-medium transition-transform duration-200 rounded-full px-7 text-lg-fluid bg-gradient-to-r from-green-400 to-blue-500 text-neutral-200 hover:scale-105 xs:py-3
                lg-2:py-2 lg-2:px-4 lg-2:text-lg lg-2:from-green-500 lg-2:to-blue-600"
                onClick={() => { scrollTo("link-form-section") }}>
                {`Let's start now!`}
              </button>

              <p className="hidden text-neutral-200 items-center gap-1 
                lg-2:text-sm lg-2:flex">
                <IconStarFilled className="size-4 text-lime-400" />
                Trusted by 10,000+ users
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}