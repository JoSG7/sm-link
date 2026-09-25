interface Props {
  icon: React.ReactNode
  title: string
  description: string
  color: "blue" | "green"
  className?: string 
}

export function FeatureCard({ icon, title, description, color, className }: Props) {

  return (
    <article className={`flex items-center gap-3 rounded-xl border border-[#ffffff1a] bg-card px-4 py-3 shadow-card ${className}`}>
      <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border ${color === "green" ? "border-green-400/30 bg-green-400/10 text-green-300" : "border-blue-400/30 bg-blue-400/10 text-blue-300"}`}>
        {icon}
      </span>
      <div>
        <p className="text-base font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs text-moss-dim">{description}</p>
      </div>
    </article>

  )

}