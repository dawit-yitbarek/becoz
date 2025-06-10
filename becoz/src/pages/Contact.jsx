import React from 'react';
import { motion } from 'framer-motion';
import { FaTelegramPlane, FaTiktok, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <section className="mt-16 min-h-screen px-4 py-15 bg-[#111111] text-[#F6F6F6] font-[Poppins]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-[#FFCB74]">Contact Us</h2>
          <p className="text-gray-400">
            Have questions or want to schedule a visit? Reach out to us!
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FFCB74]" />
              <span className="text-lg">+251 912 345 678</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#FFCB74]" />
              <span className="text-lg">hello@becoz.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaTelegramPlane className="text-[#FFCB74]" />
              <a href="https://t.me/becozbroker" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">
                @becozbroker
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaTiktok className="text-[#FFCB74]" />
              <a href="https://tiktok.com/@becoz" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">
                @becoz
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#FFCB74]" />
              <span className="text-lg">Bole, Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </motion.div>

        {/* Right Form Section */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1C1C1C] border border-[#FFCB74]/20 p-8 rounded-xl shadow-xl space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
              placeholder="Your name"
              spellCheck="false"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
              placeholder="you@example.com"
              spellCheck="false"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 font-semibold">Phone</label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
              placeholder="your phone number"
              spellCheck="false"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
              placeholder="Write your message"
              spellCheck="false"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#FFCB74] text-black font-bold px-6 py-3 rounded shadow-md transition duration-300 
             hover:bg-[#ffd990] hover:scale-105 hover:shadow-[0_4px_20px_rgba(255,203,116,0.4)]"
          >
            Send Message
          </button>

        </motion.form>
      </div>
    </section>
  );
}