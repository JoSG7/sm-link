'use client'

import { motion } from 'framer-motion'

type TitleProps = {
  title: string
  gradientWords: string[]
  className?: string | undefined
}

export function AnimatedTitle({ title, gradientWords, className }: TitleProps) {

  const words = title.split(' ')
  const normalWords = words.filter((wrd) => !gradientWords.includes(wrd))
  const gradientBlock = gradientWords.join(' ')
  const firstGradientIndex = words.findIndex(word =>
    gradientWords.includes(word)
  )
  const finalWords = [...normalWords];
  if (gradientWords.length > 0) {
    finalWords.splice(firstGradientIndex, 0, gradientBlock);
  }

  

  return (

    <h1 className={className}>
      {
        finalWords.map((word, i) => {

          const isGradient = word == gradientBlock

          return (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              className={
                isGradient
                  ? 'inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'
                  : 'inline-block '
              }>
              {word}{"\u00A0"}
            </motion.span>
          )
        })
      }
    </h1>
  )
}