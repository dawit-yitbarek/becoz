import React, { useState } from "react";
import api from "./Api";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AddFeedback() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitError(false);
            setSubmitSuccess(false);
            setSubmitting(true);
            const payload = { name, message };
            await api.post(`${BackendUrl}/addFeedback`, payload);
            setName('');
            setMessage('');
            setSubmitSuccess(true);
        } catch (err) {
            setSubmitError(true);
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="max-w-3xl my-20 mx-auto bg-[#1A1A1A] p-8 rounded-xl border border-[#FFCB74]/20 shadow-lg">
            <h2 className="text-3xl font-bold text-[#FFCB74] mb-8 text-center">Admin Panel: Add Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block text-sm mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Message</label>
                    <textarea
                        rows="3"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#111] border border-[#FFCB74]/30 px-4 py-2 rounded-md text-white"
                        required
                    >

                    </textarea>
                </div>

                <button
                    disabled={submitting}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FFCB74] to-[#ffb55d] text-black font-bold py-2 rounded-full hover:scale-105 transition duration-300"
                >
                    {submitting ? 'Submitting...' : 'Submit feedback'}
                </button>
            </form >

            {submitSuccess && (
                <div className="mt-4 text-green-500 text-center">
                    Feedback submitted successfully!
                </div>
            )}

            {submitError && (
                <div className="mt-4 text-red-500 text-center">
                    Error submitting feedback. Please try again.
                </div>
            )}
        </div >
    );
};