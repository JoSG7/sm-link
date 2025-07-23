import { IconChartHistogram, IconClockExclamation, IconFolderCog, IconLinkPlus, IconListSearch, IconPencilStar, IconShieldLock } from "@tabler/icons-react"
import { LoginDetailsTitle } from "./Title"
import Image from "next/image"

export function LogingDetails() {

  return (

    <section className="flex justify-center">
      <div className="w-[90vw] pt-12 sm:max-w-lg
      lg-2:max-w-5xl lg-2:flex lg-2:pt-36 lg-2:justify-between lg-2:pb-20">

        <div className="">
          <div className="flex flex-col lg-2:pt-14">
            <LoginDetailsTitle />

            {/* Since 360px */}
            <div className="flex flex-col gap-5 pb-5 sm:justify-start sm:gap-6 sm:pb-6
            lg-2:hidden">
              {/* First Card */}
              <article className="p-3 rounded-lg flex gap-5 bg-neutral-950 border border-graphite">
                <div className="grow">
                  <h1 className="text-lg font-medium pb-1">Advanced Analytics</h1>
                  <p className="text-sm text-neutral-300 ">
                    Track clicks, referrers, and device information with detailed insights.
                  </p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-neutral-900">
                  <IconChartHistogram className="text-green-300 size-7" />
                </div>
              </article>

              <article className="p-3 rounded-lg flex gap-5 bg-neutral-950 border border-graphite">
                <div className="grow">
                  <h1 className="text-lg font-medium pb-1">Customize your SmLink</h1>
                  <p className="text-sm text-neutral-300 ">
                    Customize the url of your link
                  </p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-neutral-900">
                  <IconPencilStar className="text-sky-300 size-7" />
                </div>
              </article>

              <article className="p-3 rounded-lg flex gap-5 bg-neutral-950 border border-graphite grow">
                <div className="grow">
                  <h1 className="text-lg font-medium pb-1">More SmLinks</h1>
                  <p className="text-sm text-neutral-300">
                    Extend limit from 7 to 15 links
                  </p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-neutral-900">
                  <IconLinkPlus className="text-green-300 size-7" />
                </div>
              </article>



            </div>

            {/* Since 1272px */}
            <div className="hidden gap-5 pb-5 lg-2:flex">
              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconChartHistogram className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute -top-11 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full 
                border border-[#1c1d1d] pointer-events-none">
                  Metrics
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconShieldLock className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Protected Links
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconClockExclamation className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Expirations
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconPencilStar className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Customizing
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconListSearch className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Audit
                </p>
              </article>

              <article className="relative group p-2 rounded-xl border border-[#1c1d1d]">
                <IconFolderCog className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="text-nowrap absolute -top-11 left-0 opacity-0 group-hover:opacity-100 duration-300 bg-black text-sm py-1 px-3 rounded-full border border-[#1c1d1d] pointer-events-none">
                  Management
                </p>
              </article>
            </div>

            {/* <div className="flex justify-center gap-5 lg-2:justify-start">
              <GitHubAuthButton />
              <GoogleAuthButton />
            </div> */}
            <div className="flex items-center justify-center sm:justify-start
            lg-2:justify-start">
              <button className="py-2 px-5 text-lg font-medium rounded-full bg-gradient-to-r from-green-400 to-blue-500 
              text-neutral-200 transition-transform duration-200 hover:scale-105 
              sm:text-xl sm:py-4 sm:px-5
              lg-2:py-2 lg-2:px-4">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="w-[400px] flex items-center">
          <Image src="/imgs/login6.png" alt="logo" width={200} height={200} className="hidden w-full fade lg-2:block lg-2:max-h-[500px]" />
        </div>

      </div>
    </section>
  )
}