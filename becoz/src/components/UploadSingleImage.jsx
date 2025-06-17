import React, { useRef, useState } from 'react';
import api from './Api';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function UploadSingleImage(props) {
  const [preview, setPreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
    setPreview(null);
    setUploadSuccess(false);
    return;
  }

    setPreview(URL.createObjectURL(file)); // Show preview
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadError(false);
      setUploading(true);
      const res = await api.post(`${BackendUrl}/upload-single`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      props.setImageUrl(res.data.url); // Save Cloudinary URL
      setUploadSuccess(true);
    } catch (error) {
      fileInputRef.current.value = ''; // Reset file input
      setPreview(null); // Clear preview
      setUploadSuccess(false);
      setUploadError(true);
      console.error('Error uploading image:', error);
    }finally {
      setUploading(false);
    }

  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <label className="text-sm mb-2">Property Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="bg-[#1F1F1F] text-white px-4 py-2 border border-[#FFCB74]/40 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFCB74] file:text-black hover:file:brightness-105 transition duration-300"
        required
      />
      {preview && uploadSuccess && (
        <img
          src={preview}
          alt="Preview"
          className="w-48 h-32 object-cover rounded-lg mt-2 border border-[#2F2F2F]"
        />
      )}

      {uploading && (
        <p className="text-center text-[#FFCB74] text-md mt-2">Uploading image...</p>
      )}

      {uploadError && (
        <p className="text-center text-red-500 text-md mt-2">Failed to upload image</p>
      )}


    </div>
  );
};