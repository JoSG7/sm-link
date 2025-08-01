"use client"

import { IconAlarmFilled, IconDeviceAnalytics, IconGlobe, IconLock, IconSettingsFilled, IconShieldCheckFilled, IconStarFilled } from "@tabler/icons-react";
import { Pill } from "@/components/shared/Pill";
import Image from "next/image";
import { useScrollTo } from "@/hooks/useScrollTo";

export function Hero() {

  const scrollTo = useScrollTo()

  return (
    <section className="flex justify-center lg:h-content-desktop-sm lg-2:h-content-desktop 2xl:h-content-desktop-lg 3xl:h-content-desktop-xl 3xl:max-h-[1091px]
    4xl:h-content-desktop-2xl">

      {/* Layout Content */}
      <div className="w-[90vw]
      lg:flex lg:justify-center lg:items-center
      lg-2:w-[81vw] 3xl:max-w-[2060px] ">

        {/* Main content */}
        <main className="py-7 xs:py-10
        lg:flex lg:flex-row-reverse lg:py-0 lg:items-center lg:grow lg-2:gap-6
        2xl:gap-8 3xl:gap-10">

          {/* Img Section */}
          <div className="flex justify-center">
            <Image src="/imgs/mano5.png" alt="logo" width={500} height={500}
              className="size-60 fade sm:size-80 md:size-96 
              lg:min-w-img-desktop-sm lg:min-h-img-desktop-sm
              lg-2:min-w-img-desktop lg-2:min-h-img-desktop" />
          </div>

          {/* Text and Cards Sections */}
          <section className="">
            <div className="">
              {/* Title */}
              <h1 className="pt-2 tracking-tight text-center text-4xl-movil 
              lg:text-6xl-desktop-sm lg:text-start lg:p-0
              lg-2:text-6xl-desktop ">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">smartest way </span>
                to share your links
              </h1>

              {/* Paragraph */}
              <p className="py-5 text-center text-neutral-300 text-lg-movil xs:pb-6 sm:pb-7
              lg:text-lg-desktop-sm lg:text-start lg:py-4 lg:w-11/12 lg:text-neutral-400
              lg-2:w-full lg-2:text-xl-desktop lg-2:pt-5 lg-2:pb-6 lg-2:font-medium
              2xl:pt-6 2xl:pb-7 
              3xl:pt-7 3xl:pb-8
              4xl:pt-9 4xl:pb-10">
                Tired of messy URLs? Shorten links in seconds and track their metrics
                <span className="hidden lg:inline"> anywhere - 24 hours a day</span>
              </p>

              {/* Since 360px */}
              <div className="flex gap-5 pb-6 xs:gap-6 xs:pb-7 sm:gap-8 sm:pb-9 lg:hidden">
                <article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5">
                  <div className="flex justify-center pb-2">
                    <div className="">
                      <IconShieldCheckFilled className="text-green-400 xs:size-7 sm:size-10" />
                    </div>
                  </div>
                  <p className="text-center text-xs-movil ">Protection</p>
                </article>

                <article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5">
                  <div className="flex justify-center pb-2">
                    <div className="">
                      <IconAlarmFilled className="text-blue-400 xs:size-7 sm:size-10" />
                    </div>
                  </div>
                  <p className="text-center text-xs-movil ">Expirations</p>
                </article>

                <article className="p-2 border rounded-lg bg-neutral-950 border-graphite grow xs:p-3 sm:p-5">
                  <div className="flex justify-center pb-2">
                    <div className="">
                      <IconSettingsFilled className="text-emerald-400 xs:size-7 sm:size-10" />
                    </div>
                  </div>
                  <p className="text-center text-xs-movil ">Settings </p>
                </article>
              </div>

              {/* Since 1024 */}
              <div className="hidden lg:flex lg:gap-3 lg:pb-5
              lg-2:gap-3 lg-2:pb-7
              2xl:gap-4 2xl:pb-8
              3xl:gap-5 3xl:pb-9
              4xl:gap-7 4xl:pb-11 ">
                <Pill title="Global Reach"
                  icon={<IconGlobe className="text-green-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />} 
                  containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
                  3xl:py-2 3xl:px-5 
                  4xl:px-6" 
                  iconContainerClass="bg-emerald-300 3xl:p-1.5"
                  titleClass="text-xs-desktop-sm lg-2:text-xs-desktop" />

                <Pill title="Real-Time Analytics"
                  icon={<IconDeviceAnalytics className="text-blue-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />}
                  containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
                  3xl:py-2 3xl:px-5 
                  4xl:px-6" 
                  iconContainerClass="bg-sky-400 3xl:p-1.5" 
                  titleClass="text-xs-desktop-sm lg-2:text-xs-desktop" />

                <Pill title="100% Secure"
                  icon={<IconLock className="text-green-700 size-4 2xl:size-5 3xl:size-6 4xl:size-8" />} 
                  containerClass="2xl:py-2 2xl:px-4 2xl:gap-3
                  3xl:py-2 3xl:px-5 
                  4xl:px-6" 
                  iconContainerClass="bg-emerald-300 3xl:p-1.5"
                  titleClass="text-xs-desktop-sm lg-2:text-xs-desktop" />
              </div>

              {/* Start Button section */}
              <div className="flex justify-center lg:items-center lg:gap-7 lg:justify-start">
                <button className="py-2 font-medium transition-transform duration-200 rounded-full px-7 text-lg-movil bg-gradient-to-r from-green-400 to-blue-500 text-neutral-200 hover:scale-105 xs:py-3
                lg:py-2 lg:px-4 lg:text-lg-desktop-sm lg:from-green-500 lg:to-blue-600
                lg-2:text-lg-desktop 
                2xl:px-6 3xl:py-3 3xl:px-8"
                  onClick={() => { scrollTo("link-form-section") }}>
                  {`Let's start now!`}
                </button>

                <p className="hidden text-neutral-200 items-center gap-1 
                lg:text-sm-desktop-sm lg:flex lg-2:text-sm-desktop
                2xl:gap-2">
                  <IconStarFilled className="size-4 text-lime-400 2xl:size-5 3xl:size-6 4xl:size-7" />
                  Trusted by 10,000+ users
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  )
}