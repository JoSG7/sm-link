import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

type AccordionItem = {
  title: ReactNode | string
  content: ReactNode | string;
}


export function Accordion({ items, buttonClass = "" }: { items: AccordionItem[], buttonClass?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <div className="w-full">
      {items.map((item, index) => {

        return (
          <div key={index} className="w-full">
            <button className={`w-full ${buttonClass}`} onClick={() => {
              toggle(index)
            }}>
              {item.title}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-y-auto max-h-[310px]"
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )

      })}
    </div>
  );
}



