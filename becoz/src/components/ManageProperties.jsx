import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../components/Api';
import EditPropertyModal from './EditPropertyModal';
import DeletePropertyModal from './DeletePropertyModal';
import ChangeAdminPassword from './ChangeAdminPassword';
import AddFeedback from './AddFeedback';
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ManageProperties({ refreshOnAddProperty }) {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [logoutError, setLogoutError] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/getProperties');
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, [refreshFlag, refreshOnAddProperty]);

  const handlePropertyDeleted = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const logOut = async () => {
    try {
      setLogoutError('');
      setLoading(true);
      await api.post(`${BackendUrl}/admin-logout`);
      navigate('/');
    } catch (err) {
      setLogoutError('Failed to log out. Please try again.');
      console.error('Error logging out:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-[#FFCB74] text-center">Manage Properties</h2>

      <div className="grid gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-[#1F1F1F] p-5 rounded-xl border border-[#FFCB74]/20 shadow-lg hover:shadow-[#FFCB74]/10 transition duration-300 flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <div className="w-full sm:w-auto">
              {property.main_img && (
                <img
                  src={property.main_img}
                  alt="Main"
                  className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-md border border-[#2F2F2F]"
                />
              )}
            </div>


            <div className="flex-1 space-y-1">
              <h3 className="text-xl text-white font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-400">{property.type}</p>
              <p className="text-sm text-[#FFCB74] font-semibold">
                {Number(property.price).toLocaleString()}{property.type === 'rent' ? '/month' : ''} 
                <span className="text-[#FFFFFF] font-semibold text-md tracking-wide uppercase"> ETB </span>
              </p>
              <p className="text-sm text-gray-400">{property.address}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:ml-4">
              <button
                onClick={() => setSelectedProperty(property)}
                className="px-4 py-2 bg-[#FFCB74] text-black font-medium rounded hover:brightness-110 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => setPropertyToDelete(property)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <EditPropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          refresh={() => {
            setRefreshFlag((prev) => prev + 1);
            setSelectedProperty(null);
          }}
        />
      )}

      {propertyToDelete && (
        <DeletePropertyModal
          property={propertyToDelete}
          onClose={() => setPropertyToDelete(null)}
          refresh={() => setRefreshFlag((prev) => prev + 1)}
        />
      )}

      <div className="my-12">
        <ChangeAdminPassword />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={logOut}
          disabled={loading}
          className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 hover:scale-105 transition duration-200"
        >
          {loading ? 'Logging out...' : 'Log Out'}
        </button>
      </div>

      {logoutError && (
        <p className="mt-4 text-center text-red-500 text-sm">{logoutError}</p>
      )}
    </div>
  );
};