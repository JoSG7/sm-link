export const Pill = (
  { title, titleClass, icon, iconContainerClass }:
  { title: string, titleClass?: string, icon?: React.ReactNode, iconContainerClass?: string }
) => {

  return (
    <article className="rounded-full border border-[#1c1d1d] py-1 px-3 flex gap-3 items-center">
      <div>
        <p className={`text-xs ${titleClass}`}>{title}</p>
      </div>
      <div className={`p-1 rounded-full ${iconContainerClass}`}>
        {icon}
      </div>
    </article>
  )

}