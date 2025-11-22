import React from 'react';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import NotFound from './pages/Notfound';
import Ping from './components/Ping';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetails from './pages/Details';
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer';


const App = () => {


    return (
        <Router>
            <div className="bg-black text-white min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ping" element={<Ping />} />
                    <Route path="/properties" element={<PropertyDetails />} />
                    <Route path="/admin" element={<ProtectedAdminRoute />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};


export default App;
