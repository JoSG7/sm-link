import clsx from "clsx"

interface Props {
  icon: React.ReactNode
  title: string
  color?: "green" | "blue"
  className?: string 
}

export function FeatureCard({ icon, title, color, className }: Props) {

  return (

    <article className={`flex p-3 gap-3 items-center rounded-lg text-neutral-300/90 flex-1 bg-neutral-900/80 
    sm:flex-col sm:items-baseline sm:p-4 lg:bg-neutral-950 lg:p-3 lg:flex-row lg:items-center
    shadow-[0px_32px_64px_-16px_transparent,0px_16px_32px_-8px_transparent,0px_8px_16px_-4px_transparent,0px_4px_8px_-2px_transparent,0px_-8px_16px_-1px_transparent,0px_2px_4px_-1px_transparent,0px_0px_0px_1px_transparent,inset_0px_0px_0px_1px_rgba(255,255,255,0.1),inset_0px_1px_0px_rgb(255,255,255,0.1)] ${className}`}>

      <div className={clsx("p-2 rounded-full",
        color == "green" && "bg-green-900/30 text-green-400",
        color == "blue" && "bg-blue-900/30 text-blue-400"
      )}>
        {icon}
      </div>
      <p>{title}</p>
    </article>

  )

}