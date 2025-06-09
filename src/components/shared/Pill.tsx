import { HtmlHTMLAttributes, ReactNode } from "react"

interface Props {
  title?: string
  className?: HtmlHTMLAttributes<HTMLParagraphElement>
  icon?: ReactNode
  iconContainerClass?: string
  containerClass?: string
}

export const Pill = ({ title = "", className, icon = null, iconContainerClass, containerClass }: Props) => {

  return (
    <article className={`rounded-full border border-[#1c1d1d] py-1 px-3 flex gap-3 items-center lg-2:gap-3 ${containerClass}`}>
      <div>
        <p className={`text-xs ${className}`}>
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