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
    lg:p-3 lg:gap-3 lg:flex-row lg:text-sm-desktop-sm lg:items-center
    xl:px-4 xl:py-3 xl:text-sm xl:flex-row xl:items-center xl:gap-2 xl:rounded-xl">
      {icon}
      <p>{title}</p>
    </article>

  )

}