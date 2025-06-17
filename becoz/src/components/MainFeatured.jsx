import React, {useState, useEffect} from "react";
import api from "../components/Api";
import { useNavigate } from 'react-router-dom'

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function MainFeatured() {
    const [mainFeatured, setMainFeatured] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchFeaturedListings = async () => {
        try {
            const response = await api.get(`${BackendUrl}/getFeaturedListing`);
            setMainFeatured(response.data[0]);
            console.log("response sent", response.data[0]);
        } catch (error) {
            console.error("Error fetching featured listings:", error);
        }
        };
        fetchFeaturedListings();
    }, []);

    const navigateToDetails = (id) => {
        navigate(`/properties?id=${id}`);
    }
    
    return (
       <section className="my-20 bg-gradient-to-br from-[#1a1a1a] to-[#111] p-8 rounded-xl border border-[#FFCB74]/30 shadow-lg max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-[#FFCB74] mb-6">🔥 Featured Property</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={mainFeatured.main_img}
            alt="Featured"
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div>
            <h4 className="text-xl font-semibold text-white mb-2">{mainFeatured.title}</h4>
            <p className="text-gray-400 mb-4">
              {mainFeatured.features?.join(", ")}
            </p>
            <button 
            onClick={() => navigateToDetails(mainFeatured.id)} 
            className="bg-gradient-to-r from-[#FFCB74] to-[#ffb55d] text-black px-5 py-2 rounded-full font-bold hover:scale-105 transition duration-300">
              Explore Now
            </button>
          </div>
        </div>
      </section>
    );
    }