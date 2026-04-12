import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
    data: {
        title: string;
        subtitle: string;
        image: string;
        button: {
            text: string;
            url: string;
        }
    };
}

const HeroSection: React.FC<HeroProps> = ({ data }) => {
    return (
        <section className="relative h-[80vh] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={data.image} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md"
                    >
                        {data.title}
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-100 mb-8 max-w-lg leading-relaxed"
                    >
                        {data.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <a 
                            href={data.button.url}
                            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 bg-blue-600 hover:bg-blue-700"
                        >
                            {data.button.text}
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
};

export default HeroSection;
