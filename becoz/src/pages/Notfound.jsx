import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-[#FFCB74] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-[#B0B0B0] mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#FFCB74] text-[#111111] px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#ffd98f] hover:scale-105 shadow hover:shadow-lg"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
};