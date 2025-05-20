"use client"

import { IconDeviceAnalytics, IconGlobe, IconLock } from "@tabler/icons-react"
import { AnimatedTitle } from "../motion/MotionTitle"

const Pill = (
  { title, titleClass, icon, iconContainerClass }:
    { title: string, titleClass?: string, icon: React.ReactNode, iconContainerClass?: string }
) => {

  return (
    <article className="rounded-full border border-[#1c1d1d] py-1 px-3 flex gap-3 items-center">
      <div>
        <span className={`text-xs ${titleClass}`}>{title}</span>
      </div>
      <div className={`p-1 rounded-full ${iconContainerClass}`}>
        {icon}
      </div>
    </article>
  )

}

export function HomeTitle() {

  return (

    <section className="flex justify-center">
      <div className="pt-16 w-full h-[525px] max-w-5xl relative">
        <div className="lg-2:max-w-[585px] lg-2:">
          <AnimatedTitle title="The smartest way to share your links" />
          <p className="pt-7 font-medium text-neutral-400 text-xl">
            Tired of messy URLs? Make them clean, fast, and smart
          </p>
          <p className="pb-5 font-medium text-neutral-400 text-xl">
            Shorten links in seconds and track how they perform
          </p>
          <div className="flex gap-2 pb-7">
            <Pill title="Global Reach"
              icon={<IconGlobe className="text-green-700 size-4" />} iconContainerClass="bg-emerald-200" />

            <Pill title="Real-Time Analytics"
              icon={<IconDeviceAnalytics className="text-blue-700 size-4" />} iconContainerClass="bg-sky-300" />

            <Pill title="100% Secure"
              icon={<IconLock className="text-purple-700 size-4" />} iconContainerClass="bg-violet-400" />
          </div>

          <div className="flex gap-7 items-center">
            <button className="py-2 px-4 rounded-lg bg-gradient-to-r from-neutral-100 to-neutral-400 text-neutral-800 transition-transform duration-200 
            hover:scale-105">Let's Start</button>

            <p className="text-sm text-[#E2E2EB]">⭐ Trusted by 10,000+ users</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex items-center img-home">
          <img src="imgs/mano3.png" className="img-mask-full h-[500px] object-cover" />
        </div>
      </div>
    </section>
  )

}

export function LinkFormTitle() {

  return (

    <section>

      <div className="lg-2:max-w-[500px]">

        <AnimatedTitle title="Turn any long link into a short URL" />

        <p className="pt-5 pb-5 font-medium text-neutral-400 text-xl">
          Shorten links and track clicks. Great for social media, marketing, and more.
        </p>




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