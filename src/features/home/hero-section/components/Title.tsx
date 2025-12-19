"use client"

export function HeroTitle() {

  return (
    <div>
      {/* Title */}
      <h1 className="tracking-tight text-5xl font-[425]
      xs:text-center sm:text-6xl ">
        The 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500"> Best way </span>
        to share your links
      </h1>

      {/* Paragraph */}
      <p className="py-6 text-neutral-400 xs:text-center">
        Tired of messy URLs? Shorten links in seconds and track their metrics
        <span className="hidden lg:inline"> in real time - 24 hours</span>
      </p>
    </div>
  )
}





