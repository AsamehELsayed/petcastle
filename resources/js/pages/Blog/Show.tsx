import GuestLayout from '@/layouts/guest-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Show({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Home', href: '/' },
        { title: 'Blog', href: '/blog' },
        { title: post.title, href: '#' },
    ];

    return (
        <div className="ecommerce-body bg-background">
            <Head>
                <title>{`${post.title} - PetCastle Blog`}</title>
                <meta name="description" content={post.excerpt} />
            </Head>

            {/* Breadcrumbs Section */}
            <div className="border-b border-border/50 bg-white">
                <div className="container mx-auto px-4 py-6">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Premium Article Header */}
            <header className="relative pt-24 pb-32 bg-secondary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-primary/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/2" />
                
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-primary/20">
                            <Sparkles className="w-3 h-3 text-accent" /> Pet Tips & Care
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-10 leading-[1.05] text-[#1E3A8A]">
                            {post.title}
                        </h1>
                        
                        <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-border shadow-sm">
                                <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-white text-[10px]">
                                    {post.author.name.charAt(0)}
                                </div>
                                <span className="text-foreground">{post.author.name}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5 text-accent" />
                                <span>{new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-3.5 w-3.5 text-accent" />
                                <span>4 Comments</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Immersive Featured Image */}
            {post.featured_image && (
                <div className="container mx-auto px-4 -mt-16 mb-20 max-w-6xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,58,138,0.25)] border-8 border-white"
                    >
                        <img 
                            src={`/storage/${post.featured_image}`} 
                            className="w-full h-full object-cover" 
                            alt={post.title} 
                        />
                    </motion.div>
                </div>
            )}

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-20 max-w-7xl mx-auto">
                    
                    {/* Social Sidebar */}
                    <div className="lg:w-24 hidden lg:block">
                        <div className="sticky top-32 flex flex-col gap-5 items-center">
                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em] mb-4 [writing-mode:vertical-lr] opacity-40">Share This Story</span>
                            <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-110 shadow-sm">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-110 shadow-sm">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-110 shadow-sm">
                                <LinkIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Elite Article Body */}
                    <article className="lg:flex-1 max-w-4xl">
                        {/* High-impact Intro */}
                        {post.excerpt && (
                            <div className="relative mb-16 p-10 bg-secondary/40 rounded-[2.5rem] border border-primary/5">
                                <Sparkles className="absolute -top-3 -left-3 w-8 h-8 text-accent opacity-40" />
                                <p className="text-2xl md:text-3xl font-medium text-[#1E3A8A] italic leading-snug">
                                    "{post.excerpt}"
                                </p>
                            </div>
                        )}

                        {/* Article Content */}
                        <div 
                            className="prose prose-lg md:prose-2xl dark:prose-invert max-w-none 
                            prose-headings:font-display prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-[#1E3A8A]
                            prose-p:leading-[1.8] prose-p:text-muted-foreground prose-p:font-medium
                            prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:my-16
                            prose-a:text-accent prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-[#1E3A8A] prose-strong:font-black
                            prose-blockquote:border-l-8 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:p-8 prose-blockquote:rounded-r-[2rem] prose-blockquote:italic"
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />

                        {/* Author Bio Section */}
                        <div className="mt-24 p-10 bg-card border border-border/50 rounded-[3rem] flex flex-col sm:flex-row items-center gap-10 shadow-xl shadow-primary/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                            
                            <div className="h-24 w-24 rounded-[2rem] bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-3xl font-black text-accent shrink-0 shadow-inner">
                                {post.author.name.charAt(0)}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Editor-in-Chief</p>
                                <h3 className="text-3xl font-display font-black text-[#1E3A8A] mb-3">{post.author.name}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed">
                                    Dedicated pet enthusiast and behavior specialist with over 15 years of experience in high-end pet care and welfare.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar: Premium Related Posts */}
                    <aside className="lg:w-96 space-y-12">
                        <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl shadow-primary/5 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
                            
                            <h3 className="text-2xl font-display font-black mb-10 text-[#1E3A8A]">Recommended Stories</h3>
                            
                            <div className="space-y-10">
                                {relatedPosts.map((rp: any) => (
                                    <Link key={rp.id} href={route('blog.show', rp.slug)} className="group block">
                                        <div className="aspect-[16/10] bg-muted rounded-2xl mb-5 overflow-hidden relative shadow-sm">
                                            {rp.featured_image && (
                                                <img src={`/storage/${rp.featured_image}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            )}
                                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                        <h4 className="text-lg font-display font-black leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {rp.title}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <Calendar className="h-3 w-3 text-accent" />
                                            {new Date(rp.published_at).toLocaleDateString()}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            
                            <div className="mt-12 pt-8 border-t border-border/50">
                                <Link 
                                    href={route('blog.index')} 
                                    className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary hover:text-accent transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                                        <ArrowLeft className="h-4 w-4" />
                                    </div>
                                    View All Stories
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>


        </div>
    );
}

Show.layout = (page: React.ReactNode) => <GuestLayout children={page} />;
