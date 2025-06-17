import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTelegramPlane, FaTiktok, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import api from '../components/Api';
const BackendUrl = import.meta.env.VITE_BACKEND_URL;


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);
    try {
      await api.post(`${BackendUrl}/sendMessage`, formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    };

    console.log('Form submitted:', formData);

  }

  return (
    <div className="pt-[72px]">
      <section className="min-h-screen px-4 py-15 bg-[#111111] text-[#F6F6F6] font-[Poppins]">
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
              Have questions or want to schedule a visit ? Reach out to us!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#FFCB74]" />
                <a href="tel:+251912345678" className="text-lg hover:underline">
                  +251 912 345 678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#FFCB74]" />
                <a href="mailto:becoz@gmail.com" className="text-lg hover:underline">
                  becoz@gmail.com
                </a>
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
                <FaInstagram className="text-[#FFCB74]" />
                <a href="https://instagram.com/becoz" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline">
                  becoz
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1C1C1C] border border-[#FFCB74]/20 p-8 rounded-xl shadow-xl space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
                placeholder="Your name"
                spellCheck="false"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
                placeholder="you@example.com"
                spellCheck="false"
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 font-semibold">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
                placeholder="your phone number"
                spellCheck="false"
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
              <textarea
                id="message"
                rows="4"
                name='message'
                value={formData.message}
                className="w-full px-4 py-3 rounded bg-[#111111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB74]"
                placeholder="Write your message"
                spellCheck="false"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {submitSuccess && (
              <p className="mt-2 text-green-500 text-md">Message sent successfully!</p>
            )}

            {submitError && (
              <p className="mt-2 text-red-500 text-md">Error sending message. Please try again.</p>
            )}

            <button
              disabled={submitting}
              type="submit"
              className="bg-[#FFCB74] text-black font-bold px-6 py-3 rounded shadow-md transition duration-300 
             hover:bg-[#ffd990] hover:scale-105 hover:shadow-[0_4px_20px_rgba(255,203,116,0.4)]"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

          </motion.form>

        </div>
      </section>
    </div>
  );
}