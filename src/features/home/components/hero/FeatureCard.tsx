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
    xl:py-4 xl:gap-2 xl:text-base-desktop xl:rounded-xl xl:grow
    2xl:px-5 2xl:gap-3 2xl:border-2
    3xl:px-6 3xl:py-5 3xl:gap-4 3xl:rounded-2xl
    4xl:px-8 4xl:py-7 4xl:gap-5 4xl:rounded-3xl 4xl:border-3">
      {icon}
      <p>{title}</p>
    </article>

  )

}