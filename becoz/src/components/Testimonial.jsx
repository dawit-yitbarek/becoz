import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    message: "Becoz helped me find my dream apartment in under a week. Outstanding service!",
    author: "– Hana T.",
  },
  {
    message: "Professional agents and transparent deals. Highly recommend.",
    author: "– Elias M.",
  },
  {
    message: "The best real estate platform in the city. Seamless experience throughout!",
    author: "– Selam A.",
  },
]

export default function TestimonialSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
  }

  const stopTimer = () => clearInterval(timerRef.current)

  useEffect(() => {
    if (!isHovered) startTimer()
    return stopTimer
  }, [index, isHovered])

  const next = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-[#111111] text-[#A0A0A0] py-20 px-6 font-[Poppins]">
      <div className="max-w-3xl mx-auto text-center relative">
        <h3 className="text-3xl font-bold text-white mb-12">What Our Clients Say</h3>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 30 }}
              transition={{ duration: 0.4 }}
              className="italic px-6 py-8 bg-[#1C1C1C] border border-[#2F2F2F] rounded-xl shadow-[0_0_20px_rgba(255,203,116,0.05)] hover:shadow-[0_0_30px_rgba(255,203,116,0.1)] transform hover:scale-[1.015] transition duration-300"
            >
              <p className="text-lg mb-4">"{testimonials[index].message}"</p>
              <div className="mt-2 font-semibold text-[#FFCB74]">{testimonials[index].author}</div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => {
              prev()
              startTimer()
            }}
            className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] border border-[#FFCB74]/30 text-[#FFCB74] rounded-full hover:shadow-[0_0_10px_rgba(255,203,116,0.4)] transition duration-300"
          >
            ‹
          </button>
          <button
            onClick={() => {
              next()
              startTimer()
            }}
            className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] border border-[#FFCB74]/30 text-[#FFCB74] rounded-full hover:shadow-[0_0_10px_rgba(255,203,116,0.4)] transition duration-300"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}