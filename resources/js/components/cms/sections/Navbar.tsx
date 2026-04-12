import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    data: {
        links: Array<{ title: string; url: string }>;
    };
}

const Navbar: React.FC<NavbarProps> = ({ data }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'py-6 bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="text-2xl font-black text-blue-600 tracking-tight flex items-center">
                    <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mr-2 shadow-lg shadow-blue-200">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
                        </svg>
                    </span>
                    PetStore
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10">
                    {data.links.map((link, i) => (
                        <a 
                            key={i} 
                            href={link.url} 
                            className={`font-medium transition-colors hover:text-blue-600 ${
                                scrolled ? 'text-gray-700' : 'text-gray-900'
                            }`}
                        >
                            {link.title}
                        </a>
                    ))}
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                        Shop Now
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-gray-700"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col space-y-4">
                            {data.links.map((link, i) => (
                                <a 
                                    key={i} 
                                    href={link.url} 
                                    className="text-lg font-medium text-gray-700 hover:text-blue-600"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
