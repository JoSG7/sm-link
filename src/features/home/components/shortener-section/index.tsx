"use client"

import { ShortenerForm } from "./ShortenerForm"
import { StatsCards } from "./StatsCards"
import { LinkFormTitle } from "./Title"

export function LinkFormSection() {

  return (
    <section className="flex justify-center lg:h-content-desktop-sm lg-2:h-content-desktop 
    2xl:h-content-desktop-lg 3xl:h-content-desktop-xl 3xl:max-h-[1091px] 4xl:h-content-desktop-2xl" id="link-form-section">

      {/* Layout content */}
      <div className="w-[90vw] py-7 md:gap-5
      lg:py-0 lg:flex lg:items-center 
      lg-2:w-[81vw] 3xl:max-w-[2060px]">

        {/* Main Content */}
        <main className="w-full lg:gap-12 lg:flex lg:flex-row-reverse 
        lg-2:flex-row-reverse lg-2:gap-16 2xl:gap-20 3xl:gap-24 4xl:gap-32">
          <LinkFormTitle />
          <ShortenerForm />
          <StatsCards />
        </main>
      </div>
    </section>
  )
}