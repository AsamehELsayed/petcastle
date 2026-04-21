import GuestLayout from '@/layouts/guest-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Calendar, User, ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
];

export default function Index({ posts }: { posts: any }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="ecommerce-body">
            <Head title="Our Blog - PetCastle" />

            {/* Minimalist Mesh Hero Section */}
            <div className="relative pt-32 pb-32 md:pt-48 md:pb-48 bg-[#0F172A] text-white overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-400/10 blur-[100px] rounded-full" />
                </div>
                
                <div className="container relative z-10 mx-auto px-4 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative max-w-4xl w-full"
                    >
                        {/* Decorative Emblem */}
                        <div className="flex justify-center mb-10">
                            <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <BookOpen className="w-8 h-8 text-white relative z-10" />
                            </div>
                        </div>

                        {/* Centered Glass Card */}
                        <div className="glass-card bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-50" />
                            
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                    <Sparkles className="w-3 h-3" /> The PetCastle Journal
                                </div>
                                
                                <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-10 text-white drop-shadow-2xl">
                                    INSIGHTS FOR <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">ELITE PETS</span>
                                </h1>
                                
                                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed mb-0">
                                    Expert care techniques, breed chronicles, and the finer details of high-end pet companionship.
                                </p>
                            </div>
                            
                            {/* Accent Glows */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Breadcrumbs Container */}
            <div className="bg-background border-b border-border/50">
                <div className="container mx-auto px-4 py-6">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-secondary/30 min-h-screen py-20">
                <div className="container mx-auto px-4">
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    >
                        {posts.data.map((post: any) => (
                            <motion.div key={post.id} variants={item}>
                                <Link 
                                    href={route('blog.show', post.slug)}
                                    className="group flex flex-col bg-card border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.15)] transition-all duration-500 hover:-translate-y-2 h-full"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        {post.featured_image ? (
                                            <img 
                                                src={`/storage/${post.featured_image}`} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                alt={post.title} 
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <BookOpen className="w-12 h-12 text-primary/20" />
                                            </div>
                                        )}
                                        
                                        {/* Floating Badge */}
                                        <div className="absolute top-5 left-5">
                                            <div className="glass px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">
                                                Pet Care
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 p-8 flex flex-col">
                                        <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3 text-accent" />
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <User className="w-3 h-3 text-accent" />
                                                {post.author.name}
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-2xl font-display font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                        
                                        <p className="text-muted-foreground text-sm font-medium line-clamp-3 mb-8 leading-relaxed">
                                            {post.excerpt || 'Explore this in-depth article where we dive into specialized pet care techniques and expert insights from our team...'}
                                        </p>
                                        
                                        <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary group/btn">
                                            <span className="relative">
                                                Read Article
                                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/btn:w-full" />
                                            </span> 
                                            <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {posts.data.length === 0 && (
                        <div className="text-center py-32 border-2 border-dashed border-border rounded-[3rem] bg-card/50">
                            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-foreground">No stories yet</h3>
                            <p className="text-muted-foreground mt-2 font-medium">Our experts are busy writing new content. Check back soon!</p>
                        </div>
                    )}

                    <div className="mt-20 flex justify-center">
                        <Pagination links={posts.links} />
                    </div>
                </div>
            </div>


        </div>
    );
}

Index.layout = (page: React.ReactNode) => <GuestLayout children={page} />;
