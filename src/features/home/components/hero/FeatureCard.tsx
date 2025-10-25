interface Props {
  icon: React.ReactNode
  title: string
}

export function FeatureCard ({ icon, title } : Props) {

  return(

    <article className="flex p-2 gap-2 items-center text-sm-movil rounded-lg border-[1.5px] border-neutral-800
    xs:p-3 xs:gap-3
    sm:p-6 sm:gap-4 sm:text-xl-tablet sm:flex-col sm:items-baseline sm:rounded-2xl sm:bg-neutral-950/50
    md:p-7 md:gap-5
    lg:px-4 lg:py-3 lg:gap-3 lg:text-sm-desktop-sm lg:flex-row lg:items-center
    xl:pr-5 xl:py-4 xl:gap-2 xl:text-sm-desktop xl:rounded-xl">
      {icon}
      <p>{title}</p>
    </article>

  )

}