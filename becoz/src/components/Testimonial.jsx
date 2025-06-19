import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../components/Api'
import { SkeletonTestimonial } from './SkeletonComponents'

const BackendUrl = import.meta.env.VITE_BACKEND_URL

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [restartFetch, setRestartFetch] = useState({ retry: 0, retryCount: 0 });
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
    const fetchTestimonials = async () => {
      try {
        const response = await api.get(`${BackendUrl}/getTestimonials`)
        setTestimonials(response.data)
        setRestartFetch(() => ({ retry: 0, retryCount: 0 }));
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        if (restartFetch.retryCount < 5) {
          setTimeout(() => {
            setRestartFetch(prev => ({
              retry: prev.retry + 1,
              retryCount: prev.retryCount + 1
            }));
          }, 5000);
        };
      }
    }

    fetchTestimonials()
  }, [restartFetch.retry])

  useEffect(() => {
    if (testimonials.length > 0 && !isHovered) {
      startTimer()
    }

    return () => stopTimer()
  }, [isHovered, testimonials.length])


  const next = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    testimonials.length > 0 && testimonials[index]?.comment ?
      <section className="relative z-10 bg-[#111111] text-[#A0A0A0] py-20 px-4 sm:px-6 font-[Poppins]">
        <div className="max-w-3xl mx-auto text-center relative px-2 sm:px-4">
          <h3 className="text-3xl font-bold text-white mb-12">What Our Clients Say</h3>

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {testimonials.length > 0 && testimonials[index]?.comment && (
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={testimonials[index]?.id || index}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 30 }}
                  transition={{ duration: 0.4 }}
                  className="italic px-6 py-8 bg-[#1C1C1C] border border-[#2F2F2F] rounded-xl shadow-[0_0_20px_rgba(255,203,116,0.05)] hover:shadow-[0_0_30px_rgba(255,203,116,0.1)] transform hover:scale-[1.015] transition duration-300 break-words text-wrap overflow-visible"
                >
                  <p className="text-lg mb-4">"{testimonials[index]?.comment}"</p>
                  <div className="mt-2 font-semibold text-[#FFCB74]">{testimonials[index]?.author}</div>
                </motion.blockquote>
              </AnimatePresence>
            )}
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
      :
      <SkeletonTestimonial />
  )
}
