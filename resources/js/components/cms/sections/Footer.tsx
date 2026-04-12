import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
    data: {
        columns: Array<{
            title: string;
            links: Array<{ title: string; url: string }>;
        }>;
        social: Array<{ icon: string; url: string }>;
    };
}

const Footer: React.FC<FooterProps> = ({ data }) => {
    return (
        <footer className="bg-gray-950 text-white pt-24 pb-12 overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16 relative z-10">
                    {/* Brand Info */}
                    <div className="flex flex-col space-y-6">
                        <a href="/" className="text-3xl font-black text-blue-500 tracking-tight flex items-center">
                            <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white mr-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
                                </svg>
                            </span>
                            PetStore
                        </a>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Your one-stop destination for everything your pets need. Quality products and care for your best friends.
                        </p>
                        <div className="flex space-x-6">
                            {data.social.map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.url} 
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:bg-blue-600 hover:scale-110 active:scale-95"
                                >
                                    <span className="sr-only">{item.icon}</span>
                                    {/* Simplified icons for demo */}
                                    <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {data.columns.map((column, i) => (
                        <div key={i} className="flex flex-col space-y-6">
                            <h4 className="text-xl font-bold uppercase tracking-wider text-gray-400 italic">
                                {column.title}
                            </h4>
                            <ul className="flex flex-col space-y-4">
                                {column.links.map((link, j) => (
                                    <li key={j}>
                                        <a href={link.url} className="text-gray-400 hover:text-white transition-colors text-lg">
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter (Dynamic Suggestion) */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-wider text-gray-400 italic">Newsletter</h4>
                        <p className="text-gray-400 text-lg">Join our community and get exclusive offers!</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="name@email.com" 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-gray-600"
                            />
                            <button className="absolute right-2 top-2 h-10 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                                Go!
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 font-medium">
                    <p>© 2026 PetStore CMS. All rights reserved.</p>
                    <div className="flex space-x-10 mt-6 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2" />
        </footer>
    );
};

export default Footer;
