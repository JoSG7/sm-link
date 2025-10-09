interface Props {
  icon: React.ReactNode
  title: string
}

export function FeatureCard ({ icon, title } : Props) {

  return(

    <article className="flex items-center rounded-xl border-[1.5px] border-neutral-800 text-sm
    xl:px-4 xl:py-3 xl:gap-2">
      {icon}
      <p>{title}</p>
    </article>

  )

}