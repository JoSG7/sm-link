interface Props {
  icon: React.ReactNode
  title: string
}

export function FeatureCard({ icon, title }: Props) {

  return (

    <article className="flex p-3 gap-3 items-center rounded-lg text-neutral-200
    border-[1.5px] border-neutral-900 bg-neutral-950/70 ">
      <div className="p-2 rounded-full bg-sky-900/20">
        {icon}
      </div>
      <p>{title}</p>
    </article>

  )

}