import React, { useState } from 'react';
import api from '../components/Api';
import UploadSingleImage from './UploadSingleImage';
import UploadMultipleImages from './UploadMultipleImages';

export default function EditPropertyModal({ property, onClose, refresh }) {
  const [formData, setFormData] = useState({
    title: property.title,
    description: property.description,
    type: property.type,
    price: property.price,
    address: property.address,
    features: property.features || [],
    main_img: property.main_img,
    img_collection: property.img_collection || [],
  });
  const [saving, setSaving] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const [newFeature, setNewFeature] = useState('');

  const handleUpdate = async (id) => {
    try {
      setUpdateError(false);
      setSaving(true);
      await api.put(`/api/properties/update-property`, formData, { params: { id } });
      refresh();
    } catch (err) {
      console.error('Failed to update property:', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
      <div className="bg-[#121212] w-full max-w-3xl p-6 rounded-lg relative text-white overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-[#FFCB74] mb-4">Edit Property</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            className="bg-[#1F1F1F] text-white p-2 rounded border border-[#FFCB74]/40"
          />
          <textarea
            rows="5"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
            className="bg-[#1F1F1F] text-white p-2 rounded border border-[#FFCB74]/40"
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="bg-[#1F1F1F] text-white p-2 rounded border border-[#FFCB74]/40"
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>

          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="Price"
            className="bg-[#1F1F1F] text-white p-2 rounded border border-[#FFCB74]/40"
          />
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Address"
            className="bg-[#1F1F1F] text-white p-2 rounded border border-[#FFCB74]/40"
          />

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold mb-1">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add feature"
                className="flex-1 bg-[#1F1F1F] text-white p-2 rounded border border-[#FFCB74]/40"
              />
              <button
                type="button"
                onClick={() => {
                  if (newFeature.trim()) {
                    setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
                    setNewFeature('');
                  }
                }}
                className="bg-[#FFCB74] text-black px-4 rounded font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-[#2F2F2F] text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {feat}
                  <button
                    className="text-red-400 font-bold"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        features: formData.features.filter((_, i) => i !== idx),
                      })
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <UploadSingleImage setImageUrl={(url) => setFormData({ ...formData, main_img: url })} />

          {/* Image Collection */}
          <UploadMultipleImages setImageUrls={(urls) => setFormData({ ...formData, img_collection: urls })} />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            disabled={saving}
            onClick={() => { handleUpdate(property.id) }}
            className="bg-[#FFCB74] text-black font-semibold px-6 py-2 rounded hover:brightness-105"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {updateError && (
          <p className="text-red-500 mt-2 text-center text-md">
            An error occurred while updating the property. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}