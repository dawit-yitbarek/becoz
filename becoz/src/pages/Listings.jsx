import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Listings() {
  const allListings = [
    {
      id: 1,
      title: 'Luxury Apartment in Addis Ababa',
      desc: '3 Bed, 2 Bath, 1640 sq.ft.',
      img: '/img/listing1.jpg',
      type: 'sale',
      price: 250000,
    },
    {
      id: 2,
      title: 'Cozy Family Home',
      desc: '4 Bed, 3 Bath, Large Garden',
      img: '/img/listing2.jpg',
      type: 'rent',
      price: 1200,
    },
    {
      id: 3,
      title: 'Modern Studio Apartment',
      desc: '1 Bed, 1 Bath, City View',
      img: '/img/listing3.jpg',
      type: 'sale',
      price: 150000,
    },
  ];

  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  const filteredListings = allListings
    .filter((listing) =>
      filterType === 'all' ? true : listing.type === filterType
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <section className="min-h-screen pb-5 mt-16 bg-[#111] text-white font-[Poppins]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a1a] to-[#111] py-10 px-6 text-center flex flex-col items-center justify-center h-[200px]">
        <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FFCB74] to-[#ffb55d]">
          Find Your Dream Property
        </h2>
        <p className="text-lg text-gray-300">Premium listings in Addis Ababa</p>
      </section>


      {/* Filter Bar */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#111111] py-8 px-6 border-y border-[#2f2f2f] shadow-inner flex flex-col md:flex-row items-center justify-center gap-4 rounded-md">
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
          className="bg-[#1F1F1F] text-[#FFCB74] px-5 py-2 rounded-lg border border-[#FFCB74]/40 focus:outline-none hover:shadow-[0_0_10px_rgba(255,203,116,0.3)] transition duration-300"
        >
          <option value="all" className="text-white">All</option>
          <option value="sale" className="text-white">For Sale</option>
          <option value="rent" className="text-white">For Rent</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="bg-[#1F1F1F] text-[#FFCB74] px-5 py-2 rounded-lg border border-[#FFCB74]/40 focus:outline-none hover:shadow-[0_0_10px_rgba(255,203,116,0.3)] transition duration-300"
        >
          <option value="default" className="text-white">Sort by Cost</option>
          <option value="asc" className="text-white">Low to High</option>
          <option value="desc" className="text-white">High to Low</option>
        </select>
      </div>


      {/* Listings */}
      <section className="py-20 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-md bg-[#1A1A1A] border border-[#2F2F2F] hover:shadow-[0_0_20px_2px_rgba(255,203,116,0.3)] transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={listing.img}
                    alt={listing.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#FFCB74] text-[#111] text-sm font-semibold px-3 py-1 rounded-full shadow-md capitalize">
                    For {listing.type}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-white">{listing.title}</h4>
                  <p className="text-sm mb-3 text-[#C0C0C0]">{listing.desc}</p>
                  <p className="text-[#FFCB74] font-semibold mb-4">
                    ${listing.price.toLocaleString()}
                  </p>
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

      {/* Featured Section */}
      <section className="my-20 bg-gradient-to-br from-[#1a1a1a] to-[#111] p-8 rounded-xl border border-[#FFCB74]/30 shadow-lg max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-[#FFCB74] mb-6">🔥 Featured Property</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/img/hero10.jpg"
            alt="Featured"
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div>
            <h4 className="text-xl font-semibold text-white mb-2">Skyline Penthouse</h4>
            <p className="text-gray-400 mb-4">
              Top-floor city views, modern interiors, and private elevator access.
            </p>
            <button className="bg-gradient-to-r from-[#FFCB74] to-[#ffb55d] text-black px-5 py-2 rounded-full font-bold hover:scale-105 transition duration-300">
              Explore Now
            </button>
          </div>
        </div>
      </section>

    </section>
  );
}