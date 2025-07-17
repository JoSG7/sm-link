import { ReactNode } from "react"

interface Props {
  title?: string
  containerClass?: string
  icon?: ReactNode
  iconContainerClass?: string
  titleClass?: string
}

export const Pill = ({ title = "", containerClass, icon = null, iconContainerClass, titleClass }: Props) => {

  return (
    <article className={`rounded-full border border-graphite py-1 px-3 flex gap-2 items-center ${containerClass}`}>
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