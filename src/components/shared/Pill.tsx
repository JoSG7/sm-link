export const Pill = (
  { title = "", titleClass, icon = null, iconContainerClass, containerClass }:
  { title?: string, titleClass?: string, icon?: React.ReactNode, iconContainerClass?: string, containerClass?: string }
) => {

  return (
    <article className={`rounded-full border border-[#1c1d1d] py-1 px-3 flex gap-3 items-center lg-2:gap-3 ${containerClass}`}>
      <div>
        <p className={`text-xs ${titleClass}`}>
          {title}
        </p>
      </div>
      {icon != null &&
        <div className={`p-1 rounded-full ${iconContainerClass}`}>
          {icon}
        </div>
      }
    </article>
  )

}