"use client"

export function HeroTitle() {

  return (
    <div className="pb-6 text-left sm:pb-0 lg:my-auto lg:shrink-0 lg:pb-2">

      <p className="mb-4 inline-flex items-center rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-green-300">Smart link sharing</p>

      {/* Title */}
      <h1 className="max-w-77.5 text-4xl font-normal leading-[1.1] tracking-tight text-white xs:max-w-max sm:text-[3.25rem]">
        The
        <span> Smartest way </span>
        to share your links
      </h1>

      {/* Paragraph */}
      <p className="pt-3 text-base text-moss-copy sm:text-[1.125rem]">
        <span className="hidden lg:inline">Shorten links in seconds and get instant insights on how your links perform in real time.</span>
        <span className="lg:hidden">Tired of messy URLs? Shorten links in seconds and track their metrics</span>
      </p>
    </div>
  )
}







