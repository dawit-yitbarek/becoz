import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import TestimonialSection from '../components/Testimonial';


export default function Home() {


  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src="/img/hero10.jpg"
          alt="Luxury house"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex items-center justify-center h-full px-4 text-center"
        >
          <div className="bg-[#111111]/50 p-8 md:p-10 rounded-xl max-w-2xl shadow-2xl border border-[#2F2F2F]">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-wide">
              Find Your Perfect Home
            </h2>
            <p className="text-lg mb-6 text-[#A0A0A0]">
              Premium properties for rent and sale in Addis Ababa.
            </p>
            <Link
              to="/listings"
              className="inline-block bg-[#FFCB74] text-[#111111] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md hover:scale-105"
            >
              Browse Listings
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#111111] text-[#A0A0A0] py-16 px-6 font-[Poppins]">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12 text-white">Why Choose Becoz?</h3>
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-white">Verified Properties</h4>
              <p>All listings are reviewed and verified to ensure trust and accuracy.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-white">Expert Agents</h4>
              <p>Our agents are experienced, responsive, and ready to guide you.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-white">Transparent Deals</h4>
              <p>No hidden fees. Clear communication. Secure transactions.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Listings */}
      <section className="bg-gradient-to-b from-[#111111] to-[#1C1C1C] py-20 px-6 text-[#A0A0A0] font-[Poppins]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold mb-14 text-center text-white">Featured Listings</h3>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-md bg-[#1A1A1A] border border-[#2F2F2F] hover:shadow-[0_0_20px_2px_rgba(255,203,116,0.3)] transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={`/img/listing${i}.jpg`}
                    alt={`Listing ${i}`}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#FFCB74] text-[#111] text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    For Sale
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-white">Modern Villa #{i}</h4>
                  <p className="text-sm mb-4 text-[#C0C0C0]">Luxurious, bright, and centrally located.</p>
                  <Link
                    to="/properties"
                    className="text-[#FFCB74] font-semibold hover:underline transition duration-200"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <TestimonialSection />


      {/* CTA */}
      < section className="relative bg-[#0D0D0D] text-white py-20 px-6 text-center font-[Poppins] overflow-hidden shadow-inner border-t border-[#FFCB74]/20" >
        {/* Glowing Circles */}
        < div className="absolute -top-24 -left-20 w-96 h-96 bg-[#FFCB74]/10 rounded-full blur-3xl z-0" ></div >
        <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#FFCB74]/10 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to Take the Next Step?
          </h3>
          <p className="mb-8 text-[#DCDCDC] text-lg md:text-xl">
            Let us help you find the perfect home or buyer with expert support and verified listings.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#FFCB74] text-[#111111] px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-[#FFCB74]/40 hover:scale-105 transition-all duration-300"
          >
            Contact Us Now
          </Link>
        </div>
      </section >
    </>
  );
}