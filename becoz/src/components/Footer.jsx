import React from "react";
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="bg-[#0D0D0D] text-[#DCDCDC] pt-16 pb-10 px-6 font-[Poppins] border-t border-[#FFCB74]/20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo + Description */}
                <div>
                    <h1 className="text-2xl font-bold text-white mb-4">Becoz</h1>
                    <p className="text-sm leading-relaxed text-[#A0A0A0]">
                        Connecting people with premium properties across Addis Ababa. Trusted listings, expert agents, and seamless deals.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-[#FFCB74] transition">Home</Link></li>
                        <li><Link to="/listings" className="hover:text-[#FFCB74] transition">Listings</Link></li>
                        <li><Link to="/contact" className="hover:text-[#FFCB74] transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li><span className="cursor-default hover:text-[#FFCB74] transition">Property Sales</span></li>
                        <li><span className="cursor-default hover:text-[#FFCB74] transition">Renting</span></li>
                        <li><span className="cursor-default hover:text-[#FFCB74] transition">Agent Support</span></li>
                        <li><span className="cursor-default hover:text-[#FFCB74] transition">Home Valuation</span></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
                    <p className="text-sm text-[#A0A0A0] mb-2">Addis Ababa, Ethiopia</p>
                    <p className="text-sm text-[#A0A0A0] mb-2">Email: 
                        <a href="mailto:becoz@gmail.com" className="hover:underline"> becoz@gmail.com </a>
                    </p>
                    <p className="text-sm text-[#A0A0A0]">Phone: 
                        <a href="tel:+251912345678" className="hover:underline"> +251 912 345 678 </a>
                    </p>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="border-t border-[#2F2F2F] mt-12 pt-6 text-center text-sm text-[#888]">
                © {new Date().getFullYear()} <span className="text-white font-semibold">Becoz</span>. All rights reserved.
            </div>
        </footer>
    )
};

export default Footer;