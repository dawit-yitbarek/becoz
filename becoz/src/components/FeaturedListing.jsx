import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from '../components/Api';
import { format } from 'date-fns';
import { SkeletonListing } from "./SkeletonComponents";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function FeaturedListing() {
    const [featuredListings, setFeaturedListings] = useState([]);
    const [restartFetch, setRestartFetch] = useState({ retry: 0, retryCount: 0 });

    useEffect(() => {
        async function fetchFeaturedListings() {
            try {
                const response = await api.get(`${BackendUrl}/getFeaturedListing`);
                setFeaturedListings(response.data);
                setRestartFetch(() => ({ retry: 0, retryCount: 0 }));
            } catch (error) {
                console.error("Error fetching featured listings:", error);
                if (restartFetch.retryCount < 6) {
                    setTimeout(() => {
                        setRestartFetch(prev => ({
                            retry: prev.retry + 1,
                            retryCount: prev.retryCount + 1
                        }));
                    }, 5000);
                }
            }
        }

        fetchFeaturedListings();
    }, [restartFetch.retry]);

    const placeholderArray = new Array(3).fill(null);

    return (
        <section className="bg-gradient-to-b from-[#111111] to-[#1C1C1C] py-20 px-6 text-[#A0A0A0] font-[Poppins]">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-4xl font-bold mb-14 text-center text-white">Featured Listings</h3>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredListings.length > 0 && featuredListings[0]?.title ?
                        featuredListings.map((property, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                                loading="lazy"
                                className="rounded-2xl overflow-hidden shadow-md bg-[#1A1A1A] border border-[#2F2F2F] hover:shadow-[0_0_20px_2px_rgba(255,203,116,0.3)] transition-shadow duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={property.main_img}
                                        alt={`House`}
                                        className="w-full h-60 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-4 right-4 bg-[#FFCB74] text-[#111] text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                        For {property.type}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xl font-bold mb-2 text-white">{property.title}</h4>
                                        <p className="text-sm mb-4 text-[#C0C0C0]">{property.features.join(", ")}</p>
                                        <p className="text-[#FFCB74] font-semibold mb-4">
                                            {Number(property.price).toLocaleString()}{property.type === 'rent' ? '/month' : ''}
                                            <span className="text-[#FFFFFF] font-semibold text-md tracking-wide uppercase"> ETB </span>
                                        </p>
                                        <Link
                                            to={`/properties?id=${property.id}`}
                                            className="text-[#FFCB74] font-semibold hover:underline transition duration-200"
                                        >
                                            View Details →
                                        </Link>
                                    </div>

                                    <div className="text-xs text-[#FFCB74] mt-4 self-end">
                                        {format(new Date(property.posted_at), 'MMM dd, yyyy')}
                                    </div>
                                </div>
                            </motion.div>
                        )) :
                        placeholderArray.map((_, idx) => <SkeletonListing key={idx} />)
                    }
                </div>
            </div>
        </section>
    );
}