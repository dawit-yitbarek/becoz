import React, { useState } from 'react';
import api from '../components/Api';
import UploadSingleImage from '../components/UploadSingleImage';
import UploadMultipleImages from '../components/UploadMultipleImages';
import ManageProperties from '../components/ManageProperties';
import AddFeedback from '../components/AddFeedback';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const images = ['https://images.unsplash.com/photo-1598228723793-52759bba239c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww', 'https://media.istockphoto.com/id/2155879397/photo/house-in-a-charming-neighborhood-with-stunning-sidewalk-landscaping.webp?a=1&b=1&s=612x612&w=0&k=20&c=LlqEpFyrJBmSZ8v3CshnYJo9X00p8Y7wGv3mIDNqpZ4=', 'https://media.istockphoto.com/id/2186926540/photo/modern-single-story-house-with-landscaped-yard-at-dusk.webp?a=1&b=1&s=612x612&w=0&k=20&c=2cY2NqkCHhROWAIq0n7oR2wxGkVmAkYo20SYUnd2uEA=', 'https://media.istockphoto.com/id/2175973016/photo/modern-luxury-home-exterior-at-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=B2e-gEujpM7UNHX3uMHqvyh_bHC5sHFYfxf0ldEc6R0=']

export default function AdminPanel() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'sale',
        price: '',
        address: '',
        features: '',
        main_img: '',
        img_collection: images,
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [resetUploadImage, setResetUploadImage] = useState(0);
    const [refreshPropety, setRefreshPropety] = useState(0);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitError(false);
            setSubmitSuccess(false);
            setSubmitting(true);
            const featuresArray = formData.features.split(',').map(f => f.trim());
            const payload = { ...formData, features: featuresArray };
            await api.post(`${BackendUrl}/addProperty`, payload);
            setFormData({
                title: '',
                description: '',
                type: 'sale',
                price: '',
                address: '',
                features: '',
                main_img: '',
                img_collection: images,
            });
            setResetUploadImage(prev => prev + 1); // Reset image upload components
            setSubmitSuccess(true);
            setRefreshPropety(prev => prev + 1); // Trigger refresh for ManageProperties
        } catch (err) {
            setSubmitError(true);
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };
    //  py-20
    return (
        <section className="min-h-screen bg-[#111] pt-[72px] text-white font-[Poppins] px-6">
            <div className="max-w-3xl mt-5 mx-auto bg-[#1A1A1A] p-8 rounded-xl border border-[#FFCB74]/20 shadow-lg">
                <h2 className="text-3xl font-bold text-[#FFCB74] mb-8 text-center">Admin Panel: Add Property</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-[#FFCB74]"
                        >
                            <option value="sale">For Sale</option>
                            <option value="rent">For Rent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-2">price (ETB)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Features (comma separated)</label>
                        <input
                            type="text"
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Description</label>
                        <textarea
                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                            required>

                        </textarea>
                    </div>
                    <UploadSingleImage setImageUrl={(url) => setFormData({ ...formData, main_img: url })} resetTrigger={resetUploadImage} />
                    <UploadMultipleImages setImageUrls={(urls) => setFormData({ ...formData, img_collection: urls })} resetTrigger={resetUploadImage} />

                    {submitError && (
                        <p className="text-red-500 text-md mt-2">
                            Error submitting property. Please try again.
                        </p>
                    )}

                    {submitSuccess && (
                        <p className="text-green-500 text-md mt-2">
                            Property submitted successfully!
                        </p>
                    )}


                    <button
                        disabled={submitting}
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#FFCB74] to-[#ffb55d] text-black font-bold py-2 rounded-full hover:scale-105 transition duration-300"
                    >
                        {submitting ? 'Submitting...' : 'Submit Property'}
                    </button>
                </form>
            </div>

            {/* Add Feedback Section */}
            <AddFeedback />

            {/* Manage Properties Section */}
            <ManageProperties refreshOnAddProperty={refreshPropety}/>
        </section>
    );
}