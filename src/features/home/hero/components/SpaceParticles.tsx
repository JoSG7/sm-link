"use client"

import { motion } from "framer-motion"

interface Particle {
  left: string
  top: string
  size: number
  color: string
  drift: number
  rise: number
  duration: number
  delay: number
}

const particles: Particle[] = [
  { left: "8%", top: "18%", size: 3, color: "bg-green-200", drift: 14, rise: -18, duration: 9, delay: 0 },
  { left: "16%", top: "72%", size: 2, color: "bg-sky-200", drift: -12, rise: -24, duration: 12, delay: 1.4 },
  { left: "27%", top: "32%", size: 2, color: "bg-green-300", drift: 20, rise: 16, duration: 11, delay: 2.2 },
  { left: "38%", top: "78%", size: 3, color: "bg-sky-300", drift: -18, rise: -14, duration: 10, delay: 0.8 },
  { left: "48%", top: "16%", size: 2, color: "bg-green-100", drift: 11, rise: 22, duration: 13, delay: 3 },
  { left: "58%", top: "64%", size: 2, color: "bg-sky-200", drift: -15, rise: -20, duration: 8, delay: 1.1 },
  { left: "67%", top: "28%", size: 4, color: "bg-green-200", drift: 18, rise: 12, duration: 14, delay: 2.8 },
  { left: "76%", top: "82%", size: 2, color: "bg-sky-300", drift: -10, rise: -18, duration: 9, delay: 0.4 },
  { left: "86%", top: "44%", size: 3, color: "bg-green-100", drift: 13, rise: 20, duration: 12, delay: 1.8 },
  { left: "94%", top: "15%", size: 2, color: "bg-sky-200", drift: -16, rise: -12, duration: 10, delay: 3.4 },
  { left: "4%", top: "48%", size: 2, color: "bg-sky-300", drift: 10, rise: 18, duration: 11, delay: 2.5 },
  { left: "72%", top: "56%", size: 2, color: "bg-green-300", drift: -14, rise: -16, duration: 15, delay: 0.2 },
  { left: "12%", top: "40%", size: 1, color: "bg-sky-100", drift: 8, rise: -12, duration: 14, delay: 1.7 },
  { left: "22%", top: "88%", size: 2, color: "bg-green-200", drift: -11, rise: 14, duration: 10, delay: 3.1 },
  { left: "33%", top: "12%", size: 1, color: "bg-sky-200", drift: 16, rise: -10, duration: 13, delay: 0.6 },
  { left: "44%", top: "52%", size: 2, color: "bg-green-100", drift: -9, rise: 18, duration: 12, delay: 2.4 },
  { left: "54%", top: "86%", size: 1, color: "bg-sky-100", drift: 12, rise: -16, duration: 9, delay: 1.2 },
  { left: "63%", top: "42%", size: 2, color: "bg-blue-200", drift: -17, rise: 11, duration: 14, delay: 3.6 },
  { left: "81%", top: "22%", size: 1, color: "bg-green-100", drift: 10, rise: -15, duration: 11, delay: 2.1 },
  { left: "91%", top: "70%", size: 2, color: "bg-sky-200", drift: -13, rise: 17, duration: 13, delay: 0.9 },
]

export function SpaceParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className={`absolute rounded-full shadow-[0_0_12px_currentColor] ${particle.color}`}
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          initial={{ opacity: 0.25, scale: 0.8 }}
          animate={{
            x: [0, particle.drift, 0],
            y: [0, particle.rise, 0],
            opacity: [0.25, 0.95, 0.25],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
