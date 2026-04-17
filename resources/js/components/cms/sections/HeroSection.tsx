import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
    data: {
        title?: string;
        subtitle?: string;
        image?: string;
        image_pc?: string;
        image_mobile?: string;
        only_photo?: boolean;
        button?: {
            text: string;
            url: string;
        };
        // For compatibility with SectionEditor flat structure
        button_text?: string;
        button_link?: string;
    };
}

const HeroSection: React.FC<HeroProps> = ({ data }) => {
    const isOnlyPhoto = data.only_photo;
    
    // For compatibility with different naming conventions in the CMS
    const btnText = data.button?.text || data.button_text;
    const btnUrl = data.button?.url || data.button_link;

    return (
        <section className={`relative ${isOnlyPhoto ? 'w-full' : 'h-[60vh] md:h-[80vh] flex items-center overflow-hidden'}`}>
            {/* Background / Content Image */}
            <div className={isOnlyPhoto ? "w-full" : "absolute inset-0 z-0"}>
                <picture className="w-full">
                    {data.image_mobile && <source media="(max-width: 768px)" srcSet={data.image_mobile} />}
                    <img 
                        src={data.image_pc || data.image} 
                        alt={data.title || 'Hero'}
                        className={`w-full ${isOnlyPhoto ? 'h-auto block' : 'h-full object-cover'}`}
                    />
                </picture>
                {!isOnlyPhoto && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}
            </div>

            {!isOnlyPhoto && (
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl">
                        {data.title && (
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md"
                                dangerouslySetInnerHTML={{ __html: data.title }}
                            />
                        )}
                        
                        {data.subtitle && (
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg md:text-2xl text-gray-100 mb-8 max-w-lg leading-relaxed"
                            >
                                {data.subtitle}
                            </motion.p>
                        )}

                        {btnText && btnUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <a 
                                    href={btnUrl}
                                    className="inline-flex items-center px-8 py-3 md:py-4 bg-primary text-white rounded-full font-semibold text-lg transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 bg-blue-600 hover:bg-blue-700 font-display"
                                >
                                    {btnText}
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            {/* Decorative Elements */}
            {!isOnlyPhoto && <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />}
        </section>
    );
};

export default HeroSection;
