import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/img/listing1.jpg",
    "/img/listing2.jpg",
    "/img/listing3.jpg",
];


export default function DetailsPage() {
    const [index, setIndex] = useState(0);
    const { id } = useParams()
    const property = {
        id,
        title: 'Modern Luxury Villa',
        image: '/img/listing1.jpg',
        price: '$1,200,000',
        location: 'Bole, Addis Ababa',
        description:
            `This stunning modern villa features 4 bedrooms, 3 bathrooms, a private pool, and smart home technology.`,
        features: ['4 Bedrooms', '3 Bathrooms', 'Private Pool', '2-Car Garage', 'Smart Home'],
        status: 'For Sale',
    }

    const next = () => setIndex((prev) => (prev + 1) % images.length);
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <section className="bg-[#111] text-[#A0A0A0] font-[Poppins] py-30 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
                {/* Gallery Section */}
                <div className="relative rounded-xl overflow-hidden border border-[#2F2F2F] bg-[#1C1C1C]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={index}
                            src={images[index]}
                            alt={`House image ${index + 1}`}
                            initial={{ opacity: 0.3, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4 }}
                            className="w-full object-cover h-[360px] sm:h-[450px]"
                        />
                    </AnimatePresence>

                    {/* Left & Right Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1A1A] border border-[#FFCB74]/30 text-[#FFCB74] rounded-full hover:shadow-[0_0_10px_rgba(255,203,116,0.4)] transition duration-300 z-10"
                    >
                        ‹
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A1A1A] border border-[#FFCB74]/30 text-[#FFCB74] rounded-full hover:shadow-[0_0_10px_rgba(255,203,116,0.4)] transition duration-300 z-10"
                    >
                        ›
                    </button>
                </div>


                {/* Text Info */}
                <div>
                    <div className="mb-4 text-[#FFCB74] uppercase text-sm font-semibold">
                        {property.status}
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">{property.title}</h1>
                    <p className="text-xl font-semibold text-[#FFCB74] mb-2">{property.price}</p>
                    <p className="mb-6 text-sm text-[#C0C0C0]">{property.location}</p>
                    <p className="mb-6 text-[#B0B0B0] leading-relaxed">{property.description}</p>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-3">Features:</h3>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-[#D0D0D0]">
                            {property.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#FFCB74] inline-block" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>



                    <button className="bg-[#FFCB74] text-[#111] px-6 py-2 rounded font-semibold hover:shadow-[0_0_15px_rgba(255,203,116,0.5)] transition">
                        Contact Agent
                    </button>
                </div>
            </div>
        </section>
    );
}