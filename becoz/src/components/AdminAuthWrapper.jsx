import React, { useState, useEffect } from 'react';
import api from '../components/Api';
import ShowPassword from './ShowPassword';

export default function AdminAuthWrapper({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if admin is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/api/admin/check-admin-auth');
        setIsVerified(res.data?.authenticated);
      } catch (err) {
        console.error(err.message);
        setIsVerified(false);
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handleVerify = async () => {
    try {
      setError('');
      setVerifying(true);
      await api.post('/api/admin/verify-admin', { password });
      setIsVerified(true);
    } catch (err) {
      console.error(err.message);
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };


  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
        <p>Checking admin authentication...</p>
      </div>
    );
  }

  // If authenticated
  if (isVerified) return children;

  // If not authenticated
  return (
    <div className="fixed inset-0 bg-[#0F0F0F] flex items-center justify-center overflow-hidden z-40">
      <div className="p-6 rounded-lg border border-[#FFCB74]/40 bg-[#1F1F1F] w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-[#FFCB74]">Admin Access</h2>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-2 pr-10 rounded bg-[#121212] border border-[#FFCB74]/30 text-white"
          />
          <ShowPassword
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          disabled={verifying || !password}
          onClick={handleVerify}
          className="w-full bg-[#FFCB74] text-black font-semibold py-2 rounded hover:brightness-110"
        >
          {verifying ? 'Verifying...' : 'Verify Admin'}
        </button>
      </div>
    </div>
  );
};