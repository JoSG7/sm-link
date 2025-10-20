"use client"

export function HeroTitle() {

  return (
    <div>
      {/* Title */}
      <h1 className="tracking-tight text-4xl-movil
      sm:text-7xl-tablet
      lg:text-6xl-desktop-sm lg:p-0
      xl:text-7xl " >
        The 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500"> Best way </span>
        to share your links
      </h1>

      {/* Paragraph */}
      <p className="py-5 text-neutral-300 text-base-movil
      xs:pb-6 
      sm:py-8 sm:text-2xl-tablet
      md:py-9 
      lg:text-lg-desktop-sm lg:text-start lg:py-5 lg:text-neutral-400
      xl:text-xl xl:text-center xl:py-6 
      2xl:pt-6 2xl:pb-7 
      3xl:pt-7 3xl:pb-8
      4xl:pt-9 4xl:pb-10">
        Tired of messy URLs? Shorten links in seconds and track their metrics
        <span className="hidden lg:inline"> anywhere - 24 hours a day</span>
      </p>
    </div>
  )
}





