import React from 'react';
import { motion } from 'framer-motion';

interface TextBlockProps {
    data: {
        title: string;
        content: string;
    };
}

const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                        {data.title}
                    </h2>
                    <div className="h-1.5 w-24 bg-blue-600 rounded-full mx-auto mb-12 shadow-sm" />
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                        {data.content}
                    </p>
                </motion.div>
            </div>

            {/* Subtle background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full translate-y-1/2 -translate-x-1/2 -z-0" />
        </section>
    );
};

export default TextBlock;
