import { ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  title?: string
  containerClass?: string
  icon?: ReactNode
  iconContainerClass?: string
  titleClass?: string
  delay?: number
}

export const Pill = ({ title = "", containerClass, icon = null, iconContainerClass, titleClass, delay = 0 }: Props) => {

  return (
    <motion.article className={`rounded-full border border-graphite py-1 px-3 flex gap-2 items-center ${containerClass}`}
      initial={{
        opacity: 0,
        y: 30,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >

      <div>
        <p className={`${titleClass}`}>
          {title}
        </p>
      </div>
      {icon != null &&
        <div className={`p-1 rounded-full ${iconContainerClass}`}>
          {icon}
        </div>
      }
    </motion.article>
  )

}