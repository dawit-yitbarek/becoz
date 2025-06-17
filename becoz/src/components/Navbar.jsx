import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-[72px] bg-[#1B1B1B] text-[#F6F6F6] shadow-[0_4px_10px_rgba(0,0,0,0.4)] border-b border-[#2F2F2F] fixed top-0 left-0 w-full z-50 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo/becoz.svg" alt="Becoz Logo" className="h-25 md:h-25 object-contain" />
        </Link>



        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link to="/" className="hover:text-[#FFCB74] transition duration-300 font-medium">Home</Link>
          </li>
          <li>
            <Link to="/listings" className="hover:text-[#FFCB74] transition duration-300 font-medium">Listings</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#FFCB74] transition duration-300 font-medium">Contact</Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#FFCB74] text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-[#1B1B1B] border-t border-[#2F2F2F]">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#FFCB74] transition font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/listings"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#FFCB74] transition font-medium"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#FFCB74] transition font-medium"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}