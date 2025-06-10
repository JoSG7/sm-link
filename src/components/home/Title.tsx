"use client"

import { IconAlarmFilled, IconBrandFacebookFilled, IconBrandInstagram, IconBrandOffice, IconBrandYoutubeFilled, IconChartPie2Filled, IconDeviceAnalytics, IconFileExcel, IconFileTextShield, IconGlobe, IconLock, IconSettingsFilled, IconShieldCheckFilled, IconStarFilled } from "@tabler/icons-react"
import { AnimatedTitle } from "../motion/MotionTitle"
import { Pill } from "../shared/Pill"
import Image from "next/image"

export function HomeTitle() {

  return (

    <section className="flex justify-center">
      <div className="w-[90vw] lg-2:w-full lg-2:py-9 lg-2:max-w-5xl lg-2:flex lg-2:flex-row-reverse lg-2:justify-between">

        {/* Img for 1272px */}
        <Image src="/imgs/mano5.png" alt="Home Imge for 1272px" width={500} height={500} className="hidden img-home lg-2:block " />

        <article className="lg-2:max-w-[580px]">
          <div className="py-6 lg-2:py-12">

            {/* Img for 360px */}
            <div className="flex justify-center">
              <Image src="/imgs/mano5.png" alt="logo" width={500} height={500} className="size-60 fade object-cover lg-2:hidden" />
            </div>

            <h1 className="text-4xl tracking-tight text-center lg-2:text-start lg-2:text-6xl pt-2">The smartest way to share your links</h1>

            <p className="text-neutral-400 text-center pt-5 lg-2:text-start lg-2:pt-7 lg-2:font-medium lg-2:text-xl">
              Tired of messy URLs? Make them clean <span className="hidden lg-2:inline-block">& fast, and smart</span>
            </p>
            <p className="text-neutral-400 text-center pb-5 lg-2:text-start lg-2:pb-5 lg-2:font-medium lg-2:text-xl">
              Shorten links in seconds and track their performance
              <span className="lg-2:hidden"> anytime - 24 hours a day</span>
            </p>

            {/* Since 360px */}
            <div className="flex gap-3 pb-5 lg-2:hidden">
              <article className="rounded-xl border border-[#1c1d1d] p-2 fade-b-lg">
                <div className="flex justify-center pb-2">
                  <IconShieldCheckFilled className="text-neutral-300" />
                </div>
                <p className="text-xs">Protected links</p>
              </article>

              <article className="rounded-xl border border-[#1c1d1d] p-2 fade-b-lg">
                <div className="flex justify-center pb-2">
                  <IconAlarmFilled className="text-neutral-300" />
                </div>
                <p className="text-xs">Set expirations</p>
              </article>

              <article className="rounded-xl border border-[#1c1d1d] p-2 fade-b-lg">
                <div className="flex justify-center pb-2">
                  <IconSettingsFilled className="text-neutral-300" />
                </div>
                <p className="text-xs">Controll now</p>
              </article>

              {/* <Pill title="Global"
                icon={<IconGlobe className="text-green-700 size-4" />} iconContainerClass="bg-emerald-200" /> */}

              {/* <Pill title="Real-Time Analytics"
                icon={<IconDeviceAnalytics className="text-blue-700 size-4" />} iconContainerClass="bg-sky-300" />

              <Pill title="Secure"
                icon={<IconLock className="text-purple-700 size-4" />} iconContainerClass="bg-violet-400" /> */}
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

            <div className="flex items-center gap-4 justify-center lg-2:gap-7 lg-2:justify-start">
              <button className="py-2 px-5 text-base lg-2:py-2 lg-2:px-4 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-400 text-neutral-950 transition-transform duration-200 hover:scale-105">{`Let's start now!`}</button>

              <p className="hidden text-[#E2E2EB] items-center gap-1 text-xs lg-2:text-sm lg-2:flex">
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

export function LinkFormTitle() {

  return (

    <section className="flex items-center">

      <div className="w-[87vw] pb-5 lg-2:max-w-[500px] lg-2:py-0">

        <AnimatedTitle title="Turn any long link into a short URL" />

        <p className="py-5 font-medium text-neutral-400 lg-2:text-xl">
          Shorten links and track clicks. Great for social media, marketing, and more.
        </p>

        {/* Since 360px */}
        <div className="overflow-x-auto fade-x flex gap-3 lg-2:flex lg-2:pb-3">
          <Pill title="Facebook" icon={<IconBrandFacebookFilled stroke={1.25} className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-700" />

          <Pill title="Instagram" icon={<IconBrandInstagram className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />

          <Pill title="Youtube" icon={<IconBrandYoutubeFilled className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-red-600 via-red-500 to-red-700" />

          <Pill title="Office" icon={<IconBrandOffice className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-blue-500 via-green-600 to-violet-900" />
        </div>

        {/* Since 1272px */}
        <div className="hidden lg-2:flex gap-3">
          <Pill title="Protected information" icon={<IconFileTextShield className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-amber-400 to-yellow-700" />

          <Pill title="Documents" icon={<IconFileExcel className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-lime-500 to-green-800" />

          <Pill title="Stadistics" icon={<IconChartPie2Filled className="size-4" />}
            iconContainerClass="bg-gradient-to-tr from-orange-500 via-red-500 to-red-700" />
        </div>

      </div>

    </section>

  )

}

export function LoginTitle() {

  return (

    <section>
      <div className="lg-2:max-w-[565px]">
        <AnimatedTitle title="Sign in to control all your links" />
        <p className="pt-5 pb-5 font-medium text-neutral-400 text-xl">
          Access your dashboard, set passwords, expiration dates, and monitor performance anytime. Stay in control of all your shared content.
        </p>
      </div>
    </section>

  )

}





{/* <AnimatedTitle title="The smartest way to share your links" />
          <p className="text-neutral-400 lg-2:pt-7 lg-2:font-medium lg-2:text-xl">
            Tired of messy URLs? Make them clean, fast, and smart
          </p>
          <p className="text-neutral-400 lg-2:pb-5 lg-2:font-medium lg-2:text-xl">
            Shorten links in seconds and track how they perform
          </p>
          <div className="flex lg-2:gap-2 lg-2:pb-7">
            <Pill title="Global Reach"
              icon={<IconGlobe className="text-green-700 size-4" />} iconContainerClass="bg-emerald-200" />

            <Pill title="Real-Time Analytics"
              icon={<IconDeviceAnalytics className="text-blue-700 size-4" />} iconContainerClass="bg-sky-300" />

            <Pill title="100% Secure"
              icon={<IconLock className="text-purple-700 size-4" />} iconContainerClass="bg-violet-400" />
          </div>

          <div className="flex gap-7 items-center">
            <button className="py-2 px-4 rounded-lg bg-gradient-to-r from-neutral-100 to-neutral-400 text-neutral-800 transition-transform duration-200 hover:scale-105">Let's Start</button>

            <p className="text-sm text-[#E2E2EB] flex items-center gap-1 text-">
              <IconStarFilled className="size-4"/>
              Trusted by 10,000+ users
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex items-center img-home">
          <img src="imgs/mano5.png" className="img-mask-full h-[450px]" />
        </div> */}



{/* <div className="grid grid-cols-2 gap-5 pb-7">
            <article className="rounded-lg border border-[#1c1d1d] p-3 flex justify-between">
              <div>
                <span className="text-[#E2E2Eb] font-semibold text-lg">Digital Marketing</span>
                <p className="text-sm text-neutral-400">Enhance your campaigns with short, trackable links to measure engagement</p>
              </div>
              <div className="flex items-center">
                <IconReportAnalytics className="size-10" />
              </div>
            </article>
            <article className="rounded-lg border border-[#1c1d1d] p-3">

            </article>

            <p className="text-[#E2E2EB] text-xl font-medium pb-5">
            <span className="text-[#E2E2EB] font-semibold text-xl ">Business Emails: </span>
            Avoid long URLs in newsletters and communicate more clearly
          </p>
          <p className="text-[#E2E2EB] text-xl font-medium pb-5">
            <span className="text-[#E2E2EB] font-semibold text-xl ">Digital Marketing: </span>
            Enhance your campaigns with short, trackable links to measure engagement
          </p>
            
          </div> */}