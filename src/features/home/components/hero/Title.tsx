"use client"

export function HeroTitle() {

  return (
    <div>
      {/* Title */}
      <h1 className="tracking-tight text-4xl-movil
      sm:text-7xl-tablet
      lg:text-6xl-desktop-sm lg:p-0
      xl:text-title-desktop">
        The 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500"> Best way </span>
        to share your links
      </h1>

      {/* Paragraph */}
      <p className="py-5 text-neutral-300 text-base-movil
      xs:pb-6 
      sm:py-8 sm:text-2xl-tablet
      md:py-9 
      lg:py-8 lg:text-xl-desktop-sm lg:text-neutral-400
      xl:py-8 xl:pt-9 xl:text-xl-desktop 
      2xl:py-10 2xl:pt-11
      3xl:py-12 3xl:pt-[52px]
      4xl:py-14 4xl:pt-[60px]">
        Tired of messy URLs? Shorten links in seconds and track their metrics
        <span className="hidden lg:inline"> in real time - 24 hours</span>
      </p>
    </div>
  )
}





