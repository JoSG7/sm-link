"use client"


export function HeroTitle() {


  return (
    <div className="lg:min-w-[33rem] lg:max-w-[33rem] xl:max-w-[35rem]">
      {/* Title */}
      <h1 className="tracking-tight text-5xl font-[425]
      xs:text-center sm:text-6xl 
      lg:text-start xl:text-title">
        The  
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500 lg:hidden"> 
          {" Best way "}
        </span>
        <span className="hidden text-transparent bg-clip-text bg-gradient-to-r from-green-400 to bg-blue-500 lg:inline"> 
          {" Smartest way "}
        </span>
        to share your links
      </h1>

      {/* Paragraph */}
      <p className="py-6 text-neutral-400 xs:text-center lg:pb-0 lg:text-start">
        <span className="hidden lg:inline">Shorten links in seconds and get instant insights on how your links perform in real time.</span>
        <span className="lg:hidden">Tired of messy URLs? Shorten links in seconds and track their metrics</span>
      </p>
    </div>
  )
}





