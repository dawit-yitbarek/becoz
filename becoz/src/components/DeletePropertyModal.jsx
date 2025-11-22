import React, { useState } from 'react';
import api from '../components/Api';

export default function DeletePropertyModal({ property, onClose, refresh }) {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const handleDelete = async () => {

        try {
            setDeleteError(false);
            setDeleting(true);
            await api.delete(`/api/properties/deleteProperty`, { params: { id: property.id } });
            refresh();
            onClose();
        } catch (err) {
            setDeleteError(true);
            console.error('Error deleting property:', err.message);
        } finally {
            setDeleting(false);
        };
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-md border border-[#FFCB74]/40 text-white w-[90%] max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-[#FFCB74]">Confirm Deletion</h3>
                <p className="mb-6">
                    Are you sure you want to delete <strong>{property?.title}</strong>?
                </p>

                {deleteError && (
                    <p className="text-red-500 mb-3">
                        Failed to delete the property. Please try again.
                    </p>
                )}

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-[#FFCB74] text-[#FFCB74] rounded hover:bg-[#FFCB74]/10"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={deleting}
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}