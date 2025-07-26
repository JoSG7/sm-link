import { IconChartHistogram, IconClockExclamation, IconFolderCog, IconLinkPlus, IconListSearch, IconPencilStar, IconShieldLock } from "@tabler/icons-react"
import { LoginDetailsTitle } from "./Title"
import Image from "next/image"

export function LogingDetails() {

  return (

    <section className="flex justify-center">
      <div className="w-[90vw] pt-12
      lg-2:max-w-5xl lg-2:flex lg-2:pt-36 lg-2:justify-between lg-2:pb-20">
        <div className="">
          <div className="flex flex-col lg-2:pt-14">
            <LoginDetailsTitle />
            {/* Since 360px */}
            <div className="flex flex-col gap-5 pb-5 xs:gap-6 xs:pb-6 sm:gap-8 sm:pb-8 lg-2:hidden">
              {/* First Card */}
              <article className="relative flex gap-5 p-3 border rounded-lg bg-neutral-950 border-graphite sm:p-6">
                <div className="grow">
                  <h1 className="pb-1 font-medium text-lg-fluid">Advanced Analytics</h1>
                  <p className="text-sm-fluid text-neutral-300 ">
                    Track clicks, referrers, and device information with detailed insights.
                  </p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-neutral-900">
                  <IconChartHistogram className="text-green-300 size-7 xs:size-9 sm:size-12" />
                </div>

                {/* Borders */}
                <div className="absolute -top-[1px] left-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-[1px] right-10 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-700 to-transparent " />
              </article>

              <article className="relative flex gap-5 p-3 border rounded-lg bg-neutral-950 border-graphite sm:p-6">
                <div className="grow">
                  <h1 className="pb-1 font-medium text-lg-fluid">Customize your SmLink</h1>
                  <p className="text-sm-fluid text-neutral-300 ">
                    Customize the url of your link
                  </p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-neutral-900">
                  <IconPencilStar className="text-sky-300 size-7 xs:size-9 sm:size-12" />
                </div>
              </article>

              <article className="flex gap-5 p-3 border rounded-lg bg-neutral-950 border-graphite sm:p-6">
                <div className="grow">
                  <h1 className="pb-1 font-medium text-lg-fluid">More SmLinks</h1>
                  <p className="text-sm-fluid text-neutral-300">
                    Extend limit from 7 to 15 links
                  </p>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-neutral-900">
                  <IconLinkPlus className="text-green-300 size-7 xs:size-9 sm:size-12" />
                </div>
              </article>
            </div>

            {/* Since 1272px */}
            <div className="hidden gap-5 pb-5 lg-2:flex">
              <article className="relative p-2 border group rounded-xl border-graphite">
                <IconChartHistogram className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute px-3 py-1 text-sm duration-300 bg-black border rounded-full opacity-0 pointer-events-none -top-11 group-hover:opacity-100 border-graphite">
                  Metrics
                </p>
              </article>

              <article className="relative p-2 border group rounded-xl border-graphite">
                <IconShieldLock className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute left-0 px-3 py-1 text-sm duration-300 bg-black border rounded-full opacity-0 pointer-events-none text-nowrap -top-11 group-hover:opacity-100 border-graphite">
                  Protected Links
                </p>
              </article>

              <article className="relative p-2 border group rounded-xl border-graphite">
                <IconClockExclamation className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute left-0 px-3 py-1 text-sm duration-300 bg-black border rounded-full opacity-0 pointer-events-none text-nowrap -top-11 group-hover:opacity-100 border-graphite">
                  Expirations
                </p>
              </article>

              <article className="relative p-2 border group rounded-xl border-graphite">
                <IconPencilStar className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute left-0 px-3 py-1 text-sm duration-300 bg-black border rounded-full opacity-0 pointer-events-none text-nowrap -top-11 group-hover:opacity-100 border-graphite">
                  Customizing
                </p>
              </article>

              <article className="relative p-2 border group rounded-xl border-graphite">
                <IconListSearch className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute left-0 px-3 py-1 text-sm duration-300 bg-black border rounded-full opacity-0 pointer-events-none text-nowrap -top-11 group-hover:opacity-100 border-graphite">
                  Audit
                </p>
              </article>

              <article className="relative p-2 border group rounded-xl border-graphite">
                <IconFolderCog className="lg-2:size-10 text-neutral-300 hover:text-amber-200" />

                <p className="absolute left-0 px-3 py-1 text-sm duration-300 bg-black border rounded-full opacity-0 pointer-events-none text-nowrap -top-11 group-hover:opacity-100 border-graphite">
                  Management
                </p>
              </article>
            </div>

            <div className="flex items-center justify-center lg-2:justify-start">
              <button className="px-7 py-2 font-medium transition-transform duration-200 rounded-full text-lg-fluid bg-gradient-to-r from-green-400 to-blue-500 text-neutral-200 hover:scale-105 xs:py-3 
              lg-2:text-lg lg-2:py-2 lg-2:px-4">
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