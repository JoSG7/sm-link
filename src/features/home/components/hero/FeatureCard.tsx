interface Props {
  icon: React.ReactNode
  title: string
}

export function FeatureCard ({ icon, title } : Props) {

  return(

    <article className="flex p-2 gap-2 items-center text-sm-movil rounded-lg border-[1.5px] border-neutral-800
    xs:p-3 xs:gap-3
    xl:px-4 xl:py-3 xl:gap-2 xl:rounded-xl">
      {icon}
      <p>{title}</p>
    </article>

  )

}