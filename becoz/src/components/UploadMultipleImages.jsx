import React, { useRef, useState } from 'react';
import api from '../components/Api';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function UploadMultipleImages({ setImageUrls }) {
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const fileInputRef = useRef(null);

    const handleMultipleUpload = async (e) => {
        const files = Array.from(e.target.files);

        if (!files) {
            setPreviews(null);
            setUploadSuccess(false);
            return;
        }

        setPreviews(files.map((file) => URL.createObjectURL(file)));

        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        try {
            setUploading(true);
            setUploadError(false);

            const res = await api.post(`${BackendUrl}/upload-multiple`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setImageUrls(res.data.urls);
            setUploadSuccess(true);
        } catch (err) {
            console.error(err);
            fileInputRef.current.value = ''; // Reset file input
            setPreviews([]); // Clear previews
            setUploadSuccess(false);
            setUploadError(true);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm mb-2">Additional Images</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleUpload}
                ref={fileInputRef}
                className="bg-[#1F1F1F] text-white px-4 py-2 border border-[#FFCB74]/40 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFCB74] file:text-black hover:file:brightness-105 transition duration-300"
                required
            />
            <div className="flex gap-2 mt-2 flex-wrap">
                {previews && uploadSuccess && (
                    previews.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Preview ${index}`}
                            className="w-24 h-20 object-cover rounded border border-[#2F2F2F]"
                        />
                    ))
                )}
            </div>
            {uploading && <p className="text-center text-[#FFCB74] text-md mt-2">Uploading images...</p>}
            {uploadError && <p className="text-center text-red-500 text-md mt-2">Failed to upload image</p>}
        </div>
    );
}