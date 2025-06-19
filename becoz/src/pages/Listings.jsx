import React, { useState, useEffect } from 'react';
import { motion, time } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../components/Api';
import { format } from 'date-fns';
import MainFeatured from '../components/MainFeatured';
import { SkeletonListing } from '../components/SkeletonComponents';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Listings() {
  const [allListings, setAllListings] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [restartFetch, setRestartFetch] = useState({ retry: 0, retryCount: 0 });

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await api.get(`${BackendUrl}/getProperties`);
        setAllListings(response.data);
        setRestartFetch(() => ({ retry: 0, retryCount: 0 }));
      } catch (error) {
        console.error("Error fetching properties:", error);
        if (restartFetch.retryCount < 5) {
          setTimeout(() => {
            setRestartFetch(prev => ({
              retry: prev.retry + 1,
              retryCount: prev.retryCount + 1
            }));
          }, 5000);
        };
      }
    };
    getProperties();
  }, [restartFetch.retry]);


  const filteredListings = allListings
    .filter((listing) =>
      filterType === 'all' ? true : listing.type === filterType
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const placeholderArray = new Array(6).fill(null);

  return (
    <div className="pt-[72px]">
      <section className="min-h-screen pb-5 bg-[#111] text-white font-[Poppins]">
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
              {filteredListings.length > 0 && filteredListings[0]?.title ?
                filteredListings.map((listing, idx) => (
                  <motion.div
                    key={listing.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl overflow-hidden shadow-md bg-[#1A1A1A] border border-[#2F2F2F] hover:shadow-[0_0_20px_2px_rgba(255,203,116,0.3)] transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={listing.main_img}
                        alt="house"
                        className="w-full h-60 object-cover"
                        loading={idx > 3 ? "lazy" : "eager"}
                      />
                      <div className="absolute bottom-4 right-4 bg-[#FFCB74] text-[#111] text-sm font-semibold px-3 py-1 rounded-full shadow-md capitalize">
                        For {listing.type}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-white">{listing.title}</h4>
                        <p className="text-sm mb-3 text-[#C0C0C0]">{listing.features.join(", ")}</p>
                        <p className="text-[#FFCB74] font-semibold mb-4">
                          {Number(listing.price).toLocaleString()}{listing.type === 'rent' ? '/month' : ''}
                          <span className="text-[#FFFFFF] font-semibold text-md tracking-wide uppercase"> ETB </span>
                        </p>
                        <Link
                          to={`/properties?id=${listing.id}`}
                          className="text-[#FFCB74] font-semibold hover:underline transition duration-200"
                        >
                          View Details →
                        </Link>
                      </div>

                      <div className="text-xs text-[#FFCB74] mt-4 self-end">
                        {format(new Date(listing.posted_at), 'MMM dd, yyyy')}
                      </div>

                    </div>

                  </motion.div>
                ))
                :
                placeholderArray.map((_, idx) => <SkeletonListing key={idx} />)
              }
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <MainFeatured />

      </section>
    </div>
  );
}